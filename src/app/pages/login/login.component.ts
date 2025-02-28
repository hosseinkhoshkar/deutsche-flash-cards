import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule
  ]
})
export class LoginComponent {
  email = '';

  constructor(private supabaseService: SupabaseService) {}

  async signInWithGoogle() {
    try {
      await this.supabaseService.signInWithOAuth('google');
    } catch (error) {
      console.error('Error with Google login:', error);
    }
  }
}
