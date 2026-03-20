import type { ReactElement } from "react";

export function SidebarItem({text, icon}: {
    text : string;
    icon : ReactElement;
}){
    return <div className="flex text-gray-700 items-center py-2 px-4 hover:bg-gray-100 cursor-pointer gap-3 transition-all duration-150">
        <div>
            {icon}
        </div>
        <div>
            {text}
        </div>
    </div>
}