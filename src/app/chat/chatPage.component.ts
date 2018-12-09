import {Component, OnInit, OnDestroy} from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
import { chatService } from './chat.services';


@Component({
    selector: 'chat-Page',
    templateUrl: './chatPage.component.html',
    styleUrls: ['../app.component.css']
})

export class chatPageComponent implements OnInit{
    userName:String;
    userMessage:String;
    chatMessages:Array<{user:String, msg:String}>= [];
    onlineUserList:Array<String>=[];

    constructor(private _actRoute: ActivatedRoute, private _router:Router, private _chatSerice: chatService){
        this._chatSerice.chatMessage().subscribe((data)=>{
            this.chatMessages.push(data);
        });

        this._chatSerice.onlineUsers().subscribe((data)=>{
            this.onlineUserList = [];
            console.log('online users component->' + data[0])
             for (let i = 0; i< data.length ; i++){
                console.log('online users component loop->' + data[i])
                this.onlineUserList.push(data[i]);
            } 
            
        })
    }

    ngOnInit(){
        this.userName = this._actRoute.snapshot.paramMap.get('userName');

    }

    ngOnDestroy(){
        console.log('destroy socket')
        this._chatSerice.userLeft({user: this.userName});
    }

    sendMessage(form: NgForm){
        console.log('message in component-->' + form.value.message);
        this._chatSerice.sendMessage({user: this.userName, msg: this.userMessage});
        form.reset();
    }

}