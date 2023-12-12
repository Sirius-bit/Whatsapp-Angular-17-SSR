import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/envirionments';

@Injectable({
  providedIn: 'root'
})
export class EmojiApiService {
  constructor(private http: HttpClient) { }

  public emojiCollection: any[] = []
  public emojiCategories: any[] = []

  getEmojis = (): Observable<any> => {
    return this.http.get(`../../assets/mock/emojis.json`)
  }

  getEmojiBySearch = (string: string): Observable<any> => {
    return this.http.get(`${environment.searchEmojiByString}${string}&access_key=${environment.keyEmoji}`)
  }

  getCategories = (): Observable<any> => {
    return this.http.get(`../../assets/mock/categories.json`)
  }

  getEmojiInCategories = (category: string): Observable<any> => {
    console.log(category);

    return this.http.get(`${environment.emojisInCategory}${category}?access_key=${environment.keyEmoji}`)
  }
}
