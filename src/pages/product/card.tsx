import React from 'react';
import { Card, Modal } from 'antd';
import { IProduct, IProductResult } from '../../interface/IProduct';
import image from 'antd/es/image';

type Props = {};

export default function ProductCard(product: IProduct) {
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Card
                cover={<img alt={product.name} src={product.img} />}
                title={product.name}
                style={{ width: 200 }}
                onClick={showModal}
            >
                <p>{product.producttype?.producttype_name}</p>
                <p>{product.detail}</p>
                <p>ราคา: {product.price} บาท</p>
            </Card>

            <Modal
                title="ข้อมูลสินค้า"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <img alt={product.name} src={product.img} style={{ width: '100%', marginBottom: 10 }} />
                <p>{product.producttype?.producttype_name}</p>
                <p>ขนาด: {product.size?.size_name}</p>
                <p>สี: {product.color?.color_name}</p>
                <p>เหมาะสมสำหรับ: {product.suitability?.suitability_name}</p>
            </Modal>
        </div>
    );
}
