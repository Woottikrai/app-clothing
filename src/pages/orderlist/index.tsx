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
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import buddhistEra from 'dayjs/plugin/buddhistEra';
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(buddhistEra);

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
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                                <thead className="text-xs text-white uppercase bg-slate-400 dark:text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-sm">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-sm">
                                            วันที่ทำรายการ
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-sm">
                                            สถานะ
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-sm">
                                            อัปโหลดสลิป
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-sm">
                                            ยกเลิกการสั่งซื้อ
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-sm">
                                            รายละเอียดการสั่งซื้อ
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {mappedData.map((order, index) => (
                                        <tr key={order.orderId} className="bg-slate-100 border-b dark:bg-gray-900 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white align-middle">
                                                {index + 1}
                                            </th>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div className="text-gray-900">
                                                    {dayjs(order.items[0].CreateAt).tz('Asia/Bangkok').locale('th').format('DD MMMM BBBB')}
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
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">

                                                <a
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    onClick={() => {
                                                        setSelectedOrderId(order.orderId);
                                                        setIsModalOpen(true);
                                                        setOrder(order);
                                                    }}
                                                >
                                                    <Button type="primary">รายละเอียด</Button>

                                                </a>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">

                                                <a
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    onClick={() => onDelete(order.orderId)}
                                                >
                                                    <Button danger type="default"> ยกเลิกการสั่งซื้อ</Button>
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