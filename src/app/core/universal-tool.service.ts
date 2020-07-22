import { environment } from '@environments/environment';
import { Inject, PLATFORM_ID, APP_ID, Injectable } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';

/**
 * 统一平台工具类，前端渲染与服务端渲染都可用
 */
@Injectable()
export class UniversalToolService {

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
     * 是否是统一平台应用，即服务端渲染
     */
    get isUniversal(): boolean {
        return this.transferState.get(makeStateKey("isUniversal"), false);
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string,
        private transferState: TransferState) {
        if (isPlatformServer(this.platformId)) {
            this.transferState.set(makeStateKey('isUniversal'), true);
        }
    }


    /**
     * 计算出地址的key
     * @param url 地址
     */
    computedUrlKey(url: string): string {
        if (url.indexOf("http") >= 0) {
            return url.replace(environment.baseUrl, '').replace(environment.universalBaseUrl, '').replace(/\//ig, '_');
        } else {
            return url;
        }
    }


}

