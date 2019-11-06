import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import * as CryptoJS from 'crypto-js';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_form: FormGroup
  logeo: any
  constructor(private formBuilder: FormBuilder, private api: FirebaseService, private route: Router) {
    this.login_form = this.formBuilder.group({
      'correo': ["", Validators.required],
      'password': ["", Validators.required]
    })
  }

  ngOnInit() {
    localStorage.clear()
  }

  login(){
    this.api.searchEmail(this.login_form.get("correo").value).subscribe(result =>{
      this.logeo = result
      if(result.length > 0){
        if(String(CryptoJS.AES.decrypt(this.logeo[0].payload.doc.data().password, "key").toString(CryptoJS.enc.Utf8)) == this.login_form.get("password").value){
          console.log("Entro")
          this.api.createLog({tipo: "Success", descripcion: "Usuario "+this.login_form.get("correo").value+" logeado correctamente", fecha: new Date()})
          localStorage.setItem("user",this.logeo[0].payload.doc.data().nombre)
          this.route.navigateByUrl("/chat")
        }else{
          console.log("Contraseña incorrecta")
          this.api.createLog({tipo: "Error", descripcion: "Contraseña para "+this.login_form.get("correo").value+" incorrecta", fecha: new Date()})
        }
      }else{
        this.api.createLog({tipo: "Error", descripcion: "Credenciales incorrectas", fecha: new Date()})
      }
    })
  }

}
