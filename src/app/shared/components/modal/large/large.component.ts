import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';

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


  public color: Color;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.color = this.authService.colors;
  }

}
