import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtinterceptorInterceptor implements HttpInterceptor {

  constructor(private CookieService:CookieService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.CookieService.get('tokenC');  
    const headers = new HttpHeaders ({
      "Authorization": `Bearer ${token}`
    })       
    
    const reqclone = request.clone({
      headers
    });
   

    return next.handle(reqclone);
  }  





  
}
