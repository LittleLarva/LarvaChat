//注册路由组件
import React, {Component} from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie' //可以操作前端cookie的对象 set()/get()/remove()
import {Navbar} from 'antd-mobile'

import TeacherInfo from "../teacher-info/teacher-info";
import StudentInfo from "../student-info/student-info";
import Student from "../student/student";
import Teacher from "../teacher/teacher";
import Message from "../message/message";
import Personal from "../personal/personal";
import NotFound from "../../components/not-found/not-found";
import NavFooter from "../../components/nav-footer/nav-footer";
import Chat from "../chat/chat";

import {getRedirectTo} from '../../utils'
import {getUser} from  '../../redux/actions'
import {NavBar} from "antd-mobile";

class Main extends Component{

    //给组件对象添加属性
    navList = [
        {
            path: '/teacher', //路由路径
            component: Teacher,
            title: '学生列表',
            icon: 'student',
            text: '学生',
        },
        {
            path: '/student', //路由路径
            component: Student,
            title: '老师列表',
            icon: 'teacher',
            text: '老师',
        },
        {   path: '/message', //路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {   path: '/personal', //路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount() {
        //登陆过(cookie中有userid)，但还没有登陆（redux管理的user中没有_id），发请求获取对应的user
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if (userid && !_id){
            //发送异步请求，获取user
            this.props.getUser()
        }

    }

    render() {
        //读取cookie中的userid
        const userid = Cookies.get('userid')
        //如果没有，自动重定向到登陆界面
        if (!userid){
            return <Redirect to='/login'/>
        }
        //如果有，读取redux中的user状态
        const {user, unReadCount} = this.props
        //如果user有，没有_id，返回null（不做任何显示）
        if(!user._id){
            return null
        }else{
            //如果有_id，显示对应界面
            //如果请求根路径：根据user的type和header来计算出一个重定向的路由路径，并自动重定向
            let path = this.props.location.pathname
            if (path === '/'){
                //得到一个重定向的路径
                path = getRedirectTo(user.type, user.header)
                return <Redirect to={path}/>
            }
        }


        const {navList} = this
        const path = this.props.location.pathname
        const currentNav = navList.find(nav => nav.path === path)//得到当前的nav，可能没有

        if(currentNav){
            //决定哪个路由需要隐藏
            if (user.type === 'teacher'){
                //隐藏数组的第二个
                navList[1].hide = true
            }else{
                //隐藏数组的第二个
                navList[0].hide = true
            }
        }

        return(
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map((nav,index) => <Route path={nav.path} component={nav.component} key={index}/>)
                    }
                    <Route path='/teacherinfo' component={TeacherInfo}/>
                    <Route path='/studentinfo' component={StudentInfo}/>
                    <Route path='/chat/:userid' component={Chat}/>

                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/> : null}
            </div>
        )
    }

}

export default connect(
    state => ({user: state.user, unReadCount: state.chat.unReadCount}),
    {getUser}
)(Main)

/*
1.实现自动登陆：
    1).登陆过(cookie中有userid)，但还没有登陆（redux管理的user中没有_id），发请求获取对应的user
    2).如果cookie中没有userid，自动进入login界面
    3).判断redux管理的user中是否有_id，如果没有，暂时不做任何显示
    4).如果有，说明当前已经登陆，显示对应的界面
    5).如果请求根路径：根据user的type和header来计算出一个重定向的路由路径，并自动重定向
 */








