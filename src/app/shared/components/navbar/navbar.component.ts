import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchService } from '../../../core/services/search.service';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly links = [
    { label: 'Home', path: '/' },
    { label: 'Prayer', path: '/prayer-times' },
    { label: 'Quran', path: '/quran' },
    { label: 'Asmaul Husna', path: '/asmaul-husna' },
    { label: 'Hadith', path: '/hadith' },
    { label: 'Dua', path: '/dua' },
    { label: 'Tasbih', path: '/tasbih' },
    { label: 'Ramadan', path: '/ramadan' },
    { label: 'Articles', path: '/articles' }
  ];

  constructor(public search: SearchService, public storage: StorageService) {}

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search.setQuery(input.value);
  }
}
