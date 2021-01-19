import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from 'src/app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  Message = '';
  isMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.isMessage = false;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    //debugger;
    this.loading = true;
    //debugger;
    /*
    this.accountService.login(this.f.username.value, this.f.password.value).subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));

        //const returnUrl = this.route.snapshot.queryParams['dashboard'] || '/';
        //this.router.navigateByUrl(returnUrl);
        this.router.navigate(['/dashboard']);
      }
    },
    error => {
      this.Message = error;
      this.isMessage = true;
    });
    */
    //let user = JSON.parse(localStorage.getItem('user'));
    
    
    this.accountService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: (user) => {
          localStorage.setItem('user', JSON.stringify(user));
          //debugger;
          // get return url from query parameters or default to home page
          //const returnUrl = this.route.snapshot.queryParams['dashboard'] || '/';
          //this.router.navigateByUrl(returnUrl);
          this.router.navigate(['/dashboard']);
        },
        error: error => {
          //this.alertService.error(error);
          console.log(error);
          this.Message = error;
          this.isMessage = true;
          this.loading = false;
        }
      });
      
      
  }
}
