import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  // note: Note;
  note: Note = new Note();
  states: Array<string> = ['Not-Started', 'Started', 'Completed'];
  reminders: Array<string> = ['1am', '4am', '7am'];
  errMessage: string;
  constructor(private noteService: NotesService,
    private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }
  ngOnInit() {
    this.note = this.noteService.getNoteById(this.data.noteId);
  }
  onSave() {
    console.log("Within edit note view comp onSave ");
    console.log(this.note.noteReminders);
    this.noteService.editNote(this.note).subscribe(editNote => {
      this.dialogRef.close();
    },
      err => {
        if (err.status === 404) {
          this.errMessage = err.message;
        } else {
          this.errMessage = err.error.message;
        }
      });
  }
}
