import { Component, Input } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Note } from '../note';
import { NotesService } from '../services/notes.service'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input() note: Note;
  constructor(private routerService: RouterService, private notesService: NotesService) { }
  openEditView(noteID: number) {
    console.log(this.note.noteId);
    this.routerService.routeToEditNoteView(this.note.noteId);
   }

   deleteNote(noteId: number) {
     console.log(this.note.noteId);
     this.notesService.deleteNote(noteId).subscribe(
       (msg) => console.log("msg = "+msg),
     (error) => console.log("error = "+error)
    );
   }

 
}
