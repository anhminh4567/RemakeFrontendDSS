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
  getDefaultAddress(): Address | null {
    if (!this.Addresses) return null;
    let defAddress = this.Addresses.filter((x) => x.IsDefault).pop();
    if (!defAddress) return this.Addresses[0];
    else return defAddress;
  }
  static fromOldObject(acc: Account): Account {
    let newAcc = new Account();
    newAcc.Addresses = acc.Addresses;
    newAcc.Email = acc.Email;
    newAcc.FirstName = acc.FirstName;
    newAcc.LastName = acc.LastName;
    newAcc.Id = acc.Id;
    newAcc.PhoneNumber = acc.PhoneNumber;
    newAcc.Roles = acc.Roles;
    newAcc.TotalPoint = acc.TotalPoint;
    newAcc.UserIdentity = acc.UserIdentity;
    newAcc.IdentityId = acc.IdentityId;
    return newAcc;
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
