import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 items-center">
        <div className="flex text-2xl pt-4 items-center">
            <div className="pr-4 text-purple-600">
                <Logo size="xl"/>
            </div>
            Second Brain
        </div>

        <div className="pt-4">
            <SidebarItem text = "Twitter" icon={<TwitterIcon size="md"/>}/>
            <SidebarItem text =  "Youtube" icon={<YoutubeIcon size="lg"/>}/>
        </div>
    </div>
}