import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
//import { UserComponent } from './components/user.component';
//import { HomeComponent } from './components/home.component';
//import { UserService } from './Service/user.service';
import { RegisterService } from './Service/register.service';
import { RegisterComponent } from './components/register.component';
import { forgotPasswordService } from './Service/forgotPassword.service';

import { CompanyService } from './Service/company.service';
import { CompanyComponent } from './components/company.component';
//import { SupplierService } from './Service/supplier.service';
//import { SupplierComponent } from './components/supplier.component';
import { ProductService } from './Service/product.service';
import { ProductComponent } from './components/product.component';
import { UserFilterPipe } from './filter/user.pipe';
import { CompanyFilterPipe } from './filter/company.pipe';
import { ProductFilterPipe } from './filter/product.pipe';
import { SearchComponent } from './Shared/search.component';
import { ProductItemComponent } from './Components/productItem.component';
import { ProductItemService } from './Service/productItem.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgotPassword.component';

import { OrderComponent } from './components/order.component';
import { OrderService } from './Service/order.service';

import { LoginComponent } from './components/login.component';


@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, FormsModule, HttpModule, routing, Ng2Bs3ModalModule],
    declarations: [AppComponent, LoginComponent, ProductComponent, UserFilterPipe, ProductFilterPipe, CompanyFilterPipe, SearchComponent, ProductItemComponent, ForgotPasswordComponent, CompanyComponent, RegisterComponent, OrderComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, ProductService, ProductItemService, forgotPasswordService, CompanyService, RegisterService, OrderService],
    bootstrap: [AppComponent]

})

export class AppModule { }
