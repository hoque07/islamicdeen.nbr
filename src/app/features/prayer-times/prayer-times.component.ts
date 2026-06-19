import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PrayerService, PrayerTime } from '../../core/services/prayer.service';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-prayer-times',
  standalone: true,
  imports: [AsyncPipe, CardComponent],
  templateUrl: './prayer-times.component.html',
  styleUrl: './prayer-times.component.scss'
})
export class PrayerTimesComponent {
  private readonly prayer = inject(PrayerService);
  readonly prayers$ = this.prayer.prayers$;
  readonly nextPrayer$ = this.prayer.nextPrayer$;

  trackPrayer(_: number, prayer: PrayerTime): string {
    return prayer.key;
  }
}
