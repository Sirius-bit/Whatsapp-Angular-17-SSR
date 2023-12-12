import { Injectable } from '@angular/core';
import { environment } from '../environments/envirionments';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  modalVisible = false

  users: User[] = [
    {
      id: 1,
      name: "Mario Rossi",
      stato: "Hi! I'm using whatsapp",
      img: `${environment.imgUserDefault}`,
      chat: ["Ciao, inizia la tua conversazione"]
    },
    {
      id: 2,
      name: "Giuseppe Verdi",
      stato: "Hi! I'm using whatsapp",
      img: `${environment.imgUserDefault}`,
      chat: ["Ciao, inizia la tua conversazione"]
    },
    {
      id: 3,
      name: "Laura Bianchi",
      stato: "Hi! I'm using whatsapp",
      img: `${environment.imgUserDefault}`,
      chat: ["Ciao, inizia la tua conversazione"]
    }
  ]
}
