import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private auth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router
  ) {}

  signInForm!: FormGroup;
  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onLogin(e: any) {
    e.preventDefault();
    const { email, password } = this.signInForm.value;

    console.log(this.signInForm.value);
    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
