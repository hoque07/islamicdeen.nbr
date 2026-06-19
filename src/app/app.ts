import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './core/services/storage.service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [FooterComponent, NavbarComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.storage.applyTheme();
  }
}
