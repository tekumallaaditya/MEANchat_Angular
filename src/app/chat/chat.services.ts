
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import{Observable} from 'rxjs';  
import { map, catchError } from 'rxjs/operators';
import {user} from './chat.models';

@Injectable()

export class chatService{
    userCreated:Boolean;

    private _url = "http://localhost:8080/adduser";
    private _socket = io("http://localhost:8080");
    //constructor (private _socket: HttpClient){}

    createUser(user){
        const body: user = {
            chatName : user.chatName
        }
        this._socket.emit('new user', body.chatName);
        
    }

    newUserJoined(){
        
    }

}