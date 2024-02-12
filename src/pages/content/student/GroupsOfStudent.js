import React, {Fragment} from "react";
import {Component} from "react";
import {message, Space, Table} from "antd";
import axios from "axios";
import {ArrowRightOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {serverURL} from "../../../server/consts/serverConsts";
import {getToken} from "../../../util/TokenUtil";
import Homework from "./Homework";


class GroupsOfStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            searchText: null,
            isHomeworkVisible: false,
            groupId: 0,
        };
    }

    hideModal = () => {
        this.setState({
            isHomeworkVisible: false,
        })
    };

    onSearch = (searchText) => {
        this.setState({
            searchText: searchText,
            page: 0,
        }, () => this.getData())
    }

    getData() {
        const {searchText} = this.state;
        let url = searchText ? `${serverURL}student/search?searching=${searchText}`
            : `${serverURL}student/my-groups`
        axios({
            url: url,
            method: "GET",
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                let dto = res.data;
                console.log(dto);
                if (dto.success) {
                    this.setState({
                        dataSource: dto.data,
                    })
                } else {
                    alert(dto.message)
                }
            })
            .catch((err) => {
                alert(url)
                message.error(err);
            });
    }

    componentDidMount() {
        this.getData();
    }

    handleSuccess = () => {
        this.getData();
    }

    handleHomework = (id) => {
        this.setState({
            isHomeworkVisible: true,
            groupId: id,
        });
    };

    render() {
        const columns = [
            {
                title: 'No',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => index + 1,
            },
            {
                title: 'Course',
                dataIndex: 'courseName',
                key: 'courseName',
            },
            {
                title: 'Group',
                dataIndex: 'groupName',
                key: 'groupName',
            },
            {
                title: 'Teacher',
                dataIndex: 'teacherName',
                key: 'teacherName',
            },
            {
                title: 'Action',
                key: 'action',
                render: (record) => (
                    <Space size="middle">
                        <a onClick={() => this.handleHomework(record.id)}><ArrowRightOutlined/></a>
                    </Space>
                ),
            },
        ];

        const {dataSource, isHomeworkVisible} = this.state;

        return (<div>
            {isHomeworkVisible ? <Homework
                isHomeworkVisible={isHomeworkVisible}
                onSuccess={this.handleSuccess}
                onClose={this.hideModal}
            /> : <Fragment>
                <div style={{width: '100%', display: "flex", justifyContent: "space-between"}}>
                    <h2>My groups</h2>
                    <div style={{width: '400px', float: "right", marginTop: '15px'}}>
                        <Search onSearch={(value) => this.onSearch(value)}/>
                    </div>
                </div>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                >
                </Table>
            </Fragment>}

        </div>);
    }
}

export default GroupsOfStudent;