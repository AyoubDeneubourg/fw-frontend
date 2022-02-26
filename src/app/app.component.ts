import { CookieService } from 'ngx-cookie-service';
import { CookieOptions } from './../../node_modules/@types/express-serve-static-core/index.d';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'final-work';
  language: string = 'en';

  param = { value: 'world' };

  constructor(
  ) {}

  ngOnInit(): void {

  }


}
