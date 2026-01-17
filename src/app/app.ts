import { Component, signal } from '@angular/core';
import { User } from './models/user';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  imports: [FormField],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly #user = signal<User>({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    notifyByPhone: false,
    phone: '',
  });

  protected readonly signupForm = form(this.#user);

  constructor() {
    setTimeout(() => {
      this.#user.set({
        name: 'TEST',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        notifyByPhone: true,
        phone: '',
      });
    }, 3000);
  }
}
