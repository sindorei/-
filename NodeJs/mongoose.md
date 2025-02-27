# MongoDB
- 一个开源的NoSQL数据库，相比MySQL那样的关系型数据库，它更显得轻巧、灵活，非常适合在数据规模很大、事务性不强的场合下使用。同时它也是一个对象数据库，没有表、行等概念，也没有固定的模式和结构，所有的数据以文档的形式存储(文档，就是一个关联数组式的对象，它的内部由属性组成，一个属性对应的值可能是一个数、字符串、日期、数组，甚至是一个嵌套的文档。)，数据格式就是JSON。

# Mongoose
- Mongoose是MongoDB的一个对象模型工具，是基于node-mongodb-native开发的MongoDB nodejs驱动，可以在异步的环境下执行。同时它也是针对MongoDB操作的一个对象模型库，封装了MongoDB对文档的的一些增删改查等常用方法，让NodeJS操作Mongodb数据库变得更加灵活简单。

- 安装
```npm
npm install moongoose

```

- 引用
```javascript
var mongoose = require('mongoose');
```

- 连接数据库
```javascript
var db = mongoose.connect('mongodb://user:pass@localhost:port/database');
```

- 文档
    * 是MongoDB的核心概念，是键值对的一个有序集，在JavaScript里文档被表示成对象。同时它也是MongoDB中数据的基本单元，非常类似于关系型数据库管理系统中的行，但更具表现力。
- 集合
    * 由一组文档组成，如果将MongoDB中的一个文档比喻成关系型数据库中的一行，那么一个集合就相当于一张表。

## Schema
-  一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力，仅仅只是数据库模型在程序片段中的一种表现，可以说是数据属性模型(传统意义的表结构)，又或着是“集合”的模型骨架。
- 基本类型
    * 字符串
    * 日期型
    * 数值型
    * 布尔型
    * null
    * 数组
    * 内嵌文档

```javascript
var mongoose = require("mongoose");
var tschema = new mongoose.Schema({
	  name  : { type:String },
	  age   : { type:Number, default:18 },
	  gender: { type: Boolean, default: true }
});

```

## Model
- 由Schema构造生成的模型，除了Schema定义的数据库骨架以外，还具有数据库操作的行为，类似于管理数据库属性、行为的类。
- 建一个Model模型，我们需要指定：
    * 1.集合名称
    * 2.集合的Schema结构对象

```javascript
var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
var tmodel= db.model("tdoc", tschema);
```
## Entity
- 由Model创建的实体，使用save方法保存数据，Model和Entity都有能影响数据库的操作，但Model比Entity更具操作性

```javascript
var TestEntity = new TestModel({
	name : "哈斯卡",
    age : 24,
    email : "hsk@qq.com"
});

console.log(TestEntity.name)
```

```javascript
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1:27017/test');
var TestSchema = new mongoose.Schema({
	name: { type: String },
    age : { type: Number, default:0 },
    email : { type: String },
    time : { type: Date , default: Date.now }
});

var TestModel = db.model("test1" , TestSchema);
var TestEntity = new TestModel({
	name : "哈斯卡",
    age : 24,
    email: "hsk@qq.com"
});
TestEntity.save(function( error , doc ) {
	if(error) {
        console.log("error:" + error);
    } else {
        console.log(doc);
    }
});
```

## 查询
- find 查询
    * obj.find(查询条件,callback);
    * 返回符合条件一个、多个或者空数组文档结果。
    * 属性过滤 find(Conditions,field,callback);
        * 只需要把显示的属性设置为大于零的数就可以
        * \_id是默认返回，如果不要显示加上("\_id":0)，但是，对其他不需要显示的属性且不是\_id，如果设置为0的话将会抛异常或查询无果
- findOne
    * findOne(Conditions,callback);
    * 当查询到即一个符合条件的数据时，将停止继续查询，并返回查询结果
- findeById
    * findById(\_id, callback);
    * 只接收文档的_id作为参数，返回单个文档。

