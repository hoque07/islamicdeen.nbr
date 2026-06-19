import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="page">
      <h1>About DEEN & DIN</h1>
      <p>DEEN & DIN VERSION 1 একটি Angular SPA, যেখানে ইসলামিক লাইফস্টাইল টুলস ভবিষ্যৎ API ইন্টিগ্রেশনের জন্য পরিষ্কার সার্ভিস আর্কিটেকচারে সাজানো হয়েছে।</p>
    </section>
  `,
  styles: [`
    .page { margin: 0 auto; max-width: 820px; padding: 3rem 1rem; }
    h1 { font-size: clamp(2rem, 5vw, 3.8rem); }
    p { color: var(--muted); font-size: 1.1rem; line-height: 1.8; }
  `]
})
export class AboutComponent {}
