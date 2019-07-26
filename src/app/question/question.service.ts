import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export class QuestionService {
    private questionsUrl: string;

    constructor(private http: HttpClient) {
        this.questionsUrl = urljoin(environment.apiUrl, 'questions');
    }

    getQuestions(): Promise<void | Question[]> {
        return this.http.get(this.questionsUrl)
            .toPromise()
            .then(response => JSON.parse(JSON.stringify(response as Question[])))
            .catch(this.handleError);
    }

    getQuestion(id): Promise<void | Question> {
        let url = urljoin(environment.apiUrl, 'question');
        url = urljoin(url, id);

        return this.http.get(url)
            .toPromise()
            .then(response => JSON.parse(JSON.stringify(response as Question)))
            .catch(this.handleError);
    }

    addQuestion(question: Question): Observable<Question> {
        const body = JSON.stringify(question);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(this.questionsUrl, body, { headers })
            .pipe(
                map(res => {
                    return res as Question
                }),
                catchError((error: Response) => throwError(error.json()))
            );
    }
    handleError(error: any) {
        const errMsg = error.message ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg);
    }
}