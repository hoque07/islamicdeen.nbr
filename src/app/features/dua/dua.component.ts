import { Component } from '@angular/core';
import { Dua, DuaService } from '../../core/services/dua.service';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-dua',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './dua.component.html',
  styleUrl: './dua.component.scss'
})
export class DuaComponent {
  selectedCategory = 'সব';
  copiedId = 0;

  constructor(public dua: DuaService) {}

  get duas(): Dua[] {
    const all = this.dua.getDuas();
    return this.selectedCategory === 'সব' ? all : all.filter((item) => item.category === this.selectedCategory);
  }

  get categories(): string[] {
    return ['সব', ...this.dua.getCategories()];
  }

  copy(dua: Dua): void {
    const text = `${dua.arabic}\n${dua.bangla}`;
    navigator.clipboard?.writeText(text);
    this.copiedId = dua.id;
    setTimeout(() => (this.copiedId = 0), 1400);
  }
}
