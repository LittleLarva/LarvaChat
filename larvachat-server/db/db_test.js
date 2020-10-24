/*
测试使用mongoose操作mongodb数据库
1.连 接 数 据 库
1.1. 引 入 mongoose
1.2. 连 接 指 定 数 据 库 (URL只 有 数 据 库 是 变 化 的 )
1.3.获 取 连 接 对 象
1.4.绑 定 连 接 完 成 的 监 听 ( 用 来 提 示 连 接 成 功 )
2.得 到 对 应 特 定 集 合 的 Model
2.1. 字 义 Schema( 描 述 文 档 结 构 )
2.2. 定 义 Model( 与 集 合 对 应 , 可 以 操 作 集 合 )
3. 通 过 Model 或 其 实 例 对 集 合 数 据 进 行 CRUD 操 作
3.1. 通 过 Model 实 例 的 save() 添 加 数 据
3.2. 通 过 Model 的 find()/findOne() 查 询 多 个 或 一 个 数 据
3.3. 通 过 Model 的 findByIdAndUpdate() 更 新 某 个 数 据
3.4. 通 过 Model 的 remove() 删 除 匹 配 的 数 据
 */
const md5 = require('blueimp-md5') //md5加密的函数
// 1.连接数据库
// 1.1. 引入 mongoose
const mongoose =  require('mongoose')
// 1.2. 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/larvachat_test')
// 1.3.获取连接对象
const conn = mongoose.connection
// 1.4.绑定连接完成的监听(用来提示连接成功)
conn.on('connected', function (){
    console.log('数据库连接成功！')
})

// 2.得到对应特定集合的Model
// 2.1.字义Schema(描述文档结构)
const userSchema = mongoose.Schema({//指定文档的结构：属性名/属性值的类型，是否是必须的，默认值
    username: {type: String, required: true}, //用户名
    password: {type: String, required: true}, //密码
    type: {type: String, required: true}, //用户类型:dashen/laoban
    header: {type: String}
})
// 2.2.定义Model(与集合对应,可以操作集合)
const UserModel = mongoose.model('user',userSchema)//集合名为users

// 3.通过Model或其实例对集合数据进行CRUD操作
// 3.1.通过Model实例的save()添加数据
function testSave(){
    //创建UserModel的实例
    const userModel = new UserModel({username:'Tom', password:md5('123'), type:'dashen'})
    //调用save（）保存
    userModel.save(function (error,user){
        console.log('save()', error, user)
    })
}
testSave()
// 3.2.通过Model的find()/findOne()查询多个或一个数据
function testFind() {
    //查询多个:得到的是包含所有匹配文档对象的数组，如果没有匹配的是[]
    UserModel.find(function (error, users) {
        console.log('find()', error, users)
    })
    //查询一个得到的是匹配的文档对象，如果没有匹配的就是null
    UserModel.findOne({_id:'5f8947bb4516e43c740feff9'}, function (error, users) {
        console.log('findOne()', error, users)
    })
}
//testFind()
// 3.3.通过Model的findByIdAndUpdate()更新某个数据
function testUpdate() {
    UserModel.findByIdAndUpdate({_id: '5f8947bb4516e43c740feff9'},
        {username:'Jack'}, function (error, oldUser) {
            console.log('findByIdAndUpdate', error, oldUser)
    })
}
// testUpdate()

// 3.4.通过Model的remove()删除匹配的数据
function testDelete() {
    UserModel.remove({_id: '5f8947bb4516e43c740feff9'}, function (error, doc) {
        console.log('remove()', error, doc)
    })
}
// testDelete()