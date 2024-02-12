import React, {useState} from 'react';
import {Modal, Form, Input, Button, message} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import axios from "axios";
import {serverURL} from "../../../consts/serverConsts";



const CreateCourseModal = ({isAddModalVisible, onClose, onSuccess}) => {
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 20,
        },
    }

    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        const jsonData = JSON.stringify(values);
        axios.post(serverURL + 'course/create', jsonData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (response.data.success) {
                    message.success('Course added successfully');
                    form.resetFields();
                    onSuccess();
                    onClose();
                } else {
                    message.error(response.data.message).then(() => () => form.resetFields());
                }
            })
            .catch((error) => {
                message.error('An error occurred while adding the course').then(() => () => form.resetFields());
            });
    };
    const handleCancel = () => {
        message.info("Qo'shish bekor qilindi");
        form.resetFields();
        onClose();
    };

    const onButtonClick = (e) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 2000);

    };

    return (
        <Modal
            title="Add New Course"
            visible={isAddModalVisible}
            onCancel={handleCancel}
            footer={null}
            onOk={onSuccess}
        >
            <Form form={form} onFinish={onFinish} size={"large"}>
                <Form.Item label="Name" name="name"
                           rules={[{required: true, message: 'Please enter name!'}]} {...formItemLayout}  >
                    <Input placeholder='Enter name' maxLength={25} allowClear/>
                </Form.Item>
                <Form.Item label="Description" name="description"
                           rules={[{required: true, message: 'Please enter the description!'}]} {...formItemLayout}>
                    <Input.TextArea placeholder='Enter description about the course' maxLength={60}
                                    allowClear style={{height: '50px'}}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} onClick={onButtonClick}
                            icon={<PlusOutlined/>}>
                        Add Course
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateCourseModal;
