import React from "react";
import "./AvatarSection.css";
import { Avatar } from "@material-tailwind/react";

export const AvatarSection = () => {
  return (
    <div className="AvatarSection">
      <Avatar
        src="https://docs.material-tailwind.com/img/face-2.jpg"
        size="large"
        color="lightBlue"
        name="John Doe"
        role="Admin"
      />
      <div>
        <span>John Doe</span>
        <p>Admin</p>
      </div>
      <div class="UserOptions"></div>
    </div>
  );
};
