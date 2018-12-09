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
    userCreated:Boolean = true;
    userList:Array<{user:String, msg:String}>= [];

    constructor(private _chatService: chatService, private _router: Router){
        this._chatService.newUserJoined().subscribe((data)=>{
            console.log('user info reached the component' + data.user);
            this.userList.push(data);
            if (this.chatName == data.user){
                this._router.navigate(['/chat', {userName: data.user}]);
            }            
        });

        this._chatService.newUserFailed().subscribe((data)=>{
            console.log('user name already exists');
            this.userCreated = false;
        })
    }

    OnSubmit(form: NgForm){
        console.log('sent from component->', form.value)
        this._chatService.createUser(form.value);
    } 

}