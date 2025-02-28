import {Injectable} from '@angular/core';
import {Phrase} from '../interfaces/phrase';
import {v4 as uuidv4} from 'uuid';

const PHRASE_DB = "phrases_db"
const PHRASE_STYLE = "show_phrase_first"

@Injectable({
  providedIn: 'root'
})
export class PhraseService {

  constructor() {
  }

// Save the array of phrases to localStorage
  savePhrases(phrases: Phrase[]): void {
    localStorage.setItem(PHRASE_DB, JSON.stringify(phrases));
  }

  // Get all phrases from localStorage
  getPhrases(): Phrase[] {
    const phrasesJson = localStorage.getItem(PHRASE_DB);
    return phrasesJson ? JSON.parse(phrasesJson) : [];
  }

  // Get a single phrase by its title
  getPhrase(id: string): Phrase | undefined {
    const phrases = this.getPhrases();
    return phrases.find(phrase => phrase.id === id);
  }

  // Update a phrase by its title
  updatePhrase(updatedPhrase: Phrase): void {
    const phrases = this.getPhrases();
    const index = phrases.findIndex(phrase => phrase.id === updatedPhrase.id);

    if (index !== -1) {

      phrases[index] = updatedPhrase;
      this.savePhrases(phrases);
    }
  }

  // Delete a phrase by its title
  deletePhrase(id: string): void {
    const phrases = this.getPhrases().filter(phrase => phrase.id !== id);
    this.savePhrases(phrases);
  }


  savePhrase(newPhrase: Phrase): void {
    const phrases = this.getPhrases(); // Get the current list of phrases
    const index = phrases.findIndex(phrase => phrase.id === newPhrase.id);
    newPhrase.id = uuidv4();

    if (index === -1) {
      // If phrase does not exist, add it
      phrases.push(newPhrase);
    } else {
      // If phrase exists, update it
      phrases[index] = newPhrase;
    }

    this.savePhrases(phrases); // Save the updated list to localStorage
  }


  getPhraseStyle() {
    const style = localStorage.getItem(PHRASE_STYLE)

    return style ? JSON.parse(style) : true;
  }

  setPhraseStyle(style: boolean) {
    return localStorage.setItem(PHRASE_STYLE, JSON.stringify(style));
  }
}
