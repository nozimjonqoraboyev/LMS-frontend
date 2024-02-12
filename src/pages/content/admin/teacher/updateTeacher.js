import React, {useState} from 'react';
import {Modal, Form, Input, Button, message, Select} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import axios from "axios";
import {serverURL} from "../../../consts/serverConsts";

const UpdateStudentModal = ({isEditModalVisible, onClose, onSuccess, record}) => {
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 20,
        },
    }

    const onFinish = (values) => {
        values.role_id=2;
        console.log(values);
        const jsonData = JSON.stringify(values);
        console.log(jsonData);
        axios.post(serverURL + `teacher/update/`+record.id, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.data.success) {
                    message.success('Student muvaffaqiyatli tahrirlandi');
                    form.resetFields();
                    onSuccess();
                    onClose();
                } else {
                    message.error(response.data.message).then(() => () => form.resetFields());
                }
            })
            .catch((error) => {
                message.error('An error occurred while editing the teacher').then(() => () => form.resetFields());
            });
    };


    const handleCancel = () => {
        message.info('Tahrirlash bekor qilindi');
        onClose();
        form.resetFields();
    };

    return (
        <Modal
            title="Update the teacher"
            open={isEditModalVisible}
            onCancel={handleCancel}
            footer={null}
            onOk={onSuccess}
        >
            <Form form={form} onFinish={onFinish} size={"large"} initialValues={record}>
                <Form.Item label="First name" name="firstName"
                           rules={[{required: true, message: 'Please enter first name!'}]} {...formItemLayout}  >
                    <Input placeholder='Enter name' maxLength={30} allowClear/>
                </Form.Item>
                <Form.Item label="Last name" name="lastName"
                           rules={[{required: true, message: 'Please enter last name!'}]} {...formItemLayout}  >
                    <Input placeholder='Enter name' maxLength={30} allowClear/>
                </Form.Item>
                <Form.Item label="Phone number" name="phoneNumber"
                           rules={[{required: true, message: 'Please enter phone number!'}]} {...formItemLayout}  >
                    <Input placeholder='Enter phone number' maxLength={30} allowClear/>
                </Form.Item>
                <Form.Item label="Age" name="age"
                           rules={[{required: true, message: 'Please enter age!'}]} {...formItemLayout}  >
                    <Input placeholder='Enter age' maxLength={2} allowClear/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<PlusOutlined/>}>
                        Update Teacher
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};


export default UpdateStudentModal;
