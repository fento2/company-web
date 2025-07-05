import Image from "next/image";

const benefitList = [
    {
        img: "/images/book.webp",
        title: "Instant Benefits",
    },
    {
        img: "/images/book.webp",
        title: "DISCOVERY Dollars",
    },
    {
        img: "/images/book.webp",
        title: "Live Local",
    },
];

export default function ExplorePage() {
    return (

        <div className={` bg-stone-100`}>
            <section className="h-[400px] relative 
           bg-[url('/images/lobby_hotel.webp')] bg-cover bg-center py-20 text-center">

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 z-0" />

                {/* Content */}
                <div className="relative z-10">
                    <h1 className="text-5xl font-playfair text-stone-50 tracking-widest font-bold">
                        Explore
                    </h1>
                    <p className="mt-4 text-xl text-stone-50 font-lora tracking-widest italic">
                        "Explore what makes your stay truly exceptional."
                    </p>
                </div>
            </section>


            <section className="py-16 px-4">
                <div className="container mx-auto bg-stone-200
        p-8 space-y-8 shadow-2xl">
                    <div className="space-y-2">
                        <div className="space-y-2 text-center md:text-left">
                            <p className="text-sm uppercase tracking-widest text-slate-500 font-lora">
                                What Awaits You
                            </p>
                            <h2 className="text-4xl font-playfair text-slate-800 font-bold">
                                Our Signature Experiences
                            </h2>
                            <p className="text-lg italic tracking-tighter font-playfair text-slate-800">
                                Visit the most popular hidden paradise in Indonesia, Kei Island.<br />
                                Enjoy the beauty scenery you won’t find in any other place.
                            </p>
                        </div>
                    </div>

                    <div
                        className="container mx-auto 
                        grid grid-cols-1 gap-4 
                        md:flex md:h-[400px] md:gap-0 group "
                    >
                        {benefitList.map((item, i) => (
                            <div
                                key={i}
                                className="relative 
                                         h-[300px] 
                                         md:h-auto md:flex-1 overflow-hidden 
                                         transition-all duration-500 
                                         md:hover:flex-[3] md:group-hover:flex-[1]"
                            >
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/30 z-10" />
                                <h3 className="absolute inset-0 z-20 flex items-center justify-center text-white text-xl md:text-2xl font-playfair text-center px-4">
                                    {item.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-lora italic text-slate-700 mb-4">
                            Want to know more about our offerings?
                        </p>
                        <a
                            href="/files/grand-villia-brochure.pdf"
                            download
                            className="inline-block px-6 py-3 bg-stone-800 text-white 
                            font-semibold tracking-widest shadow-lg 
                             hover:bg-stone-950 transition duration-300"
                             >
                            Download Our Brochure
                        </a>
                    </div>

                </div>
            </section>

        </div>
    );
}
