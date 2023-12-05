import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Product } from "../model/product.model";

@Injectable({
  providedIn: "root"
})

export class ProductService {
  getProducts() {
    throw new Error('Method not implemented.');
  }
  private apiUrl ='http://localhost:5296/products';
 constructor(private httpClient:HttpClient) { }

  // các phương thức khác
  getList(_limit: number = 8, search_key: any = null): Observable<Product[]> {
    let url = "http://localhost:5296/products/?_limit=" + _limit + "&_sort=id&_order=desc";

    if (search_key != null) {
      url += '&name_like=' + search_key;
    }

    return this.httpClient.get<Product[]>(url);
  }

   getById(id: any): Observable<Product>{
    console.log(id)
     return this.httpClient.get<Product>((this.apiUrl) + "/" + id).pipe();
  }

  getOne(id: number): Observable<Product>{
    return this.httpClient.get<Product>((this.apiUrl) + "/" + id).pipe();
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

  GetCarts(){
    let cartJson = sessionStorage.getItem('cart');
    if (cartJson) {
      return JSON.parse(cartJson);
    } else {
      return [];
    }
  }

  saveCart(carts: any) {
    let cartJson = JSON.stringify(carts);
    sessionStorage.setItem('cart', cartJson);
  }

  getCartTotalPrice() {
    let carts = this.GetCarts();
    let total: number = 0;
    carts.forEach((item: any) => {
      total += item.quantity * item.price;
    });

    return total;
  }

  getCartTotalQuantity() {
    let carts: any = this.GetCarts();
    let total: number = 0;
    carts.forEach((item: any) => {
      total += item.quantity;
    });
    return total;
  }
}
