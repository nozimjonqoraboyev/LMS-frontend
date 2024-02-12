import {Component, Fragment} from "react";
import {getGroupStudents} from "./ConstData";
import axios from "axios";
import {getToken} from "../../../util/TokenUtil";
import StudentNotFound from "./notfoundstudent/StudentNotFound";
import {Button, Input, Select, Table} from "antd";
import {Option} from "antd/es/mentions";
import CreateTask from "./modals/CreateTask";

class StudentOfGroup extends Component {
    state = {
        students: [],
        selectExample: [
            {
                value: 'sample',
                word: 'Sample',
                filePath: './files/IMG_2229.JPG'
            },
            {
                value: 'option1',
                word: 'Option1',
                filePath: './files/IMG_2230.JPG'
            },
            {
                value: 'option2',
                word: 'Option2',
                filePath: './files/IMG_2231.JPG'
            },
            {
                value: 'option3',
                word: 'Option3',
                filePath: './files/IMG_2232.JPG'
            }
        ],
        filePath: {
            url: null,
            name: null
        }
    }

    componentDidMount() {
        this.setState({
            filePath: {
                url: this.state.selectExample[this.state.selectExample.length - 1].filePath,
                name: this.state.selectExample[this.state.selectExample.length - 1].word
            }
        })
        this.getData();
    }

    getData() {

        let url = getGroupStudents(this.props.group.id)

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
                    students: data.content.content
                }, () => {
                    console.log(`this.state.students`)
                    console.log(this.state.students)
                })

            })
            .catch((err) => {
                alert('error my group function name getData()\n\nerror mesage: ' + err)
            });

    }

    columns = [
        {
            title: 'First name',
            dataIndex: 'firstName'
        },
        {
            title: 'Last name',
            dataIndex: 'lastName'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Phone',
            dataIndex: 'phone'
        },
        {
            title: <div style={{display: "flex"}}>
                <div style={{margin: 5, color: "black"}}>Ball</div>
                <div style={{margin: 5, color: 'blue'}}>Max ball</div>
            </div>,
            dataIndex: 'phone',
            key: 'phone',
            render: () => <div
                style={{  width:'70px',      borderRadius:'3px',    border:'2px solid black',display: "flex"}}>
                <div style={{
                    borderRadius:'3px',
                    width: '40px',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: '40px',
                }}><p style={{fontSize: 30}}></p></div>
                <div style={{
                    width: '40px',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: '40px',
                    backgroundColor: '#000066'
                }}><p style={{fontSize: 30,color:'#ffffff'}}>10</p></div>
            </div>
        },
        {
            title: 'Homework',
            dataIndex: 'phone',
            key:'phone',
            render:() => <div>
                Homework
            </div>
        },
        {
            title: 'Evaluation',
            dataIndex: 'phone',
            key:'phone',
            render:() => <div>
                Evaluation
            </div>
        }
    ]


    renderContent = () => {
        if (this.state.students.length > 0) return <Table columns={this.columns} dataSource={[...this.state.students]}/>
        else return <StudentNotFound setKey={this.props.setKey}/>
    }

    render() {

        const handleChange = (value) => {
            let s = this.state.selectExample.filter((a) => a.value === value)

            this.setState({
                filePath: {
                    url: s[0].filePath,
                    name: s[0].word
                }
            })
        };

        return (
            <Fragment>
                <div>
                    <h1 style={{
                        textAlign:"center"
                    }}>{this.props.group.name}</h1>
                </div>
                <div style={{
                    display: "flex",
                    width: '100%',
                    justifyContent: "space-evenly",
                    margin:'50px'
                }}>
                    <Select defaultValue={this.state.selectExample[this.state.selectExample.length - 1].value}
                            onChange={handleChange}>
                        {
                            this.state.selectExample.map((a) => (<Option value={a.value}>{a.word}</Option>))
                        }
                    </Select>
                    <div style={{
                        display: "flex"
                    }}>
                        <Input readOnly value={'Deadline'}/>
                        <Input readOnly value={'Max ball'}/>
                    </div>
                    <Button style={{width: '100px'}}>
                        <a href={this.state.filePath.url} download>
                            {this.state.filePath.name}
                        </a>
                    </Button>


                </div>
                {this.renderContent()}
                <div style={{
                    display:'flex',
                    justifyContent:'space-around',
                    width:'700px',
                    margin:'0 auto'
                }}>
                   <CreateTask/>

                    <Button onClick={()=>this.props.setKey(1,1)}>To back</Button>
                </div>
            </Fragment>
        );
    }
}

export default StudentOfGroup