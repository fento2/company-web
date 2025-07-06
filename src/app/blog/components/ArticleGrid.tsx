import Image from "next/image"

interface IArticle {
    title: string;
    thumbnail: string;
    content: string;
    category: string;
}
interface IArticleList {
    articleList: IArticle[];
}

const layoutPattern = [
    "", // 0
    "md:row-span-2", // 1
    "", // 2
    "md:row-span-2", // 3
    "", // 4
    "md:col-span-2", // 5
    "", // 6
    "", // 7
    "md:row-span-2", // 8
    "md:col-span-2 md:row-span-2", // 9
    "", // 10
    "md:row-span-2", // 11
    "", // 12
    "", // 13
    "md:col-span-2", // 14
];

export default function ArticleGrid({ articleList }: IArticleList) {

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[300px] gap-4">
                {articleList.map((value, index) => {

                    const layoutGrid = layoutPattern[index % layoutPattern.length]; //pattrern bakal ulang dari index 0 jika sampai last index

                    return (

                        <div
                            key={index}
                            className={`relative overflow-hidden group
                            ${layoutGrid}`}
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
                                <a className="text-sm underline">
                                    Read article
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>


        </div>
    )
}