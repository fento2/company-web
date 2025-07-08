"use client"


import Image from "next/image"

import { IArticle } from "@/helper/article";
import { ChevronRight, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface IArticleList {
    articleList: IArticle[];

}


export default function ArticleGrid({ articleList }: IArticleList) {
    const router = useRouter();




    return (
        <div>
            <div className="overflow-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[500px] gap-4">
                    {articleList.map((value, index) => {
                        return (
                            <div
                                key={index}
                                className={`
                                             relative overflow-hidden group cursor-pointer
                                          ${index === 0 ? "md:col-span-2" : ""}`}
                                onClick={() => router.push(`/articles/${(value.slug)}`)}>
                                <Image
                                    src={value.thumbnail}
                                    alt={value.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500 border-none"
                                />
                                <div className="absolute inset-0" />

                                {index === 0 ? (
                                    <>
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                                            <p className="text-xs uppercase text-white font-bold">
                                                {value.category}
                                            </p>
                                        </div>

                                        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-10 px-6 text-center w-full">
                                            <h3 className="text-2xl md:text-4xl font-playfair font-normal text-white tracking-tighter font-serif break-words leading-snug max-w-xl mx-auto">
                                                {value.title}
                                            </h3>
                                        </div>

                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                                            <div className="flex items-center hover:scale-105 transition-transform duration-500">
                                                <MoveRight
                                                    className="text-white w-18 h-18"
                                                    strokeWidth={1}
                                                />
                                                <ChevronRight
                                                    className="text-white w-17 h-17 -ml-9"
                                                    strokeWidth={1.2}
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="absolute bottom-0 left-0 right-0 py-6 z-10 bg-stone-100 text-slate-800 w-full h-auto">
                                        <p className="text-xs uppercase text-stone-500 font-bold">{value.category}</p>
                                        <h3 className="text-2xl font-normal break-words leading-snug tracking-tighter font-serif">
                                            {value.title}
                                        </h3>
                                        <a className="text-sm underline cursor-pointer">Read article</a>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-end my-2">
               
            </div>
        </div>
    );
}
