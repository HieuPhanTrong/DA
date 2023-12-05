import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit{
  id: number = 0;
  today = new Date();
  product: Product = new Product();
  datas:Product[]=[];
  carts: any = this.prodServ.GetCarts();
  cartForm: FormGroup = new FormGroup({
    quantity: new FormControl(),
  });

  constructor( private router: ActivatedRoute, private prodServ: ProductService, private data: DataService ) { }

  ngOnInit(): void {

    this.data.changeData({
      quantity: this.prodServ.getCartTotalQuantity()
    })

  //  console.log(this.carts)
   this.id = this.router.snapshot.params['id'];
   this.prodServ.getOne(this.id).subscribe(data => {
    // console.log(data);
    this.product = data;
   })
  }
  onAddTocart(Product: any) {
    let idx = this.carts.findIndex((item: any) => {
      return item.id == Product.id;
    });
    if(idx >= 0) {
      this.carts[idx].quantity += 1;
    } else {
      let cartItem: any = {
        id: Product.id,
        name: Product.name,
        imgUrl: Product.imgUrl,
        price: Product.saleprice ? Product.saleprice : Product.price,
        quantity: 1,
        subtotal: function() {
          return this.price * this.quantity
        }
      }
      this.carts.push(cartItem);

    }
    // luu vao storage
    this.prodServ.saveCart(this.carts);
    this.data.changeData({
      quantity: this.prodServ.getCartTotalQuantity()
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Thêm vào giỏ hàng thành công',
      showConfirmButton: false,
      timer: 2000
    })

    // console.log(this.carts[0].subtotal());
    // console.log(cartJson);
    // alert('Thêm vào giỏ hàng thành công')
  }
}
