import Image from "next/image";

interface IArticle {
    title: string;
    thumbnail: string;
    content: string;
    category: string;
}
interface IArticleList {
    articleList: IArticle[];
}

export default function GridMyArticle({articleList} :IArticleList) {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[300px] gap-4">
        {articleList.map((value, index) => (
          <div
            key={index}
            className="relative overflow-hidden group shadow-md"
          >
            <Image
              src={value.thumbnail}
              alt={value.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-0 p-4 z-10 text-white">
              <p className="text-xs uppercase">{value.category}</p>
              <h3 className="text-lg font-playfair font-semibold">
                {value.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
