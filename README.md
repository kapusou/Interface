# mydemo

使用方法：
引入相关模块，运行question.js即可

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