import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { Assignment } from './assignment.model';
import { AssignmentsService } from './assignments.service';

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
  public p:any;
  public type:string = 'grid';
  public modalRef: NgbModalRef;
  public form:FormGroup;
  public genders = ['male', 'female'];
  public genderOption:string;
  public options: GlobalConfig;

  public menuSelectSettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-secondary btn-block',
    dynamicTitleMaxItems: 0,
    displayAllSelectedText: true,
    showCheckAll: true,
    showUncheckAll: true
  };
  public menuSelectTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'menu item selected',
    checkedPlural: 'menu items selected',
    searchPlaceholder: 'Find menu item...',
    defaultTitle: 'Select menu items for assignment',
    allSelected: 'All selected',
  };
  public menuSelectOptions: IMultiSelectOption[] = [];

  constructor(public fb:FormBuilder,
              public toastrService: ToastrService,
              public membershipService:AssignmentsService,
              public modalService: NgbModal) {
    this.options = this.toastrService.toastrConfig;

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
    }
  public getAssignments(): void {
    this.membershipService.getAssignments().subscribe( assignments =>
        this.assignments = assignments.docs
    );
  }

    public addAssignment(assignment: Assignment) {
        this.membershipService.addAssignment(assignment).subscribe(assignment => {
            this.getAssignments();
        });
    }

    public updateAssignment(assignment: Assignment) {
        if( assignment.note !== ''){
            assignment.rendu = true;
        }
        this.membershipService.updateAssignment(assignment).subscribe(assignment => {
            this.getAssignments();
        });
    }

    public deleteAssignment(assignment: Assignment) {
        this.membershipService.deleteAssignment(assignment).subscribe(assignment =>
            this.getAssignments()
        );
        setTimeout(() => {
            this.toastrService.success('Assignement supprimer', 'Suppression Succes!');
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

  public closeMenuAssign(event){
    let parent = event.target.parentNode;
    while (parent){
      parent = parent.parentNode;
      if(parent.classList.contains('content')){
        parent.classList.remove('flipped');
        parent.parentNode.parentNode.classList.remove('z-index-1');
        break;
      }
    }
  }



  public openModal(modalContent, assignment) {
    if(assignment){
      this.assignment = assignment;
      this.form.setValue(assignment);
    }
    else{
      this.assignment = new assignment();
    }
    this.modalRef = this.modalService.open(modalContent, { container: '.app' });

    this.modalRef.result.then((result) => {
      this.form.reset();
      this.genderOption = null;
    }, (reason) => {
      this.form.reset();
      this.genderOption = null;
    });
  }

  public closeModal(){
    this.modalRef.close();
  }

  public onSubmit(assignment:Assignment):void {
    if (this.form.valid) {
      if(assignment._id){
        this.updateAssignment(assignment);
        setTimeout(() => {
          this.toastrService.success('Vos modifications sont enregistrés', 'Succes!');
        });
      }
      else{
        this.addAssignment(assignment);
      }
      this.modalRef.close();
    }
  }

}
