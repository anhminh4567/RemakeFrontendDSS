import { Media } from "./Media";

export class Blog {
  Id: string;
  Tags: string[];
  AccountId?: string;
  Thumbnail?: Media;
  Title: string;
  Content: string;
  CreateDate?: string;
}
