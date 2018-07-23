import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {QuestionComponent} from './question/question.component';
import {PollComponent} from './poll/poll.component';




/*Routes for routing module*/
const routes: Routes = [
  {path: '' , component: QuestionComponent},
  {path: 'poll/:id' , component: PollComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
