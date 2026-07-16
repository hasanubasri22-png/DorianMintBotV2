import SidebarItem from "./SidebarItem";
import { sidebarMenus } from "./menu.config";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen">

            <div className="py-8 text-2xl font-bold text-center">
                DMB
            </div>

            {sidebarMenus.map((menu) => (
                <SidebarItem
                    key={menu.path}
                    item={menu}
                />
            ))}

        </aside>
    );
}