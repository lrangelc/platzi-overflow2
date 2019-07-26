import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

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

    // XgetQuestion(id): Observable<Question[]> {
    //     let url = urljoin(environment.apiUrl, 'question');
    //     url = urljoin(url, id);
        
    //     return this.http.get(url)
    //         .pipe(
    //             map( res => {
    //                 return res as Question[]
    //             })
    //         );
    // }

    handleError(error: any) {
        const errMsg = error.message ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg);
    }
}