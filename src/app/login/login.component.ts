import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageError: string = null;

  constructor(private router: Router, private authS: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authS.auth(form.value[`email`], form.value[`password`]).then(
      () => {
        // la redirection après connexion
        this.router.navigate([`/dashboard`], {queryParams : {message : `success`}});
      }
    ).catch(
      error => this.messageError = 'Error login'
    );
    // if (form.value[`email`] === `user@user.com` && form.value[`password`] === `1234`) {
    //   this.router.navigate(
    //     ['/albums'],
    //     {queryParams: {message: `success`}}
    //   );
    // } else {
    //   this.messageError = `Error email or password`;
    // }
  }

}
