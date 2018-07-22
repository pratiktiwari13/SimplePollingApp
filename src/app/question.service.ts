import { Injectable } from '@angular/core';

import {Question} from './question/question';
import {Observable} from 'rxjs';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import {Result} from './Result';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionUrl = 'api/question';  // URL to web api

  constructor(private http: HttpClient) { }

  /** POST: add a new question to the server */
  addQuestion (question: Question): Observable<Result> {
    return this.http.post<Result>(this.questionUrl, question, httpOptions);
  }
}
