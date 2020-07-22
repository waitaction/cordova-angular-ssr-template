// import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
// import { Location } from '@angular/common';

// export class LocalRouteReuseStrategy implements RouteReuseStrategy {

//     shouldDetach(route: ActivatedRouteSnapshot): boolean {
//         // window.location.replace(window.location.href);
//         return false;
//     }
//     store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void { }
//     shouldAttach(route: ActivatedRouteSnapshot): boolean {
//         return false;
//     }
//     retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
//         return null;
//     }
//     shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
//         return future.routeConfig === curr.routeConfig;
//     }
// }