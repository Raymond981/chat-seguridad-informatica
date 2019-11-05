import { Component, OnInit } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';

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
  ) {
    this.messages = this.chatService.messages;
  }

  ngOnInit() {
    //this.scrollToBottom();
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
    console.log("message");
    let messageObj = { username: localStorage.getItem('user'), message: this.message, fecha: new Date() };
    this.chatService.sendMessage(messageObj)
    this.message = '';
  }


}