import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shop/auth/data-access';

@Component({
  selector: 'shop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'shop';

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.retrieveTokenOnPageLoad();
  }
}
