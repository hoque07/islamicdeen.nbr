import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface AsmaulName {
  id: number;
  arabic: string;
  transliteration: string;
  bengali: string;
}

@Injectable({ providedIn: 'root' })
export class AsmaulHusnaService {
  private readonly http = inject(HttpClient);

  getNames(): Observable<AsmaulName[]> {
    return this.http.get<AsmaulName[]>('data/asmaul_husna.json');
  }
}
