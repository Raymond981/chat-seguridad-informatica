import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as CryptoJS from 'crypto-js';  

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:3000';
  private socket;
  public messages:any[] = [];
  conversionEncryptOutput: string;  
  conversionDecryptOutput:string;  

  constructor() {
    this.socket = io(this.url);
    
    this.socket.on('new-message', (message) => {
      console.log("des", message.message)
      message.message = String(CryptoJS.AES.decrypt(message.message, "key").toString(CryptoJS.enc.Utf8));  
      //console.log(message.message)
      this.messages.push(message);
    });

  }

  public sendMessage(message) {
    message.message = String(CryptoJS.AES.encrypt(message.message, "key"));
    // = encrypt
    console.log(message.message)
    this.socket.emit('new-message', message);
  }  

}