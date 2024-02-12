import React from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Avatar, Space} from 'antd';
import {userInfo} from "../../server/config/User";
import {menus} from "../../data/menus";
import {permissions} from "../../data/RolePermissions";
import {Link} from "react-router-dom";
import ReadCourse from "../content/admin/course/readCourse";
import ReadGroup from "../content/admin/group/readGroup";
import ReadTeacher from "../content/admin/teacher/readTeacher";
import ReadStudent from "../content/admin/student/readStudent";
import {getItems} from "../consts/serverConsts";
import NotFound from "../../notFound/NotFound";
import Teacher from "../content/teacher/Teacher";
import StudentOfGroup from "../content/teacher/StudentOfGroup";

const imagePath = `./farobiy.png`;

const {Header, Sider, Content} = Layout;


class Dashboard extends React.Component {
    state = {
        itemNumber: '1',
        collapsed: false,
        selectedKey: '1',
        visible: false,
        user: null,
        userRoles: [],
        items: [],
        group: null
    }

    getUserInfo = () => {

        userInfo().then(res => {
            if (res && res.data) {
                let dto = res.data;
                console.log(dto)
                // console.log(dto.data)
                this.setState({
                    user: dto.data,
                })
                if (dto.data) {
                    if (dto.data.roleName && dto.data) {
                        this.setState({
                            items: getItems(dto.data ? dto.data.roleName : '')
                        })
                    }
                } else {
                    alert('user mavjud emas')
                    this.setState({
                        items: []
                    })
                }
            }
        })

    }

    componentDidMount() {
        this.getUserInfo();
    }


    render() {
        const {user, userRoles, collapsed, selectedKey} = this.state;
        // const {
        //     token: {colorBgContainer, borderRadiusLG},
        // } = theme.useToken();


        const handleMenuClick = (item) => {
            this.setState({
                selectedKey: item.key,
                visible: true,
            })
        };

        const handleMenuHide = () => {
            this.setState({
                visible: false,
            })
        };
        const makeMenus = () => {
            const {userRoles} = this.state;

            return menus
                .filter(menu =>
                    permissions.some(p => userRoles.includes(p.role_name) && p.links.includes(menu.link))
                )
                .map(menu => (
                    <Menu.Item key={menu.link} icon={menu.icon}>
                        <Link to={menu.link}>{menu.title}</Link>
                    </Menu.Item>
                ));
        };
        const onClick = (e) => {
            this.setState({
                itemNumber: e.key
            })
        }

        /////////////set key ni men qoshdim //////zafar
        const setKey = (group, key) => {
            if (group  !== null && group !== undefined && group ) {
                this.setState({
                    itemNumber: key ? key : '2',
                    group: group
                })
            }
        }


        /////////////group id ni men qoshdim //////zafar
        const renderContent = (group) => {
            if (this.state.user) {
                if (this.state.user.roleName) {
                    let role = this.state.user.roleName
                    if (role === 'ROLE_TEACHER') {

                        // let itemKey = this.state.itemKey
                        if (this.state.itemNumber) {
                            if (this.state.itemNumber == 1) return <Teacher setKey={setKey} teacher={this.state.user}/>
                            else if (this.state.itemNumber == 2)
                                return   <StudentOfGroup
                                setKey={setKey}
                                group={group}
                            />
                            // else if (this.state.itemNumber == 3) return <ReadStudent/>
                        }
                    } else if (role === 'ROLE_ADMIN') {
                        if (this.state.itemNumber) {
                            if (this.state.itemNumber == 1) return <ReadCourse/>
                            else if (this.state.itemNumber == 2) return <ReadGroup/>
                            else if (this.state.itemNumber == 3) return <ReadStudent/>
                            else if (this.state.itemNumber == 4) return <ReadTeacher/>
                            // else if (this.state.itemNumber == 5) return <ReadStudent/>
                        }
                    }
                }
            }
            return <NotFound setKey={setKey}/>;
        };

        return (

            <Layout style={{minHeight: '100%'}}>

                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <Space direction="vertical" size={16}>
                        <Space
                            onClick={() => window.location.href = "/"}
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                                flexDirection: "column",
                                paddingTop: '10%'
                            }}
                            wrap size={16}>
                            <Avatar style={{
                                width: '100%'
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
                            <h5
                                style={{
                                    color: 'white',
                                }}>{collapsed ? 'LMS' : 'Learning Management System'}
                            </h5>
                            <h2
                                style={{
                                    color: 'white',
                                }}>
                                {
                                    collapsed ? `${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}` :
                                    `${user?.firstName} ${user?.lastName}`
                                }
                            </h2>
                            <h2
                                style={{
                                    color: 'white',
                                }}> {collapsed ? '' : user?.roleName}
                            </h2>
                        </Space>

                    </Space>
                    <div className="demo-logo-vertical"/>

                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={this.state.itemNumber}
                        onSelect={handleMenuClick}
                        onClick={(e) => {
                            onClick(e)
                        }}
                        items={this.state.items.filter((item) => !item.visible)}
                    >
                        {makeMenus()}
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
                        {renderContent(this.state.group)}
                        {/*{selectedKey === '1' && <ReadCourse onHide={handleMenuHide}/>}*/}
                        {/*{selectedKey === '2' && <ReadGroup onHide={handleMenuHide}/>}*/}
                        {/*{selectedKey === '3' && <ReadTeacher onHide={handleMenuHide}/>}*/}
                        {/*{selectedKey === '4' && <ReadStudent onHide={handleMenuHide}/>}*/}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Dashboard;
