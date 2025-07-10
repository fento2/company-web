
import { apiCall } from "@/helper/apiCall";
import Image from "next/image";
import RelatedArticle from "./components/ReletedArticle";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const getDetail = async (slug: string) => {
  try {
    const res = await apiCall.get("/articles", {
      params: {
        where: `slug = '${slug}'`,
      },
    });

    return res.data[0];
  } catch (error) {
    console.error(error);
  }
};



export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const detailData = await getDetail(slug);

  return (
    <>
      <div className="container mx-auto py-30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-12 my-8">

          <div className="md:col-span-3 flex justify-center text-gray-800 font-sans">
            <div className="w-full space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold">{detailData.title}</h1>

              <div className="space-y-2">
                <p className="text-xs text-stone-500 uppercase tracking-wider">
                  {detailData.category}
                </p>
                <p className="text-sm text-stone-600">
                  Article by <span className="font-medium">{detailData.author}</span> ·{" "}
                  <span className="italic">
                    {new Date(detailData.created).toLocaleDateString()}
                  </span>
                </p>
              </div>


              <div className="relative w-full h-[400px] overflow-hidden shadow-md">
                <Image
                  src={detailData.thumbnail}
                  alt={detailData.title}
                  fill
                  className="object-cover"
                />
              </div>


              <div className=" max-w-none">
                {detailData.content
                  .split("\n")
                  .filter((value: string) => value.trim() !== "")
                  .map((paraf: string, index: number) => (
                    <p key={index}>{paraf.trim()}</p>
                  ))}
              </div>
            </div>
          </div>


          <RelatedArticle article={detailData} />
        </div>
      </div>
    </>
  );
}
