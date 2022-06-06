import { Component, Input, OnInit } from '@angular/core';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { CardData } from 'src/app/shared/components/card/card.component';

@Component({
  selector: 'app-slide-card',
  templateUrl: './slide-card.component.html',
  styleUrls: ['./slide-card.component.scss']
})
export class SlideCardComponent implements OnInit {

  @Input() data: CardData[];

  public actualPage = 0;

  public color: Color;

  public interval;

  constructor(public authService: AuthService) {

   }

  ngOnInit(): void {
    
    this.color = this.authService.colors;

 
    this.setInterval();

    
  }


  public setInterval() {
    this.interval = setInterval(() => {

      if(this.actualPage < this.data.length - 1) this.actualPage++;
      else  this.actualPage = 0;
     
    }, 5000);

  }

  public changePage(page: number) {
    this.actualPage = page;
    clearInterval(this.interval);
    this.setInterval();

  }
}
