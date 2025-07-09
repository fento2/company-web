"use client"

import { Search } from "lucide-react";

import { useEffect, useState } from "react";
import { apiCall } from "@/helper/apiCall";
import ArticleGrid from "./components/ArticleGrid";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { setArticles } from "@/lib/redux/features/articleSlice";
import { dataCategory } from "@/helper/dataCategory";
import SearchArticle from "./components/SearchArticle";


export default function BlogPage() {


    const [showSearch, setShowSearch] = useState(false);
    const dispatch = useAppDispatch();
    const articleList = useAppSelector((state) => state.articleSlice.list);
    const [getCategory] = useState([
        "All", ...dataCategory
    ]);

    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const getAllArticlesList = async () => {

        try {
            const res = await apiCall.get("/articles", {
                params: {
                    pageSize: 100,
                    sortBy: "`created` desc",
                    where: "`published` = TRUE",
                },
            });

            dispatch(setArticles(res.data));


        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllArticlesList();

    }, []);

    const PrintArticleList = selectedCategory === "All" ? articleList
        :
        articleList.filter((value) => value.category === selectedCategory);



    return (
        <div className="bg-stone-100">

            <section
                className="h-[400px] relative bg-cover bg-center py-20 text-center"
                style={{
                    backgroundImage: `url('/article.jpg')`,
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 z-0" />

                {/* Content */}
                <div className="relative z-10 mt-16">
                    <h1 className="text-5xl font-playfair text-stone-50 tracking-widest font-bold">
                        Stories
                    </h1>
                    <p className="mt-4 text-xl text-stone-50 font-lora tracking-widest italic">
                        &quot;Inspiration, insights, and tales from Grand Villia and beyond.&quot;
                    </p>
                </div>

            </section>

            <section className="max-w-[800px] mx-auto space-y-12 py-16 px-4">

                <div className="flex items-center gap-4 space-x-4 text-xs uppercase tracking-wide text-slate-800 font-semibold overflow-x-auto pb-2 scrollbar-hide
                ">

                    <Search className=" w-8 h-8 shrink-0 cursor-pointer" onClick={() => setShowSearch(true)} />
                    {showSearch && <SearchArticle list={articleList} setShowSearch={setShowSearch}/>}

                    {/* Category List Manual */}
                    <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                        {getCategory.map((value, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 border hover:bg-stone-300 transition text-sm whitespace-nowrap
                                ${selectedCategory === value ? " bg-stone-300" : ""}`}
                                onClick={() => setSelectedCategory(value)} >
                                {value}
                            </button>
                        ))}
                    </div>
                </div>

                {/* list article */}
                <ArticleGrid articleList={PrintArticleList} />
            </section>
        </div>
    );
}
