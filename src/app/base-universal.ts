 

import { makeStateKey, TransferState, Title } from '@angular/platform-browser';
import { Injector, PLATFORM_ID, APP_ID, NgZone } from '@angular/core';
import { isPlatformBrowser, isPlatformServer, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { CookieService, NgxRequest, NgxResponse } from '@gorniv/ngx-universal';
import { XMessageBoxService } from '@ng-nest/ui/message-box';
import { UniversalStorageService } from './core/universal-storage.service';
import { TemporaryStorage } from './core/temporary-storage.service';
export abstract class BaseUniversal {
    transferState: TransferState;
    platformId: any;
    appId: string;
    zone: NgZone;
    router: Router;
    activatedRoute: ActivatedRoute;
    isUniversal = false;
    titleService: Title;
    location: Location;
    cookieService: CookieService;
    isAuthenticated: boolean = false;
    temporaryStorage: TemporaryStorage;
    universalStorage: UniversalStorageService;
    messageBoxService: XMessageBoxService;
    ngxReq: NgxRequest;
    ngxRes: NgxResponse;
     
    /**
     * 页面标题
     */
    set title(value: string) {
        this.titleService.setTitle(value);
    }
    get title() {
        return this.titleService.getTitle();
    }
    /**
     * 是否浏览器运行
     */
    get isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    /**
     * 是否服务器运行
     */
    get isServer(): boolean {
        return isPlatformServer(this.platformId);
    }

    /**
     * 是否是微信浏览器
     */
    get isWechat(): boolean {
        if (this.isServer) {
            let userAgent = (this.ngxReq as any).headers["user-agent"];
            return userAgent.toLowerCase().indexOf("micromessenger") > 0 || userAgent.toLowerCase().indexOf("wechat") > 0;
        } else {
            return navigator.userAgent.toLowerCase().indexOf("micromessenger") > 0 || navigator.userAgent.toLowerCase().indexOf("wechat") > 0;
        }
    }

    /**
     * 是否是uc浏览器
     */
    get isUcBrowser(): boolean {
        return navigator.userAgent.toLowerCase().indexOf("ucbrowser") >= 0;
    }

    constructor(
        public injector: Injector) {
        this.transferState = injector.get(TransferState);
        this.platformId = injector.get(PLATFORM_ID);
        this.appId = injector.get(APP_ID);
        this.zone = injector.get(NgZone);
        this.activatedRoute = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.titleService = injector.get(Title);
        this.location = injector.get(Location);
        this.cookieService = injector.get(CookieService);
        this.temporaryStorage = injector.get(TemporaryStorage);
        this.universalStorage = injector.get(UniversalStorageService);
        this.messageBoxService = injector.get(XMessageBoxService);

        if (isPlatformServer(this.platformId)) {
            this.transferState.set(makeStateKey('isUniversal'), true);
        }
        this.isUniversal = this.transferState.get(makeStateKey("isUniversal"), false);
        if (this.isServer) {
            this.ngxReq = injector.get(NgxRequest);
            this.ngxRes = injector.get(NgxResponse);
        }

        
    }


     
    /**
     * 设置app的电池状态栏的背景颜色值
     * @param color 颜色值，如：#ffffff
     */
    setStatusBar(color: string) {
        if (this.isBrowser) {
            if (window.device && device.platform) {
                if (device.platform != 'browser') {
                    StatusBar.backgroundColorByHexString(color);
                }
            } else {
                document.addEventListener("deviceready", () => {
                    if (device.platform != 'browser') {
                        StatusBar.backgroundColorByHexString(color);
                    }
                }, false);
            }
        }
    }

    
}
