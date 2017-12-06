import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './components/user.component';
import { HomeComponent } from './components/home.component';
import { SupplierComponent } from './components/supplier.component';
import { ProductComponent } from './components/product.component';
import { ProductItemComponent } from './Components/productItem.component';
import { CompanyComponent } from './components/company.component';
import { ForgotPasswordComponent } from './components/forgotPassword.component';
import { RegisterComponent } from './components/register.component';
import { OrderComponent } from './components/order.component';

import { LoginComponent } from './components/login.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'product', component: ProductComponent },
    { path: 'productItem', component: ProductItemComponent },
    { path: 'company', component: CompanyComponent },
    { path: 'forgotPassword', component: ForgotPasswordComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'order', component: OrderComponent }
];

export const routing: ModuleWithProviders =
    RouterModule.forRoot(appRoutes);