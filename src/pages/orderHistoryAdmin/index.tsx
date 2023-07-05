import { useState } from "react";
import { useOrderAdmin, useOrderHistoryAdmin } from "../../services/auth/order/order";
import { ICart } from "../../interface/ICart";
import {
    CModalProduct,
    DisplayProduct,
} from "../../components/modal/modal-product";
import { useCartConfirm, useCartSuccess } from "../../services/auth/cart/cart.axios";
import { openNotification } from "../../components/notification";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { Button } from "antd";
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import Container from "../../components/container";
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(buddhistEra);
export default function OrderHistoryAdmin() {
    const navigate = useNavigate();
    const { data: orders } = useOrderHistoryAdmin();
    const confirm = useCartSuccess()
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemsOrder, setOrder] = useState({} as any);
    const organizedData: Record<string, ICart[]> = {};
    const qClient = useQueryClient();
    orders?.forEach((item: ICart) => {
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

    const onConfirm = (orderId: string) => {
        confirm.mutateAsync(
            {
                orderId: orderId,
            },
            {
                onSuccess: () => {
                    openNotification({ type: "success" });
                    qClient.invalidateQueries(["cart"]);
                },
                onError: ({ message }: any) => {
                    openNotification({ type: "error", description: message });
                },
            }
        );
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
                                        <th scope="col" className="px-6 py-3 text-sm ">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-sm ">
                                            ผู้สั่งซื้อ
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-sm ">
                                            วันที่ทำรายการ
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-sm ">
                                            สถานะ
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-sm ">
                                            รายละเอียด
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-slate-100">
                                    {mappedData.map((order, index) => (
                                        <tr key={order.orderId}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                                {index + 1}
                                            </th>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <div className="h-11 w-11 flex-shrink-0">
                                                        <img
                                                            className="h-11 w-11 rounded-full"
                                                            src={order.items[0].user.img}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="font-medium text-gray-900">
                                                            {order.items[0].user.name}
                                                        </div>
                                                        <div className="mt-1 text-gray-500">
                                                            {order.items[0].user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div className="text-gray-900">
                                                    {dayjs(order.items[0].UpdateAt).tz('Asia/Bangkok').locale('th').format('DD MMMM BBBB')}
                                                </div>

                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    {order.items[0].status?.status_name}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <a
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    onClick={() => {
                                                        setIsModalOpen(true);
                                                        setOrder(order);
                                                    }}
                                                >
                                                    <Button type="primary" >รายละเอียด</Button>
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
    );
}
