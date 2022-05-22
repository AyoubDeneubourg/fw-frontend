import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { User } from 'src/app/shared/models/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: User;

  public isOther: boolean = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {



    if(this.route.snapshot.params.id) {

      this.authService.getUser(this.route.snapshot.params.id).subscribe(user => {
        this.isOther = true;
        this.user = user;

        console.log(this.user);
      },error => {
        this.router.navigate(['/']);
      });


    } else {
      this.user = this.authService.loggedInUser;
    }


  }

  public sendOffer() {
    
  }

}
