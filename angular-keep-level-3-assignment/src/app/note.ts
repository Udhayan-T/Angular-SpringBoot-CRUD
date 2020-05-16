import { Reminder } from "./reminder";

export class Note {
  noteId: number;
  noteTitle: string;
  noteContent: string;
  noteStatus: string;
  noteReminders: string[];
  // reminders: Array<Reminder> = [];
  noteCreationDate: Date;
  noteCreatedBy: string;

  constructor() {
    this.noteTitle = '';
    this.noteContent = '';
    this.noteStatus = '';
    // this.reminders = new Array();
    this.noteReminders = [];
  }

  // private int noteId;
	// private String noteTitle;
	// private String noteContent;
	// private String noteStatus;
	// private Date noteCreationDate;
	// private Category category;
	// private List<Reminder> reminders;
  // private String noteCreatedBy;
  
}
