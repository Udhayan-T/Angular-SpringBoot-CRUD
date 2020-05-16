import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { NotesService } from '../services/notes.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errMessage: String;
  user : User = new User();
  users : Array<User> = [];

  constructor(private noteService: NotesService) {
    console.log("RegisterComponent called");
   }

  ngOnInit() {
    
  }


  registerUser() {
    console.log("RegisterComponent registerUser called "+this.user.userId);
    if (this.user.userId && this.user.userPassword) {
      
      this.users.push(this.user);
      this.noteService.addUser(this.user)
      // .subscribe(
      //   data => { },
      //   err => {
      //     this.errMessage = err.message;
      //   }
      // );
      this.user = new User();
    } else {
        this.errMessage = 'Title and Text both are required fields';
        console.log(this.errMessage);
    }
  }

}
