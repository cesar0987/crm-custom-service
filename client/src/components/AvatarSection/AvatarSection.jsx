import React from "react";
import "./AvatarSection.css";
import { Avatar } from "@material-tailwind/react";
import Cookies from "universal-cookie";
import { useState } from "react";

export const AvatarSection = () => {
  const [user, setUser] = useState({});
  const cookies = new Cookies();
  cookies.get("user") && setUser(cookies.get("user"));
  console.log("The user is:", user);
  const handleLogout = () => {
    cookies.remove("token");
    cookies.remove("user");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
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
        <span>{}</span>
        <p>Admin</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
      <div class="UserOptions"></div>
    </div>
  );
};
