
# 康佳电商官网

#### 介绍
一个电气商品网站

#### 软件架构
使用nojs搭建后台管理系统，前端使用jq框架进行渲染


#### 安装教程

1. 线上使用网址：http://47.100.98.132
2. 本地运行：localhost：4000

#### 使用说明
前端：
1：index.html是首页，数据渲染在一楼右边那六张图，前两张图做了详情页。头部有登录，注册，注销，活动页在tab切换旁边。

2：denglu.html是登录页面，reg.html是注册页面。注册，登录之后会存储一条cookie。

3：index.html是首页楼层一楼第一张图

登录之后会存储一个cookie，不登录不能打开购物车，并且会直接跳转到首页点击登录。

后台：
1:打开http://47.100.98.132：4000/admin/进入到管理系统后台
2：需要先进行登录管理账号：user：admin password：admin
3：登陆后打开点击冰箱里的图片即可向前端的buy页面的商品列表推送商品。
4：点击加入购物车，会跳转到购物车页面