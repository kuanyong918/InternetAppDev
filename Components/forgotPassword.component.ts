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
    templateUrl: 'app/Components/forgotPassword.component.html'
})

export class ForgotPasswordComponent implements OnInit
{
    @ViewChild('modal') modal: ModalComponent;
    dbops: DBOperation;
    registers: IRegister[];
    register: IRegister;
    forgotPasswordFrm: FormGroup;

    clickMessage = '';

    msg: string;
    indLoading: boolean = false;

    constructor(private fb: FormBuilder, private _registerService: RegisterService, private router: Router) { }

    ngOnInit(): void {
        this.forgotPasswordFrm = this.fb.group({
            Id: [''],
            UserId: [''],
            SecurityAns: [''],
            Address: [''],
            Password: ['']
        });
        this.LoadRegister();
    }

    LoadRegister(): void
    {
        this.indLoading = true;
        this._registerService.get(Global.BASE_REGISTER_ENDPOINT)
            .subscribe(registers => { this.registers = registers; this.indLoading = false; },
            error => this.msg = <any>error);

    }

    SaveRegister(): void {
        //save this.register
        this._registerService.post(Global.BASE_REGISTER_ENDPOINT, this.register.Password)
            .map((res: Response) => res.json());
    }


    //submit(username: string, securityAns: string) {
    //    for (var i = 0; i < this.registers.length; i++) {
    //        if (this.registers[i].UserId == username) {



    //            if (this.registers[i].SecurityAns == securityAns) {


    //                this.clickMessage = 'Login successfully!';
    //                this.router.navigate(['/home']);

    //                return;
    //            }

    //        }

    //    }
    //}

    submit(username: string, securityAns: string) {
        var userNameFound = false;
        var answerNotMatch = false;

        for (var i = 0; i < this.registers.length; i++)
        {
            if (this.registers[i].UserId == username)
            {
                userNameFound = true;

                if (securityAns == this.registers[i].SecurityAns)
                {
                    this.clickMessage = '';
                    this.modal.open();
                    //  this.updatePassword(this.registers[i]);
                    localStorage.setItem("forgetPWDUser", JSON.stringify(this.registers[i]));
                    return;
                }
                //if (password == this.registers[i].Password) {
                //    this.clickMessage = 'Login successfully!';
                //    this.router.navigate(['/user']);
                //    sessionStorage.setItem("currentUser", JSON.stringify(this.registers[i]));  //1
                //    return;
                //}
                else
                {
                    answerNotMatch = true;
                }
            }

        }
        this.clickMessage = 'Verification failed!';
        if (userNameFound)
            this.clickMessage = this.clickMessage + "Due to not matching password";
        else
            this.clickMessage = this.clickMessage + "User is not found";
    }

    //resetPassword() {
    //    this.dbops = DBOperation.update;
    //    this.SetControlsState(true);
    //    this.register = this.registers.filter(x => x.Id == id)[0];
    //    this.registerFrm.setValue(this.register);
    //    this.modal.open();
    //}

    updatePassword(newPassword: string) {


        //this.SaveRegister();
        //this.modal.dismiss();
        //this.router.navigate(['/user']);
    }

    onSubmit(formData: any) {
        this.msg = "";
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.register = JSON.parse(localStorage.getItem("forgetPWDUser"));
        this.register.Password = formData._value.Password;
        switch (this.dbops) {
            case DBOperation.update:
                this._registerService.post(Global.BASE_REGISTER_ENDPOINT, this.register).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Password successfully updated.";
                            this.LoadRegister();
                            this.modal.dismiss();
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
        isEnable ? this.forgotPasswordFrm.enable() : this.forgotPasswordFrm.disable();
    }
}
