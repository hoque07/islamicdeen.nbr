import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { interval, map, startWith } from 'rxjs';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-ramadan',
  standalone: true,
  imports: [AsyncPipe, CardComponent],
  templateUrl: './ramadan.component.html',
  styleUrl: './ramadan.component.scss'
})
export class RamadanComponent {
  readonly ramadanDay = 12;
  readonly sehri = '4:10 AM';
  readonly iftar = '6:48 PM';
  readonly countdown$ = interval(1000).pipe(
    startWith(0),
    map(() => this.nextIftarCountdown())
  );

  private nextIftarCountdown(): string {
    const now = new Date();
    let target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 48, 0);
    if (target.getTime() <= now.getTime()) {
      target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 18, 48, 0);
    }

    const seconds = Math.floor((target.getTime() - now.getTime()) / 1000);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map((value) => String(value).padStart(2, '0')).join(':');
  }
}
