export function FormatMoneyVND(money: number) {
  switch (true) {
    case money >= 1000 * 1000 * 1000:
      return `${(money / (1000 * 1000 * 1000)).toFixed(1)} ty`;

    case money >= 1000 * 1000:
      return `${(money / (1000 * 1000)).toFixed(1)} tr`;

    case money >= 1000:
      return `${(money / 1000).toFixed(1)} k`;
    default:
      return `${money}`;
  }
}

export const Formatter = {
  FormatMoneyVND,
};
