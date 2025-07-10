"use client"
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { IArticle } from "@/helper/article";
import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { EllipsisVertical } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hook";
import { setEditArticle } from "@/lib/redux/features/editArticleSlice";


interface ISearchArticle {
  list: IArticle[];
  setShowSearch: (value: boolean) => void;
  setShowManageArticle?: (value: boolean) => void;
}


export default function SearchArticle({ list, setShowSearch, setShowManageArticle }: ISearchArticle) {
  const [inputSearch, setInputSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const inDashboard = pathname.startsWith('/stories/dashboard');
  const dispatch = useAppDispatch()
  const filtered = list.filter((article) =>
    article.title.toLowerCase().includes(inputSearch.toLowerCase())
  );




  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs w-full h-full">
        <Card className="w-full max-w-2xl p-6 rounded-none shadow-xl bg-white relative">
          <button
            onClick={() => setShowSearch(false)}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-semibold mb-4 normal-case font-serif">Search Article</h2>
          <div className="relative w-full">
            <Search className="absolute left-2 top-4 -translate-y-1/2" />
            <Input
              placeholder="What are you looking for?"
              className="pl-10 mb-4 rounded-none font-serif font-normal"
              value={inputSearch}
              onChange={(val) => setInputSearch(val.target.value)}
            />
          </div>


          <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
            {inputSearch && filtered.length > 0 ? (
              filtered.map((value, index) => (

                <div key={index} className="flex justify-between items-center">
                  <div
                    className="flex items-center gap-4 border-b pb-3 cursor-pointer w-full"
                    onClick={() => router.push(`/articles/${value.slug}`)}>
                    <div className="relative w-16 h-16 border overflow-hidden">
                      <Image
                        src={value.thumbnail}
                        alt={value.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-normal line-clamp-1 font-serif">
                        {value.title}
                      </h3>
                      <p className="text-sm text-stone-600">{value.category}</p>
                    </div>
                  </div>
                  <div className="mr-12">
                    {inDashboard && <EllipsisVertical onClick={() => {
                      setShowManageArticle?.(true)
                      dispatch(setEditArticle({ ...value, isEditing: false }))
                    }} className="cursor-pointer" />}
                  </div>
                </div>
              ))
            ) : inputSearch ? (
              <div className="text-gray-500">No results found</div>
            ) : null}
          </div>


          <div className="flex justify-end">
          </div>
        </Card>
      </div>
    </>
  );
}