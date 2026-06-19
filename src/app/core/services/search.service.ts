import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

export interface SearchItem {
  title: string;
  subtitle: string;
  route: string;
  keywords: string[];
}

const SEARCH_ITEMS: SearchItem[] = [
  { title: 'Prayer Times', subtitle: 'নামাজের সময় ও কাউন্টডাউন', route: '/prayer-times', keywords: ['prayer', 'namaz', 'salah', 'fajr', 'isha', 'নামাজ', 'ফজর', 'ইশা'] },
  { title: 'Quran Reader', subtitle: 'আরবি ও বাংলা অনুবাদ', route: '/quran', keywords: ['quran', 'surah', 'কুরআন', 'সূরা', 'আয়াত'] },
  { title: 'Hadith', subtitle: 'দৈনিক হাদিস ও তালিকা', route: '/hadith', keywords: ['hadith', 'হাদিস', 'daily'] },
  { title: 'Dua Collection', subtitle: 'দোয়া, কপি ও ফেভারিট', route: '/dua', keywords: ['dua', 'দোয়া', 'জিকির'] },
  { title: 'Tasbih Counter', subtitle: 'ডিজিটাল তাসবিহ', route: '/tasbih', keywords: ['tasbih', 'counter', 'তাসবিহ', 'জিকির'] },
  { title: 'Ramadan Tools', subtitle: 'সেহরি, ইফতার ও রমজান ট্র্যাকার', route: '/ramadan', keywords: ['ramadan', 'sehri', 'iftar', 'রমজান', 'সেহরি', 'ইফতার'] },
  { title: 'Islamic Articles', subtitle: 'প্রবন্ধ ও অনুপ্রেরণা', route: '/articles', keywords: ['article', 'blog', 'প্রবন্ধ', 'ইসলাম'] }
];

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly items$ = new BehaviorSubject<SearchItem[]>(SEARCH_ITEMS);
  readonly query$ = new BehaviorSubject('');

  readonly results$ = combineLatest([this.items$, this.query$]).pipe(
    map(([items, query]) => {
      const cleanQuery = this.normalize(query);
      if (!cleanQuery) return items;

      return items.filter((item) =>
        this.normalize([item.title, item.subtitle, ...item.keywords].join(' ')).includes(cleanQuery)
      );
    })
  );

  setQuery(query: string): void {
    this.query$.next(query);
  }

  private normalize(value: string): string {
    return value.trim().toLowerCase();
  }
}
