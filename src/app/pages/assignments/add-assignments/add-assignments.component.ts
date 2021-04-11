import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {matieres} from '../matieres';
import {Menu} from '../../../theme/components/menu/menu.model';
import {horizontalMenuItems} from '../../../theme/components/menu/menu';
import {Assignment, Matiere} from '../assignment.model';
import {DatePipe} from '@angular/common';
import {AssignmentsService} from '../assignments.service';
import {ToastrService} from 'ngx-toastr';

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
    public assignment: Assignment;
    public matiere: Matiere;
    public showConfirm: boolean;
    public confirmed: boolean;
    public matiereList: Matiere[] = []
    private rendu: any;

    constructor(private formBuilder: FormBuilder, public datepipe: DatePipe, public service: AssignmentsService, public toastrService: ToastrService,) {
        this.matiereList = matieres;
        this.assignment = new Assignment();
        let password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]));
        let confirmPassword = new FormControl('', Validators.compose([Validators.required, CustomValidators.equalTo(password)]));

        this.steps = [
            {name: 'Information du devoir', icon: 'fa-lock', active: true, valid: false, hasError: false},
            {name: 'Information sur l\'auteur', icon: 'fa-user', active: false, valid: false, hasError: false},
            {name: 'Confirmation', icon: 'fa-check-square-o', active: false, valid: false, hasError: false}
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

    public getMatieres(): Array<Matiere> {
        return matieres;
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
                    if (step.name == 'Information sur l\'auteur') {
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
        this.assignment.nom = this.accountForm.value.titre;
        this.assignment.auteur = this.personalForm.value.firstname + ' ' + this.personalForm.value.lastname;
        this.assignment.note = '';
        this.assignment.remarques = '';
        this.assignment.rendu = false;
        if (this.personalForm.value.date) {
            console.log(this.personalForm.value.date);
            const date = new Date(this.personalForm.value.date);
            this.assignment.dateDeRendu = date;
            console.log(this.assignment.dateDeRendu)
            this.rendu = this.datepipe.transform(this.assignment.dateDeRendu, 'yyyy-MM-dd');
            console.log('renduuuu '+this.rendu);
        }

        this.assignment.matiere = this.accountForm.value.matiere;
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
        this.matiere = this.matiereList.filter(value => value.matiere === this.assignment.matiere)[0];
        this.assignment.matiereimage = this.matiere.matiereimage;
        this.assignment.image = this.matiere.image;
        this.service.addAssignment(this.assignment)
            .subscribe((data) => {
                console.log('ok');
            }, (error) => {
                console.log(error)
            }, () => {
                this.toastrService.success('Assignment enregistré avec succès');
            });
        ;
    }


}
