export interface DeliveryFee {
  Id: string;
  DeliveryMethod: string;
  Name: string;
  Cost: number; // decimal in C# becomes number in TypeScript
  FromLocation?: string; // string? becomes string | null | undefined, but ? is shorthand
  ToLocation?: string;
  ToLocationId?: number; // int? becomes number | null | undefined, but ? is shorthand
  IsEnabled: boolean;
  // IsDistancePriceType?: boolean; // If you uncommented this in C#
}
