import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CardData, Images } from './models/game-card';
import { GameCardService } from './services/game-card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  cards: Images[] = [];
  flippedCards: Images[] = [];
  id: string = '';
  sub = new Subscription();
  revealedCards: any;
  card?: Images;

  constructor(private gameCardService: GameCardService) {}

  ngOnInit() {
    this.getCards();
  }

  getCards() {
    this.sub = this.gameCardService.getCards().subscribe((res) => {
      console.log(res.data.images);
      this.cards = res.data.images;
      this.cards.sort(this.shuffleArray);
      this.revealedCards = 0;
    });
  }

  shuffleArray() {
    return 0.4 - Math.random();
  }

  async cardClicked(card: Images) {
    this.revealedCards++;
    // console.log(card);

    if (this.revealedCards > 2) {
      return
    }
    // this.showCard(card.id)

    if (this.card) {
      this.showCard(card.id);
      await new Promise((r) => setTimeout(r, 500));
      // debugger
      if (card.pair_id === this.card?.id) {
        this.removeMatchCard(this.card?.id);
        // this.revealedCards = 0;
      } else {
        // setTimeout(() => {
          console.log('else card.pair_id === this.id', card.id);
          this.hideCard(card.id);
          this.hideCard(this.card?.id);
          this.card = undefined;
        // }, 1000);

          // this.showCard(card.id)
          // this.revealedCards = 0;
        }
        this.revealedCards = 0
    } else {
      this.card = card;
      console.log('else this.id', card.id);
      this.showCard(card.id);
    }
    // console.log("card.id", card.id);
    // console.log("this.id", this.id);

    // console.log(this.revealedCards);
    // }

    // if (this.id) {
    //   if ( card.pair_id === this.id) {
    //     this.removeObjectWithId(this.id);
    //   } else {
    //     this.revealedCards = 0;
    //     this.id = '';
    //   }
    // } else {
    //   this.id = card.id;
    // }
  }

  removeMatchCard(id: any) {
    this.cards = this.cards.filter((em) => em.id !== id && em.pair_id !== id);
    // this.card.id = '';
    return this.cards;
  }

  hideCard(id: string | undefined): void {
    this.cards.map((card) => (card.id === id ? (card.revealed = false) : true));
  }

  // hideCardByImageId(imageId: string): void {
  //   this.cards.map(card => card.pair_id === imageId ? card.revealed = false : true)
  // }

  showCard(id: string): void {
    console.log(id);
    this.cards.map((card) => (card.id === id ? (card.revealed = true) : true));
  }

  // isCardShown(id:string): boolean {
  //   return this.cards.find(card => card.id === id).revealed;
  // }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
