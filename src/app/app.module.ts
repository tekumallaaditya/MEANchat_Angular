import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import{RouterModule} from '@angular/router';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { chatComponent } from './chat/chat.component';
import { chatService } from './chat/chat.services';
import { chatPageComponent } from './chat/chatPage.component';

@NgModule({
  declarations: [
    AppComponent,
    chatComponent,
    chatPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'', redirectTo: '/entry', pathMatch: 'full'},
      {path: 'entry', component:chatComponent},
      {path: 'chat', component:chatPageComponent}
    ])
    
  ],
  providers: [chatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
