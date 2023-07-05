import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Modal, Row, Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import Container from '../../components/container';
import { CInput } from '../../components/input/c-input';
import { useForm } from 'antd/es/form/Form';
import { useAuthContext } from '../../provider/auth/provider.auth';
import axios from 'axios';
import { useGetMe, useUpdateUser } from '../../services/auth/user/user.axios';
import { openNotification } from '../../util';
import { useQueryClient } from 'react-query';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';



const Profile: React.FC = () => {
    const navigate = useNavigate();


    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {


        if (info.file.status === 'uploading') {
            setLoading(true);
            info.file.status = 'done'
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const [form] = Form.useForm()

    const userMe = useGetMe()

    React.useEffect(() => {

        form.setFieldsValue({ name: userMe.data?.name, email: userMe.data?.email, address: userMe.data?.address, tel: userMe.data?.tel });
        setImageUrl(userMe.data?.img)
    }, []);


    const qClient = useQueryClient();
    const updateUser = useUpdateUser()
    const onUpdate = (value: any) => {
        updateUser.mutateAsync(
            {
                id: userMe.data?.id, ...value, img: imageUrl
            },
            {
                onSuccess: () => {
                    openNotification({ type: "success" });
                    qClient.invalidateQueries(["user-one"]);
                },
                onError: ({ message }: any) => {
                    openNotification({ type: "error", description: message });
                },
            }

        )
    }
    return (
        <Container>
            <Form form={form} onFinish={onUpdate} layout="vertical">
                <Row gutter={8} justify="center">
                    <Col span={4}>
                        <Upload
                            name="avatar"
                            listType="picture-circle"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            customRequest={() => { }}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '200px', borderRadius: '50%' }} /> : uploadButton}
                        </Upload></Col>

                </Row>
                <Row gutter={8} style={{ marginTop: '50px' }}>
                    <Col span={12} >
                        <Form.Item name="name" label="ชื่อ-นามสกุล" rules={[{ required: true }]}>
                            <CInput type="string" placeholder="ชื่อ-นามสกุล" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="email" label="อีเมล" rules={[{ required: true }]}>
                            <CInput type="email" placeholder="อีเมล" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item name="address" label="ที่อยู่" rules={[{ required: true }]}>
                            <TextArea rows={5} placeholder="ที่อยู่" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="tel" label="เบอร์โทรศัพท์" rules={[{ required: true }]}>
                            <CInput type="string" placeholder="เบอร์โทรศัพท์" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <Button type='primary' onClick={() => { navigate(-1) }} style={{ marginRight: '10px' }}>
                        ย้อนกลับ
                    </Button>
                    <Button type='primary' htmlType='submit'>
                        ยืนยันการแก้ไข
                    </Button>
                </Row>

            </Form>

        </Container>
    );
};

export default Profile;