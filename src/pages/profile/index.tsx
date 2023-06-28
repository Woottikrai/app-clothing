import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Modal, Upload, message } from 'antd';
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



const Profile: React.FC = () => {
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
        console.log(info);

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
    const { profile } = useAuthContext();
    const [form] = Form.useForm()
    const { data: userOne } = useGetMe(profile?.id)
    React.useEffect(() => {
        form.setFieldsValue({ name: userOne?.name, email: userOne?.email, address: userOne?.address, tel: userOne?.tel });
        setImageUrl(userOne?.img)
    }, []);

    const qClient = useQueryClient();
    const updateUser = useUpdateUser()
    const onUpdate = (value: any) => {
        updateUser.mutateAsync(
            {
                id: profile?.id, ...value, img: imageUrl
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
            <Form form={form} onFinish={onUpdate}>
                <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    customRequest={() => { }}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <Col span={12}>
                    <Form.Item name="name" label="ชื่อ-นามสกุล" rules={[{ required: true }]}>
                        <CInput type="string" min={0} placeholder="ชื่อ-นามสกุล" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="email" label="อีเมล" rules={[{ required: true }]}>
                        <CInput type="email" min={0} placeholder="อีเมล" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="address" label="ที่อยู่" rules={[{ required: true }]}>
                        <CInput type="string" min={0} placeholder="ที่อยู่" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="tel" label="เบอร์โทรศัพท์" rules={[{ required: true }]}>
                        <CInput type="string" min={0} placeholder="เบอร์โทรศัพท์" />
                    </Form.Item>
                </Col>

                <Button htmlType='submit'>
                    บันทึก
                </Button>
            </Form>

        </Container>
    );
};

export default Profile;