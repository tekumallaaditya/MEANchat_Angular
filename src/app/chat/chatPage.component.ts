import {Component, OnInit} from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'chat-Page',
    templateUrl: './chatPage.component.html',
    styleUrls: ['../app.component.css']
})

export class chatPageComponent implements OnInit{
    userName:String;

    constructor(private _actRoute: ActivatedRoute, private _router:Router){}

    ngOnInit(){
        this.userName = this._actRoute.snapshot.paramMap.get('name');
        
    }

}