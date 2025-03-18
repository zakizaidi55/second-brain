import { Logo } from "../Icons/Logo";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcons";
import { SidebarItem } from "./SidebarItem";


export function Sidebar() {
    return <div className="h-screen bg-white border-r-2 w-72 fixed left-0 top-0 pl-4">
        
        <div className="flex texr-2xl pt-8 items-center">
            <div className="pr-2 text-purple-600 ">
                <Logo/>
            </div>
            Brainly
        </div>
        
        <div className="pt-4 ml-6 ">
            <SidebarItem text="Twitter" icon={<TwitterIcon/>}/>
            <SidebarItem text="Youtube" icon={<YoutubeIcon/>}/>
        </div>
    </div>
}