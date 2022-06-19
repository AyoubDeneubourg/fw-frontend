import { Component, OnInit } from '@angular/core';
import { PingService } from 'src/app/core/services/ping/ping.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public showModal = false;


  public openModal() {

    this.showModal = true;
  }
  
  public closeModal() {
    
    this.showModal = false;
  }

  constructor(private pingService: PingService) { }

  ngOnInit(): void {

    this.pingService.pingServices();
  }

}
