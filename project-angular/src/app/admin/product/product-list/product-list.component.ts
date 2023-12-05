import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  datas:Product[]=[];

  searchForm: FormGroup = new FormGroup({
    name: new FormControl(),
  });
  constructor(
    private productService: ProductService,
    ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.productService.getList(20).subscribe(res => {
      this.datas = res;
      console.log(res)
    })
  }

  deleteProduct(productId:number) {
    Swal.fire({
      title: 'Bạn có chắc không?',
      text: "Nếu ok sẽ xoá sản phẩm khỏi giỏ hàng!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ok, xóa nó đi!'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Đã xoá!',
          'Đã xoá sản phẩm khỏi giỏ hàng.',
          'success'
        );
        this.productService.deleteProduct(productId).subscribe(_ => {
          this.productService.getList().subscribe(data => {
            this.datas = data
          })
        });
      }
    })

  // if(confirm("Bạn có muốn xoá không?")) {
  //   this.productService.deleteProduct(productId).subscribe(_ => {
  //     this.productService.getList().subscribe(data => {
  //       this.datas = data
  //     })
  //   });
  // }
  }

  onSearch(){
    this.productService.getList(20, this.searchForm.value.name).subscribe(res => {
      this.datas = res;
    })
  }

}
