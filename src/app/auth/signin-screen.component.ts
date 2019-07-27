import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../auth/user.model';
import { AuthService } from './auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-signin-screen',
    templateUrl: './signin-screen.component.html'

})

export class SigninScreenComponent implements OnInit {
    signinForm: FormGroup;

    constructor(private authService: AuthService,
        private _snackBar: MatSnackBar) { }

    ngOnInit() {
        this.signinForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        if (this.signinForm.valid) {
            const { email, password } = this.signinForm.value;
            const user = new User(email, password, null, null);

            this.authService.signin(user)
                .subscribe(res => {
                    console.log('user signin!!!');
                },
                    err => {
                        this.handleError(err);
                    }
                );
        }
    }

    handleError(err: any) {
        const { name , message } = err;

        if (name === 'TokenExpiredError') {
            this.showError('Tu sesion ha expirado');
        } else if (name === 'JsonWebTokenError'){
            this.showError('Ha habido un problema con tu sesion');
        } else {
            this.showError(message || 'Ha ocurrido un error. Intentalo nuevamente');
        }

        console.log(err);
      }

      showError(message: string) {
        this._snackBar.open(message, 'x', {
          duration: 2000,
        });
      }

}