import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFirestore, private http: HttpClient) { }

  createUser(value: any){
    return this.db.collection('/users').add({
      nombre: value.nombre,
      correo: value.correo,
      password: value.password,
      status: value.status,
      telefono: value.telefono
    });
  }

  createLog(value: any){
    return this.db.collection("/logs").add({
      tipo: value.tipo,
      descripcion: value.descripcion
    })
  }

  searchEmail(email){
    return this.db.collection('/users',ref => ref.where('correo', '>=', email)
      .where('correo', '<=', email + '\uf8ff'))
      .snapshotChanges()  }

}
