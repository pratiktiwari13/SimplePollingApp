///<reference path="../../../node_modules/rxjs/internal/Observable.d.ts"/>
import {Component, OnInit, ViewChild} from '@angular/core';
import {AfterViewInit} from '@angular/core';
import {Question} from './question';

import {QuestionService} from '../question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, AfterViewInit {

  question: Question = {
    value: '',
    options: [{value: ''}, {value: ''}]
  };

  constructor(private questionService: QuestionService) { }


  ngOnInit() {
  }

  ngAfterViewInit() {
    // child is set
  }

  onSubmit() {
    this.addQuestion(this.question);
  }

  add_option(): void {
     this.question.options.push({value: ''});
  }

  addQuestion(question: Question): void {
    this.questionService.addQuestion(question)
      .subscribe(response => {
        console.log(response.hash);
      });
  }

  /*https://stackoverflow.com/questions/42322968/angular2-dynamic-input-field-lose-focus-when-input-changes*/
  trackByFn(index: any, item: any) {
    return index;
  }


}


