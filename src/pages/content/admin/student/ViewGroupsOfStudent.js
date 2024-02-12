import React from 'react';
import { Modal, Table } from 'antd';


const ViewGroupsOfStudent = ({ isViewGroupsModalVisible, name, onClose, groupNames }) => {


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
    ];

    return (
        <Modal title={`${name}ning guruhlari`} open={isViewGroupsModalVisible} onCancel={onClose} footer={null}>
            <Table dataSource={groupNames} columns={columns} />
        </Modal>
    );
};

export default ViewGroupsOfStudent;
