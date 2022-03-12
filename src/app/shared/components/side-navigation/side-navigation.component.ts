import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PageNavigation } from 'src/app/shared/models/pagination';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {



  @Input()
  public allPages: PageNavigation[];




  @Input()
  public color: string;





  @Output()
  goToPage: EventEmitter<any> = new EventEmitter();



  constructor() { }

  ngOnInit(): void {




  }
}
