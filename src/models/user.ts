import { UserRole } from "./enum";

export class UserBrief {
  id: number;
  role: UserRole;
  displayName: string;

  constructor(id: number, role: UserRole, displayName: string) {
    this.id = id;
    this.role = role;
    this.displayName = displayName;
  }
}

export class UserToken {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    userName: string
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
  }
}

export class UserLogin {
  email: string;
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
