import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-watchvideo-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class HomeWatchVideoComponent implements OnInit {

  @Input()
  showModal: boolean = true;


  @Output()
  closeModal: EventEmitter<any> = new EventEmitter();


  @Input()
  translate;





  constructor() { }

  ngOnInit(): void {
    
  }

}
