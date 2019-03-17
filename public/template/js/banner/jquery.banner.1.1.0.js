;(function($){
    "use strict";

    $.extend($.fn,{
        banner:function(options){
            // 1.手动创建对象，保存将来的属性和方法
            this.LOCAL = {
                // 2.将参数解析到对象上
                autoPlay : options.autoPlay === false ? false : true,
                delayTime : options.delayTime || 3000,
                moveTime : options.moveTime || 300,
                // 6-1.设置当前索引
                index : 0,    //index在list功能中表示上一张，在btn功能中表示当前
                iPrev : options.items.length-1,  //在list中没用，在btn中表示上一张

                // 14.设置初始开关，用来记录是否有list
                listOnoff:false,
            };

            var that = this;
            // 3.判断options.list是否被传入，决定是否执行对应功能
            if(options.list != undefined && options.list.length > 0){
                options.list.eq(0).css("background","red")

                // 15.如果有list，改变开关状态
                this.LOCAL.listOnoff = true;

                // 7.封装运动函数：
                // 参数i，表示当前点击的索引；参数type表示当前点击的方向
                this.LOCAL.listMove = function(i,type){
                    //所有图片：选择器1
                    options.items
                    // 当前要走的：选择器2
                    .eq(that.LOCAL.index)
                    // 设置要走的初始位置
                    .css({left:0})
                    // 准备动画
                    .stop().animate({
                        // 走到左边一张图片的宽度的位置
                        left:-options.items.eq(0).width() * type
                    },that.LOCAL.moveTime)
                    // 结束当前选择器的使用，回到上一个选择器1
                    .end()
                    // 当前要进来的：选择器3
                    .eq(i)
                    // 设置要进来的初始位置
                    .css({left:options.items.eq(0).width() * type})
                    // 准备动画
                    .stop().animate({
                        // 走到0的位置
                        left:0
                    },that.LOCAL.moveTime)
                }
                // 4.给list绑定事件
                options.list.on("click",function(){
                    // 5-1.判断左
                    if(that.LOCAL.index < $(this).index()){
                        that.LOCAL.listMove($(this).index(),1)
                    }
                    // 5-2.判断右
                    if(that.LOCAL.index > $(this).index()){
                        that.LOCAL.listMove($(this).index(),-1)
                    }
                    // 5-3.判断不动
                    // if(that.LOCAL.index == $(this).index()){
                    //     console.log("不动")
                    // }

                    // 6-2.点击之后，要修改当前索引
                    that.LOCAL.index = $(this).index();

                    // 8.修改list的当前项
                    options.list.css("background","").eq(that.LOCAL.index).css("background","red")
                    
                })
            }
            this.LOCAL.rightclick = function(){
                // 11-2.计算索引
                if(that.LOCAL.index == options.items.length-1){
                    that.LOCAL.index = 0;
                    that.LOCAL.iPrev = options.items.length - 1;
                }else{
                    that.LOCAL.index++;
                    that.LOCAL.iPrev = that.LOCAL.index - 1;
                }
                // 12-2.准备运动，同时使用参数决定方向
                that.LOCAL.btnMove(-1)
            }
            this.LOCAL.btnMove = function(type){
                // 13.开始运动：运动的过程请参考listMove的注释
                options.items.eq(that.LOCAL.iPrev).css({
                    left:0
                }).stop().animate({
                    left:options.items.eq(0).width() * type
                },that.LOCAL.moveTime).end().eq(that.LOCAL.index).css({
                    left:-options.items.eq(0).width() * type
                }).stop().animate({
                    left:0
                },that.LOCAL.moveTime)

                // 16.判断list开关的状态，决定是否执行当前项的设置
                if(that.LOCAL.listOnoff){
                    options.list.css("background","").eq(that.LOCAL.index).css("background","red")
                }
            }
            // 9.左右btn的功能：先判断是否传参
            if(options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0){
                // 10-1.绑定事件
                options.left.on("click",function(){
                    // 11-1.计算索引
                    if(that.LOCAL.index == 0){
                        that.LOCAL.index = options.items.length-1;
                        that.LOCAL.iPrev = 0;
                    }else{
                        that.LOCAL.index--;
                        that.LOCAL.iPrev = that.LOCAL.index + 1
                    }
                    // 12-1.准备运动，同时使用参数决定方向
                    that.LOCAL.btnMove(1)
                })
                // 10-2.绑定事件
                options.right.on("click",this.LOCAL.rightclick)
            }

            // 17.自动播放autoPlay功能：先判断是否需要自动播放
            if(this.LOCAL.autoPlay){
                // 18.开启计时器：为了不让自动播放的功能依赖按钮的功能，所以将右按钮的事件处理函数，单独封装到全局空间（this.LOCAL）（见11-2到16）,在此处的计时器中，执行这个全局函数（事件处理函数）
                this.LOCAL.timer = setInterval(this.LOCAL.rightclick, this.LOCAL.delayTime);

                // 19.鼠标进入离开事件：进入停止，离开继续
                this.hover(function(){
                    // console.log(that.LOCAL.timer)
                    clearInterval(that.LOCAL.timer)
                },function(){
                    that.LOCAL.timer = setInterval(that.LOCAL.rightclick, that.LOCAL.delayTime);
                })
            }

        }
    })

})(jQuery);