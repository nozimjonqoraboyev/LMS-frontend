import React, {useState} from 'react';
import {Modal, Button, message,Typography} from 'antd';
import {CheckOutlined} from "@ant-design/icons";
import axios from "axios";
import {serverURL} from "../../../consts/serverConsts";

const {Text} = Typography;

const DeleteGroupModal = ({isDeleteModalVisible, onClose, onSuccess, id}) => {

    const [loading, setLoading] = useState(false);

    const onFinish = () => {
        onButtonClick();
        axios.delete(serverURL + `group/delete/${id}`)
            .then((response) => {
                if (response.data.success) {
                    message.success('Group deleted successfully').then(onSuccess).then(onClose);

                } else {
                    message.error("Ushbu guruhga bog'langan studentlar mavjud").then(onClose);
                }
            })
            .catch((error) => {
                console.log(error)
                message.error('An error occurred while deleting the group');
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
            title="Delete the group"
            open={isDeleteModalVisible}
            onCancel={handleCancel}
            footer={null}
        >
            <Text type="danger">Are you sure you want to delete this group?(id:{id})</Text>
            <br/>
            <br/>
            <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={onFinish}
                icon={<CheckOutlined/>}
            >
                Submit
            </Button>
        </Modal>
    );
};

export default DeleteGroupModal;
