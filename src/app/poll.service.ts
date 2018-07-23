import { Injectable } from '@angular/core';
import {Question} from './question/question';
import {Result} from './Result';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private pollUrl = 'poll';  // URL to web api

  constructor(private http: HttpClient) { }

  /** GET poll question by id. Will 404 if id not found */
  getPollQuestion(id): Observable<Question> {
    const url = `${this.pollUrl}/${id}`;
    return this.http.get<Question>(url);
  }
}
