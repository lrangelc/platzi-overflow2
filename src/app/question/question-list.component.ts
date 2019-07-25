import { Component } from '@angular/core';
import { Question } from '../question/question.model';

const q = new Question(
    '¿Comó levantar un server apache?',
    'Facil y sencillo como...',
    new Date(),
    'devicon-nodejs-plain'
);

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styles: [`
      i {
        font-size: 40px;
      }
      
    mat-icon.help {
        width 40px !important;
        height: 40px !important;
        padding: 0 !important;
        font-size: 40px !important;
      }`]
})

export class QuestionListComponent {
    questions: Question[] = new Array(15).fill(q);
}