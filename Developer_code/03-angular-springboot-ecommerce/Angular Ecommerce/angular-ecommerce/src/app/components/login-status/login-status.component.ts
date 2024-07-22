import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {


  constructor(private oktaService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) { }

  isAuthenticate: boolean = false;
  userFullName!: string;
  ngOnInit(): void {

    this.oktaService.authState$.subscribe(response => {
      this.isAuthenticate = response.isAuthenticated!;
      this.getUserDetails();
    })
  }
  getUserDetails() {

    this.oktaAuth.getUser().then(
      (res) => {
        this.userFullName = res.name as string;
      }
    )
  }

  logout() {
    this.oktaAuth.signOut();
  }

}
