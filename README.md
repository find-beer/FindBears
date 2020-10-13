# Setup Steps

1. 根目录下 yarn 安装相关依赖
2. iOS 目录下 pod install
3. 如果遇到无法debug的情况，可以相继执行
   npx react-native start --reset-cache

# 代码结构说明
1. src/assets 可能被用到的一些图片资源
2. src/components 可能可以被复用的一些控件封装
3. src/config 项目HOST地址
4. src/constants 存放项目中可能会用到的常量
5. src/page--> 
           account 存放用户登录注册等页面
           chat 存放聊天相关页面
           home 存放首页相关页面
           mine 存放我的相关页面
           shoulder 存放擦肩相关页面
           splash 闪屏页
5. src/utils 存放可能会用到的工具类          
6. src/App.js 启动入口类         
7. src/MainContainer.js 主容器，包含四个tab     
8. src/RootApp.js 存放路由，新增的页面需要在这里注册 


