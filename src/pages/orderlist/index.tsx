import { useQueryClient } from "react-query";
import Container from "../../components/container";
import { useDeleteOrder, useOrderHistory, useUploadSlip } from "../../services/auth/order/order";
import { useAuthContext } from "../../provider/auth/provider.auth";
import { CModalProduct, DisplayProduct } from "../../components/modal/modal-product";
import { ICart } from "../../interface/ICart";
import { useState } from "react";
import React from "react";

import { openNotification } from "../../util";
import { fileToDataUrl } from "../../util/media";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload/interface";
import { log } from "console";


export default function OrderList() {
    const [loading, setLoading] = React.useState(false);
    const [statusUpload, setStatusUpload] = React.useState(true);
    const { profile } = useAuthContext();
    const qClient = useQueryClient();
    const { data: orderhistory } = useOrderHistory(profile?.id);
    const [itemsOrder, setOrder] = useState({} as any);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const organizedData: Record<string, ICart[]> = {};
    const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>(undefined);
    const uploadSlip = useUploadSlip()

    const deletOrder = useDeleteOrder()

    const onDelete = (orderId: string) => {
        deletOrder.mutateAsync(
            {
                id: profile?.id,
                orderId: orderId,
            },
            {
                onSuccess: () => {
                    openNotification({ type: "success" });
                    qClient.invalidateQueries(["order-history"]);
                },
                onError: ({ message }: any) => {
                    openNotification({ type: "error", description: message });
                },
            }
        );
    };

    const onFinish = (img: string, orderId: string) => {
        uploadSlip.mutate(
            { id: profile?.id, img, orderId },

            {
                onSuccess: () => {
                    openNotification({ type: "success", title: "อัปโหลดสำเร็จ" });
                    qClient.invalidateQueries(["order-history"]);
                },
                onError: ({ message }) => {
                    openNotification({ type: "error", description: message });
                },
            }
        );
    };
    orderhistory?.forEach((item: ICart) => {
        if (!organizedData[item.orderId]) {
            organizedData[item.orderId] = [];
        }
        organizedData[item.orderId].push(item);
    });

    const mappedData = Object.keys(organizedData).map((orderId: string) => {
        return {
            orderId,
            items: organizedData[orderId],
        };
    });

    const accepts = {
        array: ["jpg", "jpeg", "png", "webp"],
        string: ".jpg,.jpeg,.png,.webp",
    };

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const handleChange = (info: UploadChangeParam<UploadFile>, orderId: string) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            info.file.status = 'done'
        }


        if (info.file.status === 'done') {

            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                onFinish(url, orderId)
            });

        }

    };


    return (
        <Container>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                            style={{ width: "300px" }}
                                        >
                                            #
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            style={{ width: "300px" }}
                                        >
                                            ที่อยู่
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            style={{ width: "300px" }}
                                        >
                                            สถานะ
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            style={{ width: "300px" }}
                                        >
                                            อัปโหลดสลิป
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                            style={{ width: "100px" }}
                                        >
                                            <span className="sr-only">ยกเลิก</span>
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                            style={{ width: "100px" }}
                                        >
                                            <span className="sr-only">ยืนยัน</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {mappedData.map((order, index) => (
                                        <tr key={order.orderId}>
                                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                {index + 1}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div className="text-gray-900">
                                                    {order.items[0].user.address}
                                                </div>
                                                <div className="mt-1 text-gray-500">
                                                    {order.items[0].user.tel}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    {order.items[0].status?.status_name}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">

                                                <Upload
                                                    onChange={(value) => handleChange(value, order.orderId)}
                                                    name="file"
                                                    customRequest={() => { }}

                                                >
                                                    <Button loading={loading} icon={<UploadOutlined />} type="primary" >
                                                        เลือกไฟล์
                                                    </Button>
                                                </Upload>
                                            </td>
                                            <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <a
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    onClick={() => onDelete(order.orderId)}
                                                >
                                                    ยกเลิกการสั่งซื้อ<span className="sr-only"></span>
                                                </a>
                                            </td>
                                            <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <a
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    onClick={() => {
                                                        setSelectedOrderId(order.orderId);
                                                        setIsModalOpen(true);
                                                        setOrder(order);
                                                    }}
                                                >
                                                    รายละเอียด<span className="sr-only"></span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <CModalProduct
                    listOrder={true}
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                >
                    <DisplayProduct product={{ itemsOrder, listOrder: true }} />
                </CModalProduct>

            </div>
        </Container>
    )

}