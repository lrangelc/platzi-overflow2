import { Component, OnInit,OnDestroy } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from './question.service';
import { ActivatedRoute } from '@angular/router';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.css'],
    providers: [QuestionService]
})

export class QuestionDetailComponent implements OnInit, OnDestroy {
    // question: Question = new Question(
    //     'Esta es una nueva pregunta sobre Android',
    //     'Tengo una duda con una aplicacion...',
    //     new Date,
    //     'devicon-android-plain'
    // );
    question?: Question;
    loading = true;
    sub: any;

    constructor(private questionService: QuestionService,
        private route: ActivatedRoute) {
            // this.question = new Question('','',new Date(),'');
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.questionService.getQuestion(params.id)
                .then((question: Question) => {
                    this.question = question;
                    this.loading = false;
                });
        });
    }


    ngOnDestroy(){
        this.sub.unsubscribe();
    }
}