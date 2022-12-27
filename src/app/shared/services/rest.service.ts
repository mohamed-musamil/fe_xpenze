import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private readonly http: HttpClient) { }

  save(url, postData):any {
    return this.http.post(`${environment.apiUrl}${url}`, postData, {
      headers: new HttpHeaders({ 'Access-Control-Allow-Methods' : 'POST'})
    });
  }

  get(url):any {
    return this.http.get(`${environment.apiUrl}${url}`, {
      headers: new HttpHeaders({ 'Access-Control-Allow-Methods' : 'GET'})
    });
  }

  checkServer() {
    return this.http.get(`${environment.apiUrl}`, {
      headers: new HttpHeaders({ 'Access-Control-Allow-Methods' : 'GET'}),
      responseType: 'text'
    });
  }

}
