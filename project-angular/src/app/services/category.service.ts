import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // Các phương thức khác
  getList(): Observable<any>{
    return this.http.get<any>('http://localhost:5294/category');
  }
  getById(): Observable<any> {
    return this.http.get<any>('http://localhost:5294/category');
  }

}
