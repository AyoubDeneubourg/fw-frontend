import { Component, Input, OnInit } from '@angular/core';
import { PageNavigation } from '../../models/pagination';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss']
})
export class BottomNavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  @Input()
  public allPages: PageNavigation[];

  @Input()
  public color: string = 'gray';


}
