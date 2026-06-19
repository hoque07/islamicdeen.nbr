import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, map, startWith } from 'rxjs';

export interface PrayerTime {
  key: string;
  name: string;
  banglaName: string;
  timeLabel: string;
  hour: number;
  minute: number;
}

export interface PrayerCountdown {
  prayer: PrayerTime;
  remainingMs: number;
  label: string;
}

const PRAYERS: PrayerTime[] = [
  { key: 'fajr', name: 'Fajr', banglaName: 'ফজর', timeLabel: '4:08 AM', hour: 4, minute: 8 },
  { key: 'dhuhr', name: 'Dhuhr', banglaName: 'যোহর', timeLabel: '12:06 PM', hour: 12, minute: 6 },
  { key: 'asr', name: 'Asr', banglaName: 'আসর', timeLabel: '4:42 PM', hour: 16, minute: 42 },
  { key: 'maghrib', name: 'Maghrib', banglaName: 'মাগরিব', timeLabel: '6:51 PM', hour: 18, minute: 51 },
  { key: 'isha', name: 'Isha', banglaName: 'ইশা', timeLabel: '8:17 PM', hour: 20, minute: 17 }
];

@Injectable({ providedIn: 'root' })
export class PrayerService {
  private readonly prayersSubject = new BehaviorSubject<PrayerTime[]>(PRAYERS);
  readonly prayers$ = this.prayersSubject.asObservable();
  readonly nextPrayer$: Observable<PrayerCountdown> = interval(1000).pipe(
    startWith(0),
    map(() => this.getNextPrayer())
  );

  getPrayers(): PrayerTime[] {
    return this.prayersSubject.value;
  }

  private getNextPrayer(now = new Date()): PrayerCountdown {
    const today = new Date(now);
    const candidates = PRAYERS.map((prayer) => ({
      prayer,
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), prayer.hour, prayer.minute, 0)
    }));

    let next = candidates.find((item) => item.date.getTime() > now.getTime());
    if (!next) {
      const fajr = PRAYERS[0];
      next = {
        prayer: fajr,
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, fajr.hour, fajr.minute, 0)
      };
    }

    const remainingMs = Math.max(0, next.date.getTime() - now.getTime());
    return {
      prayer: next.prayer,
      remainingMs,
      label: this.formatDuration(remainingMs)
    };
  }

  private formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
  }
}
