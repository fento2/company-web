"use client";

import { Playfair_Display, Lora, Explora } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import ExplorePage from "./components/Explore";
import Footer from "@/components/ui/core/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const ourRooms = [
  {
    title: "Suite Room",
    img: ["/images/suite1.webp", "/images/suite1.webp", "/images/suite1.webp"],
    alt: "Suite Room",
    desc: "A spacious and elegantly designed suite featuring a separate living room and dining area, perfect for both relaxation and entertaining guests.The room is adorned with modern furnishings and soft lighting to create a warm and inviting atmosphere. Ideal for couples or solo travelers seeking extra space and comfort, this suite can comfortably accommodate up to 2 guests. Every detail is thoughtfully curated to offer a luxurious yet homely experience, making it your perfect retreat in the heart of Grand Villia.",
  },
  {
    title: "Deluxe Room",
    img: ["/images/suite1.webp", "/images/suite1.webp", "/images/suite1.webp"],
    alt: "Deluxe Room",
    desc: "Designed with a blend of modern style and cozy elegance, our Deluxe Room provides a comfortable and functional space for every guest. Equipped with premium amenities such as a safety deposit box, minibar, high-speed Wi-Fi, and a flat-screen TV, this room is ideal for both business travelers and vacationers. Soft lighting, warm tones, and elegant details create a relaxing atmosphere where you can unwind after a day of adventure or meetings. The Deluxe Room promises a restful and enjoyable stay with all the essentials you need within reach.",
  },
  {
    title: "Superior Room",
    img: ["/images/suite1.webp", "/images/suite1.webp", "/images/suite1.webp"],
    alt: "Superior Room",
    desc: "Our Superior Room offers a perfect balance between simplicity and comfort. Featuring a choice of 1 double bed or 2 twin beds, along with a functional work desk and cozy seating, this room is designed to meet your basic needs without compromising on style. Ideal for solo travelers or friends, the Superior Room provides a peaceful environment with a warm ambiance and thoughtful touches to ensure a pleasant stay. Whether you're in town for business or leisure, this room is a smart and welcoming choice.",
  },
];


const Facilities = [
  {
    img: "/images/about.webp",
    title: "Lobby",
    desc: "Lorem Ipsum blasdadadasdadadasd"
  },
  {
    img: "/images/about.webp",
    title: "Restaurant",
    desc: "Lorem Ipsum blasdadadasdadadasd"
  },
  {
    img: "/images/about.webp",
    title: "Bar,Cafe & Lounge",
    desc: "Lorem Ipsum blasdadadasdadadasd"
  },
  {
    img: "/images/about.webp",
    title: "Swimming Pool",
    desc: "Lorem Ipsum blasdadadasdadadasd"
  },
  {
    img: "/images/about.webp",
    title: "Functional Hall",
    desc: "Lorem Ipsum blasdadadasdadadasd"
  },

]


