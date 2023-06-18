import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  onSubmit(){
    //console.log(this.addForm.value);
    this.apiService.createNote(this.addForm.value).subscribe(data=>{
      this.router.navigate(['list-notes']);
    });
  }



  ngOnInit(): void {

    this.addForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [Date.now(), Validators.required]
    });
  }

}






  

