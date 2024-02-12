import React from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, Avatar, Space} from 'antd';
import {userInfo} from "../../server/config/User";
import ReadCourse from "../content/admin/course/readCourse";
import ReadGroup from "../content/admin/group/readGroup";
import ReadTeacher from "../content/admin/teacher/readTeacher";
import ReadStudent from "../content/admin/student/readStudent";
import Teacher from "../content/teacher/Teacher";
import StudentOfGroup from "../content/teacher/StudentOfGroup";
import {getItems} from "../../server/consts/serverConsts";
import NotFound from "../not_found/NotFound";
import GroupsOfStudent from "../content/student/GroupsOfStudent";


const imagePath = `./farobiy.png`;

const {Header, Sider, Content} = Layout;


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemNumber: '1',
            collapsed: false,
            selectedKey: '1',
            visible: false,
            user: null,
            userRoles: [],
            items: [],
            group: null
        }
        this.getUserInfo();
    }

    getUserInfo = () => {

        userInfo().then(res => {
            if (res && res.data) {
                let dto = res.data;
                this.setState({
                    user: dto.data,
                    items: getItems(dto.data ? dto.data.roleName : ''),
                });
                console.log(dto.data);
            } else {
                alert('user mavjud emas');
            }
        })

    }


    renderContent = () => {
        const {user, itemNumber} = this.state;
        if (user) {
            let role = user.roleName;
            if (role === 'ROLE_TEACHER') {
                if (itemNumber === '1') return <Teacher/>
            } else if (role === 'ROLE_ADMIN') {
                switch (itemNumber) {
                    case '1':
                        return <ReadCourse/>
                    case '2':
                        return <ReadGroup/>
                    case '3':
                        return <ReadStudent/>
                    case '4':
                        return <ReadTeacher/>
                    default:
                        return <NotFound/>
                }
            } else if (role === 'ROLE_STUDENT') {
                switch (itemNumber) {
                    case '1':
                        return <GroupsOfStudent/>;
                    default:
                        return <NotFound/>
                }
            } else {
                return <NotFound/>;
            }
        }
    };


    handleMenuClick = (item) => {
        this.setState({
            selectedKey: item.key,
            visible: true,
        })
    };

    handleMenuHide = () => {
        this.setState({
            visible: false,
        })
    };

    onClick = (e) => {
        this.setState({
            itemNumber: e.key,
        })
    }


    render() {
        const {user, collapsed} = this.state;

        // const handleMenuClick = (item) => {
        //     this.setState({
        //         selectedKey: item.key,
        //         visible: true,
        //     })
        // };
        //
        // const handleMenuHide = () => {
        //     this.setState({
        //         visible: false,
        //     })
        // };
        //
        // const onClick = (e) => {
        //     this.setState({
        //         itemNumber: e.key
        //     })
        // }
        //
        // const setKey = (group, key) => {
        //     if (group !== null && group !== undefined && group) {
        //         this.setState({
        //             itemNumber: key ? key : '2',
        //             group: group
        //         })
        //     }
        // }
        //
        //
        /////////////group id ni men qoshdim //////zafar
        // const renderContent = (group) => {
        //     if (this.state.user) {
        //         if (this.state.user.roleName) {
        //             let role = this.state.user.roleName
        //             if (role === 'ROLE_TEACHER') {
        //
        //                 // let itemKey = this.state.itemKey
        //                 if (this.state.itemNumber) {
        //                     if (this.state.itemNumber == 1) return <Teacher setKey={setKey} teacher={this.state.user}/>
        //                     else if (this.state.itemNumber == 2)
        //                         return <StudentOfGroup
        //                             setKey={setKey}
        //                             group={group}
        //                         />
        //                     // else if (this.state.itemNumber == 3) return <ReadStudent/>
        //                 }
        //             } else if (role === 'ROLE_ADMIN') {
        //                 if (this.state.itemNumber) {
        //                     if (this.state.itemNumber == 1) return <ReadCourse/>
        //                     else if (this.state.itemNumber == 2) return <ReadGroup/>
        //                     else if (this.state.itemNumber == 3) return <ReadStudent/>
        //                     else if (this.state.itemNumber == 4) return <ReadTeacher/>
        //                     // else if (this.state.itemNumber == 5) return <ReadStudent/>
        //                 }
        //             }
        //         }
        //     }
        //     return <NotFound setKey={setKey}/>;
        // };

        return (

            <Layout style={{minHeight: '100vh'}}>

                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <Space direction="vertical" size={16}>
                        <Space
                            // onClick={() => window.location.href = "/"}
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                                flexDirection: "column",
                                paddingTop: '10%',
                                height: '100%',
                            }}
                            wrap size={16}>
                            <Avatar style={{
                                width: '100%',
                                alignItems: "center",
                            }} size={64} icon={collapsed ?
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    src={imagePath}
                                    alt=""/>
                                : <img
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    src={imagePath}
                                    alt="Farobiy logo"/>
                            }/>
                            <h2
                                style={{
                                    color: 'white',
                                    textAlign: "center",
                                    float: "center",
                                }}>
                                {
                                    collapsed ? `${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}` :
                                        `${user?.firstName} ${user?.lastName}`
                                }
                            </h2>
                            <h2
                                style={{
                                    color: 'white',
                                    textAlign: "center",
                                    float: "center",
                                }}> {collapsed ? '' : user?.roleName}
                            </h2>
                        </Space>

                    </Space>
                    <div className="demo-logo-vertical"/>

                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[this.state.itemNumber]}
                        onSelect={this.handleMenuClick}
                        onClick={(e) => {
                            this.onClick(e)
                        }}
                        items={this.state.items}
                    >
                    </Menu>
                </Sider>
                <Layout style={{minHeight: '100%'}}>
                    <Header
                        style={{
                            padding: 0,
                            background: '#ffffff',
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => this.setState({collapsed: !collapsed})}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>


                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: '#ffffff',
                            borderRadius: 8,
                        }}
                    >
                        {this.renderContent()}
                        {/*{renderContent(this.state.group)}*/}
                    </Content>
                    {/*<Routes*/}
                    {/*    style={{*/}
                    {/*        margin: '24px 16px',*/}
                    {/*        padding: 24,*/}
                    {/*        minHeight: 280,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {routesData.map((value) => (*/}
                    {/*        <Route*/}
                    {/*            path={value.path}*/}
                    {/*            element={value.component}*/}
                    {/*            key={value.path}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                    {/*    /!*<Route path="*" element={<NotFound/>}/>*!/*/}
                    {/*</Routes>*/}
                </Layout>
            </Layout>
        );
    }
}

export default Dashboard;