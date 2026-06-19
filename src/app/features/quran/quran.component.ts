import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuranService, Surah } from '../../core/services/quran.service';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-quran',
  standalone: true,
  imports: [FormsModule, CardComponent],
  templateUrl: './quran.component.html',
  styleUrl: './quran.component.scss'
})
export class QuranComponent {
  public readonly quran = inject(QuranService);
  readonly surahs = this.quran.getSurahs();
  selected: Surah = this.surahs[0];

  selectSurah(surah: Surah): void {
    this.selected = surah;
  }

  trackSurah(_: number, surah: Surah): number {
    return surah.id;
  }
}
