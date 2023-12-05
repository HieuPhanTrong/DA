import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Employee } from "../model/employee.model";

@Injectable({
  providedIn: "root"
})

export class EmployeeService {
  getProducts() {
    throw new Error('Method not implemented.');
  }
  private apiUrl ='http://localhost:5298/employee';
 constructor(private httpClient:HttpClient) { }

  // các phương thức khác
  getList(_limit: number = 8, search_key: any = null): Observable<Employee[]> {
    let url = "http://localhost:5298/employee/?_limit=" + _limit + "&_sort=id&_order=desc";

    if (search_key != null) {
      url += '&name_like=' + search_key;
    }

    return this.httpClient.get<Employee[]>(url);
  }

   getById(id: any): Observable<Employee>{
    console.log(id)
     return this.httpClient.get<Employee>((this.apiUrl) + "/" + id).pipe();
  }

  getOne(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>((this.apiUrl) + "/" + id).pipe();
  }

  add(data: any): Observable<any>{
    return this.httpClient.post<any>((this.apiUrl), data);
  }

  update(id: any, data: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.put<any>(url, data);
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<any>(url);
  }
}
