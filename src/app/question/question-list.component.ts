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
    styleUrls: ['./question-list.component.css']
})

export class QuestionListComponent {
    questions: Question[] = new Array(15).fill(q);
}