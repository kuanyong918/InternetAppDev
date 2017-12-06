import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../Service/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ICompany } from '../Model/company';
import { DBOperation } from '../Shared/enum';
import { Role } from '../Shared/role';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';


@Component({
    templateUrl: 'app/Components/company.component.html'
})


export class CompanyComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    companies: ICompany[];
    company: ICompany;
    msg: string;
    indLoading: boolean = false;
    companyFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    searchTitle: string = "Search Company";
    clickMessage = '';
    valid: boolean = false;

    constructor(private fb: FormBuilder, private _companyService: CompanyService, private router: Router) { }

    ngOnInit(): void {
        this.companyFrm = this.fb.group({
            Id: [''],
            Name: [''],
            Email: [''],
            Phone: [''],
            Owner: [''],
            Street: [''],
            City: [''],
            State: [''],
            Country: [''],
            DUNS: [''],
            Type: ['']

        });

        this.LoadCompanies();

        var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));  //2
        if (currentUser == null) {

            this.clickMessage = 'You must login first';
            this.router.navigate(['/login']);

        }
        if (currentUser != null && (currentUser.Role == "superAdmin")) {

            this.valid = true;

        }

    }




    LoadCompanies(): void {
        this.indLoading = true;
        var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));  //2

        this._companyService.get(Global.BASE_COMPANY_ENDPOINT)
            .subscribe(companies => {
                this.companies = companies;
                //if (currentUser.CompanyName != Role.SuperAdmin) {
                //    this.companies = this.companies.filter(x => x.Id == currentUser.Id);


                //}
                this.indLoading = false;
            },
            error => this.msg = <any>error);
    }

    addCompany() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Company";
        this.modalBtnTitle = "Add";
        this.companyFrm.reset();
        this.modal.open();
    }

    editCompany(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Company";
        this.modalBtnTitle = "Update";
        this.company = this.companies.filter(x => x.Id == id)[0];
        this.companyFrm.setValue(this.company);
        this.modal.open();
    }

    deleteCompany(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.company = this.companies.filter(x => x.Id == id)[0];
        this.companyFrm.setValue(this.company);
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
                this._companyService.post(Global.BASE_COMPANY_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadCompanies();
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
                this._companyService.put(Global.BASE_COMPANY_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadCompanies();
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
                this._companyService.delete(Global.BASE_COMPANY_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadCompanies();
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
        isEnable ? this.companyFrm.enable() : this.companyFrm.disable();
    }

    criteriaChange(value: string): void {
        if (value != '[object Event]')
            this.listFilter = value;
    }
}
