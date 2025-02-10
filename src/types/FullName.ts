export class FullName {
  FirstName: string;
  LastName: string;
  Print(): string {
    return `${this.FirstName} ${this.LastName}`;
  }
}
