import { Component, OnInit } from '@angular/core';
// import { ProductService } from './services/product.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'project-angular';
  totalQuantity: number = 0;

  constructor(  /*private prodServ: ProductService,*/ private data: DataService ) { }

  ngOnInit(): void {
    // this.totalQuantity = this.prodServ.getCartTotalQuantity();
    this.data.getData.subscribe((res: any) => {
      this.totalQuantity = res.quantity;
    })
  }
}
