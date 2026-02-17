import { Component, signal } from '@angular/core';
import { User } from './models/user';
import { form, FormField, submit } from '@angular/forms/signals';
import { signupFormSchema } from './validators/signup-form-schema';
import { GenderControl } from './components/gender-control/gender-control';

@Component({
  selector: 'app-root',
  imports: [FormField, GenderControl],
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
    phone: {
      notifyEnabled: false,
      phoneNumber: '',
    },
    gender: null,
  });

  protected readonly signupForm = form(this.#user, signupFormSchema);

  protected createUser(event: Event): void {
    event.preventDefault();

    submit(this.signupForm, async (form) => {
      try {
        console.log(form().value());

        await Promise.resolve({ success: true });
        // await Promise.reject({ success: false });

        form().reset({
          name: '',
          surname: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: {
            notifyEnabled: false,
            phoneNumber: '',
          },
          gender: null,
        });

        return undefined;
      } catch (error) {
        console.log(error);

        return [
          {
            fieldTree: form.email,
            kind: 'server',
            message: 'Пользователь с таким адресом электронной почты уже существует',
          },
        ];
      }
    });
  }
}
