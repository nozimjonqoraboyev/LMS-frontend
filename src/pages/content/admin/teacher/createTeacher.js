import React, {useState} from 'react';
import {Modal, Form, Input, Button, message, Select} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import axios from "axios";
import {serverURL} from "../../../consts/serverConsts";


const CreateTeacherModal = ({isAddModalVisible, onClose, onSuccess}) => {

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
        axios.post(serverURL + 'teacher/create', jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.data.success) {
                    message.success('O\'qituvchi muvaffaqiyatli qo\'shildi');
                    form.resetFields();
                    onSuccess();
                    onClose();
                } else {
                    message.error(response.data.message).then(() => () => form.resetFields());
                }
            })
            .catch((error) => {
                message.error('An error occurred while adding the teacher').then(() => () => form.resetFields());
            });
    };


    const handleCancel = () => {
        message.info("Qo'shish bekor qilindi");
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="Add New Student"
            open={isAddModalVisible}
            onCancel={handleCancel}
            footer={null}
            onOk={onSuccess}
        >
            <Form form={form} onFinish={onFinish} size={"large"}>
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
                        Add Student
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateTeacherModal;
