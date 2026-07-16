import { NavLink } from "react-router-dom";

import {
  Home,
  Wallet,
  Rocket,
  FileText,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const menus = [
    { to: "/", icon: <Home size={18} />, text: "Dashboard" },
    { to: "/wallet", icon: <Wallet size={18} />, text: "Wallet" },
    { to: "/mint", icon: <Rocket size={18} />, text: "Mint" },
    { to: "/logs", icon: <FileText size={18} />, text: "Logs" },
    { to: "/settings", icon: <Settings size={18} />, text: "Settings" },
  ];

  return (
    <div
      style={{
        width: 250,
        background: "#0f172a",
        padding: 20,
      }}
    >
      <h1>DORIAN</h1>

      {menus.map((menu) => (
        <NavLink
          key={menu.text}
          to={menu.to}
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: 15,
            marginTop: 10,
            textDecoration: "none",
            color: "white",
            borderRadius: 10,
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          {menu.icon}

          {menu.text}
        </NavLink>
      ))}
    </div>
  );
}