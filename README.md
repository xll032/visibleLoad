## 下拉后触发加载（visible-scroll-load）
##### 说明：本插件只判断是否下拉到元素底部 或 元素出现在可视范围内
* 可以用于PC端的下拉后获取容器内数据，或者移动端下拉到底部加载数据等功能
* 由于仅作判断是否满足条件后触发回调函数，回调函数自行编写，可以根据自己的需要设计效果
* 插件依赖jQuery使用

### 第一种用法 
#### 特点：只能传一个对象进行操作；可选择直接加载或者 obj 进入可视区加载
#### （1）不传参
```javascript
$('.obj').visible();
```
* 不传参数，返回 是否在可视区的 boolean值

#### （2）传参
```javascript
$('.obj').visible(boolean,function(){ });
```
* 对不同类名的容器是否进入可视区进行操作，回调函数可自行填写
* 函数中的 `this`指向 `.obj`
* 第一个参数为`boolean`类型，可选。 `true`：表示进入可视区加载数据；`false`：表示不管是否可视直接加载

### 第二种用法 
#### 特点：可传一个数组的对象进行操作；只能使用 obj 进入可视区加载
#### （1）含回调函数 
```javascript
$.visible(['#id','.class','name3',...],function(){ ... });
```
对不同类名的容器是否进入可视区进行操作，回调函数可自行填写
`this` 指向 当前进入可视区的 `name` 的对象
第一个参数为`Array`类型，必选。 可填写多个。只有一个的时候也要写成 `['name']`，否则无效

#### （2）不含回调函数
```javascript
$.visible(['Name1','className2',...]);
```
* 不传回调函数，返回 是否在可视区的 `boolean` 值。
* 按填写顺序返回一个数组，如 `[false,true,...]`。
* 若只传了一个 `['className1']`，直接返回 `true` 或者 `false`

### 第三种用法（新增）
#### 特点：元素拖动到到底部加载，用于移动端下拉加载列表
```javascript
$.visible(['.name1'],'bottom',function(){ ... });
```
多传入一个 `'bottom'` 参数即可

##### 注：到底部会自动加载， `bottom` 不能写错。填 `top` 或不填或随便填都默认（1、2）的用法	

下面是一个简单的示例：
#### 示例一：
```javascript
$('.caption1').visible(false,function () {
    var _self = $(this);
    $.ajax( ... );
});
```
#### 示例二： 
```javascript
$.visible(['.caption1','.caption2','.caption3'], function () {   //这里是类名
    var _self = $(this);//这里的this指向的是当前进入可视区的元素
    var _index = _self.index();
    var _url = '';
    switch (_index){
        case 0:
            _url = 'data/data1.json';
            break;
        case 1:
            _url = 'data/data2.json';
            break;
        case 2:
            _url = 'data/data3.json';
            break;
    }
    $.ajax();
});
```
