import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsmaulHusnaService, AsmaulName } from '../../core/services/asmaul-husna.service';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-asmaul-husna',
  standalone: true,
  imports: [FormsModule, CardComponent],
  templateUrl: './asmaul-husna.component.html',
  styleUrl: './asmaul-husna.component.scss'
})
export class AsmaulHusnaComponent implements OnInit {
  private readonly asmaulHusna = inject(AsmaulHusnaService);

  readonly introText = 'আসমাউল হুসনা হলো আল্লাহর ৯৯টি সুন্দর নাম। প্রতিটি নাম আল্লাহর গুণ ও রহমতের পরিচয় দেয়। এখানে আরবি নাম, ইংরেজি উচ্চারণ এবং বাংলা অর্থ একসাথে পড়তে পারবেন।';

  readonly names = signal<AsmaulName[]>([]);
  readonly filteredNames = signal<AsmaulName[]>([]);
  readonly selectedName = signal<AsmaulName | null>(null);
  readonly copiedId = signal(0);
  readonly loading = signal(true);
  readonly loadError = signal('');
  query = '';

  ngOnInit(): void {
    this.asmaulHusna.getNames().subscribe({
      next: (names) => {
        this.names.set(names);
        this.filteredNames.set(names);
        this.loading.set(false);
      },
      error: () => {
        this.loadError.set('The Asmaul Husna list could not be loaded. Please refresh the page.');
        this.loading.set(false);
      }
    });
  }

  filterNames(): void {
    const cleanQuery = this.normalize(this.query);
    const allNames = this.names();
    this.filteredNames.set(cleanQuery
      ? allNames.filter((name) =>
          this.normalize([name.arabic, name.transliteration, name.bengali].join(' ')).includes(cleanQuery)
        )
      : allNames);
  }

  openDetails(name: AsmaulName): void {
    this.selectedName.set(name);
  }

  closeDetails(): void {
    this.selectedName.set(null);
  }

  async copyName(name: AsmaulName): Promise<void> {
    const text = name.arabic + '\n' + name.transliteration + '\n' + name.bengali;

    try {
      await navigator.clipboard?.writeText(text);
    } catch {
      this.copyWithFallback(text);
    }

    this.copiedId.set(name.id);
    setTimeout(() => this.copiedId.set(0), 1400);
  }

  trackName(_: number, name: AsmaulName): number {
    return name.id;
  }

  private normalize(value: string): string {
    return value.normalize('NFKD').trim().toLowerCase();
  }

  private copyWithFallback(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', 'true');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
