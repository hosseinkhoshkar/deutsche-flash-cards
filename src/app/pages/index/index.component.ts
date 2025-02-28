import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-index',
  imports: [
    RouterOutlet,
    NgClass
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  constructor(private router: Router) {}

  redirect(route:string) {
    console.log(route);
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url === `/${route}`;
  }
}
