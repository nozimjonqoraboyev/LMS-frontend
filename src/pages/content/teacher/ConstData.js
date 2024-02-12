import {serverURL} from "../../../server/consts/serverConsts";

export const getMyGroupUrl = (teacherId, size, page) => {
    return `${serverURL}teacher/group/groups-of-teacher/${teacherId}?page=${page}&size=${size}`
}
export const getTeacherUrl = (username) => {
    return `${serverURL}teacher/user/get-user/` + username
}

export const getGroupStudents = (groupId) => {
    return `${serverURL}teacher/group/students-of-group/` + groupId;
}
export const uploadFileUrl = `${serverURL}teacher/upload`
export const teacherGroupSize = 8

