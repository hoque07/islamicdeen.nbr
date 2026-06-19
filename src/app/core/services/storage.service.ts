import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private memory = new Map<string, unknown>();

  readonly darkMode = signal(this.read<boolean>('deen-theme-dark', false));

  read<T>(key: string, fallback: T): T {
    if (typeof localStorage === 'undefined') {
      return (this.memory.get(key) as T) ?? fallback;
    }

    const raw = localStorage.getItem(key);
    if (!raw) return fallback;

    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  write<T>(key: string, value: T): void {
    if (typeof localStorage === 'undefined') {
      this.memory.set(key, value);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  toggleDarkMode(): void {
    const next = !this.darkMode();
    this.darkMode.set(next);
    this.write('deen-theme-dark', next);
    this.applyTheme();
  }

  applyTheme(): void {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('dark-theme', this.darkMode());
  }
}
