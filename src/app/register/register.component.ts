import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';  
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  create_user:FormGroup

  constructor(private formBuilder: FormBuilder, private route: Router, private api: FirebaseService) {
    this.create_user = this.formBuilder.group({
      'nombre': ["", Validators.required],
      'correo': ["", Validators.required],
      'password': ["", Validators.required],
      'password2': ["", Validators.required],
      'telefono': ["", Validators.required],
      'status': [0, Validators.required]
    })
  }

  ngOnInit() {
  }

  crearUsuario(){
    let user = {
      nombre: this.create_user.get("nombre").value,
      correo: this.create_user.get("correo").value,
      password: String(CryptoJS.AES.encrypt(this.create_user.get("password").value, "key")),
      telefono: this.create_user.get("telefono").value,
      status: 0
    }
    console.log(user)

    this.api.searchEmail(user.correo).subscribe(result =>{
      if(result.length > 0){
        this.api.createLog({tipo: "Error", descripcion: "El correo "+user.correo+" ya se encuentra en nuestro sistema."})
      }else{
        this.api.createUser(user).then(result =>{
          this.api.createLog({tipo: "Success", descripcion: "Usuario "+user.correo+" registrado correctamente"})
          localStorage.setItem("user", user.nombre)
          this.route.navigateByUrl("/chat")
        }, error =>{
          console.log(error)
        })
      }
    })

  }


  login(){
    this.route.navigateByUrl("/")
  }  

}
