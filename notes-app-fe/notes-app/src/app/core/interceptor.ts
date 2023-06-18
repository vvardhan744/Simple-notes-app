import { Observable } from 'rxjs/index';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';

export class TokenInterceptor implements HttpInterceptor{
    intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        let token = window.localStorage.getItem('token');
        if(token){
            request = request.clone({
                setHeaders:{
                    Authorization:'Bearer' + token
                }
            });
        }
        return next.handle(request);
    }
}