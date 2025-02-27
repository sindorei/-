# 过滤器
## 模板中使用过滤器

| currentcy:'&yen;'

$watch $scopre的一个方法

监听值的变化

三个参数： 1.需要监听的变量，2.函数 3.true监听整体，false只能监听单值

函数的第一个参数新值，第二个参数变化之前的值

## 控制器中使用过滤器

用$filter服务
```javascript
$filter('uppercase')('hello')
```
## 自定义过滤器
模块下的`filter()`方法
```javascript
 angular.module('myTest',[]).filter('firstUpper',function(){
            return function(str,param){
              return str.charAt(0).toUpperCase()+str.substring(1);
            }
        }).controller('hehe',['$scope','$filter',function($scope,$filter){
            $scope.name = 'hello';
            $scope.name2 = 'world';
            $scope.name=$filter('firstUpper')($scope.name);
        }])
```

# ng-repeat 指令
## 扩展部分
* $index 索引
* $first 第一个返回true
* $middle 除了首尾都为true
* $last 
* $even
* $odd
* ng-repeat-start  用于兄弟节点重复指令
* ng-repeat-end

# 事件指令
* ng-click/dbclick
* ng-mousedown/up
* ng-mouseenter/leave
* ng-mousemove/over/out
* ng-keydown/up/press
* ng-focus/blur
* ng-submit
* ng-selected 下拉框被选中时，触发
* ng-change 输入框中数据发生改变时触发  配合`ng-model`
* ng-copy 
* ng-cut
* ng-paste

# input相关指令
* ng-disabled  为true 禁用
* ng-readonly 
* ng-checked  true选中状态 false 为选中状态
* ng-value 和原生value类似，但是在angularjs未解析前不显示

# 数据显示指令
* ng-bind
* ng-bind-template 支持多表达式
* ng-bind-html 需要引入ngSanitize模块
* ng-cloak 没解析完成display为none，解析完成变成block
* ng-non-bindable 不解析表达式

# 样式相关指令
* ng-class 
  
  `ng-class="{red:true,yellow:true}"`
  
* ng-style  `ng-style="{{mystyle}}"` `ng-style="{color:red,background:yellow}"`
* ng-href
* ng-src
* ng-attr-(suffix) 如：ng-attr-title

# DOM相关指令
* ng-show  true显示 false隐藏 实际就是设置css 的 display属性
* ng-hide
* ng-if   true添加标签，false删除标签
* ng-switch 
  * on
  * ng-switch-default
  * ng-switch-when
* ng-open  `<details></details>`默认打开状态

# 指令扩展
* ng-init 初始化操作指令  嵌套循环时，定义初始变量
* ng-include 引入模板
* ng-model
 * ng-model-options updateOn
* ng-controller
 * as 将构造函数实例化对象
 
 # 标签指令
 angular对一些原有html标签进行了扩展
* a 标签 阻止默认行为
* select  需配合 ng-options、ng-model 指令填写下拉项 
 * ng-options  for in
* textarea
* input
* form
 * novalidate 阻止表单的一些默认样式

# 表单验证
* $valid  表单验证通过为 true
* $invalid 表单验证失败为 true
* $pristine 原始值没修改过，true 
* $dirty 修改过，true
* $error 验证失败的验证信息

* type
 * email
 * number
 * url
* required 为空 true 


注意点：表单元素以 name的方式进行查找，且要写ng-model

# 自定义指令
angular.module
* contruoller
* run
* filter
* directive
 * restrict   约束的四种定义方式
   * E 标签指令
   * A 属性
   * C class
   * M 注释  `<!-- directive:hello -->` 要设置replace为true 模板替换所在注释位置
 * replace  模板是否可替换 
 * template
   - $templateCache.get()
 * templateUrl 指定外部的文件页面作为模板
 * scope 为true 独立作用域  {} 隔离作用域，里面可以定义属性
 * controller
 * link 回调函数 进行dom操作的
   * scope
   * element
   * attr
 * transclude 默认true  ng-transclude 让指令可嵌套
 * require 
   *  ^
   *  ?

 
 directive 方法 第一个参数 指令名称，第二个参数 回调函数
 ```javascript
 m1 = angular.module('myApp',[]).directive('hello',function(){
    return {
        restrict:'E', //可以组合使用，区分大小写
        template:'<div>hello angular</div>'
    };
 })
 ```
  指令名用驼峰命名，HTML中指令标签或属性可以用 ‘-’ 连接，如 myHello  --> my-hello
 
 绑定策略： @ 普通字符串  = 数据 & 函数
 
# 服务
* $scope
  * $watch
  * $apply
* $rootScope
* $timeout
* $interval
  * $interval.cancel()  清除定时器
* $filter
* $http
  * method
  * url
  * success
  * error
  
```javascript
  $http(
    {
        method:'GET',
        url:''
    }
  ).success().error()
  ```
  JSONP 需配合 JSON_CALLBACK
  
* $location
    * absUrl() 绝对地址
    * path() 路径，有参数为设置，无参数获取。
    * replace() 使path()添加的路径不添加加到历史记录
    * hash()  hash值
    * search() 查询字符串
    * url()
    * host()
    * port()
    * protocol()
* $cacheFactory 参数 缓存id 配置：设置缓存size {capacity:2}
  * put() 
  * remove()
* $log
  * log()
  * info()
  * warn()
  * error()
  * debug()
* $interpolate 差值服务
* $q
  * promise 的实现
  * defer()
  * resolve()
  * reject()
  * notify()
  * then()
  
# angularJs 的供应商
* 服务的相关初始配置操作
* config
  * provider
  * $interpolateProvider
   * startSymbol()
   * endSymbol()
  * $logProvider
   * debugEnabled()
  * $anchorScrollProvider
   * disableAutoScrolling()
   
# 自定义服务
factory() 
```javascript
m1.factory('myService',function{
    return {
        name:'return',
        show:function(){
        }
    }
})
```
provider()

factory 和provider()区别

* factory 定义的服务不能进行初始化操作

* provider 定义的服务是可配置的 需用 $get
  
  ```javascript
  m1.provider('myRandomNum',function{
    return {
        $get:function(){
            
        }
    }
  })
  ```
  


