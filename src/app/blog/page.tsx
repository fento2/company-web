"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import Footer from "@/components/ui/core/Footer";
import { useEffect, useState } from "react";
import { apiCall } from "@/helper/apiCall";
import ArticleGrid from "./components/ArticleGrid";


export default function BlogPage() {

    const [articleList, setArticleList] = useState<any[]>([]);


    const getAllArticlesList = async () => {
        try {
            const res = await apiCall.get("/articles", {
                params: {
                    pageSize: 15,
                    sortBy: "created",
                }

            });
            setArticleList(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllArticlesList();

    }, []);





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
                {/* list article */}
                <ArticleGrid articleList={articleList} />
            </section>
            <Footer />
        </div>
    );
}
