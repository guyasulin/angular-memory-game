import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardData } from '../models/game-card';

@Injectable({
  providedIn: 'root'
})
export class GameCardService {

  constructor(private http: HttpClient) { }

  getCards(): Observable<CardData> {
    return this.http.get<CardData>('https://dev-bot.pico.buzz/memory');
  }
}
