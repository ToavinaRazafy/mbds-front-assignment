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
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';

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
    page: number = 1;
    limit: number = 50;
    pager1: any = {};
    pager2: any = {};
    left = [];
    right = [];
    showSearch: boolean = true;
    public search: FormGroup;

    constructor(public fb: FormBuilder,
                public toastrService: ToastrService,
                public datepipe: DatePipe,
                public membershipService: AssignmentsService,
                public modalService: NgbModal, private dragulaService: DragulaService, private route: ActivatedRoute,
                private router: Router) {
        this.options = this.toastrService.toastrConfig;
        this.matiereList = matieres;

       /** this.dragulaService.createGroup('bag-1', {
            copyItem: (ass: Assignment) => {
                return ass;
            },
        });*/
        this.search = this.fb.group({
            auteur: new FormControl('', []),
            matiere: new FormControl('', [])
        });

    }

    afficheSearch() {
        if (this.showSearch) {
            this.showSearch = false;
        } else {
            this.showSearch = true;
        }
    }

    ngOnInit() {
        this.getAssignments(1);
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
        /*this.dragulaService.dropModel('bag-1').subscribe(args => {
            console.log(args);
        });*/
    }

    public getAssignments(page: number): void {
        let auteur = null;
        let matiere = null;
        if (this.search.get('auteur').value) {
            auteur = this.search.get('auteur').value.trim()
        }
        if (this.search.get('matiere').value) {
            matiere = this.search.get('matiere').value.trim()
        }

        this.membershipService.getAssignments(2, auteur, matiere, page, this.limit).subscribe(assignments => {
            this.pager1 = this.membershipService.getPager(assignments.totalDocs, page)
            this.assignments = assignments.docs
            this.left = this.assignments;
            this.membershipService.getAssignments(1, auteur, matiere, page, this.limit).subscribe(assignmentss => {
                this.pager2 = this.membershipService.getPager(assignmentss.totalDocs, page)
                this.assignments = assignmentss.docs
                this.right = this.assignments;
            });
        });
    }

    getAssignmentsNonRendu(page: number) {
        let auteur = null;
        let matiere = null;
        if (this.search.get('auteur').value) {
            auteur = this.search.get('auteur').value.trim()
        }
        if (this.search.get('matiere').value) {
            matiere = this.search.get('matiere').value.trim()
        }

        this.membershipService.getAssignments(2, auteur, matiere, page, this.limit).subscribe(assignments => {
            this.pager1 = this.membershipService.getPager(assignments.totalDocs, page)
            console.log(JSON.stringify(this.pager1));
            this.assignments = assignments.docs
            this.left = this.assignments;
        });
    }

    getAssignmentsRendu(page: number) {
        let auteur = null;
        let matiere = null;
        if (this.search.get('auteur').value) {
            auteur = this.search.get('auteur').value.trim()
        }
        if (this.search.get('matiere').value) {
            matiere = this.search.get('matiere').value.trim()
        }
        this.membershipService.getAssignments(1, auteur, matiere, page, this.limit).subscribe(assignmentss => {
            this.pager2 = this.membershipService.getPager(assignmentss.totalDocs, page)
            this.assignments = assignmentss.docs
            this.right = this.assignments;
        });
    }

    public addAssignment(assignment: Assignment) {
        this.membershipService.addAssignment(assignment).subscribe(assignment => {
            this.getAssignments(1);
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
            this.getAssignments(1)
        }, (error) => {
            console.log(error);
        }, () => {
            this.toastrService.success('Modification avec succes!');
        });
    }

    public deleteAssignment(assignment: Assignment) {
        this.membershipService.deleteAssignment(assignment).subscribe(assignment =>
                this.getAssignments(1)
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
