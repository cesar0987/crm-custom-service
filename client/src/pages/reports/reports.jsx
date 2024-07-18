import "./reports.css";
import { AvatarSection, QuickActions } from "components";

export const Reports = ({productSelected}) => {
  return (
    <div className="mainReportContainer">
    <div className="reportsContainer">
      <h1>Reports</h1>
      <h2>Selected Products</h2>
      <p>{productSelected}</p>
      
    </div>
    <div className="rightPanel">
      <AvatarSection />
      <QuickActions />
    </div>
  </div>
  );
};
