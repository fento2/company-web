import Image from "next/image";
import ManageArticle from "./ManageArticle";
import { BookCheck, EllipsisVertical, FileClock, Search } from "lucide-react";
import { useState } from "react";
import { IArticle } from "@/helper/article";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { setEditArticle } from "@/lib/redux/features/editArticleSlice";
import ConfirmDelete from "./ConfirmDelete";
import { apiCall } from "@/helper/apiCall";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IGridMyArticle {
  articleList: IArticle[];
  getMyArticleList: () => void;
}

export default function GridMyArticle({ articleList, getMyArticleList }: IGridMyArticle,) {
  const [showManageArticle, setShowManageArticle] = useState(false);
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector((state) => state.editArticleSlice.isEditing);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState<string>("");

  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [selectPublished, setSelectedPublished] = useState<"published" | "draft">("published")

  const BtDelateArticle = async () => {
    try {
      await apiCall.delete(`/articles/${selectedDelete}`);
      toast.success("Article deleted successfully!");
      getMyArticleList();
    } catch (error) {
      console.log(error);
    }
  };


  const printMyArticle = [...articleList].filter((value) => value.published === (selectPublished === "published" ? true : false));
  const sortedArticles = [...printMyArticle].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.created!).getTime() - new Date(a.created!).getTime();
    } else {
      return new Date(a.created!).getTime() - new Date(b.created!).getTime();
    }
  });

  return (
    <div className="container">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            <div className={`text-2xl font-bold text-slate-800 flex items-center gap-2 ${selectPublished === "published" ? "bg-stone-300" : ""} py-2 px-6 cursor-pointer
            hover:bg-stone-300`}
              onClick={() => setSelectedPublished("published")}>
              <BookCheck /> <span>Published</span>
            </div>
            <div className={`text-2xl font-bold text-slate-800 flex items-center gap-2 py-2 px-6 ${selectPublished === "draft" ? "bg-stone-300" : ""} hover:bg-stone-300 cursor-pointer`}
              onClick={() => setSelectedPublished("draft")}>
              <FileClock /> <span>Draft</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost">
              <Search className="w-5 h-5" />
            </Button>
            <Select
              value={sortBy}
              onValueChange={(val: "newest" | "oldest") => setSortBy(val)}
            >
              <SelectTrigger className="rounded-none w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="rounded-none z-50">
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[400px] gap-4">
          {sortedArticles.map((value, index) => (
            <div key={index} className="relative overflow-hidden group border-none">
              <Image
                src={value.thumbnail}
                alt={value.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0" />

              <div className="absolute top-2 right-2 hover:bg-stone-400/30 p-2">
                {!isEditing && (
                  <EllipsisVertical
                    className="text-white"
                    onClick={() => {
                      setShowManageArticle(true);
                      dispatch(setEditArticle({ ...value, isEditing: false }));
                      setSelectedDelete(value.objectId);
                    }}
                  />
                )}
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-stone-100 text-slate-800 w-full h-auto"
              >
                <p className="text-xs uppercase">{value.category}</p>
                <h3 className="text-lg font-playfair font-semibold break-words leading-snug">
                  {value.title}
                </h3>
                <a className="text-sm underline">Read article</a>
              </div>

            </div>
          ))}
        </div>

        {showManageArticle && (
          <ManageArticle setShowModal={setShowManageArticle} setShowConfirm={setShowConfirm} />
        )}

        {showConfirm && (
          <ConfirmDelete setShowConfirm={setShowConfirm} BtDeleteArticle={BtDelateArticle} />
        )}
      </div>
    </div>
  );
}
