import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';

interface Article {
  title: string;
  excerpt: string;
  minutes: number;
}

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent {
  readonly articles: Article[] = [
    { title: 'নিয়মিত নামাজে মনোযোগ বাড়ানোর উপায়', excerpt: 'ছোট অভ্যাস, পরিষ্কার সময়সূচি এবং ধীর তিলাওয়াত দিয়ে শুরু করুন।', minutes: 4 },
    { title: 'কুরআন পাঠের দৈনিক রুটিন', excerpt: 'প্রতিদিন অল্প হলেও ধারাবাহিক পাঠই দীর্ঘমেয়াদে শক্তিশালী অভ্যাস তৈরি করে।', minutes: 5 },
    { title: 'রমজানে সময় ব্যবস্থাপনা', excerpt: 'সেহরি, কাজ, ইবাদত ও বিশ্রামের ভারসাম্য রাখার সহজ কাঠামো।', minutes: 6 }
  ];
}
