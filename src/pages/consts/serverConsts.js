import React from "react";
import {GroupOutlined, UserOutlined} from "@ant-design/icons";

export const serverURL = "http://localhost:8080/api/";

export let getItems = (role) => {
    let items = [];
    if (role === "ROLE_TEACHER") {
        items = [
            {
                key: 1,
                icon: <GroupOutlined/>,
                label: <p>My groups</p>,
                visible: false
            },
            {
                key: 2,
                icon: <GroupOutlined/>,
                label: <p>Students of group</p>,
                visible: true
            },
            {
                key: undefined,
                icon: <GroupOutlined/>,
                label: <p>Not found</p>,
                visible: true
            }

        ]
    } else if (role === 'ROLE_ADMIN') {
        items = [
            {
                key: 1,
                icon: <GroupOutlined/>,
                label: <p>Courses</p>,
                visible: false
            }, {
                key: 2,
                icon: <GroupOutlined/>,
                label: <p>Groups</p>,
                visible: false
            }, {
                key: 3,
                icon: <UserOutlined/>,
                label: <p>Students</p>,
                visible: false
            }, {
                key: 4,
                icon: <UserOutlined/>,
                visible: false,
                label: <p>Teachers</p>
            }, {
                key: 5,
                icon: <UserOutlined/>,
                visible: true,
                label: <p>404 not found</p>
            }

        ]
    } else {
        items = []
    }
    return items
}
