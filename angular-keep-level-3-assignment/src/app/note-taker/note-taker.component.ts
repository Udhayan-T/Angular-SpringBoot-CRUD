import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit  {
  errMessage: String;
  note: Note = new Note();
  notes: Array<Note> = [];
  constructor(private noteService: NotesService, private authService : AuthenticationService) { }
  ngOnInit() {
    this.noteService.getNotes().subscribe(
      notes => this.notes = notes,
      err => this.errMessage = err.message
    );
  }
  
  takeNotes() {
    if (this.note.noteTitle && this.note.noteContent) {
      this.note.noteCreatedBy = this.authService.getUserId();
      console.log(this.note.noteTitle +"  --this.note.noteTitle - takeNotes - this.note.noteContent--  "+ this.note.noteContent);
      console.log(this.authService.getUserId() +" -- this.authService.getUserId()");
      console.log(parseInt(this.authService.getUserId()) +" -- this.authService.getUserId()");
      console.log(this.note.noteId +" -- this.note.noteId");
      console.log(this.note.noteStatus +" -- this.note.noteStatus");
      console.log(this.note.noteReminders +" -- this.note.noteReminders");
      console.log(this.note.noteCreatedBy +" -- this.note.noteCreatedBy");
      this.notes.push(this.note);
      console.log(this.note +"  -- this.note takeNotes this.notes --  "+ this.notes);
      this.noteService.addNote(this.note).subscribe(
        data => { },
        err => {
          this.errMessage = err.message;
        }
      );
      this.note = new Note();
    } else {
        this.errMessage = 'Title and Text both are required fields';
    }
  }
} 
