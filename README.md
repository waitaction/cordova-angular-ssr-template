重构中...

# 全栈平台

 **一套框架，多种平台**
 **移动端 & 桌面端 & 服务端**

一套框架，可以编写*浏览器、安卓、苹果、桌面*以及*服务端应用*

> 桌面端支持window、mac、各种主流linux发行版

> 移动端支持android、iOS

> 服务端支持api接口

## 开发环境要求

| 环境要求        |   版本号 |
| --------------- | -------: |
| cordova         |   ≥9.0.0 |
| cordova-browser |   ≥6.0.0 |
| cordova-android |   ≥8.1.0 |
| cordova-ios     |   ≥5.1.1 |
| angular         |   ≥9.1.6 |
| npm             |  ≥6.12.1 |
| node            | ≥12.13.0 |
| vscode          |   最新版 |
| nestjs          |   ≥6.0.0 |

## 代码结构

| 目录     | 功能                                     | 访问方式                                                            |
| -------- | :--------------------------------------- | :------------------------------------------------------------------ |
| src      | 编写app的代码目录                        | `http://域名`                                                       |
| server   | 编写app接口的代码目录                    | `http://域名/api`                                                   |
| admin    | 编写`rbac权限系统`的代码目录(含ui、接口) | `http://域名/admin`                                                 |
| entities | mysql数据库表实体                        | `手动编写`                                                          |
| nswagger | app接口代理配置                          | 使用命令 `npm run nswag` 生成代理类，接口文档`http://域名/swagger/` |

> `rbac权限系统` ，是app的管理系统，例如我们要查看app的一些统计数据或者运维，对大众用户不可见

## 构建命令

| 命令                      | 描述                                 |
| ------------------------- | ------------------------------------ |
| npm run start:browser:dev | 调试浏览器, 调试接口需在vscode打断点 |
| npm run build:browser     | 编译可发布的浏览器应用               |
| npm run start:android:dev | 调试安卓应用(需使用真机)             |
| npm run build:android     | 编译安卓应用                         |
| npm run start:ios:dev     | 调试苹果应用                         |
| npm run build:ios         | 编译苹果应用(需配置开发者签名)       |

### 如何调试

浏览器端调试

``` bash
npm run start:browser:dev
```

如果需要查看安卓的执行情况，请将安卓手机连接开发机，并且已开启开发者模式，使用下面的命令

``` bash
npm run start:android:dev
```

### 客户端编译配置

> 根目录下 `build.json` 配置了android、iOS的编译配置，安卓签名与ios签名，请在 `build.json` 配置

`build.json` 的配置细节请参考 `cordova` 官网

[安卓编译配置官方参考文档](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html)

[iOS编译配置官方参考文档](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html)

[桌面应用编译配置官方参考文档](https://cordova.apache.org/docs/en/latest/guide/platforms/electron/index.html)