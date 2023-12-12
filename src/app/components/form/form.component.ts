import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { environment } from '../../environments/envirionments';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  userService = inject(UserService)

  profileForm = new FormGroup({
    name: new FormControl(''),
    stato: new FormControl(''),
    img: new FormControl('')
  })

  handleSubmit = () => {
    let { name, stato, img } = this.profileForm.value
    if (name && stato) {
      const fileName = img?.replace("C:\\fakepath\\", "")
      const imagePath = `${environment.linkDefaultForImg}${fileName}`
      let newUser = {
        id: this.setId(),
        name: name?.trimEnd(),
        stato: stato?.trimEnd(),
        img: this.verifyImage(img, imagePath),
        chat: ["Ciao, inizia la tua conversazione"]
      }
      try {
        Object.freeze(newUser)
        this.userService.users.push(newUser)
        this.userService.modalVisible = false
      } catch (error) {
        console.log(error)
      }
    }
  }

  setId = () => {
    let idUser: any = this.userService.users.map(user => user.id)
    let maxId = Math.max(...idUser)
    return ++maxId
  }

  verifyImage = (img: any, imgNewUser?: string) => {
    if (img) {
      let formatImage = img?.split('.')
      let end = formatImage[formatImage.length - 1]
      const validExtensions = ["jpg", "png", "svg"];
      if (validExtensions.includes(end)) {
        return imgNewUser
      }
      else {
        let img = `${environment.imgUserDefault}`
        return img
      }
    }
    else {
      let img = `${environment.imgUserDefault}`
      return img
    }
  }

  closeForm = () => {
    this.userService.modalVisible = !this.userService.modalVisible
  }
}
