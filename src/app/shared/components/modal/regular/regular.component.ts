import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-regular',
  templateUrl: './regular.component.html',
  styleUrls: ['./regular.component.scss']
})
export class RegularComponent implements OnInit {

  @Input()
  showModal: boolean;

  @Input()
  data;

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
