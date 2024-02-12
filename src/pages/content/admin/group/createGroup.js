import React, {useEffect, useState} from 'react';
import {Modal, Form, Input, Button, message, Select} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import axios from "axios";
import {serverURL} from "../../../consts/serverConsts";
import async from "async";


const CreateGroupModal = ({isAddModalVisible, onClose, onSuccess}) => {

    const [options, setOptions] = useState([]);

    const [loadingOptions, setLoadingOptions] = useState(false);

    const fetchCourses = async () => {
        try {
            setLoadingOptions(true);
            const response = await axios.get(`${serverURL}course/courseIdAndName`);
            const dto = response.data;

            if (dto.success) {
                const jsonData = dto.data;
                const mappedOptions = jsonData.map(item => (
                    <Select.Option key={item.id} value={item.id}>
                        {item.name}
                    </Select.Option>
                ));
                setOptions(mappedOptions);
            } else {
                message.error(dto.message);
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoadingOptions(false);
        }
    };


    const fetchTeachers =async () => {
        try {
            setLoadingOptions(true);
            const response = await axios.get(`${serverURL}teacher/teacherIdAndName`);
            const dto = response.data;

            if (dto.success) {
                const jsonData = dto.data;
                const mappedOptions = jsonData.map(item => (
                    <Select.Option key={item.id} value={item.id}>
                        {item.name}
                    </Select.Option>
                ));
                setOptions(mappedOptions);
            } else {
                message.error(dto.message);
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoadingOptions(false);
        }
    };


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
        console.log(jsonData);
        axios.post(serverURL + 'group/create', jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.data.success) {
                    message.success('Group added successfully');
                    form.resetFields();
                    onSuccess();
                    onClose();
                } else {
                    message.error(response.data.message).then(() => () => form.resetFields());
                }
            })
            .catch((error) => {
                message.error('An error occurred while adding the group').then(() => () => form.resetFields());
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
        }, 1000);

    };

    return (
        <Modal
            title="Add New Group"
            open={isAddModalVisible}
            onCancel={handleCancel}
            footer={null}
            onOk={onSuccess}
        >
            <Form form={form} onFinish={onFinish} size={"large"}>
                <Form.Item label="Name" name="name"
                           rules={[{required: true, message: 'Please enter name!'}]} {...formItemLayout}  >
                    <Input placeholder='Enter name' maxLength={25} allowClear/>
                </Form.Item>
                <Form.Item label="Course name" name="courseId"
                           rules={[{required: true, message: 'Please select course name!'}]} {...formItemLayout}  >
                    <Select
                        placeholder='Select course'
                        allowClear
                        onClick={fetchCourses}
                        loading={loadingOptions}
                    >
                        {options}
                    </Select>

                </Form.Item>
                <Form.Item label="Teacher name" name="teacherId"
                           rules={[{required: true, message: 'Please select a teacher!'}]} {...formItemLayout}  >
                    <Select
                        placeholder='Select teacher'
                        allowClear
                        onClick={fetchTeachers}
                        loading={loadingOptions}
                    >
                        {options}
                    </Select>

                </Form.Item>
                <Form.Item label="Description" name="description"
                           rules={[{required: true, message: 'Please enter the description!'}]} {...formItemLayout}>
                    <Input.TextArea placeholder='Enter description about the group' maxLength={60}
                                    allowClear style={{height: '50px'}}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} onClick={onButtonClick}
                            icon={<PlusOutlined />}>
                        Add Group
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateGroupModal;
