import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmojiApiService } from '../../services/emoji-api.service';
import { HomeComponent } from '../home/home.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-emojis',
  standalone: true,
  imports: [CommonModule, HomeComponent, FormsModule],
  templateUrl: './emojis.component.html',
  styleUrl: './emojis.component.scss'
})
export class EmojisComponent implements OnInit {

  constructor(protected emoji: EmojiApiService) { }
  ngOnInit(): void {
    this.getEmojiCategories()
  }

  @Input() emojiVisible: boolean = true

  addEmojiOnInput = (emoji: any) => {
    let msgInput: HTMLInputElement | null = document.querySelector(".msg")
    if (msgInput) {
      msgInput.value += emoji.character
    }
  }

  protected searchString = ""
  protected category = ""
  protected emojiIsPresent = false

  searchEmoji = () => {
    this.emoji.getEmojiBySearch(this.searchString).subscribe({
      next: data => {
        this.emoji.emojiCollection = data
      },
      error: err => console.log(err)
    })
  }

  getEmojiCategories = () => {
    this.emoji.getCategories().subscribe({
      next: data => {
        this.emoji.emojiCategories = data
      }
    })
  }

  getEmojiByCategories = (category: any) => {
    this.emoji.getEmojiInCategories(category.slug).subscribe({
      next: data => {
        this.emoji.emojiCollection = data
      }
    })
  }
}
