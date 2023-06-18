import { Notes } from './../../model/notes.model';
import { Component, OnInit } from '@angular/core';
declare var $:any;


import { ApiService } from './../../api.service';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/model/api.response';
import { Users } from 'src/app/model/users.model';


@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {

  Notes:any;
  user:any;
  

  constructor(private router: Router, private apiService: ApiService) { }

  deleteNote(note):void{
    this.apiService.deleteNote(note._id).subscribe(data=>{
      this.Notes = this.Notes.filter(el=>el!==note);
    })
  }

  editNote(note):void{
    window.localStorage.removeItem('editNoteId');
    window.localStorage.setItem("editNoteId",note._id);
    this.router.navigate(['edit-note']);
  }

  addNote():void{
    this.router.navigate(['add-note']);
  }

  logout(){
    window.localStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {

    if(!window.localStorage.getItem('token')){
      this.router.navigate(['login']);
      return;
    }

    this.apiService.getNotes().subscribe(data=>{
      console.log(data);
      this.Notes= data;
    });

    let username = window.localStorage.getItem('username');
    this.apiService.getUserByUsername(username).subscribe(data=>{
      this.user = data.username;
    })

   


    $(document).ready(function(){
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

  }

}





