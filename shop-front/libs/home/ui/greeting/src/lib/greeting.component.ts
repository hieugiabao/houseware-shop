import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shop-home-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeGreetingComponent {
  get message() {
    const now = new Date();
    const hours = now.getHours();
    return hours < 12
      ? 'Good morning'
      : hours < 18
      ? 'Good afternoon'
      : 'Good evening';
  }
}
