import {Component, OnInit} from '@angular/core';
import {Phrase} from '../../interfaces/phrase';
import {PhraseService} from '../../services/phrase.service';
import {Router, RouterLink} from '@angular/router';
import {AccordionComponent} from '../../accordion/accordion.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-database',
  imports: [
    RouterLink,
    AccordionComponent,
  ],
  templateUrl: './database.component.html',
  styleUrl: './database.component.css'
})
export class DatabaseComponent implements OnInit {

  phrases:Phrase[] = [];
  needsToReviewsPhrases:Phrase[] = [];
  hiddenPhrases:Phrase[] = [];
  newPhrases:Phrase[] = [];

  constructor(private phraseService:PhraseService,private router: Router) {
  }

  ngOnInit() {
    this.phrases=this.phraseService.getPhrases();
    this.needsToReviewsPhrases=this.phrases.filter(item => item.needToReview);
    this.hiddenPhrases=this.phrases.filter(item => item.hide);
    this.newPhrases=this.phrases.filter(item => item.needToReview && !item.hide);
  }

  toggleAccordion(index: number) {
    this.phrases[index].isOpen = this.phrases[index].isOpen?!this.phrases[index].isOpen:true;
  }

  deletePhrase($event: string) {
    Swal.fire({
      icon: "error",
      theme:'dark',
      text: "Do you want to Delete This Phrase?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.phraseService.deletePhrase($event)
        this.phrases = this.phrases.filter(phrase => phrase.id !== $event);
      }
    });

  }
}
