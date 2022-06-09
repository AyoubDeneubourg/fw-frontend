import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-large',
  templateUrl: './large.component.html',
  styleUrls: ['./large.component.scss']
})
export class LargeComponent implements OnInit {

  @Input()
  showModal: boolean = true;


  @Output()
  closeModal: EventEmitter<any> = new EventEmitter();


  @Output()
  acceptModal: EventEmitter<any> = new EventEmitter();

  @Input()
  translate;


  @Input()
  data;

  constructor() { }

  ngOnInit(): void {
  }

}
