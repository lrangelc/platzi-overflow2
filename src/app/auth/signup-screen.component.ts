import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-signup-screen',
    templateUrl: './signup-screen.component.html'

})

export class SignupScreenComponent implements OnInit {
    signupForm: FormGroup;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.signupForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            ]),
            password: new FormControl(null, Validators.required),
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            password2: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        if (this.signupForm.valid) {
            const email = this.signupForm.value.email;
            const password = this.signupForm.value.password;
            const firstName = this.signupForm.value.firstName;
            const lastName = this.signupForm.value.lastName;
            const password2 = this.signupForm.value.password2;

            if (password === password2) {
                const user = new User(email, password, firstName, lastName);

                this.authService.signup(user)
                    .subscribe(res => {
                        console.log('user signup!!!');
                        this.signupForm.reset();
                    },
                        err => {
                            console.log(err);
                        }
                    );

                // this.signupForm.reset();
            }
        }
    }

}