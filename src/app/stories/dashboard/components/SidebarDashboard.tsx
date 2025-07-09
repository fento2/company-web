import {
    FilePen,
    UserPen
} from "lucide-react";

interface ISideBarDash {
    setProfile: (value: boolean) => void;
    profile: boolean;
}


export default function SidebarDashboard(props: ISideBarDash) {
    return (
        <aside className="w-[240px]
             bg-stone-300 p-6 h-full pt-26">

            {/* Menu */}
            <ul className="space-y-1">
                <p className="text-left text-xs text-zinc-500 font-bold px-2 mb-2 border-b border-b-black/10 pb-1">
                    DASHBOARD
                </p>

                <li className={`group flex items-center gap-3 hover:bg-stone-400 ${props.profile? "bg-stone-400": ""} transition cursor-pointer px-4 py-3 text-zinc-900`}
                    onClick={() => props.setProfile(true)}>
                    <UserPen className="w-5 h-5" />
                    <span className="font-semibold tracking-wide">Profile</span>
                </li>

                <li className={`group flex items-center gap-3 hover:bg-stone-400 ${!props.profile? "bg-stone-400": ""} transition cursor-pointer px-4 py-3 text-zinc-900`}
                    onClick={() => props.setProfile(false)}>
                    <FilePen className="w-5 h-5" />
                    <span className="font-semibold tracking-wide">My Article</span>
                </li>
            </ul>
        </aside>
    );
}