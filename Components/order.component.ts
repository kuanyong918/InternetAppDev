import { Component, OnInit, ViewChild, Pipe, PipeTransform, ElementRef, Inject } from '@angular/core'; 
import { UserService } from '../Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { productItem } from '../Model/productItem';
import { shoppingCart } from '../Model/shoppingCart';
import { Order } from '../Model/order';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { Router, ActivatedRoute } from '@angular/router';
import { IRegister } from '../Model/register';
import { OrderService } from '../Service/order.service';

@Component({
    templateUrl: 'app/Components/order.component.html'
})

export class OrderComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    orders: Order[];
    order: Order;
    currentOrder: any = []
    currentUser: IRegister;
    orderFrm: FormGroup;
    msg: string; msg2: string;
    indLoading: boolean = false;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    valid: boolean = false;
 //router: Router
    
    constructor(private fb: FormBuilder, private _orderService: OrderService, private router: Router) { }

    ngOnInit(): void {
        this.orderFrm = this.fb.group({
            Id: [''],
            orderId: [''],
            userId: [''],
            userName: [''],
            productItemList: ['']
        });
       ;
  
      //  (<HTMLInputElement>document.getElementById('orderNumber')).innerHTML = this.currentOrder.orderId;

        this.loadOrderPlaced(); //load  
        this.LoadOrders();
        

    }
    ngAfterViewInit() {
       // (<HTMLInputElement>document.getElementById('orderNumber')).innerHTML = this.currentOrder.orderId;
       // this.addOrder();
       // this.modal.open();
    }

    refresh(): void {
        window.location.reload();
    }

    clearLS = function () { // clear localstorage
        localStorage.clear();
    };

    loadOrderPlaced() {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser")); // get logged in user
        this.currentOrder = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id));
    }

    LoadOrders(): void {
        this.indLoading = true;
        this._orderService.get(Global.BASE_ORDER_ENDPOINT)
            .subscribe(orders => {
                this.orders = orders;
                this.indLoading = false;
            },
            error => this.msg = <any>error);
    }

    addOrder() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Finalize Order";
        this.modalBtnTitle = "Finalize";
        this.orderFrm.reset();
       /* (<HTMLInputElement>document.getElementById('orderId1')).value = this.currentOrder.orderId;
        (<HTMLInputElement>document.getElementById('userId1')).value = this.currentOrder.userId;
        (<HTMLInputElement>document.getElementById('userName1')).value = this.currentOrder.userName;
        (<HTMLInputElement>document.getElementById('productItemList1')).value = JSON.stringify(this.currentOrder.productItemList); */
        this.orderFrm.get("orderId").setValue(this.currentOrder.orderId);
        this.orderFrm.get("userId").setValue(this.currentOrder.userId);
        this.orderFrm.get("userName").setValue(this.currentOrder.userName);
        this.orderFrm.get("productItemList").setValue(JSON.stringify(this.currentOrder.productItemList));
        this.modal.open();
        
    }

    onSubmit(formData: any) {
        this.msg = "";
        this.msg2 = "";

        switch (this.dbops) {
            case DBOperation.create:
                
                this._orderService.post(Global.BASE_ORDER_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Order Successfully Placed.";
                            this.msg2 = this.currentOrder.orderId;
                            this.LoadOrders();
                            this.clearLS();
                            setTimeout(() => {
                                this.router.navigateByUrl('/product');
                            }, 7000);
                            
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
        isEnable ? this.orderFrm.enable() : this.orderFrm.disable();
    }

}
