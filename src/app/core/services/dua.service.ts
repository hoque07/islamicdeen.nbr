import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

export interface Dua {
  id: number;
  category: string;
  title: string;
  arabic: string;
  bangla: string;
}

const DUAS: Dua[] = [
  { id: 1, category: 'সকাল', title: 'সকালের দোয়া', arabic: 'اَللّٰهُمَّ بِكَ اَصْبَحْنَا', bangla: 'হে আল্লাহ, আপনার সাহায্যেই আমরা সকাল করলাম।' },
  { id: 2, category: 'জ্ঞান', title: 'জ্ঞান বৃদ্ধির দোয়া', arabic: 'رَبِّ زِدْنِيْ عِلْمًا', bangla: 'হে আমার রব, আমার জ্ঞান বৃদ্ধি করুন।' },
  { id: 3, category: 'ক্ষমা', title: 'ক্ষমার দোয়া', arabic: 'رَبِّ اغْفِرْ وَارْحَمْ', bangla: 'হে রব, ক্ষমা করুন এবং দয়া করুন।' },
  { id: 4, category: 'নিরাপত্তা', title: 'সুরক্ষার দোয়া', arabic: 'حَسْبُنَا اللّٰهُ وَنِعْمَ الْوَكِيْلُ', bangla: 'আল্লাহই আমাদের জন্য যথেষ্ট, তিনিই উত্তম অভিভাবক।' }
];

@Injectable({ providedIn: 'root' })
export class DuaService {
  private readonly favoriteKey = 'deen-dua-favorites';
  readonly favorites$: BehaviorSubject<number[]>;

  constructor(private storage: StorageService) {
    this.favorites$ = new BehaviorSubject<number[]>(this.storage.read<number[]>(this.favoriteKey, []));
  }

  getDuas(): Dua[] {
    return DUAS;
  }

  getCategories(): string[] {
    return [...new Set(DUAS.map((dua) => dua.category))];
  }

  toggleFavorite(id: number): void {
    const current = this.favorites$.value;
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    this.favorites$.next(next);
    this.storage.write(this.favoriteKey, next);
  }

  isFavorite(id: number): boolean {
    return this.favorites$.value.includes(id);
  }
}
