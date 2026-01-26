import {
  disabled,
  email,
  hidden,
  pattern,
  required,
  schema,
  validateTree,
} from '@angular/forms/signals';
import { User } from '../models/user';

export const signupFormSchema = schema<User>((path) => {
  required(path.name, { message: 'Это поле обязательно' });
  required(path.surname, { message: 'Это поле обязательно' });

  required(path.email, { message: 'Это поле обязательно' });
  email(path.email, { message: 'Введите корректный email' });

  required(path.password, { message: 'Это поле обязательно' });
  pattern(path.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Минимум 8 символов, одна заглавная и одна строчная буква',
  });
  required(path.confirmPassword, { message: 'Это поле обязательно' });

  validateTree(path, ({ valueOf, fieldTreeOf }) => {
    const confirmPassword = valueOf(path.confirmPassword);
    const password = valueOf(path.password);

    if (confirmPassword !== password) {
      return [
        {
          fieldTree: fieldTreeOf(path.password),
          kind: 'passwordMismatch',
          message: 'Пароли не совпадают',
        },
        {
          fieldTree: fieldTreeOf(path.confirmPassword),
          kind: 'passwordMismatch',
          message: 'Пароли не совпадают',
        },
      ];
    }

    return null;
  });

  hidden(path.phone.phoneNumber, ({ valueOf }) => !valueOf(path.phone.notifyEnabled));
  required(path.phone.phoneNumber, {
    message: 'Это поле обязательно',
  });
  pattern(path.phone.phoneNumber, /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, {
    message: 'Введите корректный номер телефона',
  });

  required(path.gender);
  disabled(path.gender, ({ valueOf }) => !valueOf(path.email));
});
