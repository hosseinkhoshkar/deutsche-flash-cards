import {Component, OnInit} from '@angular/core';
import {PhraseService} from '../../services/phrase.service';
import {Phrase} from '../../interfaces/phrase';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    NgClass
  ],
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  phrases:Phrase[]|undefined;
  phraseStyle:boolean=true;
  constructor(private phraseService:PhraseService) {
  }
  ngOnInit() {
    // this.phrases =
    const phrases = this.phraseService.getPhrases();
    const notSeen = phrases.filter(item => ((item.needToReview && !item.hide) || (!item.seen && !item.hide)));
    const reviewItems = phrases.filter(item => (!item.needToReview && !item.hide));

    console.log(reviewItems)
    //
    // // Shuffle each category to randomize the selections
    // const shuffledNeedToReview = this.shuffleArray(notSeen);
    // const shuffledReviewed = this.shuffleArray(reviewItems);
    //
    // // Select 10 items from each category
    // const selectedNeedToReview = shuffledNeedToReview.slice(0, 10);
    // const selectedReviewed = shuffledReviewed.slice(0, 10);
    //
    let mergedArray = [...notSeen, ...reviewItems];
    const uniqueArray = mergedArray.filter(
      (obj, index, self) => self.findIndex(o => o.id === obj.id) === index
    );
    // Shuffle the final array to randomize order
    this.phrases = this.shuffleArray(uniqueArray);

    this.phraseStyle = this.phraseService.getPhraseStyle()

  }

  goPrevSlide() {

  }

  goNextSlide() {

  }

  reviewAgain(phrase: Phrase) {
    phrase.needToReview=!phrase.needToReview;
    phrase.hide = false;
    this.phraseService.updatePhrase(phrase);
  }

  hidePhrase(phrase: Phrase) {
    phrase.hide=!phrase.hide;
    phrase.needToReview = false;
    this.phraseService.updatePhrase(phrase);
  }

  shuffleArray(array:Array<Phrase>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  seen(phrase: Phrase) {
    phrase.seen =true
    this.phraseService.updatePhrase(phrase);
  }
}
