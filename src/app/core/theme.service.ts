import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';

type ThemePreference = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'benhalverson-blog-theme';
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly theme = signal<ThemePreference>(this.getInitialTheme());

  readonly currentTheme = computed(() => this.theme());
  readonly isDark = computed(() => this.currentTheme() === 'dark');

  constructor() {
    effect(() => {
      if (!this.isBrowser || !this.document.documentElement) {
        return;
      }

      this.document.documentElement.dataset['theme'] = this.theme();
    });
  }

  toggle(): void {
    const nextTheme: ThemePreference = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(nextTheme);
    this.persistTheme(nextTheme);
  }

  private getInitialTheme(): ThemePreference {
    if (!this.isBrowser) {
      return 'light';
    }

    const savedTheme = window.localStorage.getItem(this.storageKey);

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    if (typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return 'light';
  }

  private persistTheme(theme: ThemePreference): void {
    if (!this.isBrowser) {
      return;
    }

    window.localStorage.setItem(this.storageKey, theme);
  }
}
