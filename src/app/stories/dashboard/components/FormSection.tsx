"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectItem,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { dataCategory } from "@/helper/dataCategory";
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { clearEditArticle } from "@/lib/redux/features/editArticleSlice";
import { Switch } from "@/components/ui/switch";
interface FormSectionProps {
    BtCreateArticle: (published: boolean) => void;
    BtEditArticle: (objectId: string, published: boolean) => void;
    formArticle: RefObject<HTMLFormElement | null>;
    getCategory: RefObject<string | null>;
    selectedCategory: string | undefined;
    setSelectedCategory: Dispatch<SetStateAction<string | undefined>>;
}

export default function FormSection({
    BtCreateArticle,
    BtEditArticle,
    formArticle,
    getCategory,
    selectedCategory,
    setSelectedCategory,
}: FormSectionProps) {

    const isEditing = useAppSelector((state) => state.editArticleSlice.isEditing);
    const objectId = useAppSelector((state) => state.editArticleSlice.objectId);

    //default value buat edit
    const title = useAppSelector((state) => state.editArticleSlice.title);
    const thumbnail = useAppSelector((state) => state.editArticleSlice.thumbnail);
    const content = useAppSelector((state) => state.editArticleSlice.content);
    const category = useAppSelector((state) => state.editArticleSlice.category);
    const reduxPublish = useAppSelector((state) => state.editArticleSlice.published)
    const dispatch = useAppDispatch()
    const [publish, setPublish] = useState<boolean>(true);//publish pilihan user

    useEffect(() => {
        if (isEditing && category) {// jika mode editing defaultvalue select ada isi
            setSelectedCategory(category);
            getCategory.current = category;
        }
    }, [isEditing, category]);

    useEffect(() => {

        if (isEditing) {// jika mode editing defaultvalue published ada isi
            setPublish(reduxPublish);

        } else {
            setPublish(true);
        }
    }, [isEditing, reduxPublish]);


    const handleButton = () => {

        if (isEditing) {
            BtEditArticle(objectId, publish);
        } else {
            BtCreateArticle(publish);
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800">
                {isEditing ? "Edit Article" : "Post Article"}
            </h3>

            <form ref={formArticle}>
                <Card className="rounded-none shadow-md bg-white w-full">
                    <CardHeader className="border-b pb-4 space-y-1">
                        <h4 className="text-lg font-semibold text-slate-700">
                            {isEditing ? "Update Your Article" : "Create a New Article"}
                        </h4>
                        <p className="text-sm text-slate-500">
                            Fill in the form below to {isEditing ? "update" : "publish"} your post.
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
                                className="rounded-none"
                                defaultValue={isEditing ? title : ""}
                                required
                            />
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
                                defaultValue={isEditing ? thumbnail : ""}
                                required
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
                                defaultValue={isEditing ? content : ""}
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                key={selectedCategory}  //cara kerja key jika key-nya berubah react anggap itu kompnen baru jadi di render uang
                                value={selectedCategory}
                                onValueChange={(value) => {
                                    getCategory.current = value;
                                    setSelectedCategory(value);
                                }}

                            >
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


                        {/* Published Toggle */}
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="published"
                                checked={publish}
                                onCheckedChange={(checked) => setPublish(checked)}
                                className="cursor-pointer data-[state=checked]:bg-stone-500"
                            />
                            <Label htmlFor="published">
                                {publish ? "Published" : "Draft"}
                            </Label>

                        </div>

                    </CardContent>

                    <CardFooter>
                        <div className="flex flex-col-reverse md:flex-row mx-auto gap-5">
                            {isEditing && <Button
                                variant="ghost"
                                type="button"
                                className="bg-stone-300 rounded-none w-60 mx-auto hover:bg-red-600"
                                onClick={() => {
                                    dispatch(clearEditArticle())
                                    formArticle.current?.reset();
                                    setSelectedCategory(undefined);
                                    getCategory.current = null;
                                }}
                            >
                                Cancel
                            </Button>}
                            <Button
                                variant="ghost"
                                type="button"
                                className="bg-stone-300 rounded-none w-60 mx-auto hover:bg-stone-400"
                                onClick={handleButton}
                            >
                                {isEditing ? "Update" : "Upload"}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
