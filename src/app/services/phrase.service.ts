import {Injectable} from '@angular/core';
import {Phrase} from '../interfaces/phrase';
import {v4 as uuidv4} from 'uuid';

const PHRASE_DB = "phrases_db"
const READING_PHRASE_DB = "reading_phrase_db"
const PHRASE_STYLE = "show_phrase_first"
const READING_MAX_PHRASES: number = 20;

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

  saveReadingPhrases(phrases: Phrase[]) {
    localStorage.setItem(READING_PHRASE_DB, JSON.stringify(phrases));
    return phrases
  }

  // Get all phrases from localStorage
  getPhrases(): Phrase[] {
    const phrasesJson = localStorage.getItem(PHRASE_DB);
    return phrasesJson ? JSON.parse(phrasesJson) : [];
  }

  // Get Reading phrases from localStorage
  getReadingPhrases(): Phrase[] {
    const phrasesJson = localStorage.getItem(READING_PHRASE_DB);
    const phs: Phrase[] = phrasesJson ? JSON.parse(phrasesJson) : []
    if (phs.length == 0) {
      return this.generatedReadingPhrases()
    } else {
      return this.shuffleArray(phs);
    }
  }

  // Get a single phrase by its title
  getPhrase(id: string): Phrase | undefined {
    const phrases = this.getPhrases();
    return phrases.find(phrase => phrase.id === id);
  }

  // Update a phrase by its title
  updatePhrase(updatedPhrase: Phrase) {
    const phrases = this.getPhrases();
    let readingPhrases = this.getReadingPhrases();
    const readingIndex = readingPhrases.findIndex(phrase => phrase.id === updatedPhrase.id);
    const index = phrases.findIndex(phrase => phrase.id === updatedPhrase.id);
    if (index !== -1) {
      phrases[index] = updatedPhrase;
      this.savePhrases(phrases);
    }
    if (readingIndex !== -1) {
      readingPhrases[readingIndex] = updatedPhrase;
    }
    if (readingIndex !== -1) {
      if (updatedPhrase.hide === true) {

        readingPhrases = this.deleteFromReadingPhrases(updatedPhrase);
        // readingPhrases[index] = updatedPhrase;
      }else if (updatedPhrase.needToReview === true) {
        readingPhrases = this.saveReadingPhrases(readingPhrases);
      }
    }
    return readingPhrases
  }

  deleteFromReadingPhrases(phrase: Phrase) {
    let readingPhrases: Phrase[] = this.getReadingPhrases().filter(ph => ph.id !== phrase.id);
    let selectedPhrase: Phrase
    if (phrase && phrase.needToReview === true) {
      const needToReviewPhrases = this.getPhrases().filter(phrase => phrase.needToReview === true);
      const randIndex = Math.floor(Math.random() * needToReviewPhrases.length);
      if (randIndex) {
        selectedPhrase = needToReviewPhrases[randIndex];
      }
    } else {
      const newPhrases = this.getPhrases().filter(phrase => phrase.needToReview === false);
      const randIndex = Math.floor(Math.random() * newPhrases.length);
      if (randIndex) {
        selectedPhrase = newPhrases[randIndex];
      }
    }
    // @ts-ignore
    if (!selectedPhrase) {
      const allPhrases = this.getPhrases();
      const randIndex = Math.floor(Math.random() * allPhrases.length);
      selectedPhrase = allPhrases[randIndex];
    }
    const haveThisPhrase = readingPhrases.findIndex(phrase => phrase.id === selectedPhrase.id);
    if (haveThisPhrase<0) {
      readingPhrases.push(selectedPhrase)
    }
    return this.saveReadingPhrases(readingPhrases)

  }

  // Delete a phrase by its title
  deletePhrase(id: string): void {
    const phrase = this.getPhrase(id);
    const phrases = this.getPhrases().filter(phrase => phrase.id !== id);
    this.savePhrases(phrases);
    if (phrase) {
      this.deleteFromReadingPhrases(phrase);
    }
  }


  savePhrase(newPhrase: Phrase): void {
    const phrases = this.getPhrases(); // Get the current list of phrases
    const index = phrases.findIndex(phrase => phrase.id === newPhrase.id);
    newPhrase.id = uuidv4();

    if (index === -1) {
      // If phrase does not exist, add it
      phrases.push(newPhrase);
      const readingPhrases = this.getReadingPhrases();
      if (readingPhrases.length < READING_MAX_PHRASES) {
        readingPhrases.push(newPhrase);
        this.saveReadingPhrases(readingPhrases);
      }
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

  generateMockPhrases(): Phrase[] {
    const phrases: Phrase[] = [];
    for (let i = 0; i < 100; i++) {
      const currentDate = new Date();
      phrases.push({
        id: uuidv4(),
        title: `Title ${i + 1}`,
        description: `Description for phrase ${i + 1}.`,
        example: `Example usage of phrase ${i + 1}.`,
        seen: false,
        needToReview: false,
        hide: false,
        isOpen: false,
        createdAt: currentDate,
        updatedAt: currentDate,
      });
    }
    return phrases;
  }

  private generatedReadingPhrases() {
    const phrases = this.getPhrases();
    const reviewItems = phrases.filter(item => (item.needToReview && !item.hide));
    const notSeen = phrases.filter(item => (!item.needToReview && !item.hide));

    const shuffleReviewItems = this.shuffleArray(reviewItems).slice(0, 10);
    const shuffleNotSeenItems = this.shuffleArray(notSeen).slice(0, READING_MAX_PHRASES - shuffleReviewItems.length);

    let mergedArray = [...shuffleReviewItems, ...shuffleNotSeenItems];
    this.saveReadingPhrases(mergedArray);
    return this.shuffleArray(mergedArray);
  }


  shuffleArray(array: Array<Phrase>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
