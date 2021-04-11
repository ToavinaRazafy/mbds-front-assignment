import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {ToastrService} from 'ngx-toastr';
import {LoggingService} from '../../user/logging.service';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit{

    public router: Router;
    public form: FormGroup;
    public username: AbstractControl;
    public password: AbstractControl;

    constructor(private toastr: ToastrService, router: Router, fb: FormBuilder, public service: LoggingService) {
        this.service.logout();
        this.router = router;
        this.form = fb.group({
            'username': ['', Validators.required],
            'password': ['', [Validators.required]]
        });

        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
    }

    public onSubmit() {
        if (this.form.valid) {
            console.log('control');
            this.service.login(this.username.value, this.password.value)
                .pipe(first())
                .subscribe(
                    data => {
                        console.log('control' + data);
                        this.router.navigate(['/']);
                    },
                    error => {
                        this.toastr.error('Email ou mot de passe incorrecte', 'Erreur');
                    });
        }
    }

    ngOnInit(): void {
       // this.service.logout();
    }
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }

}
