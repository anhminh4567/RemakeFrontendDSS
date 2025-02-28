interface Location {
  Id: string;
  Name: string;
  IsActive: boolean;
  NameExtension: string[];
}
export interface Province extends Location {}
export interface Ward extends Location {}
export interface District extends Location {}
