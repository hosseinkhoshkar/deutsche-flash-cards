import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Phrase} from '../interfaces/phrase';
import {DatePipe, NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  imports: [
    NgClass,
    DatePipe,
    RouterLink
  ]
})
export class AccordionComponent {
  @Input() items:Phrase[] = []
  @Output() deleteRow = new EventEmitter<string>()
  // Track expanded index
  expandedIndex: number | null = null;


  // Toggles the accordion panel
  togglePanel(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  deleteItem(item: Phrase) {
    if (item.id != null) {
      this.deleteRow.emit(item.id);
    }
  }
}
