import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: '<button [class]="variant" [type]="type"><ng-content /></button>',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'ghost' | 'soft' = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
}
