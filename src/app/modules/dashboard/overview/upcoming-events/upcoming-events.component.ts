import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {

  @Input() public events;


  constructor() { }

  ngOnInit(): void {
  }

}
