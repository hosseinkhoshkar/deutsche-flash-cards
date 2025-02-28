import { Injectable } from '@angular/core';
import {AuthChangeEvent, AuthSession, createClient, Session, SupabaseClient, User} from '@supabase/supabase-js';
import {environment} from '../../environments/environment';
import {Profile} from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Sign in using OAuth (e.g., Google, GitHub)
  signInWithOAuth(provider: 'google') {
    return this.supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` }, // Redirect user after login
    });
  }


  // Get the authenticated user
  async getUser() {
    return await this.supabase.auth.getUser();

  }

  // Sign out
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  // Check if the user is logged in
  async isLoggedIn(): Promise<boolean> {
    const { data: { user } } = await this.supabase.auth.getUser();
    return !!user; // Return `true` if the user exists
  }
}
