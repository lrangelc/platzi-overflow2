import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question/question.model';
import { QuestionService } from './question.service';

// const q = new Question(
//     '¿Comó levantar un server apache?',
//     'Facil y sencillo como...',
//     new Date(),
//     'devicon-nodejs-plain'
// );

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.css'],
    providers: [QuestionService]
})

export class QuestionListComponent implements OnInit {

    constructor(private questionService: QuestionService) { }

    @Input() sort = '-createdAt';

    // questions: Question[] = new Array(15).fill(q);
    questions: Question[];
    loading = true;

    ngOnInit() {
        this.questionService.getQuestions(this.sort)
            .then((questions: Question[]) => {
                this.questions = questions;
                this.loading = false;
            });
    }
}