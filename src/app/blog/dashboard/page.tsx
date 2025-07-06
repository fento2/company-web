"use client"


import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import SidebarDashboard from "./components/SidebarDashboard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiCall } from "@/helper/apiCall";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BookCheck, FileClock, Search } from "lucide-react";
import { dataCategory } from "@/helper/dataCategory";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hook";
import GridMyArticle from "./components/GridMyArticle";


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

];


export default function Dashboard() {

    const formCreateCategory = useRef<HTMLFormElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const getCategory = useRef<string | null>(null)
    const router = useRouter();
    const isLogin = useAppSelector((state) => state.accountReducer.isLogin);
    const username = useAppSelector((state) => state.accountReducer.username);

    const [myArticleList, setMyArticleList] = useState<any[]>([]);


    const getMyArticleList = async () => {
        try {
            const res = await apiCall.get("/articles", {
                params: {
                    pageSize: 10,
                    offset: 0,
                    sortBy: "created",
                    where: `author = '${username}'`,
                }
            });
            console.log(res.data)
            setMyArticleList(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    const BtCreateArticle = async () => {

        if (formCreateCategory.current && getCategory.current) {
            const inputCreate = new FormData(formCreateCategory.current);

            try {
                const res = await apiCall.post("/articles", {
                    title: inputCreate.get("title"),
                    thumbnail: inputCreate.get("thumbnail"),
                    content: inputCreate.get("content"),
                    category: getCategory.current,
                    author: username

                });

                console.log(res);
                toast.success("Article uploaded successfully!");


            } catch (error) {
                console.log(error);
                toast.error("Failed to upload article.");
            }

            formCreateCategory.current.reset();
            setSelectedCategory(undefined);
            getCategory.current === null;



        } else {
            toast.error("Please complete all required fields.");

        }

    }

    useEffect(() => {

        if (isLogin === false) {

            router.replace("/");

        }
        getMyArticleList();

    }, [isLogin]);



    return (
        <div>

            <aside className="hidden lg:block fixed top-0 left-0 h-full w-[240px]">
                <SidebarDashboard />
            </aside>


            <main className="bg-stone-100 min-h-screen w-full">

                <section className="lg:ml-[240px] p-8 space-y-12 bg-stone-100 min-h-screen">
                    {/* Heading */}
                    <div className="space-y-1">
                        <h1 className="text-zinc-900 text-sm">
                            Dashboard <span className="text-blue-900 font-bold">/ My Article</span>
                        </h1>
                        <h2 className="text-4xl font-bold tracking-wider text-slate-800">My Article</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

                        {/* Form Section */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800">Post Article</h3>


                            <form ref={formCreateCategory}>
                                <Card className="rounded-none shadow-md bg-white w-full">
                                    <CardHeader className="border-b pb-4 space-y-1">
                                        <h4 className="text-lg font-semibold text-slate-700">Create a New Article</h4>
                                        <p className="text-sm text-slate-500">
                                            Fill in the form below to publish a new post.
                                        </p>
                                    </CardHeader>

                                    <CardContent className="space-y-6 mt-4">
                                        {/* Title */}
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Title</Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                type="text"
                                                placeholder="Input Title"
                                                className="rounded-none" />
                                        </div>

                                        {/* Thumbnail */}
                                        <div className="space-y-2">
                                            <Label htmlFor="thumbnail">Thumbnail</Label>
                                            <Input
                                                id="thumbnail"
                                                name="thumbnail"
                                                type="text"
                                                placeholder="Input Thumbnail URL"
                                                className="rounded-none"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-2">
                                            <Label htmlFor="content">Content</Label>
                                            <Textarea
                                                id="content"
                                                name="content"
                                                placeholder="Write the article content here..."
                                                className="h-60 rounded-none"
                                            />
                                        </div>

                                        {/* Category */}
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Category</Label>
                                            <Select
                                                value={selectedCategory}
                                                onValueChange={(value) => {
                                                    getCategory.current = value;
                                                    setSelectedCategory(value);

                                                }}>
                                                <SelectTrigger className="rounded-none">
                                                    <SelectValue placeholder="Choose category" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-none">
                                                    {dataCategory.map((val, index) => (
                                                        <SelectItem key={index} value={val}>
                                                            {val}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="ghost"
                                            type="button"
                                            className="bg-stone-300 
                                                rounded-none w-60 mx-auto
                                                hover:bg-stone-400"
                                            onClick={BtCreateArticle}>
                                            Upload
                                        </Button>
                                    </CardFooter>
                                </Card>

                            </form>
                        </div>

                        {/* list my article */}
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <div className="flex space-x-6">
                                    <div className="text-2xl font-bold text-slate-800
                                    flex items-center gap-2 hover:bg-stone-300 py-2 px-6
                                    cursor-pointer">
                                        <BookCheck /> <span>Published</span></div>
                                    <div className="text-2xl font-bold text-slate-800
                                    flex items-center gap-2 py-2 px-6 hover:bg-stone-300
                                    cursor-pointer">
                                        <FileClock /><span>Draft</span></div>
                                </div>
                                <div className="flex items-center space-x-2 overflow-x-auto">
                                    <Button variant="ghost">
                                        <Search className="w-5 h-5" />
                                    </Button>
                                    <Select>
                                        <SelectTrigger className="rounded-none w-[150px]">
                                            <SelectValue placeholder="Sort by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="newest">Newest</SelectItem>
                                            <SelectItem value="oldest">Oldest</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Grid of My-Articles */}
                            <GridMyArticle articleList={myArticleList} />
                        </div>
                    </div>
                </section>
            </main>
        </div>

    );
}