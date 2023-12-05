import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit  {

  datas:Employee[]=[];

  searchForm: FormGroup = new FormGroup({
    name: new FormControl(),
  });
  constructor(
    private employeeService: EmployeeService,
    ) { }

  ngOnInit(): void {
    this.getList();
  }
  getList(){
    this.employeeService.getList(20).subscribe(res => {
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
        this.employeeService.deleteProduct(productId).subscribe(_ => {
          this.employeeService.getList().subscribe(data => {
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
    this.employeeService.getList(20, this.searchForm.value.name).subscribe(res => {
      this.datas = res;
    })
  }
}
