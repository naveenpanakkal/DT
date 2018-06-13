import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as ServiceConfig from '../../shared/serviceconfiguration';
import {Network} from '@ionic-native/network';

@Injectable()
export class AuthProvider {

  private OauthLoginEndPointUrl = ServiceConfig.AUTH_URL; // Oauth Login EndPointUrl to web API
  private clientId = 'mawaniweb';
  private clientSecret = 'mawaniwebsecret';

  constructor(private http: Http, private network: Network) { }

  login(username, password): Observable<any> {

    var headers = new Headers();

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password);
    urlSearchParams.append('grant_type', 'password');
    let body = urlSearchParams.toString();


    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
    //Basic bWF3YW5pd2ViOm1hd2FuaXdlYnNlY3JldA==
    let options = new RequestOptions({ headers: headers });

    if (this.network.type === "none") {
      let errMsg = 'No internet connection';
      return Observable.throw(errMsg);
    } else {
      return this.http.post(this.OauthLoginEndPointUrl, body, options)
        .map(this.handleData)
        .catch(this.handleError);
    }
  }

  private handleData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: any) {
    let errMsg = 'Username or Password is invalid';
    return Observable.throw(errMsg);
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('PRIVILEGES');
    localStorage.removeItem('CLIENT_CODE');
    localStorage.clear(); ///As part of BugFix 831
  }

}
