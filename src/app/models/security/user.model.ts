export class UserModel {
  id?: String;
  username: String;
  password?: String;
  customerId?: String;
  role?: number;
  token?: String;
  isLogged: Boolean = false;
  cartId?: String;
}
