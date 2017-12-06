import { Component } from "@angular/core"

@Component({
    selector: "user-app",
    template: `
                <div *ngIf='!showNav'>
                    <nav class='navbar navbar-inverse' *ngIf='!showNav'>
                        <div class='container-fluid'>
                            <ul class='nav navbar-nav'>
                               <!-- <li><a [routerLink]="['login']">Home</a></li>-->
                             <!--   <li><a [routerLink]="['home']">Home</a></li>  -->
                                <li><a [routerLink]="['register']">Users</a></li>
                                <li><a [routerLink]="['company']">Company</a></li>
                             <!--   <li><a [routerLink]="['supplier']">Suppliers</a></li>  -->
                                <li><a [routerLink]="['product']">Product</a></li>
                             <!--   <li><a [routerLink]="['productItem']">Cart</a></li>  -->
                             <!--   <li><a [routerLink]="['register']">Users</a></li>  -->


                            </ul>
                        </div>
                    </nav>
                    <div class='container' *ngIf='!showNav'>
                        <router-outlet></router-outlet>
                    </div>
                 </div>
                `
})

export class AppComponent {

}