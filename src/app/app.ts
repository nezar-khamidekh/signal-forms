import { Component, signal } from '@angular/core';
import { User } from './models/user';
import { form, FormField, submit } from '@angular/forms/signals';
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
    phone: {
      notifyEnabled: false,
      phoneNumber: '',
    },
  });

  protected readonly signupForm = form(this.#user, signupFormSchema);

  protected createUser(event: Event): void {
    submit(this.signupForm, async (form) => {
      event.preventDefault();

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
        });

        return undefined;
      } catch (error) {
        console.log(error);

        return [
          {
            fieldTree: form.email,
            kind: 'server',
            message: 'Пользователь с таким email уже существует',
          },
        ];
      }
    });
  }
}
