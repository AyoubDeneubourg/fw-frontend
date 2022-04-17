import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PageNavigation } from 'src/app/shared/models/pagination';

@Component({
  selector: 'app-pages-side-navigation',
  templateUrl: './pages-side-navigation.component.html',
  styleUrls: ['./pages-side-navigation.component.scss']
})
export class PagesSideNavigationComponent implements OnInit {



  @Input()
  public allPages: PageNavigation[];




  @Input()
  public color: string;



  @Input()
  public direction: 'Left' | 'Right' = "Left";

  @Output()
  goToPage: EventEmitter<any> = new EventEmitter();



  constructor() { }

  ngOnInit(): void {




  }
}
