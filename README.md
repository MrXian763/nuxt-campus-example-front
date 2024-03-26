

<h2 align="center">大学生交流学习网</h2>



## 项目介绍

本项目是一个高校学生交流学习论坛

> 新式的信息交流的平台，帮助学生及时查阅校内实时信息，在此平台去获取或者发布自己的供需信息，学生也可以体验到当今发展迅速的人工智能AI科技。

Web 端使用 **Vue** + **ElementUi**。 后端使用  **SpringBoot** + **Mybatis-Plus**进行开发

- 接入AI智能聊天机器人，用户能跟AI聊天

- PC网页端完全响应式布局

  支持电脑、平板、手机等所有主流设备

  部分样式暂时建议PC访问，还没有进行完善更改、

### 使用到的技术

- 前端
  - Vue
  - ElementUI
  - JavaScript
  - HTML
  - CSS
- 后端
  - Java
  - Spring
  - SpringMVC
  - SpringBoot
  - Mybatis
  - Mybatis-Plus
  - Redis缓存
  - MySQL数据库



## 项目代码

|           | Gitee                                         |
| --------- | --------------------------------------------- |
| 后端      | <https://gitee.com/xianzhiyong763/jishe>      |
| 用户web端 | <https://gitee.com/xianzhiyong763/jisheuser>  |
| 管理web端 | <https://gitee.com/xianzhiyong763/jisheadmin> |



## 演示图

### 用户端

**主页**

![Snipaste_2024-03-25_20-06-02](imgs/Snipaste_2024-03-25_20-06-02.png)

**AI问答**

![Snipaste_2024-03-25_20-07-48](imgs/Snipaste_2024-03-25_20-07-48.png)

**用户个人主页**

![Snipaste_2024-03-25_20-10-18](imgs/Snipaste_2024-03-25_20-10-18.png)

**用户文内容管理**

![Snipaste_2024-03-25_20-10-58](imgs/Snipaste_2024-03-25_20-10-58.png)

**用户发布内容**

![Snipaste_2024-03-25_20-11-45](imgs/Snipaste_2024-03-25_20-11-45.png)

**用户登录**

![Snipaste_2024-03-25_20-12-43](imgs/Snipaste_2024-03-25_20-12-43.png)

**用户注册**

![Snipaste_2024-03-25_20-12-55](imgs/Snipaste_2024-03-25_20-12-55.png)

**用户找回密码**

![Snipaste_2024-03-25_20-13-06](imgs/Snipaste_2024-03-25_20-13-06.png)

### 管理端

**首页**

![Snipaste_2024-03-26_15-13-47](imgs/Snipaste_2024-03-26_15-13-47.png)

**登录**

![Snipaste_2024-03-26_15-16-30](imgs/Snipaste_2024-03-26_15-16-30.png)

**系统管理-用户管理**

![Snipaste_2024-03-26_15-13-58](imgs/Snipaste_2024-03-26_15-13-58.png)

**系统管理-角色管理**

![Snipaste_2024-03-26_15-14-09](imgs/Snipaste_2024-03-26_15-14-09.png)

**系统管理-菜单管理**

![Snipaste_2024-03-26_15-14-30](imgs/Snipaste_2024-03-26_15-14-30.png)

**系统管理-字典管理**

![Snipaste_2024-03-26_15-14-40](imgs/Snipaste_2024-03-26_15-14-40.png)

**系统管理-参数设置**

![Snipaste_2024-03-26_15-14-48](imgs/Snipaste_2024-03-26_15-14-48.png)

**系统管理-日志管理-操作日志**

![Snipaste_2024-03-26_15-14-58](imgs/Snipaste_2024-03-26_15-14-58.png)

**系统管理-日志管理-登录日志**

![Snipaste_2024-03-26_15-15-08](imgs/Snipaste_2024-03-26_15-15-08.png)

**学生论坛-内容管理**

![Snipaste_2024-03-26_15-15-20](imgs/Snipaste_2024-03-26_15-15-20.png)

**学生论坛-类别管理**

![Snipaste_2024-03-26_15-15-36](imgs/Snipaste_2024-03-26_15-15-36.png)

**学生论坛-标签管理**

![Snipaste_2024-03-26_15-15-50](imgs/Snipaste_2024-03-26_15-15-50.png)

**学生论坛-评论管理**

![Snipaste_2024-03-26_15-16-00](imgs/Snipaste_2024-03-26_15-16-00.png)

**个人中心**

![Snipaste_2024-03-26_15-16-18](imgs/Snipaste_2024-03-26_15-16-18.png)



## 运行项目

### 用户端、管理端

用户端进入到用户端的目录`nuxt_campus_example-master`，执行命令下载依赖，node使用的版本是16.16.0

```
npm install
```

启动项目

```
npm run dev
```

管理端进入到目录`vue_campus_admin`执行上面同样的操作即可

### 后端

进入Intellij IDEA 开发工具，将maven仓库地址和设置文件设置为自己的路径，在配置文件 MySQL 和 Redis 的账号密码内容设置为自己的，点击运行项目即可
