import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Note } from '../note';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { User } from '../user';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  users: Array<User>;
  usersSubject: BehaviorSubject<Array<User>>;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    console.log("$$$$$$ NotesService constructor");
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
  }

  fetchNotesFromServer() {
    console.log("$$$$$ NotesService fetchNotesFromServer " + `Bearer ${this.authService.getBearerToken()}`);
    return this.http.get<Note[]>('http://localhost:8082/api/v1/note/' + this.authService.getUserId(), {
      headers:
        {
          'Content-Type': 'application/json'
          , 'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${this.authService.getBearerToken()}`
        }

    }).subscribe(notesres => {
      console.log('Note Res' + JSON.stringify(notesres));
      this.notes = notesres;
      console.log('fetchfs notes data' + JSON.stringify(this.notes));
      this.notesSubject.next(this.notes);
    },
      (err: any) => {
        this.notesSubject.error(err);
      }
    );
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    console.log("$$$$$$ NotesService getNotes");
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    console.log("$$$$$$ NotesService addNote " + note);
    return this.http.post<Note>('http://localhost:8082/api/v1/note', note, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(addedNote => {
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    });
  }

  addUser(user: User) {
    console.log("addUser "+ user.userId);
    return this.http.post<User>('http://localhost:8089/api/v1/auth/register', user).subscribe(data => {
      console.log("Registration Success!" + data);
    },
    (error: any) => {
      this.errorHandler(error);
    });
  }

  editNote(note: Note): Observable<Note> {
    console.log("$$$$$$ NotesService editNote " + note.noteTitle + " --- " + note.noteContent);
    return this.http.put<Note>(`http://localhost:8082/api/v1/note/${this.authService.getUserId()}/${note.noteId}`, note, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(addedNote => {
      const selectedNote = this.notes.find((currentNote) => currentNote.noteId === addedNote.noteId);
      console.log(selectedNote.noteTitle + " -- " + selectedNote.noteContent +
        " --- " + addedNote.noteTitle + " -- " + addedNote.noteContent);
      Object.assign(selectedNote, addedNote);
      this.notesSubject.next(this.notes);
    });
  }

  getNoteById(noteId: number): Note {
    console.log("$$$$$$ NotesService getNoteById " + noteId);
    const foundnote = this.notes.find(note => note.noteId === noteId);
    return foundnote;
  }

  /** DELETE: delete the hero from the server */
  deleteNote(noteId: number): Observable<any> {
    console.log("&&&&&&& NotesService deleteNote " + noteId);
    return this.http.delete(`http://localhost:8082/api/v1/note/delete/${this.authService.getUserId()}/${noteId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`) })
      .catch(this.errorHandler);
  }

  // deleteNote(noteId: number) {
  //   console.log("$$$$$$ NotesService deleteNote "+noteId);
  //   return this.http.delete<Note>(`http://localhost:8082/api/v1/note/delete/${this.authService.getUserId()}/${noteId}`, {
  //     headers: new HttpHeaders()
  //       .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
  //   }).subscribe(data => {
  //     console.log("Delete Success "+data);
  //   });
  // }


  errorHandler(error: HttpErrorResponse) {
    console.log(error.message);
    return Observable.throw(error.message);
  }
}

