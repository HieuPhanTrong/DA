import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router'
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  submited: boolean = false;
  cats: any;

  proAdd = this.fb.group({
    //dữ liệu tạo từ bảng
    name: ['', Validators.required],
    imgUrl: ['',Validators.required],
    price: [ ,Validators.required],
    saleprice: [ ,Validators.required],
    description: ['',Validators.required],
    // Status: ['',Validators.required],
    //CategoryId: ['',Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private proSrv: ProductService,
    private _router: Router,
    private cat: CategoryService
  ){ }

  ngOnInit(): void {
    this.cat.getList().subscribe(res => {
      this.cats = res.result
    })
  }
  get f() {
    return this.proAdd.controls;
  }

  onSubmit(): any {
    this.submited = true;
    if(this.proAdd.invalid){return false;}
    //console.log('onSubmit')

  // Thêm mới
  this.proSrv.add(this.proAdd.value).subscribe( res => {
    // console.log(this.proAdd.value);
    this._router.navigate(['/admin/product']);
    this._router = res.result
    // console.log(this._router)
  });
  }
}
