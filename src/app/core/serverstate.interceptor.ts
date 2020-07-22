import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NgxResponse } from '@gorniv/ngx-universal';
import { UniversalToolService } from './universal-tool.service';

/**
 * 仅在服务端执行
 */
@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {

    constructor(
        private transferState: TransferState,
        private universalTool: UniversalToolService,
        private ngxResponse: NgxResponse) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let self = this;
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.transferState.set(makeStateKey(self.universalTool.computedUrlKey(req.url)), event.body);
                    (this.ngxResponse as any).cookie(self.universalTool.computedUrlKey(req.url), "server");
                }
            })
        );

    }



}
