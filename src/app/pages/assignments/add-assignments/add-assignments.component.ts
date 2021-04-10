import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

@Component({
    selector: 'app-add-assignements',
    templateUrl: './add-assignments.component.html',
    styleUrls: ['./add-assignments.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AddAssignmentsComponent {

    public steps: any[];
    public accountForm: FormGroup;
    public personalForm: FormGroup;
    public paymentForm: FormGroup;
    public details: any = {};
    public showConfirm: boolean;
    public confirmed: boolean;

    constructor(private formBuilder: FormBuilder) {

        let password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]));
        let confirmPassword = new FormControl('', Validators.compose([Validators.required, CustomValidators.equalTo(password)]));

        this.steps = [
            {name: 'Information du devoir', icon: 'fa-lock', active: true, valid: false, hasError: false},
            {name: 'Personal Information', icon: 'fa-user', active: false, valid: false, hasError: false},
            {name: 'Confirm Your Details', icon: 'fa-check-square-o', active: false, valid: false, hasError: false}
        ]

        this.accountForm = this.formBuilder.group({
            'titre': ['', Validators.required],
            'matiere': ['', Validators.required],
        });

        this.personalForm = this.formBuilder.group({
            'firstname': ['', Validators.required],
            'lastname': ['', Validators.required],
            'date': ['', Validators.required],
        });

    }

    public next() {
        let accountForm = this.accountForm;
        let personalForm = this.personalForm;

        if (this.steps[this.steps.length - 1].active) {
            return false;
        }

        this.steps.some(function (step, index, steps) {
            if (index < steps.length - 1) {
                if (step.active) {
                    if (step.name == 'Information du devoir') {
                        if (accountForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index + 1].active = true;
                            return true;
                        } else {
                            step.hasError = true;
                        }
                    }
                    if (step.name == 'Personal Information') {
                        if (personalForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index + 1].active = true;
                            return true;
                        } else {
                            step.hasError = true;
                        }
                    }
                }
            }
        });

        this.details.titre = this.accountForm.value.titre;
        this.details.matiere = this.accountForm.value.matiere;

        this.details.fullname = this.personalForm.value.firstname + ' ' + this.personalForm.value.lastname;
        this.details.date = this.personalForm.value.date;
    }

    public prev() {
        if (this.steps[0].active) {
            return false;
        }
        this.steps.some(function (step, index, steps) {
            if (index != 0) {
                if (step.active) {
                    step.active = false;
                    steps[index - 1].active = true;
                    return true;
                }
            }
        });
    }

    public confirm() {
        this.steps.forEach(step => step.valid = true);
        this.confirmed = true;
    }


}
