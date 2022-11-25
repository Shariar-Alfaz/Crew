import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import {
  catchError,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { InterceptorService } from '../interceptor.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private baseUrl: string = 'https://localhost:7022/';
  constructor(private interceptorService:InterceptorService){}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handler(next, req);
  }
  handler(
    next: HttpHandler,
    request: HttpRequest<any>
  ): Observable<HttpEvent<any>> {
    const token =localStorage.getItem('token');
    const appKey = localStorage.getItem('app-key');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `bearer ${token}`,
          AppKey: appKey ? appKey : '',
        },
        url:`${this.baseUrl}${request.url}`
      });
    }else{
      request=request.clone({
        url:`${this.baseUrl}${request.url}`
      })
    }
    return next.handle(request).pipe(
      catchError((err)=>{
      if(err.status==401){
        console.log('here')
        return this.handleRefreshToken(next,request);
      }
      return throwError(err);
      })
    )
  }
  private handleRefreshToken(next:HttpHandler,request:HttpRequest<any>){
  return this.interceptorService.getNewToken().pipe(
      switchMap((data:any)=>{
        console.log(data);
        localStorage.setItem('token',data.key);
        const req = request.clone({
          setHeaders:{
            Authorization:`bearer ${data.key}`,
            AppKey: data.getMe.appKey
          }
        });
        return next.handle(req);
      }),
      catchError((error)=>{
        let tk=localStorage.getItem('app-key');
        request.headers.append('appKey',tk?tk:'');
        this.interceptorService.logOut().subscribe();
        localStorage.clear();
        return throwError(error);
      })
    )
  }
}
