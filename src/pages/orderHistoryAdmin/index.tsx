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
                                        ผู้สั่งซื้อ
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
                                {mappedData.map((order) => (
                                    <tr key={order.orderId}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
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

                                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <a
                                                className="text-indigo-600 hover:text-indigo-900"
                                                onClick={() => {
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
    );
}
