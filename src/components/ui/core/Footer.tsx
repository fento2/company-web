
"use client";



import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";

import { usePathname } from "next/navigation";
import Link from "next/link";


export function ConditionalFooter() {
    const pathname = usePathname();

    const hideFooter = pathname.startsWith("/stories/dashboard"); //hide footer di dashboard

    if (hideFooter) return null;

    return <Footer />;
}





export default function Footer() {
    return (
        <div>
            <footer className="bg-slate-800 text-stone-200 pt-16 pb-8 font-serif">
                <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold tracking-widest text-[#CBA135]">GRAND VILLIA</h3>
                        <p className="mt-4 text-sm text-stone-400">
                            A luxury stay experience in the heart of Langgur — where elegance meets comfort.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-2">
                        <h4 className="text-lg font-semibold mb-2">Navigation</h4>
                        <Link href="/" className="hover:text-stone-400 transition">Home</Link>
                        <Link href="/about" className="hover:text-stone-400 transition">About</Link>
                        <Link href="/facilities" className="hover:text-stone-400 transition">Facilities</Link>
                        <Link href="/contact" className="hover:text-stone-400 transition">Contact</Link>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
                        <p>Langgur, Southeast Maluku</p>
                        <p>Email: contact@grandvillia.com</p>
                        <p>Phone: +62 812-3456-7890</p>

                        {/* Socials */}
                        <div className="flex gap-4 mt-4 mb-4">
                            <a href="#" className="hover:text-stone-400 transition"><BsInstagram /></a>
                            <a href="#" className="hover:text-stone-400 transition"><FaFacebookSquare /></a>
                            <a href="#" className="hover:text-stone-400 transition"><BsWhatsapp /></a>
                        </div>


                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-12 text-center text-sm text-stone-500">
                    © {new Date().getFullYear()} Gran Villia Hotel. All rights reserved.
                </div>
            </footer>
        </div>
    );
}