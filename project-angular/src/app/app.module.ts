import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './admin/product/product.component';
import { CategoryComponent } from './admin/product/category/category.component';
import { ProductListComponent } from './admin/product/product-list/product-list.component';
import { ProductAddComponent } from './admin/product/product-add/product-add.component';
import { ProductEditComponent } from './admin/product/product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { EmployeeAddComponent } from './admin/employee/employee-add/employee-add.component';
import { EmployeeEditComponent } from './admin/employee/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './admin/employee/employee-list/employee-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    ProductComponent,
    CategoryComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductDetailComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
