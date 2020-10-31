/*
老板信息完善的路由容器组件
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'

import {updateUser} from '../../redux/actions'

class TeacherInfo extends Component{

    state = {
        header: '',
        post: '',
        info: '',
        laboratory: '',
        salary: '',
    }

    //更新header状态
    setHeader = (header) => {
        this.setState({
            header
        })
    }

    handleChange =(name, value) => {
        this.setState({
            [name]: value
        })
    }

    save = () => {
        this.props.updateUser(this.state)
    }

    render() {
        //如果信息已经完善，自动重定向到对应的主界面
        const {header, type} = this.props.user
        if (header){//说明信息已经完善
            const path = type === 'student' ? '/student' : '/teacher'
            return <Redirect to={path}/>
        }

        return(
            <div>
                <NavBar>老师信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder='请输入实习岗位' onChange={val => {this.handleChange('post', val)}}>实习岗位：</InputItem>
                <InputItem placeholder='请输入实验室名称' onChange={val => {this.handleChange('laboratory', val)}}>实验室名称：</InputItem>
                <InputItem placeholder='请输入实习薪资' onChange={val => {this.handleChange('salary', val)}}>实习薪资：</InputItem>
                <TextareaItem title='岗位要求：'
                              rows={3} onChange={val => {this.handleChange('info', val)}}/>
                <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(TeacherInfo)






























