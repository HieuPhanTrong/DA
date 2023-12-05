import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CategoryComponent } from './admin/product/category/category.component';
import { ProductListComponent } from './admin/product/product-list/product-list.component';
import { ProductAddComponent } from './admin/product/product-add/product-add.component';
import { ProductEditComponent } from './admin/product/product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { EmployeeListComponent } from './admin/employee/employee-list/employee-list.component';
import { EmployeeAddComponent } from './admin/employee/employee-add/employee-add.component';
import { EmployeeEditComponent } from './admin/employee/employee-edit/employee-edit.component';

const routes: Routes = [
{path:'', component: HomeComponent},
{path:'chi-tiet/:id', component: ProductDetailComponent},
{path:'lien-he', component: ContactComponent},
{path: 'category', component:CategoryComponent},
{path: 'admin/product', children:[
  {path:'', component: ProductListComponent },
  {path:'add', component: ProductAddComponent },
  {path:'edit/:id', component: ProductEditComponent },
]},
{path: 'admin/employee', children:[
  {path:'', component: EmployeeListComponent },
  {path:'add', component: EmployeeAddComponent },
  {path:'edit/:id', component: EmployeeEditComponent },
]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
