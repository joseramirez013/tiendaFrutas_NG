import { UserModel } from './security/user.model';

export class CustomerModel {
  id?: String;
  document: String;
  telephone: String;
  email: String;
  name: String;
  lastname: String;
  city: String;
  address: String;
  user: UserModel;
}
