import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import {CreateQuestComponent} from './create-quest/create-quest.component';
import {TasksListComponent} from "./tasks-list/tasks-list.component";

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'new-quest', component: CreateQuestComponent },
  { path: 'tasks-list', component: TasksListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
