import { RegisterComponent } from './register/register.component';
import { ListNotesComponent } from './note/list-notes/list-notes.component';
import { EditNoteComponent } from './note/edit-note/edit-note.component';
import { AddNoteComponent } from './note/add-note/add-note.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'add-note',component:AddNoteComponent},
  {path:'edit-note',component:EditNoteComponent},
  {path:'list-notes',component:ListNotesComponent},
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
