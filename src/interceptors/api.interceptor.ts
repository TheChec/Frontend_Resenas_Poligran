import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private _ngxUiLoaderService: NgxUiLoaderService){}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this._ngxUiLoaderService.start();
        return next.handle(req).pipe(
            finalize( () => this._ngxUiLoaderService.stop() )
        )
    }
}