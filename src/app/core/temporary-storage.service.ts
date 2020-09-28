import { Injectable } from '@angular/core';

/**
 * 临时缓存
 */
@Injectable({ providedIn: 'root' })
export class TemporaryStorage {

    private static list: Array<{ key: string, value: any }> = new Array<{ key: string, value: any }>();
    constructor() { }

    getItem(key: string): any {
        if (TemporaryStorage.list != null && TemporaryStorage.list.length > 0) {
            let result = TemporaryStorage.list.find(m => m.key == key);
            if (result != null) {
                return result.value;
            }
        }
        return null;
    }

    removeItem(key: string): void {
        if (TemporaryStorage.list != null && TemporaryStorage.list.length > 0) {
            let result = TemporaryStorage.list.find(m => m.key == key);
            if (result != null) {
                TemporaryStorage.list.splice(TemporaryStorage.list.indexOf(result), 1);
            }
        }
    }

    setItem(key: string, data: any): void {
        if (TemporaryStorage.list != null && TemporaryStorage.list.length > 0) {
            let result = TemporaryStorage.list.find(m => m.key == key);
            if (result != null) {
                result.value = data;
            } else {
                TemporaryStorage.list.push({ key, value: data });
            }
        } else {
            TemporaryStorage.list = [];
            TemporaryStorage.list.push({ key, value: data });
        }
    }
}
