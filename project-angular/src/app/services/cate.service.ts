import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CateService {

  constructor(private http: HttpClient) { }

  // Các phương thức khác
  getList(): Observable<any>{
    return this.http.get<any>('http://localhost:5298/cate');
  }
  getById(): Observable<any> {
    return this.http.get<any>('http://localhost:5294/cate');
  }

}
