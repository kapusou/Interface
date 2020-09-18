# mydemo

使用方法：
引入相关模块，运行question.js即可
（日志中间功能还未完全实现）

demo 主要内容是写了三个接口：

1、
实现接⼝：GET /api/os_infos
接⼝说明：调⽤系统库，实现返回当前系统的信息。
接⼝数据格式为json
返回的数据格式为
{
 cpus:[]
 totalMem:Number,
 freeMem:Number,
 arch:String,
 platform:String,
 type:String
}


2、
实现接⼝：GET /api/file_info
参数说明：
filePath 读取的⽂件路径
接⼝说明：调⽤系统库读取⽂件，并将⽂件中的数据返回
接⼝数据格式为json
返回的数据格式为
{
 filePath:String,
 data:String
}

3、
实现接⼝：PUT /api/file_info
参数说明
filePath 读取的⽂件路径
overwrite 控制是否覆盖原有内容
body 为更新的数据内容
接⼝说明：调⽤系统库更新⽂件，并将更新后的数据返回
接⼝数据格式为json
返回的数据格式为
{
 filePath:String,
 data:String
}

4、
实现⼀个 express 中间件，实现⽇志打印功能

5、
使⽤ mongoose 创建⼀个名为 project 的 schema ,其结构为
 name: {
 index: true,
 type: String,
 type: String,
 required: '{PATH} is required!'
 },
 sortName: String, //简称
 description: String, //描述
 address: {
 state: String,
 province: String,
 city: String,
 area: String,
 road: String,
 },
 startAt: Date, //开⼯时间
 endAt: Date, //竣⼯⽇期
 
封装 CURD 接⼝，实现 创建 ， 更新 ， 获取 ， 删除 接⼝ 实现以下⽹络请求接⼝
POST /api/projects // 创建⼀条projects信息
GET /api/projects/:id // 获取指定id的project信息
PUT /api/projects/:id // 更新指定id的project信息
DELETE /api/projects/:id // 删除指定id的project信息
GET /api/projects // 获取所有projects信息

