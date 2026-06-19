import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

export interface QuranVerse {
  arabic: string;
  bangla: string;
}

export interface Surah {
  id: number;
  name: string;
  banglaName: string;
  meaning: string;
  verses: QuranVerse[];
}

const SURAHS: Surah[] = [
  {
    id: 1,
    name: 'Al-Fatihah',
    banglaName: 'সূরা ফাতিহা',
    meaning: 'সূচনা',
    verses: [
      { arabic: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ', bangla: 'পরম করুণাময়, অতি দয়ালু আল্লাহর নামে।' },
      { arabic: 'الْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَ', bangla: 'সমস্ত প্রশংসা আল্লাহর, যিনি সব জগতের রব।' },
      { arabic: 'اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَ', bangla: 'আমাদের সরল পথে পরিচালিত করুন।' }
    ]
  },
  {
    id: 2,
    name: 'Al-Ikhlas',
    banglaName: 'সূরা ইখলাস',
    meaning: 'নিষ্ঠা',
    verses: [
      { arabic: 'قُلْ هُوَ اللّٰهُ اَحَدٌ', bangla: 'বলুন, তিনি আল্লাহ, এক।' },
      { arabic: 'اَللّٰهُ الصَّمَدُ', bangla: 'আল্লাহ অমুখাপেক্ষী।' },
      { arabic: 'لَمْ يَلِدْ وَلَمْ يُوْلَدْ', bangla: 'তিনি কাউকে জন্ম দেননি এবং তাঁকেও জন্ম দেওয়া হয়নি।' }
    ]
  },
  {
    id: 3,
    name: 'An-Nas',
    banglaName: 'সূরা নাস',
    meaning: 'মানুষ',
    verses: [
      { arabic: 'قُلْ اَعُوْذُ بِرَبِّ النَّاسِ', bangla: 'বলুন, আমি আশ্রয় চাই মানুষের রবের।' },
      { arabic: 'مَلِكِ النَّاسِ', bangla: 'মানুষের অধিপতির।' },
      { arabic: 'اِلٰهِ النَّاسِ', bangla: 'মানুষের উপাস্যের।' }
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class QuranService {
  private readonly bookmarkKey = 'deen-quran-bookmarks';
  readonly bookmarks$: BehaviorSubject<number[]>;

  constructor(private storage: StorageService) {
    this.bookmarks$ = new BehaviorSubject<number[]>(this.storage.read<number[]>(this.bookmarkKey, []));
  }

  getSurahs(): Surah[] {
    return SURAHS;
  }

  getSurah(id: number): Surah {
    return SURAHS.find((surah) => surah.id === id) ?? SURAHS[0];
  }

  toggleBookmark(id: number): void {
    const current = this.bookmarks$.value;
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    this.bookmarks$.next(next);
    this.storage.write(this.bookmarkKey, next);
  }

  isBookmarked(id: number): boolean {
    return this.bookmarks$.value.includes(id);
  }
}
