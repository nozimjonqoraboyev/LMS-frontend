import React, {Fragment, useState} from 'react';
import {Modal, Form, Input, Button, message, Upload} from 'antd';
import axios from "axios";
import {serverURL} from "../../../../server/consts/serverConsts";
import {getToken} from "../../../../util/TokenUtil";

import {UploadOutlined} from "@ant-design/icons";
import {uploadFileUrl} from "../ConstData";


const CreateTask = ({isAddModalVisible, onClose, onSuccess}) => {
    const [form] = Form.useForm();
    const [open,setOpen] = useState(false)
    const props = {
        name: 'file',
        action: uploadFileUrl,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`
        },

        onChange(info) {
            // alert('oncahne')
            console.log(info)
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    }
    const formItemLayout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 20,
        },
    }
    const showModal = () => {
        setOpen(true)
    };

    const handleOk = () => {
        handleCancel()
    };
    const onFinish = (values) => {
        const jsonData = JSON.stringify(values);
        axios.post(serverURL + 'admin/course/create', jsonData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
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
        setOpen(false);
    };

    return (
       <Fragment>
           <Button id={'form'} type={'primary'} onClick={showModal}>Create task</Button>
           <Modal
               title="Create new task"
               open={open}
               onCancel={handleCancel}
               footer={true}
               onOk={handleOk}
           >
               <Form form={form} onFinish={onFinish} size={"large"}>
                       <Form.Item label="Theme" name="theme">
                           <Input allowClear/>
                       </Form.Item>
                       <Form.Item label="Max ball" name="maxBall">
                           <Input allowClear/>
                       </Form.Item>

                       <Form.Item label="File upload" name="file">
                           <Upload  onChange={(e)=>props.onChange(e)} {...props}>
                               <Button icon={<UploadOutlined />}>Put file</Button>
                           </Upload>
                       </Form.Item>
                       <Form.Item>

                           <Button onClick={handleOk} type="default" htmlType="submit">
                               Submit
                           </Button>
                           <Button onClick={handleCancel} type="primary" htmlType={"button"} >
                               Cancel
                           </Button>
                       </Form.Item>
               </Form>
           </Modal>

       </Fragment>
        );
};

export default CreateTask;
