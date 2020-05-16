import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  notStartedNotes: Array<Note> = [];
  startedNotes: Array<Note> = [];
  completedNotes: Array<Note> = [];
  constructor(private notesService: NotesService) {
  }
  ngOnInit() {
    this.notesService.getNotes().subscribe(notes => {
      this.notStartedNotes = notes.filter(note => ('Not-Started' === note.noteStatus));
      this.startedNotes = notes.filter(note => ('Started' === note.noteStatus));
      this.completedNotes = notes.filter(note => ('Completed' === note.noteStatus));
      console.log(">>>>> within ListViewComponent "+notes.filter(note=>note.noteStatus).forEach(function(i){
        console.log(i);
      }));
      console.log(this.notStartedNotes);
    }, (err) => {});
  }
}
