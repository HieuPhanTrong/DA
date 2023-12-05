import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CateService } from 'src/app/services/cate.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  submited: boolean = false;
  cats: any;

  proAdd = this.fb.group({
    //dữ liệu tạo từ bảng
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
    private cat: CateService
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
    console.log('onSubmit')

  // Thêm mới
  this.proSrv.add(this.proAdd.value).subscribe( res => {
    //console.log(this.proAdd.value);
    this._router.navigate(['/admin/employee']);
    this._router = res.result
    console.log(this._router)
  });
  }
}
