import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../Service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IProduct } from '../Model/product';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { Router, ActivatedRoute } from '@angular/router';
import { IRegister } from '../Model/register';//B
import { productItem } from '../Model/productItem';
import { shoppingCart } from '../Model/shoppingCart';
import { Role } from '../Shared/role';

@Component({
    templateUrl: 'app/Components/product.component.html'
})


export class ProductComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    products: IProduct[];
    // users: IUser[];
    selectedProducts: IProduct[] = [];
    product: IProduct;
    currentUser: IRegister;
    msg: string;
    indLoading: boolean = false;
    productFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    searchTitle: string = "Search Product";
    currentShoppingCart: shoppingCart;
    clickMessage = '';
    valid: boolean = false;
    cu: IRegister;//B


    constructor(private fb: FormBuilder, private _productService: ProductService, private router: Router) { }

    ngOnInit(): void {
        this.productFrm = this.fb.group({
            Id: [''],
            MaterialID: [''],
            Description: [''],
            Price: [''],
            SupplierName: [''],
            Imagepath: ['']
        });
        this.LoadProducts();
        this.cu = JSON.parse(sessionStorage.getItem("currentUser"));
        var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));  //2
        if (currentUser == null) {

            this.clickMessage = 'You must login first';
            this.router.navigate(['/login']);

        }
        if (currentUser != null && (currentUser.Role == "superAdmin" || currentUser.Role == "supplierAdmin")) {

            this.valid = true;

        }

        // this.LoadShoppingCart();
    }

    ////////////////////SHopping cart stuff////////////////////////////////////////////////////////



    cartNav = function () { //redirect to product page
        this.router.navigateByUrl('/productItem');
    };
    checkboxChanged(productIdString: string) {
        var productId = parseInt(productIdString);
        for (var i = 0; i < this.selectedProducts.length; i++) {
            if (this.selectedProducts[i].Id == productId) {
                this.selectedProducts.splice(i, 1);
                return;
            }
        }
        //find the user with userId first //if user is not in selected user list 
        var currentSelectedProduct = this.findProductById(productId);
        if (currentSelectedProduct != null)
            this.selectedProducts.push(currentSelectedProduct);
    }
    // everything unchecked

    resetAll(): void {  //uncheck checkboxes after adding ot cart

    }
    findProductById(productId: number) { // ger index of product
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].Id == productId)
                return this.products[i];
        }
        return null;
    }
    LoadShoppingCart(): void {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));//load loggied in user
        // load user's cart'
        this.currentShoppingCart = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id));
    }
    ////////////////////^^^^^^^^^^^^^^^^^SHopping cart stuff^^^^^^^^^^^^^^^^////////////////////////////////////////////////////////
    LoadProducts(): void {
        this.indLoading = true;
        //   var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));  //2
        this._productService.get(Global.BASE_PRODUCT_ENDPOINT)
            .subscribe(products => {
                this.products = products;
                this.indLoading = false;
            },
            error => this.msg = <any>error);
    }
    logout() {
        sessionStorage.removeItem("currentUser");
        this.clickMessage = 'Logout Successfully!';
        this.router.navigate(['/login']);
    }


    addProduct() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Product";
        this.modalBtnTitle = "Add";
        this.productFrm.reset();
        this.modal.open();
    }
    ////////////////////SHopping cart stuff////////////////////////////////////////////////////////
    //gnerate random PO number
    poNumber(len: number): string {
        var text = " ";
        var charset = "-_abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));

        return text;
    }

    purchaseItems() {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser")); // get loggined in user
        var selectedProductItemList = this.covertProductListToProductItemList(this.selectedProducts);
        this.currentShoppingCart = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id)); // retrieve user's cart(if any)'
        if (this.currentShoppingCart == null) { // no shopping cart --> make a new shopping cart for user
            this.currentShoppingCart = new shoppingCart(); //create a new cart
            this.currentShoppingCart.orderId = this.poNumber(15); // generate 8 letter/digit random code(for storage in database if user purchases cart stuff)
            this.currentShoppingCart.userId = this.currentUser.Id; //user id
            this.currentShoppingCart.userName = this.currentUser.Name; // added user name
            this.currentShoppingCart.productItemList = selectedProductItemList; //hold list of selected products
        }
        else { // add to user's cart from localstorage'
            this.currentShoppingCart.productItemList = this.mergeItemList(this.currentShoppingCart.productItemList, selectedProductItemList); // combine existing products with added products
        }
        localStorage.setItem("currentShoppingCart" + this.currentUser.Id, JSON.stringify(this.currentShoppingCart)); //add/update user's cart to/in localstorage'
    }
    covertProductListToProductItemList(selectedProducts: IProduct[]) { // get list of products with total 
        var productItemList: productItem[] = [];
        for (var i = 0; i < selectedProducts.length; i++) {
            var tempProductItem = new productItem();
            tempProductItem.Quantity = 1;
            tempProductItem.product = selectedProducts[i];
            tempProductItem.SubTotal = tempProductItem.product.Price * tempProductItem.Quantity;  // get subtotal for each product  
            productItemList.push(tempProductItem);
        }
        return productItemList;
    }
    mergeItemList(existingItems: productItem[], newItemList: productItem[]) { // when adding item or updating product on cart
        var matchingFlag = false;
        for (var i = 0; i < existingItems.length; i++) {
            var currentItem = existingItems[i];
            matchingFlag = false;
            for (var j = 0; j < newItemList.length; j++) {
                if (currentItem.product.Id == newItemList[j].product.Id) { //update shopping cart cookie as user add products
                    matchingFlag = true;
                    newItemList[j].Quantity = currentItem.Quantity + newItemList[j].Quantity; // update quantity number if same product added again
                    newItemList[j].SubTotal = currentItem.SubTotal + newItemList[j].SubTotal; //update subtotal               
                    break;
                }
            }
            if (!matchingFlag) {
                newItemList.push(currentItem);
            }
        }
        return newItemList;
    }
    ////////////////////^^^^^^^^^6SHopping cart stuff ^^^^^^^^^////////////////////////////////////////////////////////
    editProduct(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Product";
        this.modalBtnTitle = "Update";
        this.product = this.products.filter(x => x.Id == id)[0];
        this.productFrm.setValue(this.product);
        this.modal.open();
    }

    deleteProduct(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.product = this.products.filter(x => x.Id == id)[0];
        this.productFrm.setValue(this.product);
        this.modal.open();
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._productService.post(Global.BASE_PRODUCT_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadProducts();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._productService.put(Global.BASE_PRODUCT_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadProducts();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._productService.delete(Global.BASE_PRODUCT_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadProducts();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;

        }
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.productFrm.enable() : this.productFrm.disable();
    }

    criteriaChange(value: string): void {
        if (value != '[object Event]')
            this.listFilter = value;
    }
}
