import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Answer } from '../answer/answer.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export class QuestionService {
    private questionUrl: string;

    constructor(private http: HttpClient) {
        this.questionUrl = urljoin(environment.apiUrl, 'questions');
    }

    getQuestions(): Promise<void | Question[]> {
        return this.http.get(this.questionUrl)
            .toPromise()
            .then(response => JSON.parse(JSON.stringify(response as Question[])))
            .catch(this.handleError);
    }

    getQuestion(id): Promise<void | Question> {
        const url = urljoin(this.questionUrl, id);

        return this.http.get(url)
            .toPromise()
            .then(response => JSON.parse(JSON.stringify(response as Question)))
            .catch(this.handleError);
    }

    addQuestion(question: Question): Observable<Question> {
        const body = JSON.stringify(question);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.questionUrl + this.getTokeParam();

        return this.http.post(url, body, { headers })
            .pipe(
                map(res => {
                    return res as Question
                }),
                // catchError((error: Response) => throwError(error.json()))
                catchError((error: Response) => throwError(error))
            );
    }

    addAnswer(answer: Answer): Observable<Answer> {
        const a = {
            description: answer.description,
            question: {
                _id: answer.question._id
            }
        };
        const body = JSON.stringify(a);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = urljoin(this.questionUrl, answer.question._id.toString(), 'answers');

        return this.http.post(url + this.getTokeParam(), body, { headers })
            .pipe(
                map(res => {
                    return res as Answer
                }),
                // catchError((error: Response) => throwError(error.json()))
                catchError((error: Response) => throwError(error))
            );
    }

    getTokeParam() {
        const token = localStorage.getItem('token');

        return `?token=${token}`;
    }

    handleError(error: any) {
        const errMsg = error.message ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg);
    }
}