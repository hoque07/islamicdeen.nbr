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
  { title: 'Asmaul Husna', subtitle: '\u0986\u09b2\u09cd\u09b2\u09be\u09b9\u09b0 \u09ef\u09ef \u09a8\u09be\u09ae \u0993 \u09ac\u09be\u0982\u09b2\u09be \u0985\u09b0\u09cd\u09a5', route: '/asmaul-husna', keywords: ['asmaul', 'husna', 'allah names', '99 names', 'ar rahman', 'al azim', '\u0986\u09b8\u09ae\u09be\u0989\u09b2 \u09b9\u09c1\u09b8\u09a8\u09be', '\u0986\u09b2\u09cd\u09b2\u09be\u09b9\u09b0 \u09a8\u09be\u09ae', '\u0986\u09b8\u09ae\u09be'] },
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
