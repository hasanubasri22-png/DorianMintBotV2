import { NavLink } from "react-router-dom";

export default function SidebarItem({ item }) {
    return (
        <NavLink
            to={item.path}
            className={({ isActive }) =>
                `block px-6 py-4 hover:bg-gray-800 ${
                    isActive ? "bg-blue-600" : ""
                }`
            }
        >
            {item.label}
        </NavLink>
    );
}