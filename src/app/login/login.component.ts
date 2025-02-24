import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }



  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f['usuario'].value, this.f['senha'].value)

      .pipe(first())
      .subscribe(
        data => {
          // this.unsubscribeEvent()
          // this.ionViewDidLoad();
          this.router.navigate([this.returnUrl]);
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;

        })
  }

  // ionViewDidLoad() {
  //   this.sql.deleteDatabase();
  //   this.atualizacaoService.iniciaDados();
  // }

}
