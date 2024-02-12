import React, {useState} from 'react';
import {Modal, Form, Input, Button, message, Select} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import axios from "axios";
import {serverURL} from "../../../consts/serverConsts";


const CreateStudentModal = ({isAddModalVisible, onClose, onSuccess}) => {

    const [loading, setLoading] = useState(false);
    const onButtonClick = (e) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 1000);

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

    const [options, setOptions] = useState([]);
    const [loadingOptions, setLoadingOptions] = useState(false);
        const fetchGroups = async () => {
            try {
                setLoadingOptions(true);
                const response = await axios.get(`${serverURL}group/groupIdAndName`);
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

    const onFinish = (values) => {
        values.role_id=3;
        console.log(values);
        const jsonData = JSON.stringify(values);
        console.log(jsonData);
        axios.post(serverURL + 'student/create', jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.data.success) {
                    message.success('Student muvaffaqiyatli qo\'shildi');
                    form.resetFields();
                    onSuccess();
                    onClose();
                } else {
                    message.error(response.data.message).then(() => () => form.resetFields());
                }
            })
            .catch((error) => {
                message.error('An error occurred while adding the student').then(() => () => form.resetFields());
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
                <Form.Item label="Groups" name="groups"
                           rules={[{required: true, message: 'Iltimos guruhlarni tanlang!'}]} {...formItemLayout}>
                    <Select
                        placeholder='Guruhlarni tanlang'
                        allowClear
                        mode="multiple"
                        onClick={fetchGroups}
                        loading={loadingOptions}
                    >
                        {options}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} onClick={onButtonClick}
                            icon={<PlusOutlined/>}>
                        Add Student
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateStudentModal;