export default function FacilitiesPage() {

  //buat rooms
  const [openImgRooms, setOpenImgRooms] = useState(false);
  const [selectedImgRooms, setSelectedImgRooms] = useState(0);

  //buat facilities
  const [openImgF, setOpenImgF] = useState(false);
  const [selectedImgF, setSelectedImgF] = useState(0);




  return (
    <div className={`${playfair.variable} ${lora.variable} bg-stone-100`}>

      <section className="h-[400px] relative 
           bg-[url('/images/lobby_hotel.webp')] bg-cover bg-center py-20 text-center">

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-5xl font-playfair text-stone-50 tracking-widest font-bold">
               Rooms & Facilities
          </h1>
          <p className="mt-4 text-xl text-stone-50 font-lora tracking-widest italic">
            "Everything you need for a memorable stay."
          </p>
        </div>
      </section>

    {/* room */}
      <section className="py-16 px-4">
        <div className="container mx-auto bg-stone-200
        p-8 space-y-8 shadow-2xl">
          <div className="space-y-2">
            <h2 className="text-4xl font-playfair text-slate-800 font-bold">
              Our Rooms
            </h2>
            <p className="text-lg italic tracking-tighter font-playfair text-slate-800">"From cozy to luxurious — rooms tailored to your needs."</p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: true }}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            className="w-full"
          >
            {ourRooms.map((room, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="relative w-full h-[400px] md:h-[500px]">
                    <Swiper
                      className="w-full h-full"
                    >
                      {room.img.map((imgSrc, i) => (
                        <SwiperSlide key={i}>
                          <div className="relative w-full h-[400px] md:h-[500px] 
                          " >
                            <Image
                              src={imgSrc}
                              alt={`${room.title} ${i + 1}`}
                              fill
                              className="cursor-pointer object-cover"
                              onClick={() => {
                                setSelectedImgRooms(index);
                                setOpenImgRooms(true);
                              }}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="w-10/11">
                    <h3 className="text-2xl md:text-3xl font-playfair mb-4 text-slate-800">
                      {room.title}
                    </h3>
                    <p className="font-lora text-lg md:text-xl leading-relaxed
                    -tracking-tighter text-slate-700">
                      {room.desc}
                    </p>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {openImgRooms &&
            <div className="fixed inset-0 z-50">

              <div className="absolute inset-0 bg-black/70"
                onClick={() => setOpenImgRooms(false)}
              />
              <button
                onClick={() => setOpenImgRooms(false)}
                className="absolute top-6 right-6 z-50 text-white
                cursor-pointer"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="relative z-40 flex items-center justify-center
              h-full">

                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  loop={true}
                  className="w-full max-w-5xl h-[500px]"
                >
                  {ourRooms[selectedImgRooms].img.map((src, i) => (
                    <SwiperSlide key={i}>
                      <div className="relative w-full h-[500px]">
                        <Image
                          src={src}
                          alt={`${ourRooms[selectedImgRooms].title} ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

            </div>}
        </div>
      </section>
    {/* facilities */}
      <section className="py-16 px-4">

        <div className="container mx-auto p-8 bg-stone-200 shadow-2xl">
          <div className="space-y-2 mb-8">
            <h2 className="text-4xl font-playfair text-slate-800 font-bold">
              Facilities
            </h2>
            <p className="text-lg italic tracking-tighter font-playfair text-slate-800">
              "Exceptional Spaces to Welcome, Relax, and Indulge"</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4">
            {Facilities.map((value, index) => (

              <div className={`relative w-full h-[400px] cursor-pointer
                ${index === 0 ? "md:col-span-2 col-span-2" : ""}
                ${index === 4 ? "md:col-span-3" : ""}`}
                key={index}
                onClick={() => {
                  setSelectedImgF(index)
                  setOpenImgF(true)
                }}
              >

                <Image
                  src={value.img}
                  alt={`image ${index}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end 
                justify-end">
                  <p className="text-stone-100 italic 
                  lg:text-xl text-lg px-4">
                    {value.title}
                  </p>
                </div>
              </div>
            ))}


            {openImgF && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">


                <div
                  className="absolute inset-0 bg-black/70"
                  onClick={() => setOpenImgF(false)}
                />


                <button
                  onClick={() => setOpenImgF(false)}
                  className="absolute top-6 right-6 z-50 text-white cursor-pointer"
                >
                  <X className="w-8 h-8" />
                </button>


                <div className="relative z-50 bg-stone-300 shadow-lg overflow-hidden w-[90%]
                 max-w-4xl mx-auto p-6 space-y-2">
                  <div className="relative w-full h-[300px] sm:h-[400px]">
                    <Image
                      src={Facilities[selectedImgF].img}
                      alt={`image ${selectedImgF}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="">
                    <h2 className="text-2xl font-playfair text-slate-800 mb-2">
                      {Facilities[selectedImgF].title}
                    </h2>
                    <p className="text-base text-slate-700 font-lora leading-relaxed">
                      {Facilities[selectedImgF].desc}
                    </p>
                  </div>
                </div>
              </div>
            )}




          </div>
        </div>
      </section>
      <ExplorePage/>
      <Footer/>
    </div>
  );
}
