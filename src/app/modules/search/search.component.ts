import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth-service/auth.service";
import { User } from "src/app/shared/models/common";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
  })
  export class SearchComponent implements OnInit {
      
    constructor(private authService: AuthService) {

    }

    public authedUser: User;

    ngOnInit(): void {

        this.authedUser = this.authService.loggedInUser;
        

    }

}