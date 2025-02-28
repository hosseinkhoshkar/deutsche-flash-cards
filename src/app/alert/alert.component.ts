import {Component, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  imports: [
    NgClass
  ],
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: string = '';
  type: 'success' | 'error' | 'info' = 'success';
  visible: boolean = false;
  duration:number=5000;

  ngOnInit(): void {
    // Auto-hide the alert after 5 seconds
    setTimeout(() => {
      this.visible = false;
    }, this.duration  ); // 5 seconds
  }

  // Manually dismiss the alert
  dismiss() {
    this.visible = false;
  }
}
