import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { environment } from '../../environments/envirionments';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  users = inject(UserService)

  @Input() startChat = true
  @Input() imgUser: string | undefined
  @Input() nameUser = ""
  @Input() chatUser: string[] | any = []
  @Input() informationUserChat = false
  sendImg = false
  deleteChatIcon = false
  selectedImagePath: null | string | undefined

  @Input() userSelected: EventEmitter<any> = new EventEmitter<any>()

  @Output() sendImgButton: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    const buttonForSendImg = document.querySelector('.media');
    const btnForImg = document.getElementById('btnImg');

    if (this.sendImg && btnForImg && !btnForImg.contains(event.target) &&
      buttonForSendImg && !buttonForSendImg.contains(event.target)) {
      this.sendImg = false;
    }
    this.sendImgButton.emit(this.sendImg);
  }


  @Output() imageToSend: EventEmitter<any> = new EventEmitter<any>()
  img = (event: Event, sendImg: boolean) => {
    const inputElement = event.target as HTMLInputElement
    const file = inputElement?.files?.[0]
    if (file) {
      const fileName = file.name.replace(/C:\\fakepath\\/i, "")
      this.selectedImagePath = `${environment.linkForImgToSend}${fileName}`
    }
    this.sendImg = !this.sendImg
    this.imageToSend.emit(this.selectedImagePath)
  }

  @Output() delete: EventEmitter<any> = new EventEmitter<any>()
  deleteChat = (event: Event) => {
    this.deleteChatIcon = !this.deleteChatIcon
    this.delete.emit(this.deleteChatIcon)
  }

  newChatUser = () => {
    this.users.modalVisible = !this.users.modalVisible
  }
}
