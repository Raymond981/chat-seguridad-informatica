import { Component, OnInit } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
 // @ViewChild('scrollBottom', { static: true }) private scrollBottom: ElementRef;


  message: string;
  messages: string[] = [];
  currentUser: any;
 constructor(
    private chatService: ChatService,
    private route: Router
  ) {
    this.messages = this.chatService.messages;
  }

  ngOnInit() {
    //this.scrollToBottom();
    if(!localStorage.getItem('user')){
      this.route.navigateByUrl("/")
    }
  }

  ngAfterViewChecked() {
    //this.scrollToBottom();
  }

 /* scrollToBottom(): void {
    try {
      this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
    } catch (err) { }
  }*/
 
  sendMessage() {
    let messageObj = { username: localStorage.getItem('user'), message: this.message, fecha: new Date() };
    this.chatService.sendMessage(messageObj)
    this.message = '';
  }


}