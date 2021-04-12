import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService, GlobalConfig} from 'ngx-toastr';
import {Assignment, Matiere} from './assignment.model';
import {matieres} from './matieres';
import {AssignmentsService} from './assignments.service';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-membership',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AssignmentsComponent implements OnInit {

    public assignments: Assignment[];
    public assignment: Assignment;
    public searchText: string;
    public p: any;
    public type: string = 'grid';
    public modalRef: NgbModalRef;
    public form: FormGroup;
    public genders = ['male', 'female'];
    public genderOption: string;
    public options: GlobalConfig;
    public matiereList: Matiere[] = []
    public matiere: Matiere;
    public subs = new Subscription();
    left = [];
    right = [];

    constructor(public fb: FormBuilder,
                public toastrService: ToastrService,
                public membershipService: AssignmentsService,
                public modalService: NgbModal, private dragulaService: DragulaService) {
        this.options = this.toastrService.toastrConfig;
        this.matiereList = matieres;

        this.dragulaService.createGroup('bag-1', {
            copyItem: (ass: Assignment) => {
                return ass;
            },
        });

    }

    ngOnInit() {
        this.getAssignments();
        this.form = this.fb.group({
            _id: null,
            nom: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            auteur: null,
            matiere: null,
            matiereimage: null,
            dateDeRendu: null,
            note: null,
            remarques: null,
            rendu: null,
            image: null,
            __v: null
        });
        this.dragulaService.dropModel('bag-1').subscribe(args => {
            console.log(args);
        });
    }

    public getAssignments(): void {
        this.membershipService.getAssignments().subscribe(assignments => {
            this.assignments = assignments.docs
            this.left.push(this.assignments[0]);
            this.right.push(this.assignments[1]);
        });
    }

    public addAssignment(assignment: Assignment) {
        this.membershipService.addAssignment(assignment).subscribe(assignment => {
            this.getAssignments();
        });
    }

    public updateAssignment(assignment: Assignment) {
        if (assignment.note !== '') {
            assignment.rendu = true;
        }
        this.matiere = this.matiereList.filter(value => value.matiere === assignment.matiere)[0];
        assignment.matiereimage = this.matiere.matiereimage;
        assignment.image = this.matiere.image;
        this.membershipService.updateAssignment(assignment).subscribe(assignment => {
            this.getAssignments()
        }, (error) => {
            console.log(error);
        }, () => {
            this.toastrService.success('Modification avec succes!');
        });
    }

    public deleteAssignment(assignment: Assignment) {
        this.membershipService.deleteAssignment(assignment).subscribe(assignment =>
                this.getAssignments()
            , (error) => {
                console.log(error);
            }, () => {
                this.toastrService.success('Suppression avec succes!');
            });
    }

    public toggle(type) {
        this.type = type;
    }

    public openMenuAssign(event) {
        let parent = event.target.parentNode;
        while (parent) {
            parent = parent.parentNode;
            if (parent.classList.contains('content')) {
                parent.classList.add('flipped');
                parent.parentNode.parentNode.classList.add('z-index-1');
                break;
            }
        }
    }

    public closeMenuAssign(event) {
        let parent = event.target.parentNode;
        while (parent) {
            parent = parent.parentNode;
            if (parent.classList.contains('content')) {
                parent.classList.remove('flipped');
                parent.parentNode.parentNode.classList.remove('z-index-1');
                break;
            }
        }
    }


    public openModal(modalContent, assignment) {
        if (assignment) {
            this.assignment = assignment;
            this.form.setValue(assignment);
        } else {
            this.assignment = new assignment();
        }
        this.modalRef = this.modalService.open(modalContent, {container: '.app'});

        this.modalRef.result.then((result) => {
            this.form.reset();
            this.genderOption = null;
        }, (reason) => {
            this.form.reset();
            this.genderOption = null;
        });
    }

    public closeModal() {
        this.modalRef.close();
    }

    public onSubmit(assignment: Assignment): void {
        if (this.form.valid) {
            if (assignment._id) {
                this.updateAssignment(assignment);
            } else {
                this.addAssignment(assignment);
            }
            this.modalRef.close();
        }
    }

    drag(_id: string) {
        console.log('sss ' + _id);
    }
}
