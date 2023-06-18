import { Notes } from './model/notes.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {ApiResponse} from './model/api.response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  

  constructor(private http:HttpClient) { }

  baseUrl:string = 'http://localhost:8040/notes/' ;

  login(loginPayload):Observable<ApiResponse>{
    return this.http.post<ApiResponse>('http://localhost:8040/users/'+'login',loginPayload);
  }

  register(registerData):Observable<ApiResponse>{
    return this.http.post<ApiResponse>('http://localhost:8040/users/register',registerData);
  }

  getNotes():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getNotesOfLoggedInUser():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getNotesById(id:string):Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl+id);
  }

  getUserByUsername(username:string):Observable<ApiResponse>{
    return this.http.get<ApiResponse>('http://localhost:8040/users/'+username);
  }

  createNote(note:Notes):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.baseUrl+'add',note);
  }

  updateNote(note:any):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.baseUrl+'update/'+note.id,note);
  }

  deleteNote(id:number):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(this.baseUrl+id);
  }

}
