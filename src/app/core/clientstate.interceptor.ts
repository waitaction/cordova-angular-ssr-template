import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/internal/operators";
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { CookieService } from '@gorniv/ngx-universal';
import { environment } from 'src/environments/environment';
import { UniversalToolService } from './universal-tool.service';
/**
 * 服务端和客户端都会执行
 */
@Injectable()
export class ClientStateInterceptor implements HttpInterceptor {

    constructor(
        private transferState: TransferState,
        private universalTool: UniversalToolService,
        private cookieService: CookieService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let self = this;
        //(req as any).responseType = "json";//响应类型
        //(req.headers as any) = req.headers.set('Authorization', 'Bearer ' + ''); //鉴权
        const storedResponse: string = this.transferState.get(makeStateKey(self.universalTool.computedUrlKey(req.url)), null);
        if (storedResponse) {
            const response = new HttpResponse({ body: storedResponse, status: 200 });
            this.transferState.remove(makeStateKey(self.universalTool.computedUrlKey(req.url)));
            this.cookieService.remove(self.universalTool.computedUrlKey(req.url));
            return of(response);
        } else {
            let beginTime = (new Date()).getTime();
            return next.handle(req).pipe(
                tap(event => {
                    let apiDelayTime = (new Date()).getTime() - beginTime;
                    if (apiDelayTime > 5000) {
                        self.transferState.set(makeStateKey("api_delay_time"), apiDelayTime);
                        if (globalThis.window) {
                            console.warn("当前服务器繁忙，数据响应比平时更缓慢");
                        }
                    }
                    if (event instanceof HttpResponse && event.status == 200) {
                        return this.handleData(event);
                    } else {
                        return of(event);
                    }
                }),
                catchError((err: HttpErrorResponse) => this.handleData(err))
            );
        }

    }

    private handleData(
        event: HttpResponse<any> | HttpErrorResponse,
    ): Observable<any> {

        switch (event.status) {
            case 401:
                return of(event);
            case 0:
                if (globalThis.window) {
                    console.warn(`连接失败：${event.status},${event.statusText},${this.getRelativeUrl(event.url)}`);
                }
                return throwError(`连接失败：${event.status},${event.statusText},${this.getRelativeUrl(event.url)}`);
            default:
                if (event.status != 200) {
                    if (globalThis.window) {
                        console.warn(`请求错误：${event.status},${event.statusText},${this.getRelativeUrl(event.url)}`);
                    }
                    return throwError(`请求错误：${event.status},${event.statusText},${this.getRelativeUrl(event.url)}`);
                }
                break;
        }

        return of(event);

    }

    getRelativeUrl(url) {
        return url.replace(environment.baseUrl, "").replace(environment.universalBaseUrl, "");
    }

}


