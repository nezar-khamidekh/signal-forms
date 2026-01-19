import { Component, signal } from '@angular/core';
import { User } from './models/user';
import { form, FormField } from '@angular/forms/signals';
import { signupFormSchema } from './validators/signup-form-schema';

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

  protected readonly signupForm = form(this.#user, signupFormSchema);

  protected createUser(): void {
    console.log(this.signupForm().value());
  }
}
