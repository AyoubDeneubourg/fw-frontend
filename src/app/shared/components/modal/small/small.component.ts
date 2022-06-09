import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-small',
  templateUrl: './small.component.html',
  styleUrls: ['./small.component.scss']
})
export class SmallComponent implements OnInit {

  @Input()
  showModal: boolean;


  @Output()
  closeModal: EventEmitter<any> = new EventEmitter();


  @Output()
  acceptModal: EventEmitter<any> = new EventEmitter();


  @Input()
  translate;

  constructor() { }

  ngOnInit(): void {
  }

}
