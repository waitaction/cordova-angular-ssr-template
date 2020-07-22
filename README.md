# 统一平台

一套代码，可以运行在浏览器（服务端渲染）、浏览器（客户端渲染）、安卓、苹果、window 桌面应用 、mac os 桌面应用 、linux 桌面应用。

## 开发环境要求

| 环境要求         |    版本号 |
|-----------------|---------:|
| cordova         |   ≥9.0.0 |
| cordova-browser |   ≥6.0.0 |
| cordova-android |   ≥8.1.0 |
| cordova-ios     |   ≥5.1.1 |
| angular         |   ≥9.1.6 |
| npm             |  ≥6.12.1 |
| node            | ≥12.13.0 |
| vscode          |    最新版 |

## 构建命令

| 命令                      | 描述                                                             |
|---------------------------|------------------------------------------------------------------|
| npm run start:browser:dev | 调试浏览器, 建议使用PowerShell命令窗口，较稳定(服务端调试需在vscode打断点) |
| npm run build:browser     | 编译可发布的浏览器应用                                              |
| npm run start:android:dev | 调试安卓应用(需使用真机)                                            |
| npm run build:android     | 编译安卓应用                                                       |
| npm run start:ios:dev     | 调试苹果应用                                                       |
| npm run build:ios         | 编译苹果应用(需配置开发者签名)                                       |
| npm run build:nswag       | 生成后端api接口的代理类                                             |

### 如何调试

开发功能时，为了更快的开发速度，使用下面的命令调试，这是纯客户端渲染的方式

``` bash
ng serve --open
```

功能开发完成后，可以使用下面的命令进行调试，这是使用服务端渲染的方式

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

