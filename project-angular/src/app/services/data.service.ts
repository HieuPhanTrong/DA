import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = new BehaviorSubject({
    quantity: 0
  })

  getData = this.data.asObservable();//truy cap, lay du lieu, bat dong do
  constructor() { }

  changeData(data: any) {
    this.data.next(data);
  }
}
