import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { DataService } from '../services/data.service';
import { OwlOptions }  from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  datas: Product [] = []
  customOptions: OwlOptions = {
    loop: true,
    items: 4,
    margin: 10,
    autoplay: true,
    center: true,
    dots: true,//.....
    nav: true,
    navText: [
      "<<",
      ">>"
    ],
    autoHeight: true,
    autoWidth: true,

  }

  constructor(
    private prodServ: ProductService,
    private data: DataService
    ) { }

  ngOnInit(): void {
    this.getList();
    this.data.changeData({
      quantity: this.prodServ.getCartTotalQuantity()
    })
  }

  getList(){
    this.prodServ.getList().subscribe(res => {
      this.datas = res;
      console.log(res)
    })
  }

}
