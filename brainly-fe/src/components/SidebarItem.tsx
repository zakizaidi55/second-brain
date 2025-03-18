import { ReactElement } from "react";

export function SidebarItem({text, icon}: {
    text:string;
    icon:ReactElement;
 }) {
    return <div className="flex text-gray-700 hover:bg-gray-200 max-w-72 transition-all duration-150">
        <div className="pr-2">
            {icon} 
        </div>

        <div>
            {text}
        </div>
    </div>
 }