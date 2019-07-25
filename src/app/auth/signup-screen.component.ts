import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { User } from './user.model';

@Component({
    selector: 'app-signup-screen',
    templateUrl: './signup-screen.component.html'

})

export class SignupScreenComponent implements OnInit {
    signupForm: FormGroup;

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
                console.log(user);
                this.signupForm.reset();
            }
        }
        console.log('si entre');
    }

}