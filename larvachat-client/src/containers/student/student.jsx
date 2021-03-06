/*
大神主界面路由容器组件
 */
import React, {Component} from "react";
import {connect} from 'react-redux'
import {getUserList, getUser} from '../../redux/actions'

import UserList from "../../components/user-list/user-list";

class Student extends Component{

    componentDidMount() {
        //获取userList
        this.props.getUserList('teacher')
        //更新users状态
        this.props.getUser()
    }

    render() {
        return(
            <UserList userList={this.props.userList}/>
        )
    }
}

export default connect(
    state => ({userList: state.userList}),
    {getUserList, getUser}
)(Student)
