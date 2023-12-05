import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  carts: any = [];
  totalQuantity: number = this.prodServ.getCartTotalQuantity()
  totalPrice: number = this.prodServ.getCartTotalPrice()
  constructor( private prodServ: ProductService, private data: DataService ) { }

  ngOnInit(): void {
    let _this = this;
    // console.log(this.prodServ.GetCarts())
    setTimeout(function() {
      _this.data.changeData({
        quantity: _this.prodServ.getCartTotalQuantity()
      })
    }, 1);
    this.carts = this.prodServ.GetCarts();
  }

  sub(){
    this.totalQuantity = this.prodServ.getCartTotalQuantity()
    this.totalPrice = this.prodServ.getCartTotalPrice()
  }

  subTotal(cart: any){
    return cart.quantity * cart.price;
  }

  updateQuantity(idx: number, ev: any) {
    let newQuantity = parseInt(ev.target.value);
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    newQuantity = newQuantity <= 100 ? newQuantity : 100;
    ev.target.value = newQuantity;// ngăn chặn (-)
    this.carts[idx].quantity = newQuantity;// lưu lại
    // console.log(ev.target.value)
    this.prodServ.saveCart(this.carts);
    this.sub();
    this.data.changeData({
      quantity: this.prodServ.getCartTotalQuantity()
    })
  }

  giamSL(idx: number, qtt: any){
    let newQuantity = parseInt(qtt) -1;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    newQuantity = newQuantity <= 100 ? newQuantity : 100;
    this.carts[idx].quantity = newQuantity;
    this.prodServ.saveCart(this.carts);
    // console.log(newQuantity);
    this.sub();
    this.data.changeData({
      quantity: this.prodServ.getCartTotalQuantity()
    })
  }

  tangSL(idx: number, qtt: any){
    let newQuantity = parseInt(qtt) + 1;
    console.log(idx, qtt);
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    newQuantity = newQuantity <= 100 ? newQuantity : 100;
    this.carts[idx].quantity = newQuantity;
    this.prodServ.saveCart(this.carts);
    this.sub();
    // console.log(newQuantity);
    this.data.changeData({
      quantity: this.prodServ.getCartTotalQuantity()
    })
  }

  removecart(idx: number){
  Swal.fire({
  title: 'Bạn có chắc không?',
  text: "Nếu ok sẽ xoá sản phẩm khỏi giỏ hàng!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result: { isConfirmed: any; }) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Đã xoá!',
      'Đã xoá sản phẩm khỏi giỏ hàng.',
      'success'
    );
    this.carts.splice(idx, 1);
    this.prodServ.saveCart(this.carts);

    this.data.changeData({
      quantity: this.prodServ.getCartTotalQuantity()
    })
  }
})
    // if(confirm('Bạn có muốn xoá không!')){
    //   this.carts.splice(idx, 1);
    //   this.prodServ.saveCart(this.carts);
    // }
  }

  onClearCart() {
    Swal.fire({
      title: 'Bạn có chắc không?',
      text: "Nếu ok sẽ xoá sản phẩm khỏi giỏ hàng!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Đã xoá!',
          'Đã xoá sản phẩm khỏi giỏ hàng.',
          'success'
        );
        sessionStorage.clear()
        this.carts = [];
        this.data.changeData({
          quantity: this.prodServ.getCartTotalQuantity()
        })
      }
    })
  }
}
