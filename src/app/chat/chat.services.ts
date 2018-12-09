
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
            chatName : user.Cname
        }
        console.log('user name being sent -->', body)
        this._socket.emit('new user', body);
        
    }

    newUserJoined(){
        var observable = new Observable<{user:String, msg:String}>(observer =>{
            this._socket.on('user created', function(data){
                console.log('user info reached services')
                observer.next(data);
            });
            return function(){
                this._socket.disconnect();
            }            
        });
        return observable;

    }

    newUserFailed(){
        var observable = new Observable<{user:String, msg:String}>(observer =>{
            this._socket.on('user creation failed', function(data){
                console.log('user fail info reached services');
                observer.next(data);
            });
            return function(){
                this._socket.disconnect();
            }            
        });
        return observable;

    }

    sendMessage(data){
        console.log('inside the sendmessage in services ' + data.user + ' ' + data.msg)
        this._socket.emit('send message', data);

    }

    chatMessage(){
        var observable = new Observable<{user:String, msg:String}>(observer =>{
            this._socket.on('chat message', function(data){
                console.log('recieved chat message in services' + data.user);
                observer.next(data);
            });
            return function(){
                this._socket.disconnect();
            }            
        });
        return observable;

    }

    onlineUsers(){
        var observable = new Observable<Array<String>>(observer =>{
            this._socket.on('userList', function(data){
                console.log('list of users' + data[0]);
                observer.next(data);
            });
            return function(){
                this._socket.disconnect();
            }            
        });
        return observable;

    }

    userLeft(data){
        this._socket.emit('user left', data);
    }

}