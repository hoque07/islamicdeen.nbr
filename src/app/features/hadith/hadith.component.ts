import { Component, inject } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';

interface Hadith {
  source: string;
  text: string;
}

@Component({
  selector: 'app-hadith',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './hadith.component.html',
  styleUrl: './hadith.component.scss'
})
export class HadithComponent {
  readonly hadiths: Hadith[] = [
    { source: 'সহিহ বুখারি', text: 'নিয়ত অনুযায়ী আমলের মূল্যায়ন হয়।' },
    { source: 'তিরমিজি', text: 'সর্বোত্তম মানুষ সে, যে মানুষের উপকার করে।' },
    { source: 'মুসলিম', text: 'পবিত্রতা ঈমানের অর্ধেক।' }
  ];
}
