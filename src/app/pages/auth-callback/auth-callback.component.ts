import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  template: `<p>Authenticating...</p>`,
})
export class AuthCallbackComponent implements OnInit {
  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async ngOnInit() {
    try {
      const { data: user } = await this.supabaseService.getUser();
      if (user) {
        console.log('User authenticated:', user);
        this.router.navigate(['/']); // Redirect to homepage or dashboard
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  }
}
