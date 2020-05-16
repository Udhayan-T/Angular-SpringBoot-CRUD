import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NotesService } from './services/notes.service';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList, MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
// import { CanActivateRouteGuard } from './can-activate-route.guard';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { NoteComponent } from './note/note.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { RegisterComponent } from './register/register.component';
import { CategoryComponent } from './category/category.component';
import { ReminderComponent } from './reminder/reminder.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';

// const routes: Routes = [
//   {
//     path: 'login',
//     component: LoginComponent
//   },
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     canActivate: [CanActivateRouteGuard],
//     children: [
//       {
//         path : '',
//         redirectTo : 'view/noteview',
//         pathMatch : 'full'
//       },
//       {
//         path : 'view/noteview',
//         component : NoteViewComponent
//       },
//       {
//         path : 'view/listview',
//         component : ListViewComponent
//       },
//       {
//         path : 'note/:noteId/edit',
//         component : EditNoteOpenerComponent,
//         outlet : 'noteEditOutlet'
//       }
//     ]

//   },
//   {
//     path: '',
//     redirectTo: 'dashboard',
//     pathMatch: 'full'
//   }
// ];
@NgModule({
  declarations: [ 
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    NoteComponent,
    ListViewComponent,
    NoteTakerComponent,
    NoteViewComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    RegisterComponent,
    CategoryComponent,
    ReminderComponent
    
  ],
  imports: [ 
    BrowserModule,
    MatToolbarModule,
    MatExpansionModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    AppRoutingModule
  ],
  providers: [ RouterService, AuthenticationService, CanActivateRouteGuard, NotesService, MatNavList ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditNoteViewComponent
  ]
})

export class AppModule { }
