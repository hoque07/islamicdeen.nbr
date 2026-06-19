import { Component, inject } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-tasbih',
  standalone: true,
  templateUrl: './tasbih.component.html',
  styleUrl: './tasbih.component.scss'
})
export class TasbihComponent {
  private readonly storage = inject(StorageService);
  readonly presets = [33, 99, 100];
  count = this.storage.read<number>('deen-tasbih-count', 0);
  target = this.storage.read<number>('deen-tasbih-target', 33);

  increment(): void {
    this.count += 1;
    this.persist();
  }

  reset(): void {
    this.count = 0;
    this.persist();
  }

  setPreset(value: number): void {
    this.target = value;
    this.persist();
  }

  private persist(): void {
    this.storage.write('deen-tasbih-count', this.count);
    this.storage.write('deen-tasbih-target', this.target);
  }
}
