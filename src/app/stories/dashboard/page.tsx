"use client"

import SidebarDashboard from "./components/SidebarDashboard";
import { apiCall } from "@/helper/apiCall";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hook";
import GridMyArticle from "./components/GridMyArticle";
import { useDispatch } from "react-redux";
import { setMyArticles } from "@/lib/redux/features/myarticleSlice";
import FormSection from "./components/FormSection";
import { clearEditArticle } from "@/lib/redux/features/editArticleSlice";



export default function Dashboard() {

    const formArticle = useRef<HTMLFormElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const getCategory = useRef<string | null>(null);
    const router = useRouter();
    const isLogin = useAppSelector((state) => state.accountReducer.isLogin);
    const username = useAppSelector((state) => state.accountReducer.username);
    const dispatch = useDispatch()
    const myArticleList = useAppSelector((state) => state.myArticleSlice.list);



    const getMyArticleList = async () => {
        try {
            const res = await apiCall.get("/articles", {
                params: {
                    pageSize: 15,
                    offset: 0,
                    sortBy: "`created` desc",
                    where: `author = '${username}'`,
                }
            });
            console.log(res.data);
            dispatch(setMyArticles(res.data));


        } catch (error) {
            console.log(error);
        }
    };

    function toSlug(title: string): string { // biar SEO friendly
        const baseSlug = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

        return `${baseSlug}-${Date.now()}`;
    }



    const BtCreateArticle = async (published: boolean) => {
        if (formArticle.current && getCategory.current) {
            const inputCreate = new FormData(formArticle.current);
            const title = inputCreate.get("title") as string;

            const slug = toSlug(title);

            try {
                const res = await apiCall.post("/articles", {
                    title,
                    slug,
                    thumbnail: inputCreate.get("thumbnail"),
                    content: inputCreate.get("content"),
                    category: getCategory.current,
                    author: username,
                    published,
                });

                console.log(res);
                toast.success("Article uploaded successfully!");
            } catch (error) {
                console.log(error);
                toast.error("Failed to upload article.");
            }

            formArticle.current?.reset();
            setSelectedCategory(undefined);
            getCategory.current = null;
            getMyArticleList();
        } else {
            toast.error("Please complete all required fields.");
        }
    };


    const BtEditArticle = async (objectId: string, published: boolean) => {
        if (formArticle.current && getCategory.current) {
            const inputCreate = new FormData(formArticle.current);
            const title = inputCreate.get("title") as string;
            const slug = toSlug(title);

            try {
                const res = await apiCall.put(`/articles/${objectId}`, {
                    title,
                    slug,
                    thumbnail: inputCreate.get("thumbnail"),
                    content: inputCreate.get("content"),
                    category: getCategory.current,
                    published,
                });

                console.log(res);
                toast.success("Article updated successfully!");
                dispatch(clearEditArticle());
            } catch (error) {
                console.log(error);
                toast.error("Failed to update article.");
            }

            formArticle.current?.reset();
            setSelectedCategory(undefined);
            getCategory.current = null;
            getMyArticleList();
        } else {
            toast.error("Please complete all required fields.");
        }
    };

    useEffect(() => {
        const tkn = sessionStorage.getItem("tkn");

        if (tkn) {

            getMyArticleList();

        } else {

            if (isLogin === false) {
                router.replace("/");
            } else {

                getMyArticleList();
            }
        }
    }, [isLogin]);



    return (
        <section className=" bg-stone-200">
            {/* Sidebar */}
            <aside className="hidden lg:block fixed top-0 left-0 h-full w-[240px]">
                <SidebarDashboard />
            </aside>

            {/* Main Content */}
            <main className=" min-h-screen w-full pt-18">
                <section className="lg:ml-[240px] p-8 space-y-12">
                    {/* Header */}
                    <div className="space-y-1">
                        <h1 className="text-zinc-900 text-sm">
                            Dashboard <span className="text-blue-900 font-bold">/ My Article</span>
                        </h1>
                        <h2 className="text-4xl font-bold tracking-wider text-slate-800">My Article</h2>
                    </div>

                    {/* Form + Grid */}
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Form Section */}
                        <FormSection
                            BtEditArticle={BtEditArticle}
                            BtCreateArticle={BtCreateArticle}
                            formArticle={formArticle}
                            getCategory={getCategory}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />

                        {/* Article List */}
                        <GridMyArticle
                            articleList={myArticleList}
                            getMyArticleList={getMyArticleList}
                        />
                    </div>
                </section>
            </main>
        </section>


    );
}