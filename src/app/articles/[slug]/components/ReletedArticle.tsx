import { apiCall } from "@/helper/apiCall";
import Image from "next/image";
import Link from "next/link";
import { IArticle } from "@/helper/article";

interface RelatedArticleProps {
  article: IArticle;
}

export default async function RelatedArticle({ article }: RelatedArticleProps) {
  
  const res = await apiCall.get("/articles", {
    params: {
      pageSize: 100,
      sortBy: "created desc",
      where: `category = '${article.category}' AND published = true AND objectId != '${article.objectId}'`,// jangan nampilin yang di klik
    },
  });

  const articleReletedList: IArticle[] = res.data;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-800">Other Stories</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {articleReletedList.map((value, index) => (
          <Link
            key={index}
            href={`/articles/${value.slug}`}
            className="grid grid-cols-2 bg-white overflow-hidden shadow group"
          >
            <div className="relative w-full h-32">
              <Image
                src={value.thumbnail}
                alt={value.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex-1 p-2 text-slate-800 text-xs w-full">
              <p className="uppercase truncate">{value.category}</p>
              <h3 className="text-sm font-semibold truncate w-full">{value.title}</h3>
              <p className="underline text-[10px]">Read article</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
