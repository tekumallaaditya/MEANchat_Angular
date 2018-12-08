import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import { chatService } from './chat.services';
import {Router} from "@angular/router";



@Component({
    selector: 'chat-app',
    templateUrl: './chat.component.html',
    styleUrls: ['../app.component.css']
})

export class chatComponent{
    chatName:String;
    userCreated:String;

    constructor(private _chatService: chatService, private _router: Router){}

    OnSubmit(form: NgForm){
        this._chatService.createUser(form.value);
    } 

}