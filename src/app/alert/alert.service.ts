import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<{ message: string; type: 'success' | 'error' | 'info', duration:number }>();
  alert$ = this.alertSubject.asObservable();

  showAlert(message: string, type: 'success' | 'error' | 'info' = 'success',duration:number=5000) {
    this.alertSubject.next({ message, type,duration });
  }
}
