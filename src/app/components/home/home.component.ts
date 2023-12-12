import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HeaderComponent } from '../header/header.component';
import { EmojiApiService } from '../../services/emoji-api.service';
import { User } from '../../interfaces/interfaces';
import { EmojisComponent } from "../emojis/emojis.component";
import { FormComponent } from '../form/form.component';
import { FormsModule } from '@angular/forms';
import { min } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, HeaderComponent, EmojisComponent, FormComponent, FormsModule]
})
export class HomeComponent {
  userSelected: any
  imageToSend: any

  constructor() { }

  protected users = inject(UserService)
  protected emoji = inject(EmojiApiService)

  protected emojiVisible = false
  protected messaggio = ""
  protected optionMessage = false
  protected chatUser: any = []
  protected imgUser: string | undefined = ""
  protected nameUser = ""
  protected deleteChatIcon = false
  protected informationUserChat = false
  protected startChat = true
  protected dateNow: undefined | string
  protected sendImg = false
  protected selectedImagePath: string | null = null;


  @HostListener('click', ['$event'])
  onClick(event: any) {
    const form = document.getElementById('form')
    const iconForm = document.getElementById('icon')
    if (this.users.modalVisible && iconForm && !iconForm.contains(event.target) && form && !form.contains(event.target)) {
      this.users.modalVisible = false
    }
  }

  inizioChat = () => {
    if (this.chatUser && this.nameUser) {
      const msgInput: HTMLInputElement | null = document.querySelector(".msg")
      if (msgInput) {
        const messaggio = msgInput.value
        if (messaggio && messaggio.length > 0) {
          const oraAttuale = new Date()
          const ora = oraAttuale.getHours()
          const minuti = oraAttuale.getMinutes().toString().padStart(2, '0')
          this.dateNow = `${ora}:${minuti}`
          this.chatUser.push(messaggio)
          console.log(this.dateNow)


          const giorno = oraAttuale.getDate()
          const mese = new Intl.DateTimeFormat('it-IT', { month: 'long' }).format(oraAttuale)
          const anno = oraAttuale.getFullYear()
          this.chatUser[0] = `${giorno} ${mese} ${anno}`
          msgInput.value = ""
        }
      }
    }
  }

  getEmojis = () => {
    this.emojiVisible = !this.emojiVisible
    this.emoji.getEmojis().subscribe({
      next: data => {
        this.emoji.emojiCollection = data.slice(0, 1600)
      }
    })
  }

  mostraChat = (user?: User) => {
    if (user) {
      this.startChat = false
      this.chatUser = user.chat
      this.imgUser = user.img
      this.nameUser = user.name
      this.informationUserChat = true
    }
  }


  optionMsg = () => {
    this.optionMessage = !this.optionMessage
  }

  updateBooleanStatus = (status: boolean) => {
    this.deleteChatIcon = status
  }

  deleteChatTrash = (user?: any) => {
    const index = this.users.users.indexOf(user)

    if (index !== -1) {
      this.users.users.splice(index, 1)

      if (this.nameUser !== null) {
        this.startChat = true
        this.deleteChatData()
      }
    }
  }

  deleteChatData = () => {
    this.startChat = true
    this.chatUser = []
  }

  gifToSend = (linkImg: string, sendImg: boolean) => {
    this.selectedImagePath = linkImg
    this.chatUser.push([this.selectedImagePath])
    this.sendImg = sendImg
  }

  verifyMsg = (msg: string | string[]) => Array.isArray(msg)
}
