import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AlertController, LoadingController, Platform} from 'ionic-angular';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import {Network} from '@ionic-native/network';

@Injectable()
export class RestserviceProvider {

  TIMEOUT: number = 30 * 1000;
  isAlertPresent: boolean = false;
  public unregisterBackButtonAction: any;
  public isNetworkAvailable: boolean = true;
  public alert: any = null;

  constructor(public http: Http, public loadingCtrl: LoadingController, private network: Network,
              private alertCtrl: AlertController, public platform: Platform) {

    this.checkConnection();
  }

  private createAuthorizationHeader(headers: Headers) {
    if (null != localStorage.getItem('token')) {
      headers.append('Authorization', 'bearer ' + localStorage.getItem('token'));
    }
    headers.append('Content-Type', 'application/json');
  }

  private extractData(res: any) {
    if (res._body != null && res._body == "") {
      return {};
    }
    let body = res.json();
    return body != null ? body : {};
  }

  doGet(url: string, params: URLSearchParams, showLoading: boolean): Observable<any> {
    this.checkConnection();
    if (this.network.type.toString() == 'none') {
      this.presentAlert('ALERT', 'No internet connection');
      let errBody: any[] = [{message: 'No internet connection'}];
      return Observable.throw(errBody);
    } else {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      if (showLoading) {
        loading.present();
        //clear previous back button registration
        this.unregisterBackButtonAction && this.unregisterBackButtonAction();
        //register back button
        this.initializeBackButtonCustomHandler();
      }
      return this.get(url, params)
        .map((res: Response) => {
          loading.dismissAll();
          //unregister back
          this.unregisterBackButtonAction && this.unregisterBackButtonAction();
          return this.extractData(res);
        }).catch((error) => {
          //If needed
          loading.dismissAll();
          //unregister back
          this.unregisterBackButtonAction && this.unregisterBackButtonAction();
          if (error.value.status === 400) {
            //error handling
            return error;
          }
          if (error.value.status === 401) {
            //error handling
            return error;
          }
        });
    }
  }

  doPost(url: string, body: string, params: URLSearchParams, showLoading: boolean): Observable<any> {
    this.checkConnection();
    if (this.network.type.toString() == 'none') {
      this.presentAlert('ALERT', 'No internet connection');
      let errBody: any[] = [{message: 'No internet connection'}];
      return Observable.throw(errBody);
    } else {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      if (showLoading) {
        loading.present();
        //clear previous back button registration
        this.unregisterBackButtonAction && this.unregisterBackButtonAction();
        //register back button
        this.initializeBackButtonCustomHandler();
      }
      return this.post(url, body, params)
        .map((res: Response) => {
          loading.dismissAll();
          //unregister back
          this.unregisterBackButtonAction && this.unregisterBackButtonAction();
          return this.extractData(res);
        }).catch((error) => {
          loading.dismissAll();
          //unregister back
          this.unregisterBackButtonAction && this.unregisterBackButtonAction();
          //this.handleError(error);
          throw error;
        });
    }
  }


  private get(url: string, params: URLSearchParams): Observable<any> {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    if (null == params) {
      params = new URLSearchParams();
    }
    let options = new RequestOptions({headers: headers, search: params});

    return this.http.get(url, options)
      .catch(error => {
        return this.handleError(error);
      })
    /*.timeout(this.TIMEOUT)
          .retryWhen((errors) => {
            //retryWhen is optional
            throw errors;
          });*/
  }


  private post(url: string, body: string, params: URLSearchParams): Observable<any> {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    if (null == params) {
      params = new URLSearchParams();
    }
    let options = new RequestOptions({headers: headers/*,search: params*/});

    return this.http.post(url, body, options)
      .catch(error => {
        return this.handleError(error);
      })
    /*.timeout(this.TIMEOUT)
          .retryWhen((errors) => {
            //retryWhen is optional
            throw errors;
          });*/
  }

  private handleError(error: any) {
    let errMsg = 'WebService Error';
    console.log(errMsg + ' Error Code ' + error.status);
    if (error.status === 401) {
      console.log('Error 401. Needs to handle sessionout');
    } else if (error.status === 422) {
      let errBody = this.extractErrorData(error._body);
      errMsg = errBody[0].message;
      return Observable.throw(errBody);
    } else if (error.status === 500) {
      this.presentAlert('ALERT', 'Unexpected Error Occured. Please contact the administrator');
    }
    return Observable.throw(error);
  }

  private handleTimeOut(error: any) {
    let errMsg = 'Request TimeOut Error Message';
    return Observable.throw(errMsg);
  }

  private extractErrorData(error: any) {
    let errorBody = JSON.parse(error);
    return errorBody ? errorBody : {};
  }

  presentAlert(title: string, message: string) {
    if (this.alert) {

    } else {
      this.alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: [{
          text: 'DISMISS',
          handler: () => {
            this.alert = null;
          }
        }]
      });
      this.alert.present();
    }
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      console.log('Overwrite Back Button Page Change');
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  private checkConnection() {
    this.network.onConnect().subscribe(() => {
      this.isNetworkAvailable = true;
    });

    this.network.onDisconnect().subscribe(() => {
      this.isNetworkAvailable = false;
    });
  }

}
