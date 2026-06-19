import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent), title: 'DEEN & DIN' },
  { path: 'prayer-times', loadComponent: () => import('./features/prayer-times/prayer-times.component').then((m) => m.PrayerTimesComponent), title: 'Prayer Times | DEEN & DIN' },
  { path: 'quran', loadComponent: () => import('./features/quran/quran.component').then((m) => m.QuranComponent), title: 'Quran | DEEN & DIN' },
  { path: 'hadith', loadComponent: () => import('./features/hadith/hadith.component').then((m) => m.HadithComponent), title: 'Hadith | DEEN & DIN' },
  { path: 'dua', loadComponent: () => import('./features/dua/dua.component').then((m) => m.DuaComponent), title: 'Dua | DEEN & DIN' },
  { path: 'tasbih', loadComponent: () => import('./features/tasbih/tasbih.component').then((m) => m.TasbihComponent), title: 'Tasbih | DEEN & DIN' },
  { path: 'ramadan', loadComponent: () => import('./features/ramadan/ramadan.component').then((m) => m.RamadanComponent), title: 'Ramadan | DEEN & DIN' },
  { path: 'articles', loadComponent: () => import('./features/articles/articles.component').then((m) => m.ArticlesComponent), title: 'Articles | DEEN & DIN' },
  { path: 'about', loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent), title: 'About | DEEN & DIN' },
  { path: '**', redirectTo: '' }
];
