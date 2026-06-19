import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { interval, map, startWith } from 'rxjs';
import { PrayerService } from '../../core/services/prayer.service';
import { SearchService } from '../../core/services/search.service';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly prayer = inject(PrayerService);
  public readonly search = inject(SearchService);
  readonly nextPrayer$ = this.prayer.nextPrayer$;
  readonly results$ = this.search.results$;
  readonly clock$ = interval(1000).pipe(
    startWith(0),
    map(() => new Intl.DateTimeFormat('bn-BD', {
      timeZone: 'Asia/Dhaka',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(new Date()))
  );
}
