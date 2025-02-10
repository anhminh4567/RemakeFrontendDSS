import { UserIdentity } from "./UserIdentity";

export class Account {
  Id: string;
  IdentityId: string;
  Roles: string[];
  Addresses?: Address[];
  FirstName: string;
  LastName: string;
  Email: string;
  TotalPoint?: number;
  PhoneNumber?: string;
  UserIdentity?: UserIdentity;
  addAddress(newAddress: Address) {
    if (this.Addresses == null) {
      this.Addresses = new Array<Address>();
    }
    this.Addresses.push(newAddress);
  }
  removeAddress(index: number) {
    if (!this.Addresses) {
      return;
    }
    this.Addresses.splice(index, 1);
  }
  setPoint(point: number) {
    this.TotalPoint = point;
  }
}

export class Address {
  Id: string;
  Province: string;
  District: string;
  Ward: string;
  Street: string;
  IsDefault: boolean;
}
export type AuthContextType = {
  user?: Account;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};
