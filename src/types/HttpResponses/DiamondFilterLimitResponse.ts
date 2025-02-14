import { DiamondShape } from "../diamonds/DiamondShape";
import { FilterRange } from "../FilterRange";

export type DiamondFilterLimit = {
  Shapes: DiamondShape[];
  Carat: FilterRange;
  Color: FilterRange;
  Clarity: FilterRange;
  Cut: FilterRange;
  Polish: FilterRange;
  Symmetry: FilterRange;
  Price: FilterRange;
};
