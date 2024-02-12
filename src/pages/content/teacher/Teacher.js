import {Component, Fragment} from "react";
import axios from "axios";
import {serverURL} from "../../consts/serverConsts";
import {getToken} from "../../../util/TokenUtil";
import {Button, Table} from "antd";
import {getMyGroupUrl, getTeacherUrl, teacherGroupSize} from "./ConstData";
import {ArrowRightOutlined} from "@ant-design/icons";

class Teacher extends Component {
    state = {
        teacher: {
            email:'mavjud emas'
        },
        page:0,
        size:teacherGroupSize,
        myGroups:{
            content:[],
            totalElements:0
        }
    }

    componentDidMount() {

        this.getTeacher();
    }


    getData() {
        let url = getMyGroupUrl(this.state.teacher.id , this.state.size,this.state.page)

        axios({
            url: url,
            method: "GET",
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                let data = res.data.data
                this.setState({
                    myGroups:data
                })
                console.log('my groups')
                console.log(data)
            })
            .catch((err) => {
                alert('error my group function name getData()')
            });
    }
    getGroup = (id) => {
        let group1 = null
        let a = undefined

        this.state.myGroups.content.map((group) => id === group.id?group1=group:a=group)
        return group1 
    }
    getTeacher() {
        let url = getTeacherUrl(this.props.teacher.username)
        axios({
            url: url,
            method: "GET",
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                let data = res.data.data
                console.log('get teacher')
                console.log(data)
                this.setState(
                    {
                        teacher:data
                    },() => {
                        this.getData()
                    }
                )

            })
            .catch((err) => {
                console.log(err);
                alert(`${serverURL}/user/teacher/` + this.props.teacher.username)
                alert("Server bilan bog'lanishda muammo: " + err.message)
            });

    }


    render() {

        let columns = [
            {
                title: 'ID',
                dataIndex: 'id'
            },
            {
                title: 'Name',
                dataIndex: 'name'
            },
            {
                title: 'Description',
                dataIndex: 'description'
            },
            {
                title: 'Course',
                dataIndex: 'courseName'
            },
            {
                title: 'View group',
                dataIndex: 'id',
                key: 'id',
                render: (id) => <div style={{
                    display:"flex"
                }}>
                    <Button onClick={() => this.props.setKey(this.getGroup(id))}><ArrowRightOutlined /> Guruhga kirish</Button>

                </div>
            }
        ]
      const  handlePagination = (e) => {
            this.setState({
                page: e - 1
            }, () => this.getData())
        }
        return (
            <div>
                <Table
                    columns={[...columns]}
                    dataSource={[...this.state.myGroups.content]}
                    pagination={{
                        pageSize:this.state.size,
                        total:this.state.myGroups.totalElements,
                        onChange: handlePagination,
                    }}
                />
            </div>
        );
    }

}

export default Teacher;