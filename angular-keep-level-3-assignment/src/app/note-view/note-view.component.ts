import { Component, OnInit } from '@angular/core';
import { Note } from './../note';
import { NotesService } from './../services/notes.service';
@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  notes: Array<Note> = [];
  errMessage: string;
  constructor(private noteService: NotesService) { }
  ngOnInit() {
    console.log("Within NoteViewComponent ngOninit ");
    this.noteService.getNotes().subscribe(
      result => this.notes = result,
      err => {
        console.log("Within NoteViewComponent ngOninit error ");
        this.errMessage = err.error.message;
      }
    );
  }
}
