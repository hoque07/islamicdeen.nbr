import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: '<article class="card" [class.highlight]="highlight"><ng-content /></article>',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() highlight = false;
}
