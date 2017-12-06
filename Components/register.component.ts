import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterService } from '../Service/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IRegister } from '../Model/register';
import { Router, ActivatedRoute } from '@angular/router';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({
    templateUrl: 'app/Components/register.component.html'
})

export class RegisterComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    registers: IRegister[];
    register: IRegister;
    msg: string;
    indLoading: boolean = false;
    registerFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    searchTitle: string = "Search User";
    valid: boolean = false;
    clickMessage = '';
    cu: IRegister;
    constructor(private fb: FormBuilder, private _registerService: RegisterService, private router: Router) { }

    ngOnInit(): void {
        this.registerFrm = this.fb.group({
            Id: [''],
            Name: ['', Validators.required],
            Role: [''],
            UserId: ['', Validators.required],
            Password: [''],
            CompanyName: [''],
            SecurityAns: [''],
            Contact: [''],
            Address: ['']

        });
        this.LoadRegisters();

        var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));  //2
        if (currentUser == null) {
            this.clickMessage = 'You must login first';
            this.router.navigate(['/login']);
        }
        if (currentUser != null && (currentUser.Role == "superAdmin")) {
            this.valid = true;
        }
    }

    LoadRegisters(): void {
        this.indLoading = true;
        this._registerService.get(Global.BASE_REGISTER_ENDPOINT)
            .subscribe(registers => { this.registers = registers; this.indLoading = false; },
            error => this.msg = <any>error);
    }

    addRegister() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.registerFrm.reset();
        this.modal.open();
    }

    editRegister(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.register = this.registers.filter(x => x.Id == id)[0];
        this.registerFrm.setValue(this.register);
        this.modal.open();
    }

    deleteRegister(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.register = this.registers.filter(x => x.Id == id)[0];
        this.registerFrm.setValue(this.register);
        this.modal.open();
    }

    logout() {
        sessionStorage.removeItem("currentUser");
        this.clickMessage = 'Logout Successfully!';
        this.router.navigate(['\login']);
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
                            this.LoadRegisters();
                        }
                        else
                        {
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
                this._registerService.put(Global.BASE_REGISTER_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadRegisters();
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
                this._registerService.delete(Global.BASE_REGISTER_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadRegisters();
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

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.registerFrm.enable() : this.registerFrm.disable();
    }

    criteriaChange(value: string): void {
        if (value != '[object Event]')
            this.listFilter = value;
    }
}