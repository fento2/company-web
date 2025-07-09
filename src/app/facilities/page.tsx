"use client";


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import ExplorePage from "./components/Explore";

import "swiper/css";
import "swiper/css/navigation";


const ourRooms = [
  {
    title: "Suite Room",
    img: ["/facilities/suite1.webp", "/facilities/suite2.jpg", "/facilities/suite3.jpg"],
    desc: "A spacious and elegantly designed suite featuring a separate living room and dining area, perfect for both relaxation and entertaining guests. The room is adorned with modern furnishings and soft lighting to create a warm and inviting atmosphere. Ideal for couples or solo travelers seeking extra space and comfort, this suite can comfortably accommodate up to 2 guests. Every detail is thoughtfully curated to offer a luxurious yet homely experience, making it your perfect retreat in the heart of Grand Villia.",
  },
  {
    title: "Deluxe Room",
    img: ["/facilities/duluxe1.jpg", "/facilities/duluxe2.jpg", "/facilities/duluxe3.jpg"],
    desc: "Designed with a blend of modern style and cozy elegance, our Deluxe Room provides a comfortable and functional space for every guest. Equipped with premium amenities such as a safety deposit box, minibar, high-speed Wi-Fi, and a flat-screen TV, this room is ideal for both business travelers and vacationers. Soft lighting, warm tones, and elegant details create a relaxing atmosphere where you can unwind after a day of adventure or meetings. The Deluxe Room promises a restful and enjoyable stay with all the essentials you need within reach.",
  },
  {
    title: "Superior Room",
    img: ["/facilities/superior1.avif", "/facilities/superior2.jpg", "/facilities/superior3.jpg"],
    desc: "Our Superior Room offers a perfect balance between simplicity and comfort. Featuring a choice of 1 double bed or 2 twin beds, along with a functional work desk and cozy seating, this room is designed to meet your basic needs without compromising on style. Ideal for solo travelers or friends, the Superior Room provides a peaceful environment with a warm ambiance and thoughtful touches to ensure a pleasant stay. Whether you're in town for business or leisure, this room is a smart and welcoming choice.",
  },
];

const Facilities = [
  { img: "/facilities/lobby.webp", title: "Lobby", desc: "Spacious and welcoming lobby with comfortable seating and concierge services." },
  { img: "/facilities/restaurant.jpeg", title: "Restaurant", desc: "Elegant dining with local and international cuisine served fresh daily." },
  { img: "/facilities/bar.jpeg", title: "Bar, Cafe & Lounge", desc: "Relaxed atmosphere for drinks, snacks, and casual meetings." },
  { img: "/facilities/pool.jpg", title: "Swimming Pool", desc: "Crystal-clear pool ideal for both recreation and relaxation." },
  { img: "/facilities/functional hall.jpeg", title: "Functional Hall", desc: "Versatile hall for events, meetings, or private functions." },
];

export default function FacilitiesPage() {
  const [openRoomModal, setOpenRoomModal] = useState(false);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);

  const [openFacilityModal, setOpenFacilityModal] = useState(false);
  const [selectedFacilityIndex, setSelectedFacilityIndex] = useState(0);

  return (
    <div className={` bg-stone-100`}>
      <section className="h-[400px] relative bg-[url('/facilities/rooms.webp')] bg-cover bg-center py-20 text-center">
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 mt-16">
          <h1 className="text-5xl font-playfair text-white font-bold tracking-widest">Rooms & Facilities</h1>
          <p className="mt-4 text-xl text-white font-lora italic tracking-widest">&quot;Everything you need for a memorable stay.&quot;</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto bg-stone-200 p-6 md:p-8 space-y-8 shadow-2xl rounded">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-playfair text-slate-800 font-bold">Our Rooms</h2>
            <p className="text-base md:text-lg italic font-playfair text-slate-700">&quot;From cozy to luxurious — rooms tailored to your needs.&quot;</p>
          </div>

          <Swiper modules={[Navigation, Pagination, Autoplay]} navigation pagination={{ clickable: true }} autoplay={{ delay: 5000 }} loop spaceBetween={30} slidesPerView={1} className="w-full">
            {ourRooms.map((room, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
                    <Swiper className="w-full h-full">
                      {room.img.map((imgSrc, i) => (
                        <SwiperSlide key={i}>
                          <div className="relative w-full h-full">
                            <Image
                              src={imgSrc}
                              alt={`${room.title} ${i + 1}`}
                              fill
                              className="object-cover rounded cursor-pointer"
                              onClick={() => {
                                setSelectedRoomIndex(index);
                                setOpenRoomModal(true);
                              }}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div>
                    <h3 className="text-2xl font-playfair mb-4 text-slate-800">{room.title}</h3>
                    <p className="font-lora text-base md:text-lg leading-relaxed text-slate-700">{room.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {openRoomModal && (
            <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
              <button className="absolute top-6 right-6 z-50 text-white" onClick={() => setOpenRoomModal(false)}>
                <X className="w-8 h-8" />
              </button>
              <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} loop className="w-full max-w-5xl h-[80vh]">
                {ourRooms[selectedRoomIndex].img.map((src, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-full">
                      <Image src={src} alt={`Room ${i}`} fill className="object-cover rounded" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto p-6 md:p-8 bg-stone-200 shadow-2xl rounded">
          <div className="mb-8 space-y-2">
            <h2 className="text-3xl md:text-4xl font-playfair text-slate-800 font-bold">Facilities</h2>
            <p className="text-base md:text-lg italic font-playfair text-slate-700">&quot;Exceptional Spaces to Welcome, Relax, and Indulge&quot;</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4">
            {Facilities.map((f, index) => (
              <div
                key={index}
                className={`relative w-full h-[200px] sm:h-[300px] cursor-pointer ${index === 0 ? "md:col-span-2" : ""} ${index === 4 ? "md:col-span-3" : ""}`}
                onClick={() => {
                  setSelectedFacilityIndex(index);
                  setOpenFacilityModal(true);
                }}
              >
                <Image src={f.img} alt={`facility ${index}`} fill className="object-cover rounded" />
                <div className="absolute inset-0 bg-black/40 flex items-end justify-end">
                  <p className="text-white text-sm md:text-lg italic px-4 pb-2">{f.title}</p>
                </div>
              </div>
            ))}
          </div>

          {openFacilityModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
              <button className="absolute top-6 right-6 z-50 text-white" onClick={() => setOpenFacilityModal(false)}>
                <X className="w-8 h-8" />
              </button>
              <div className="bg-stone-300 p-6 md:p-8 w-full max-w-3xl rounded shadow-lg space-y-4 z-50">
                <div className="relative w-full h-[40vh] sm:h-[50vh] rounded overflow-hidden">
                  <Image src={Facilities[selectedFacilityIndex].img} alt="Facility" fill className="object-cover" />
                </div>
                <h3 className="text-xl md:text-2xl font-playfair text-slate-800">{Facilities[selectedFacilityIndex].title}</h3>
                <p className="text-sm md:text-base font-lora text-slate-700">{Facilities[selectedFacilityIndex].desc}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <ExplorePage />
    </div>
  );
}
