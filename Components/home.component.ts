import { Component, OnInit, ViewChild } from "@angular/core";
import { RegisterService } from '../Service/register.service';
import { Global } from '../Shared/global';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../Model/register';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';


@Component({
    templateUrl: 'app/Components/home.component.html'
})  


export class HomeComponent implements OnInit {


    @ViewChild('modal') modal: ModalComponent;
    modalTitle: string;
    modalBtnTitle: string;
    dbops: DBOperation;
    registers: IRegister[];
    register: IRegister;
    registerFrm: FormGroup;

    clickMessage = '';

    msg: string;
    indLoading: boolean = false;

    constructor(private fb: FormBuilder, private _registerService: RegisterService, private router: Router) { }


    ngOnInit(): void {
        //this.LoadRegister();
        this.registerFrm = this.fb.group({
            Id: [''],
            Name: [''],
            Role: [''],
            CompanyName: [''],
            UserId: [''],
            Password: [''],
            SecurityAns: [''],
            Contact: [''],
            Address: ['']
        });
        this.LoadRegister();
    }

    forgotPassword() {
        this.router.navigate(['/forgotPassword']);
    }

    LoadRegister(): void {
        this.indLoading = true;
        this._registerService.get(Global.BASE_REGISTER_ENDPOINT)
            .subscribe(registers => { this.registers = registers; this.indLoading = false; },
            error => this.msg = <any>error);

    }
    //logout()
    //{
    //     sessionStorage.removeItem("currentUser");
    //    this.clickMessage = 'Logout Successfully!';
    //}

    login(username: string, password: string) {

        var userNameIsFound = false;
        var passwordDoesNotMatch = false;

        var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));  //2

        if (currentUser != null && currentUser.UserId == username) {
            this.clickMessage = 'Youve Already Logged In!';
            return;

        }



        for (var i = 0; i < this.registers.length; i++) {
            if (this.registers[i].UserId == username) {
                userNameIsFound = true;

               
                if (password == this.registers[i].Password) {
                    

                        this.clickMessage = 'Login successfully!';
                        this.router.navigate(['/user']);
                   

                        sessionStorage.setItem("currentUser", JSON.stringify(this.registers[i]));  //1


                        return;
                    
                  

                    
                }
                else {
                    passwordDoesNotMatch = true;
                }
            }

        }

        this.clickMessage = 'Login failed!';
        if (userNameIsFound)
            this.clickMessage = this.clickMessage + "Due to not matching password";
        else
            this.clickMessage = this.clickMessage + "User is not found";

    }

    //LoadUsers(): void {
    //    this.indLoading = true;
    //    this._userService.get(Global.BASE_USER_ENDPOINT)
    //        .subscribe(users => { this.users = users; this.indLoading = false; }
    //        //, error => this.msg = <any>error
    //        );
    //}

    addRegister() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.registerFrm.reset();
        this.modal.open();
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {

            case DBOperation.create:
                this._registerService.post(Global.BASE_REGISTER_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadRegister();
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
        isEnable ? this.registerFrm.enable() : this.registerFrm.disable();
    }
}