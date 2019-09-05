import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageError: string = null;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.value[`email`] === `user@user.com` && form.value[`password`] === `1234`) {
      this.router.navigate(
        ['/albums'],
        {queryParams: {message: `success`}}
      );
    } else {
      this.messageError = `Error email or password`;
    }
  }

}
