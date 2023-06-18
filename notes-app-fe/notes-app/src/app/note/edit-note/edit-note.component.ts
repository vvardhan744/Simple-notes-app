import { Notes } from './../../model/notes.model';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../api.service';
import {first} from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  note:Notes;
  editForm:FormGroup;


  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  onSubmit(){
    this.apiService.updateNote(this.editForm.value).pipe(first()).subscribe(data=>{
      if(data){
        alert('Note updated successfully.');
        this.router.navigate(['list-notes']);
      }else {
        alert('Note Couldn\'t be updated!');
        console.error(`Note Couldn't be Updated! Error Occured.`);

      }
    },error=>{
      alert(error);
    });
  }



  ngOnInit(): void {

    let noteId = window.localStorage.getItem("editNoteId");
    if(!noteId) {
      alert("Invalid action.")
      this.router.navigate(['list-notes']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
    this.apiService.getNotesById(noteId)
      .subscribe( data => {
        //console.log(data);
        this.editForm.setValue({id:data._id,title:data.title,description:data.description,date:data.date});

        
      });

  }

}




