import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CateService } from 'src/app/services/cate.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit{
  submited: boolean = false;
  cats: any;

  proAdd = this.fb.group({
    //dữ liệu tạo từ bảng
    id: [0, Validators.required],
    name: ['', Validators.required],
    imgUrl: ['',Validators.required],
    gender: ['',Validators.required],
    phone: [0,Validators.required],
    address: ['',Validators.required],
    email: ['',Validators.required],
    // Status: ['',Validators.required],
    //CategoryId: ['',Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private proSrv: EmployeeService,
    private _router: Router,
    private cat: CateService,
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
          gender: [myPro?.gender, Validators.required],
          phone: [myPro?.phone, Validators.required],
          address: [myPro?.address, Validators.required],
          email: [myPro?.email, Validators.required],
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
    this._router.navigate(['/admin/employee']);
    this._router = res
    console.log(this._router)
  });
  }
}
