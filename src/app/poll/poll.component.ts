import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Question} from '../question/question';
import {PollService} from '../poll.service';
import {st} from '@angular/core/src/render3';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  constructor(private route: ActivatedRoute, private location: Location, private pollService: PollService) { }

  question: Question;

  selectedOption = -1;

  ngOnInit() {
    // this.getId();
    this.question = {value: 'a nice question', options: [{value: 'a nice answer'} , {value: 'again nice answer'}]};
  }

  getId(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pollService.getPollQuestion(id)
      .subscribe(question => this.question = question);
  }

  changeSelection(i) {
    this.selectedOption = i;
  }

  onSubmit() {
    console.log(this.selectedOption);
  }

}
