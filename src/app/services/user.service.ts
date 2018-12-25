import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  /* read user List  */
  readUserList(): Observable<any> {     
      return  this.http.get('https://api.github.com/users');
  }

   /* read user detailed info  */
   readUserDetailedInfo(login): Observable<any> {     
    return  this.http.get('https://api.github.com/users/'+login);
}

  private handleError(error: any) {
    var applicationError = error.headers.get('Application-Error');
    var serverError = error.json();
    var modelStateErrors: string = '';

    if (!serverError.type) {
        for (var key in serverError) {
            if (serverError[key])
                modelStateErrors += serverError[key] + '\n';
        }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

    return Observable.throw(applicationError || modelStateErrors || 'Server error');
}
}
