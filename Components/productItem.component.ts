import { Component, OnInit, ViewChild, Pipe, PipeTransform, ElementRef } from '@angular/core'; //pdf
import { ProductService } from '../Service/product.service';
import { ProductItemService } from '../Service/productItem.service';
import { UserService } from '../Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IProduct } from '../Model/product';
import { IUser } from '../Model/user';
import { productItem } from '../Model/productItem';
import { shoppingCart } from '../Model/shoppingCart';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { Router } from '@angular/router';// for cart page
import { IRegister } from '../Model/register';
//import { Cart } from '../Model/cart'; // cart item model




@Component({
    templateUrl: 'app/Components/productItem.component.html' 
})

export class ProductItemComponent implements OnInit {   
    productFrm: FormGroup;
    items: any = [];  //gets data from localstorage
    items2: shoppingCart[] = [];
    order = shoppingCart;
    totalamount: number;
    currentUser: IRegister;
   
    constructor(private fb: FormBuilder, private _productItemService: ProductItemService, private router: Router) {       
    }
    ngOnInit(): void {

        this.LoadShoppingCart();
      
      ;
    }

    getTotal() {
      
    }



   purge = function () { //delte items from cart button
       localStorage.clear();
       this.router.navigateByUrl('/product');
   };
   productNav = function () { //redirect to product page
        this.router.navigateByUrl('/product');
   };

   orderNav = function () {
       this.router.navigateByUrl('/order');
   }
    clearLS = function () { // clear localstorage
        localStorage.clear();
    };
    LoadShoppingCart(): void {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser")); // get loggined user fro msession storage       
        this.items = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id)); //retreive user's cart from local storage'
        //console.log(this.items); // array console picture on broswer 
        this.items2 = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id));
    } 

    remove(id: string): void { //changed to string
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser")); // get loggined user fro msession storage       
        this.items = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id)); //retreive user's cart from local storage'
        let cart: any = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id));
        //let index: number = -1;
        for (var i = 0; i < cart.length; i++) {
            let item: productItem = JSON.parse(cart[i]);
            if (item.Id == id) {
                cart.splce(i, 1);  //get rid od productitem index and its attributes
                //break;
            }
        }
        localStorage.setItem("currentShoppingCart" + this.currentUser.Id, JSON.stringify(cart)); // update cart
        
    } 


} 

