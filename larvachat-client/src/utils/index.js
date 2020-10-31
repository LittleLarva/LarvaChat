/*
包含n个工具函数的模块
 */

/*
用户主界面路由
    student:/student
    teacher:/teacher
用户信息完善界面路由
    student:/studentinfo
    teacher:/teacherinfo
判断是否已经完善信息？ user.header是否有值
判断用户类型：user.type
 */
//返回对应的路由路径
export function getRedirectTo(type, header){
    let path = ''
    //type
    if(type === 'teacher'){
        path = '/teacher'
    }else{
        path = '/student'
    }
    //header
    if (!header){//没有值，返回信息完善界面的path
        path += 'info'
    }
    return path
}