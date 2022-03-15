import { Component, Input, OnInit } from '@angular/core';
import { PageNavigation } from '../../models/pagination';

@Component({
  selector: 'app-pages-bottom-navigation',
  templateUrl: './pages-bottom-navigation.component.html',
  styleUrls: ['./pages-bottom-navigation.component.scss']
})
export class PagesBottomNavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  @Input()
  public allPages: PageNavigation[];

  @Input()
  public color: string = 'gray';


}
