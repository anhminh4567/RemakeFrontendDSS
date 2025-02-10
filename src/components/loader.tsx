import { ClipLoader } from "react-spinners";
import { COLORS } from "../constants/colors";
export interface LoaderProps {
  IsLoading: boolean;
  Size: number;
}
const loader = (param: LoaderProps) => {
  return <ClipLoader color={COLORS.mainBlue} loading={param.IsLoading} size={param?.Size} aria-label="Loading Spinner" data-testid="loader"></ClipLoader>;
};

export default loader;
