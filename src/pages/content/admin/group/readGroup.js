import React, {Fragment} from "react";
import {Component} from "react";
import {Button, Space, Table} from "antd";
import axios from "axios";
import {DeleteOutlined, EditOutlined, FormOutlined} from "@ant-design/icons";
import CreateGroupModal from "./createGroup";
import UpdateGroupModal from "./updateGroup";
import DeleteGroupModal from "./deleteGroup";
import {serverURL} from "../../../consts/serverConsts";


class ReadGroup extends Component {
   /* constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            totalPages: 0,
            page: 0,
            size: 10,
            isAddModalVisible: false,
            isEditModalVisible: false,
            isDeleteModalVisible: false,
            record: {},
            deletingId: 0,
        };
    }
    hideModal = () => {
        this.setState({
            isAddModalVisible: false,
            isEditModalVisible: false,
            isDeleteModalVisible: false,
        })
    };

    getData() {
        const {page, size} = this.state;
        axios({
            url: `${serverURL}group/list?page=${page}&size=${size}`,
            method: "GET",
        })
            .then((res) => {
                let dto = res.data;
                if (dto.success) {
                    this.setState({
                        dataSource: dto.data.content,
                    })

                } else {
                    alert(dto.message)
                }
                console.log(this.state.dataSource)
            })
            .catch((err) => {
                alert(err.message)
            });
    }

    componentDidMount() {
        this.getData();
    }

    handleSuccess = () => {
        this.getData();
    };
    handleAdd = () => {
        this.setState({
            isAddModalVisible: true,
        });
    };

    handleEdit = (record) => {
        this.setState({
            isEditModalVisible: true,
            record: record,
        });
    };

    handleDelete = (id) => {
        this.setState({
            isDeleteModalVisible: true,
            deletingId: id,
        });
    };
*/
    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                sorter: (a, b) => a.id - b.id
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.id - b.id
            },
            {
                title: 'Course name',
                dataIndex: 'courseName',
                key: 'courseName',
                sorter: (a, b) => a.id - b.id
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Action',
                key: 'action',
                render: (record) => (
                    <Space size="middle">
                        <a onClick={() => this.handleEdit(record)}><EditOutlined/></a>
                        <a onClick={() => this.handleDelete(record.id)}><DeleteOutlined/></a>
                    </Space>
                ),
            },
        ];

        // const {dataSource, isAddModalVisible, isEditModalVisible, isDeleteModalVisible} = this.state;

        return (
            <Fragment>
                {/*<Table*/}
                {/*    dataSource={dataSource}*/}
                {/*    columns={columns}*/}
                {/*>*/}
                {/*</Table>*/}
                {/*<Button type="primary" onClick={this.handleAdd} icon={<FormOutlined/>}>*/}
                {/*    New Group*/}
                {/*</Button>*/}
                {/*<CreateGroupModal*/}
                {/*    isAddModalVisible={isAddModalVisible}*/}
                {/*    onSuccess={this.handleSuccess}*/}
                {/*    onCancel={this.hideModal}*/}
                {/*    onClose={this.hideModal}*/}
                {/*/>*/}
                {/*<UpdateGroupModal*/}
                {/*    isEditModalVisible={isEditModalVisible}*/}
                {/*    record={this.state.record}*/}
                {/*    onClose={this.hideModal}*/}
                {/*    onSuccess={this.handleSuccess}*/}
                {/*/>*/}
                {/*<DeleteGroupModal*/}
                {/*    isDeleteModalVisible={isDeleteModalVisible}*/}
                {/*    id={this.state.deletingId}*/}
                {/*    onClose={this.hideModal}*/}
                {/*    onSuccess={this.handleSuccess}*/}
                {/*/>*/}
                GROUPS
            </Fragment>
        );

    }
}

export default ReadGroup;