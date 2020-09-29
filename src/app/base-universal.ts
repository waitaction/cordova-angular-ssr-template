import { makeStateKey, TransferState, Title } from '@angular/platform-browser';
import { Injector, PLATFORM_ID, APP_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { CookieService, NgxRequest, NgxResponse } from '@gorniv/ngx-universal';

export abstract class BaseUniversal {
    transferState: TransferState;
    platformId: any;
    appId: string;
    titleService: Title;
    cookie: CookieService;
    ngxReq: NgxRequest;
    ngxRes: NgxResponse;

    /**
     * 是否是universal应用
     */
    isUniversal = false;

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
     * 是否客户端运行
     */
    get isClient(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    /**
     * 是否服务器运行
     */
    get isServer(): boolean {
        return isPlatformServer(this.platformId);
    }

    constructor(
        public injector: Injector) {
        this.transferState = injector.get(TransferState);
        this.platformId = injector.get(PLATFORM_ID);
        this.appId = injector.get(APP_ID);
        this.titleService = injector.get(Title);
        this.cookie = injector.get(CookieService);

        if (isPlatformServer(this.platformId)) {
            this.transferState.set(makeStateKey('isUniversal'), true);
        }
        this.isUniversal = this.transferState.get(makeStateKey("isUniversal"), false);
        if (this.isServer) {
            this.ngxReq = injector.get(NgxRequest);
            this.ngxRes = injector.get(NgxResponse);
        }
    }
}
