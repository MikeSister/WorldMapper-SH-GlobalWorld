import ReactDOMServer from "react-dom/server";
import PortTooltip from "./PortTooltip";
import type { EmployeeType } from "../type";

export const renderPortTooltip = (props: EmployeeType): string => {
  return ReactDOMServer.renderToString(<PortTooltip {...props} />);
};
