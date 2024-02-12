import React, {useState} from 'react';
import {Modal, Button, message,Typography} from 'antd';
import {CheckOutlined} from "@ant-design/icons";
import axios from "axios";
import {serverURL} from "../../../consts/serverConsts";

const {Text} = Typography;

const DeleteCourseModal = ({isDeleteModalVisible, onClose, onSuccess, id}) => {

    const [loading, setLoading] = useState(false);

    const onFinish = () => {
        onButtonClick();
        axios.delete(serverURL + `course/delete/${id}`)
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    message.success('Course deleted successfully').then(onSuccess).then(onClose);

                } else {
                    message.error("Ushbu kursga bog'langan guruhlar mavjud").then(onClose);
                }
            })
            .catch((error) => {
                console.log(error)
                message.error('An error occurred while deleting the course');
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
            title="Delete the course"
            visible={isDeleteModalVisible}
            onCancel={handleCancel}
            footer={null}
        >
            <Text type="danger">Are you sure you want to delete this course?(id:{id})</Text>
            <br/>
            <br/>
            <Button type="primary" htmlType="submit" loading={loading} onClick={onFinish}
                    icon={<CheckOutlined/>}>
                Submit
            </Button>
        </Modal>
    );
};

export default DeleteCourseModal;
