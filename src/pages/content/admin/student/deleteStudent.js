import React, {useState} from 'react';
import {Modal, Button, message,Typography} from 'antd';
import {CheckOutlined} from "@ant-design/icons";
import axios from "axios";
import {serverURL} from "../../../consts/serverConsts";

const {Text} = Typography;

const DeleteStudentModal = ({isDeleteModalVisible, onClose, onSuccess, id, name}) => {

    const [loading, setLoading] = useState(false);

    const onFinish = () => {
        onButtonClick();
        axios.delete(serverURL + `student/delete/${id}`)
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    message.success(name+' o\'chirildi').then(onSuccess).then(onClose);

                } else {
                    message.error(response.data.message).then(onClose);
                }
            })
            .catch((error) => {
                console.log(error)
                message.error('An error occurred while deleting the student');
            });
    };

    const handleCancel = () => {
        message.info("O'chirish bekor qilindi");
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
            title="Delete the student"
            visible={isDeleteModalVisible}
            onCancel={handleCancel}
            footer={null}
        >
            <Text type="danger">Rostan ham {name}ni o'chirmoqchimisiz?</Text>
            <br/>
            <br/>
            <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={onFinish}
                icon={<CheckOutlined/>}
            >
                O'chirish
            </Button>
        </Modal>
    );
};

export default DeleteStudentModal;
