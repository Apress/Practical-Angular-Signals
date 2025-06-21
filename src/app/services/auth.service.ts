// src/app/services/auth.service.ts

import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #user = signal<string | null>(null);

  readonly isLoggedIn = computed(() => this.#user() !== null);

  readonly username = computed(() => this.#user());

  login(name: string) {
    this.#user.set(name);
  }

  logout() {
    this.#user.set(null);
  }
}
