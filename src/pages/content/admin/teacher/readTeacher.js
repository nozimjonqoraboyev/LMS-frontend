import React, {Fragment} from "react";
import {Component} from "react";
import {Button, message, Space, Table} from "antd";
import axios from "axios";
import {DeleteOutlined, EditOutlined, FormOutlined, EyeOutlined} from "@ant-design/icons";
import CreateStudentModal from "./createTeacher";
import UpdateStudentModal from "./updateTeacher";
import DeleteStudentModal from "./deleteTeacher";
import ViewGroupsOfTeacher from "./ViewGroupsOfTeacher";
import {serverURL} from "../../../consts/serverConsts";

class ReadTeacher extends Component {
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
            isViewGroupsModalVisible: false,
            record: {},
            deleteId: '',
            deleteName: "student",
            viewGroupsId: '',
            studentName: "student",
            groupNames: [],
        };
    }
    hideModal = () => {
        this.setState({
            isAddModalVisible: false,
            isEditModalVisible: false,
            isDeleteModalVisible: false,
            isViewGroupsModalVisible: false,
        })
    };

    getData() {
        const {page, size} = this.state;
        axios({
            url: `${serverURL}teacher/list?page=${page}&size=${size}`,
            method: "GET",
        })
            .then((res) => {
                let dto = res.data;
                if (dto.success) {
                    console.log(dto.data.content);
                    this.setState({
                        dataSource: dto.data.content,
                    })

                } else {
                    alert(dto.message)
                }
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

    handleDelete = (id,firstName) => {
        this.setState({
            isDeleteModalVisible: true,
            deleteId: id,
            deleteName: firstName,
        });
    };
    handleViewGroup = (id,name) =>{
        console.log(id);
        console.log(name);
        this.setState({
            isViewGroupsModalVisible: true,
            studentName: name,
        });
        const getGroupsOfStudent = () => {
            axios
                .get(`${serverURL}teacher/get-groups/${id}`)
                .then((response) => {
                    const dto = response.data;
                    if (dto.success) {
                        this.setState({
                            groupNames: dto.data.content,
                        });
                    } else {
                        message.error(dto.message);
                    }
                })
                .catch((error) => {
                    message.error(error.message);
                });
        };
        if (this.state.isViewGroupsModalVisible) {
            getGroupsOfStudent();
        }

    }
*/
    render() {
/*
        const columns = [
            {
                title: 'UUID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'First name',
                dataIndex: 'firstName',
                key: 'firstName',
            },
            {
                title: 'Last name',
                dataIndex: 'lastName',
                key: 'lastName',
            },
            {
                title: 'Phone number',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                sorter: (a, b) => a.age - b.age
            },
            {
                title: 'Groups',
                dataIndex: 'groups',
                key: 'groups',
                render: (record) => (
                    <Space size="middle" align={"center"}>
                        <a onClick={() => this.handleViewGroup(record.id,record.firstName)}><EyeOutlined /></a>
                    </Space>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                render: (record) => (
                    <Space size="middle">
                        <a onClick={() => this.handleEdit(record)}><EditOutlined/></a>
                        <a onClick={() => this.handleDelete(record.id,record.firstName)}><DeleteOutlined/></a>
                    </Space>
                ),
            },
        ];
*/

        // const {dataSource, isAddModalVisible, isEditModalVisible, isDeleteModalVisible, isViewGroupsModalVisible} = this.state;
        return (
            <Fragment>
                {/*<Table*/}
                {/*    dataSource={dataSource}*/}
                {/*    columns={columns}*/}
                {/*    // loading={loading}*/}
                {/*    // rowKey="id"*/}
                {/*>*/}
                {/*</Table>*/}
                {/*<Button type="primary" onClick={this.handleAdd} icon={<FormOutlined/>}>*/}
                {/*    New Student*/}
                {/*</Button>*/}
                {/*<CreateStudentModal*/}
                {/*    isAddModalVisible={isAddModalVisible}*/}
                {/*    onSuccess={this.handleSuccess}*/}
                {/*    onCancel={this.hideModal}*/}
                {/*    onClose={this.hideModal}*/}
                {/*/>*/}
                {/*<UpdateStudentModal*/}
                {/*    isEditModalVisible={isEditModalVisible}*/}
                {/*    record={this.state.record}*/}
                {/*    onClose={this.hideModal}*/}
                {/*    onSuccess={this.handleSuccess}*/}
                {/*/>*/}
                {/*<DeleteStudentModal*/}
                {/*    isDeleteModalVisible={isDeleteModalVisible}*/}
                {/*    id={this.state.deleteId}*/}
                {/*    name={this.state.deleteName}*/}
                {/*    onClose={this.hideModal}*/}
                {/*    onSuccess={this.handleSuccess}*/}
                {/*/>*/}
                {/*<ViewGroupsOfTeacher*/}
                {/*    isViewGroupsModalVisible={isViewGroupsModalVisible}*/}
                {/*    name={this.state.studentName}*/}
                {/*    groupNames={this.state.groupNames}*/}
                {/*    onClose={this.hideModal}*/}
                {/*/>*/}
                TEACHERS
            </Fragment>
        );
    }
}

export default ReadTeacher;