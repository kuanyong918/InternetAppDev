import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from '../Service/supplier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ISupplier } from '../Model/supplier';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({
    templateUrl: 'app/Components/supplier.component.html'
})


export class SupplierComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    suppliers: ISupplier[];
    supplier: ISupplier;
    msg: string;
    indLoading: boolean = false;
    supplierFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _supplierService: SupplierService) { }

    ngOnInit(): void {
        this.supplierFrm = this.fb.group({
            Id: [''],
            Name: ['', Validators.required],
            Email: ['', Validators.required],
            Phone: ['', Validators.required],
            Owner: [''],
            Street: [''],
            City: [''],
            State: ['', Validators.required],
            Country: ['', Validators.required],
            DUNS: ['', Validators.required]
        });
        this.LoadSuppliers();
    }

    LoadSuppliers(): void {
        this.indLoading = true;
        this._supplierService.get(Global.BASE_SUPPLIER_ENDPOINT)
            .subscribe(suppliers => { this.suppliers = suppliers; this.indLoading = false; },
            error => this.msg = <any>error);
    }

    addSupplier() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Supplier";
        this.modalBtnTitle = "Add";
        this.supplierFrm.reset();
        this.modal.open();
    }

    editSupplier(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Supplier";
        this.modalBtnTitle = "Update";
        this.supplier = this.suppliers.filter(x => x.Id == id)[0];
        this.supplierFrm.setValue(this.supplier);
        this.modal.open();
    }

    deleteSupplier(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.supplier = this.suppliers.filter(x => x.Id == id)[0];
        this.supplierFrm.setValue(this.supplier);
        this.modal.open();
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._supplierService.post(Global.BASE_SUPPLIER_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadSuppliers();
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
                this._supplierService.put(Global.BASE_SUPPLIER_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadSuppliers();
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
                this._supplierService.delete(Global.BASE_SUPPLIER_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadSuppliers();
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
        isEnable ? this.supplierFrm.enable() : this.supplierFrm.disable();
    }
}
