import Image from "next/image";
import ManageArticle from "./ManageArticle";
import { BookCheck, EllipsisVertical, FileClock, Search } from "lucide-react";
import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import SearchArticle from "../../components/SearchArticle";


interface IGridMyArticle {
  articleList: IArticle[];
  getMyArticleList: () => void;
  isLoading: boolean,
}

export default function GridMyArticle({ articleList, getMyArticleList,isLoading }: IGridMyArticle,) {
  const [showManageArticle, setShowManageArticle] = useState(false);
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector((state) => state.editArticleSlice.isEditing);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState<string>("");

  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [selectPublished, setSelectedPublished] = useState<"published" | "draft">("published");
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter()

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

  useEffect(() => {

    setShowSearch(false);

  }, [isEditing]);


  return (
    <div className="container px-4 sm:px-6 lg:px-8 mx-auto">

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between flex-col md:flex-row">
          <div className="flex space-x-2">
            <div className={`text-ms font-bold text-slate-800 flex items-center gap-2 ${selectPublished === "published" ? "bg-stone-300" : ""} py-2 px-6 cursor-pointer
            hover:bg-stone-300`}
              onClick={() => setSelectedPublished("published")}>
              <BookCheck /> <span>Published</span>
            </div>
            <div className={`text-md font-bold text-slate-800 flex items-center gap-2 py-2 px-6 ${selectPublished === "draft" ? "bg-stone-300" : ""} hover:bg-stone-300 cursor-pointer`}
              onClick={() => setSelectedPublished("draft")}>
              <FileClock /> <span>Draft</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
            <Button variant="ghost" className="bg-none hover:bg-transparant cursor-pointer"
              onClick={() => setShowSearch(true)}>
              <Search className="w-5 h-5" />
            </Button>
            <Select
              value={sortBy}
              onValueChange={(val: "newest" | "oldest") => setSortBy(val)}
            >
              <SelectTrigger className="rounded-none max-w-[150px] bg-stone-100">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="rounded-none z-50">
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ini modal search */}
        {showSearch && <SearchArticle list={articleList} setShowSearch={setShowSearch} setShowManageArticle={setShowManageArticle} />}

        {/* Grid */}
        {isLoading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[400px]">

          {sortedArticles.map((value, index) => (
            <div key={index} className={`relative overflow-hidden group border-none`}
            >

              <Image
                src={value.thumbnail}
                alt={value.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 "
                onClick={() => router.push(`/articles/${value.slug}`)} />

              <div className="absolute top-2 right-2 cursor-pointer hover:bg-stone-500 hover:rounded-4xl p-2">
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
                <p className="text-[10px] sm:text-xs uppercase">{value.category}</p>
                <h3 className="text-base sm:text-lg font-playfair font-normal break-words leading-snug font-serif">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm underline">Read article</p>
              </div>

            </div>
          ))}
        </div>

         :
          <div className="mx-auto animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-stone-600" />
        }

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