```javascript
Model.find({},function(error,docs){
   //若没有向find传递参数，默认的是显示所有文档
});
```

## 保存
- Model 保存方法
    * Model.create(文档数据, callback))
```javascript
Model.create({ name:"model_create", age:26}, function(error,doc){
    if(error) {
        console.log(error);
    } else {
        console.log(doc);
    }
});
```
- Entity 保存方法
    *  Entity.save(文档数据, callback))

## 更新
- obj.update(查询条件,更新对象,callback);

## 删除数据
- obj.remove(查询条件,callback);

## 条件查询
- $lt 小于
- $lte 小于等于
- $gt 大于
- $gte 大于等于
- $ne 不等于
- $in 可单值和多个值的匹配
- $or 查询多个键值的任意给定值
- $exists 表示是否存在
```javascript
TestModel.find({email:{$exists:true}},function(error,docs){
	console.log(docs)
})
```
- $all

## 游标

数据库使用游标返回find的执行结果。客户端对游标的实现通常能够对最终结果进行有效的控制。可以限制结果的数量，略过部分结果，根据任意键按任意顺序的组合对结果进行各种排序，或者是执行其他一些强的操作。

- limit 显示数量
    * find(Conditions,fields,options,callback);
- skip
    * 略过指定数量的匹配结果，返回余下的查询结果
    * find(Conditions,fields,options,callback);
```javascript
TestModel.find({age:27},null,{skip:1},function(err,docs){
	console.log(docs);
})
```
- sort
    * 该函数的参数是一个或多个键/值对，键代表要排序的键名，值代表排序的方向，1是升序，-1是降序。
```javascript
TestModel.find({},{name:1,age:1,_id:0},{sort:{age:1}},function(err,docs) {
	console.log(docs);
});
```

## ObjectId 类型

存储在mongodb集合中的每个文档（document）都有一个默认的主键_id，这个主键名称是固定的，它可以是mongodb支持的任何数据类型，默认是ObjectId。该类型的值由系统自己生成，从某种意义上几乎不会重复，生成过程比较复杂，有兴趣的朋友可以查看源码。

ObjectId是一个12字节的 JSON 类型字符串。

- 4字节：UNIX时间戳
- 3字节：表示运行MongoDB的机器
- 2字节：表示生成此_id的进程
- 3字节：由一个随机数开始的计数器生成的值

### Schema 先定义，再通过add方法添加属性
### Schema下创建实例方法（通过method方法）
```javascript
var mongoose = require('mongoose');

var saySchema = new mongoose.Schema({name : String});

saySchema.method('say', function () {
  console.log('Trouble Is A Friend');
})

var say = mongoose.model('say', saySchema);

var lenka = new say();

lenka.say(); //Trouble Is A Friend
```

## Schema静态方法
```javascript
var mongoose = require("mongoose");

var db = mongoose.connect("mongodb://127.0.0.1:27017/test");

var TestSchema = new mongoose.Schema({
    name : { type:String },
    age  : { type:Number, default:0 },
    email: { type:String, default:"" },
    time : { type:Date, default:Date.now }
});

TestSchema.static('findByName', function (name, callback) {
    return this.find({ name: name }, callback);
});

var TestModel = db.model("test1", TestSchema );

TestModel.findByName('tom', function (err, docs) {
 //docs所有名字叫tom的文档结果集
});
```

## Schema追加方法
```javascript
var mongoose = require("mongoose");

var db = mongoose.connect("mongodb://127.0.0.1:27017/test");

var TestSchema = new mongoose.Schema({
    name : { type:String },
    age  : { type:Number, default:0 },
    email: { type:String, default:"" },
    time : { type:Date, default:Date.now }
});

TestSchema.methods.speak = function(){
  console.log('我的名字叫'+this.name);
}

var TestModel = db.model('test1',TestSchema);

var TestEntity = new TestModel({name:'Lenka'});

TestEntity.speak();//我的名字叫Lenka
```
