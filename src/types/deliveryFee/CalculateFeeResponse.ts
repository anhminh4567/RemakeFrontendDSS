import { DeliveryFee } from "./DeliveryFee";

interface LocationDetail {
  Province: string;
  District: string;
  Ward: string;
  Road: string;
}

interface LocationDistantData {
  Distance: number; // Decimal in C# maps to number in TypeScript
  DistanceUnit: string;
  TravelTime: number; // Decimal in C# maps to number in TypeScript
  TravelTimeUnit: string;
  TravelMode: string;
  Origin: LocationDetail;
  Destination: LocationDetail;
}

export interface CalculateFeeResponse {
  LocationDistanceData: LocationDistantData;
  DeliveryFee: DeliveryFee;
}
