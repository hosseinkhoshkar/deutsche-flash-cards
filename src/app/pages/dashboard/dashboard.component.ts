import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
  constructor(private phraseService:PhraseService,private ref: ChangeDetectorRef) {
  }
  ngOnInit() {
    // this.phrases =
    this.phrases = this.phraseService.getReadingPhrases();
    this.phraseStyle = this.phraseService.getPhraseStyle()

  }

  reviewAgain(phrase: Phrase) {
    phrase.needToReview=!phrase.needToReview;
    phrase.hide = false;
    this.phraseService.updatePhrase(phrase);
  }

  hidePhrase(phrase: Phrase) {
    phrase.hide=!phrase.hide;
    phrase.needToReview = false;
    this.phrases = this.phraseService.updatePhrase(phrase);
  }



  seen(phrase: Phrase) {
    phrase.seen=true
    this.phraseService.updatePhrase(phrase);
  }
}
