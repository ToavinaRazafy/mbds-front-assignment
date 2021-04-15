import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoggingService} from './logging.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private http: HttpClient, private authenticationService: LoggingService) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const req = request.url;
        const currentUser = this.authenticationService.currentUserValue;
        const url = 'https://back-assignments-mbds1055.herokuapp.com/';
        // const url = 'http://localhost:4000/';
        console.log(url);
        if (!request.url.startsWith('http')) {
            request = request.clone({
                url: url + request.url
            });

        }

        if (currentUser && currentUser.token) {
            console.log(`Bearer ${currentUser.token}`);
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${currentUser.token}`
                }
            });
        }
        return next.handle(request);
    }
}
