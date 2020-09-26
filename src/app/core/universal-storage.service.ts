import { Injectable } from '@angular/core';
import { CookieService } from '@gorniv/ngx-universal';

/**
 * 统一平台存储类，前端渲染与服务端渲染共用存储，目前以cookie为存储方案，这也是最佳方案
 */
@Injectable()
export class UniversalStorageService implements Storage {
    [index: number]: string;
    [key: string]: any;
    length: number;
    cookies: any;

    isServer: boolean = false;
    constructor(private cookieService: CookieService) {
        if (!((typeof window != 'undefined') && window)) {
            this.isServer = true;
        }
    }

    clear(): void {
        if (!this.isServer) {
            this.cookieService.removeAll();
        }
    }

    getAll(): any {
        if (!this.isServer) {
            return this.cookieService.getAll();
        }
    }

    getItem(key: string): string {
        if (!this.isServer) {
            return this.cookieService.get(key);
        }
    }

    key(index: number): string {
        if (!this.isServer) {
            return this.cookieService.getAll().propertyIsEnumerable[index];
        }

    }

    removeItem(key: string): void {
        if (!this.isServer) {
            this.cookieService.remove(key);
        }
    }

    setItem(key: string, data: string): void {
        if (!this.isServer) {
            this.cookieService.put(key, data);
        }

    }
}
