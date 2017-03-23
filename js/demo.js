$(function(){
    $('.one').click(load_one);

    $('.two').click(load_two);

    $('.three').click(load_three);

//清空按钮
    $('.clear').click(function () {
        $('.content div').empty();
    });
//说明按钮
    $('.use').click(function () {
        $('pre').show(function(){
            $('body').click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                $('pre').hide();
                $(this).off('click');
            });
        });
    });
});

/* 写法一 */
function load_one(){
    $('.caption1').visible(false,function () {
        var _self = $(this);
        $.ajax({
            url:'data/data1.json',
            async:false,
            success: function (data) {
                var _html = '';
                for(var i = 0;i<data.length;i++){
                    _html += '<p>' + data[i] + '</p>';
                }
                _self.append(_html);
            }
        });
    });
    $('.caption2').visible(function () {
        var _self = $(this);
        $.ajax({
            url:'data/data2.json',
            async:false,
            success: function (data) {
                var _html = '';
                for(var i = 0;i<data.length;i++){
                    _html += '<p>' + data[i] + '</p>';
                }
                _self.append(_html);
            }
        });
    });
    $('.caption3').visible(function () {
        var _self = $(this);
        $.ajax({
            url:'data/data3.json',
            async:false,
            success: function (data) {
                var _html = '';
                for(var i = 0;i<data.length;i++){
                    _html += '<p>' + data[i] + '</p>';
                }
                _self.append(_html);
            }
        });
    });
}

/* 写法二 */
function load_two(){
    $.visible(['.caption1','.caption2','.caption3'], function () {
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
        }
        $.ajax({
            url:_url,
            async:false,
            success: function (data) {
                var _html = '';
                for(var i = 0;i<data.length;i++){
                    _html += '<p>' + data[i] + '</p>';
                }
                _self.append(_html);
            }
        });
    });
}

/* 写法三 */
function load_three(){
    var page = 1;
    var totalPage = 3;
    $.visible(['.container .captionAll'],'top',function(){
        $ajax(this);
    });
    $.visible(['.container .captionAll'],'bottom',function(){
        page ++;
        if( page <= totalPage ){
            $ajax(this);
        }
    });
    function $ajax(obj){
        var _self = $(obj);
        $.ajax({
            url:'data/data' + page + '.json',
            async:false,
            success: function (data) {
                var _html = '';
                for(var i = 0;i<data.length;i++){
                    _html += '<p>' + data[i] + '</p>';
                }
                _self.append(_html);
            }
        });
    }
}