import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import Footer from "@/components/ui/core/Footer";
const blogPosts = [
    {
        img: "/images/lobby_hotel.webp",
        title: "10 Relaxing & Quiet Holiday Destinations",
        tag: "WHAT'S NEW",
        link: "#",
    },
    {
        img: "/images/lobby_hotel.webp",
        title: "Discover Authentic Taste of Budapest",
        tag: "WHAT'S NEW",
        link: "#",
    },
    {
        img: "/images/lobby_hotel.webp",
        title: "Top Adventure & Activity Holidays",
        tag: "WHAT'S NEW",
        link: "#",
    },
    {
        img: "/images/lobby_hotel.webp",
        title: "Insider Tips: Multi-gen Travel",
        tag: "WHAT'S NEW",
        link: "#",
    },
    {
        img: "/images/lobby_hotel.webp",
        title: "Immersive Dining Experience",
        tag: "WHAT'S NEW",
        link: "#",
    },
    {
        img: "/images/lobby_hotel.webp",
        title: "Cultural Travel Insider",
        tag: "WHAT'S NEW",
        link: "#",
    },
    {
        img: "/images/lobby_hotel.webp",
        title: "10 Relaxing & Quiet Holiday Destinations",
        tag: "WHAT'S NEW",
        link: "#",
    },
    {
        img: "/images/lobby_hotel.webp",
        title: "Discover Authentic Taste of Budapest",
        tag: "WHAT'S NEW",
        link: "#",
    },
    {
        img: "/images/lobby_hotel.webp",
        title: "Top Adventure & Activity Holidays",
        tag: "WHAT'S NEW",
        link: "#",
    },
    {
        img: "/images/lobby_hotel.webp",
        title: "Insider Tips: Multi-gen Travel",
        tag: "WHAT'S NEW",
        link: "#",
    },
    {
        img: "/images/lobby_hotel.webp",
        title: "Immersive Dining Experience",
        tag: "WHAT'S NEW",
        link: "#",
    },
    {
        img: "/images/lobby_hotel.webp",
        title: "Cultural Travel Insider",
        tag: "WHAT'S NEW",
        link: "#",
    },
    {
        img: "/images/lobby_hotel.webp",
        title: "Top Adventure & Activity Holidays",
        tag: "WHAT'S NEW",
        link: "#",
    },
    {
        img: "/images/lobby_hotel.webp",
        title: "Insider Tips: Multi-gen Travel",
        tag: "WHAT'S NEW",
        link: "#",
    },
    {
        img: "/images/lobby_hotel.webp",
        title: "Immersive Dining Experience",
        tag: "WHAT'S NEW",
        link: "#",
    },

];

export default function BlogPage() {
    return (
        <div className="bg-stone-100">

            <section className="h-[400px] relative 
           bg-[url('/images/lobby_hotel.webp')] bg-cover bg-center py-20 text-center">

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 z-0" />

                {/* Content */}
                <div className="relative z-10">
                    <h1 className="text-5xl font-playfair text-stone-50 tracking-widest font-bold">
                        Traveling In Style
                    </h1>
                    <p className="mt-4 text-xl text-stone-50 font-lora tracking-widest italic">
                        "Explore what makes your stay truly exceptional."
                    </p>
                </div>
            </section>

            <section className="container mx-auto space-y-12 py-16 px-4">

                <div className="flex justify-center items-center gap-4 text-xs uppercase tracking-wide text-slate-800 font-semibold">
                    {/* Search Icon */}
                    <Button className="flex items-center gap-2"
                        variant="ghost">
                        <span><Search className="w-12 h-12" /></span>
                    </Button>


                    <div className="h-4 w-px bg-slate-400" />

                    {["What's New", "Iconic Destination", "Gourmet Spirit", "Essentially Kempinski"].map((tab, i, arr) => (
                        <div key={i} className="flex items-center gap-4">
                            <Button
                                variant="ghost" className="hover:underline">{tab}</Button>
                            {/* Separator kecuali terakhir */}
                            {i !== arr.length - 1 && <div className="h-4 w-px bg-slate-400" />}
                        </div>
                    ))}


                    <div className="h-4 w-px bg-slate-400" />
                    <Button
                        variant="ghost" className="text-lg"><ChevronDown /></Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[300px] gap-4">
                    {blogPosts.map((post, index) => {


                        return (
                            <div
                                key={index}
                                className={`relative overflow-hidden group
                                    ${index === 1 ? "md:row-span-2" : ""}
                                    ${index === 3 ? "md:row-span-2" : ""}
                                    ${index === 5 ? "md:col-span-2" : ""}
                                    ${index === 8 ? "md:row-span-2" : ""}
                                    ${index === 9 ? "md:col-span-2 md:row-span-2" : ""}
                                    ${index === 11 ? "md:row-span-2" : ""}
                                    ${index === 14 ? "md:col-span-2" : ""}`}
                            >
                                <Image
                                    src={post.img}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/30" />
                                <div className="absolute bottom-0 p-4 z-10 text-white">
                                    <p className="text-xs uppercase">{post.tag}</p>
                                    <h3 className="text-lg font-playfair font-semibold">
                                        {post.title}
                                    </h3>
                                    <a href={post.link} className="text-sm underline">
                                        Read article
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            
            <Footer/>
        </div>
    );
}
