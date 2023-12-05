import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router'
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  submited: boolean = false;
  cats: any;

  proAdd = this.fb.group({
    //dữ liệu tạo từ bảng
    id: [0, Validators.required],
    name: ['', Validators.required],
    imgUrl: ['',Validators.required],
    price: [0,Validators.required],
    saleprice: [0,Validators.required],
    description: ['',Validators.required],
    // Status: ['',Validators.required],
    //CategoryId: ['',Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private proSrv: ProductService,
    private _router: Router,
    private cat: CategoryService,
    private router: ActivatedRoute
  ){ }

  ngOnInit(): void {
    this.cat.getList().subscribe(res => {
      this.cats = res.result
    });

    this.router.paramMap.subscribe( query => {
      let id = query.get("id");
      console.log(query)
      this.proSrv.getById(id).subscribe(res => {
        let myPro = res;

        console.log(res)
        this.proAdd = this.fb.group({
          id: [myPro?.id, Validators.required],
          name: [myPro?.name, Validators.required],
          imgUrl: [myPro?.imgUrl, Validators.required],
          price: [myPro?.price, Validators.required],
          saleprice: [myPro?.saleprice, Validators.required],
          description: [myPro?.description, Validators.required],
        });
      })
    })
  }

  get f() {return this.proAdd.controls;}

  onSubmit(): any {
    this.submited = true;
    console.log('onSubmit()')
    if(this.proAdd.invalid){return false;}


  // Edit
  const productId = this.router.snapshot.paramMap.get('id');
  this.proSrv.update(productId,this.proAdd.value).subscribe( res => {
    console.log(this.proAdd.value);
    this._router.navigate(['/admin/product']);
    this._router = res
    console.log(this._router)
  });
  }
}
