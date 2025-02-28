import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.supabaseService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/dashboard']); // Redirect to index page if logged in
      return false;
    }
    return true; // Allow access if not logged in
  }
}
