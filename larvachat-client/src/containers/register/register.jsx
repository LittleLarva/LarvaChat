//注册路由组件
import React, {Component} from "react";
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {register} from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Register extends Component{
    state = {
        username: '', //用户名
        password: '', //密码
        password2: '', //确认密码
        type: 'teacher', //用户类型名称 student/teacher
    }
    register = () => {
        this.props.register(this.state)
    }

    handleChange = (name, val) => {
        //更新状态
        this.setState({
            [name]: val  //属性名不是name，而是name的值
        })
    }

    toLogin = () => {
        this.props.history.replace('/login')
    }


    render() {
        const {type} = this.state
        const {msg, redirectTo} = this.props.user
        //如果redirectTo有值，就需要重定向到指定的路由
        if (redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return(
            <div>
                <NavBar>校&nbsp;园&nbsp;实&nbsp;习&nbsp;招&nbsp;聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div> : null}
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username', val)}}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type="password" onChange={val => {this.handleChange('password', val)}}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入确认密码' type="password" onChange={val => {this.handleChange('password2', val)}}>确认密码：</InputItem>
                        <ListItem>
                            <span>用户类型：</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='student'} onChange={() => this.handleChange('type', 'student')}>学生</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='teacher'} onChange={() => this.handleChange('type', 'teacher')}>老师</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }

}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)