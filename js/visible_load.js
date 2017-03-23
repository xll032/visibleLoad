(function(){
    /*判断是否引入 jQuery ，没有做提示，后面不执行*/
    if(typeof jQuery == typeof void(0)){
        console.log('Method of "visible load" requires jQuery.');
        return false;
    }

    /*判断是否引用了 requirejs ，没有的话，也可以直接使用*/
    typeof define == typeof void(0) ?  (Vis(jQuery)) : (define(['jquery'],Vis));

    function Vis($) {
        (function ($) {
            /**
             *
             * @param option  boolean  true：进入可视区加载  false：直接加载  （该参数可传可不传，默认 true）
             * @param callback  function  回调函数，自己填写.不写返回 boolean 值，true 表示在可视区内， false 表示不再可视区内
             */
            jQuery.fn.visible = function (option, callback) {
                var _option = option;
                var _callback = '';
                var _self = this.eq(0);
                var flag = true;
                //无对象 直接返回
                if (_self.length === 0) {
                    return false;
                } else {
                    //无参数 返回位置信息
                    if (_option === '' || _option == void(0) || _option === undefined) {
                        return (_self.offset().top <= jQuery(document).scrollTop() + jQuery(window).height());  //////////////////////这里返回值不对!!!
                    }
                }
                if ((typeof option) == 'function') {
                    _option = true;//默认 true
                    _callback = option;
                } else {
                    _callback = callback;
                }
                var _operate = function () {
                    if (flag) {
                        if (_self.offset().top <= jQuery(document).scrollTop() + jQuery(window).height()) {
                            _callback.call(_self);
                            flag = false;
                        }
                    }
                };
                if (!_option) {
                    //直接加载
                    if (flag) {
                        _callback.call(_self);
                        flag = false;
                    }
                } else {
                    //进入可视区加载
                    _operate();
                    //滚动判断
                    jQuery(window).on('scroll', _operate);
                }
                return _self;
            };
            /**
             *      第二种使用方法  $.visible(['myClassName'],function(){ /回调函数/ });    此方法不支持 不在可视区内直接加载（第一种方法传参数false的功能）
             *      使用此方法需要给 需判断是否在可视区的元素  同样使用类名
             * @param option  Array  值：myClassName（自定义的名字），必填 如：['myClassName1','myClassName2']  一个也要这样写
             * @param callback  function  回调函数，自己填写，必填可不填
             * 注：若只有第一个参数，返回 是否在可视区内的boolean值     仅有回调函数，此函数什么也不做
             */
            jQuery.visible = function (option, place, callback) {
                //无参返回
                if (typeof option == 'function' || option === '' || option === undefined || option == void(0)) return false;
                var _self = [];
                var _place = place;
                var _callback = callback;
                var _dis = 50;//距离底部某个值就加载
                if (typeof option == 'object') {
                    //传入一个数组,此方法不能传字符串
                    var arr = [];
                    for (var i = 0; i < option.length; i++) {
                        _self.push(jQuery(option[i]));
                    }
                    if (_self.length === 0) {
                        return false;
                    } else {
                        for (var k = 0; k < _self.length; k++) {
                            arr.push(1);
                        }
                    }
                } else {
                    return false;
                }
                if (typeof place == 'string') {
                    if (place != 'bottom' && place != 'top') {
                        _place = 'top';
                    }
                } else {
                    _place = 'top';
                    if (typeof place == 'function') {
                        _callback = place;
                    }
                }
                //无回调函数 返回位置信息
                if ((_callback === '' || _callback == void(0) || _callback === undefined || typeof _callback != 'function')) {
                    if (_self.length > 1) {
                        var returnArr = [];
                        for (var t = 0; t < _self.length; t++) {
                            if (_place == 'top') {
                                returnArr.push(_self[t].offset().top <= $(document).scrollTop() + $(window).height());
                            } else {
                                returnArr.push(_self[o].offset().top + _self[o].height() < jQuery(window).height() + jQuery(document).scrollTop() + _dis);
                            }
                        }
                        return returnArr;
                    } else {
                        if (_place == 'top') {
                            return _self[0].offset().top <= $(document).scrollTop() + $(window).height();
                        } else {
                            return _self[o].offset().top + _self[o].height() < jQuery(window).height() + jQuery(document).scrollTop() + _dis;
                        }
                    }

                }
                var _operate = function () {
                    if (typeof _self == 'object') {
                        try {
                            for (var o = 0; o < _self.length; o++) {
                                if (arr[o]) {
                                    if (_place == 'top') {
                                        if (_self[o].offset().top <= ( jQuery(document).scrollTop() + jQuery(window).height())) {
                                            _callback.call(_self[o]);
                                            arr[o] = 0;
                                        }
                                    } else {
                                        ///////////////////////////////////////
                                        if (_self[o].offset().top + _self[o].height() < jQuery(window).height() + jQuery(document).scrollTop() + _dis) {
                                            _callback.call(_self[o]);
                                        } else {

                                        }
                                    }

                                }
                            }
                        } catch (e) {
                        }
                    }
                };
                //进入可视区加载
                _operate();
                //滚动判断
                jQuery(window).on('scroll', _operate);
            };
        })(jQuery);
    }
})();
