// *********************************************
// *********************************************
// ****        路由复用策略，谨慎改动           ****
// *********************************************
// *********************************************

/* tslint:disable */
/* eslint-disable */

import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class AppRouterReuseStrategy implements RouteReuseStrategy {

    static _cacheRouters: { [key: string]: any } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // 默认对所有路由复用 可通过给路由配置项增加data: { keep: true }来进行选择性使用
        // {path: 'search', component: SearchComponent, data: {keep: true}},
        if (!route.data.keep) {
            return false;
        } else {
            return true;
        }
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        // 按path作为key存储路由快照&组件当前实例对象
        // path等同RouterModule.forRoot中的配置
        // this._cacheRouters[route.routeConfig.path] = {
        //     snapshot: route,
        //     handle: handle
        // };
        AppRouterReuseStrategy._cacheRouters[route.data.state] = {
            snapshot: route,
            handle: handle
        };
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        // 在路由是login的时候清空缓存
        if (route.routeConfig['path'] === 'login') {
            AppRouterReuseStrategy._cacheRouters = {};
        }
        // 在缓存中有的都认为允许还原路由
        return !!route.routeConfig && !!AppRouterReuseStrategy._cacheRouters[route.data.state];
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        // 从缓存中获取快照，若无则返回null
        if (!route.routeConfig
            || route.routeConfig.loadChildren
            || !AppRouterReuseStrategy._cacheRouters[route.data.state]) {
            return null;
        }
        let handle = AppRouterReuseStrategy._cacheRouters[route.data.state].handle;
        return handle;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        if (future.routeConfig == null && curr.routeConfig == null) {
            return false;
        }
        // 同一路由时复用路由
        return future.routeConfig === curr.routeConfig;
    }

}
