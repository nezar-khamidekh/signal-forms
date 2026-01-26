import { GenderType } from '../components/gender-control/gender-control';

export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: {
    notifyEnabled: boolean;
    phoneNumber: string;
  };
  gender: GenderType | null;
}
