import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from './question.model';
import icons from './icons';

@Component({
    selector: 'app-question-form',
    templateUrl: './question-form.component.html',
    styles: [`
    i {
        font-size: 48px;
    }
    
    small {
        display: block;
    }

    .enviar {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 2;
        background-color: white;
        border-top: 1px solid #dcdcdc;
        text-align: center;
        padding: 10px;
    }

    .enviar button {
        width: 70%;
        
    }

    .iconos {
        padding-bottom: 150px;
    }
    `]
})

export class QuestionFormComponent {
    icons: Object[] = icons;

    getIconVersion(icon: any) {
        let version = '';

        if (icon.versions.font.includes('plain-wordmark')) {
            version = 'plain-wordmark';
        } else {
            version = icon.versions.font[0];
        }

        return version;
    }

    onSubmit(form: NgForm) {
        const q = new Question(
            form.value.title,
            form.value.description,
            new Date(),
            form.value.icon
        );

        console.log(q);
    }
}