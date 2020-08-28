import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const BASE_URL = environment.API_BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class RequestServiceBase {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Executes a get http call to backend
   * @param path path without base url
   * @param body body object
   */
  public httpGet<T>(path) {
    return this.http.get(`${path}`, this.getHttpOptions()).pipe(
      map(this.handleResponse),
      catchError(err => this.handleErrorBase(err)));
  }
  /**
  * Executes a get http call to backend
  * @param path path without base url
  * @param body body object
  */
  public httpGetImage(path) {
    return this.http.get(`${BASE_URL}${path}`, { responseType: 'text' }).pipe(data => data);
  }

  /**
   * Executes a post http call to backend
   * @param path path without base url
   * @param body body object
   */
  public httpPost(path, body = {}) {
    return this.http.post(`${BASE_URL}${path}`, body, this.getHttpOptions()).pipe(map(this.handleResponse));
  }

  /**
   * Executes a post http call to backend
   * @param path path without base url
   * @param body body object
   */
  public httpPostImage(path, body = {}) {
    return this.http.post(`${BASE_URL}${path}`, body, {}).pipe(map(this.handleResponse));
  }

  /**
   * Executes a put http call to backend
   * @param path path without base url
   * @param body body object
   */
  public httpPut(path, body = {}) {
    return this.http.put(`${BASE_URL}${path}`, { data: body }, this.getHttpOptions()).pipe(map(this.handleResponse));
  }

  /**
   * Executes a delete http call to backend
   * @param path path without base url
   * @param body body object
   */
  public httpDelete(path) {
    return this.http.delete(`${BASE_URL}${path}`, this.getHttpOptions()).pipe(map(this.handleResponse));
  }


  /**
   * Returns httpOptions object
   */
  private getHttpOptions(jsonHeaders: boolean = true) {

    const token = sessionStorage.getItem('authToken');

    if (token) {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'session_token': sessionStorage.getItem('authToken')
        }),
      };
      return httpOptions;
    } else {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
      };
      return httpOptions;
    }

  }

  /**
   * Http response handler (extracts data object)
   * @param res http response
   */
  private handleResponse(res) {
    // if ('data' in res) {
    //   return res.data;
    // }
    return res;
  }

  handleErrorBase(error: any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      //const err = body.error || JSON.stringify(body);
      //errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    this.handleResponse(error);

    return error;
  }

}
