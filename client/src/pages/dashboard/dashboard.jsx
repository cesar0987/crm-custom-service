import { AvatarSection, QuickActions } from "components";
import "./dashboard.css";

export const Dashboard = () => {
  return (
    <div className="dashboardContainer">
      <div className="leftPanel"></div>
      <div className="rightPanel">
        <AvatarSection />
        <QuickActions />
        <div className="FastMovingProducts">
          <span>
            <b>Fast Moving Products</b>
          </span>
          <table>
            <thead>
              <tr>
                <th>Ref</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};
