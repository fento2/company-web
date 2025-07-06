import Link from "next/link";
import { Button } from "../button";
import { LayoutDashboard, LogOut } from "lucide-react";
import { Card } from "../card";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/redux/features/userSlice";


interface IModalUser {
    openModalUser: (value: boolean) => void;
}



export default function ModalUser(props: IModalUser) {
    const dispatch = useDispatch();
    return (
        <Card className="absolute right-2 top-25 w-48 bg-stone-300 shadow-lg border-none rounded-none z-50 p-2">
            <ul className="flex flex-col space-y-1">
                <li>
                    <Link href="/blog/dashboard">
                        <div className="group flex items-center gap-3 hover:bg-stone-400 transition cursor-pointer px-4 py-3 text-zinc-900">
                            <LayoutDashboard className="w-5 h-5" />
                            <span className="font-semibold tracking-wide"
                                onClick={() => props.openModalUser(false)}>Dashboard</span>
                        </div>
                    </Link>
                </li>

                <li>
                    <button
                        className="group flex items-center gap-3 hover:bg-stone-400 hover:text-red-600 transition cursor-pointer px-4 py-3 text-zinc-900 w-full "
                        onClick={() => {
                            props.openModalUser(false);
                        }}
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-semibold tracking-wide"
                            onClick={() => {dispatch(logout())
                                localStorage.removeItem("tkn");
                                sessionStorage.removeItem("tkn");
                            }}>Logout</span>
                    </button>
                </li>
            </ul>
        </Card>
    );
}
