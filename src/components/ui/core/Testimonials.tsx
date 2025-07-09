"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "../button";
import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    name: "Meetings",
    message: "As a comfort city resort designed for both business and pleasure.",
    image: "/home/meeting.webp",
  },
  {
    name: "Weddings",
    message: "Feel the bloom of love and draw your unforgettable BIG day memories.",
    image: "/home/testimonial.webp",

  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 md:px-6 font-serif">
      <div className="max-w-6xl mx-auto bg-stone-300 p-8">
        <h2 className="text-2xl font-bold font-playfair text-center text-slate-800 mb-12">
          Our guests tell it best
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-18 md:gap-2">
          {testimonials.map((guest, i) => (
            <div key={i} className="relative">
              {/* Foto Potrait Full */}
              <Image
                src={guest.image}
                alt={guest.name}
                width={800} 
                height={700}
                className="w-full h-[750px] object-cover"
                style={{ objectFit: "cover" }}
              />

              {/* Keterangan Pojok Kanan Bawah */}
              <div
                className="absolute bottom-[-50px] right-6
                 bg-stone-300/80 text-slate-800 px-4 py-2 shadow-xl 
                 max-w-[75%] space-y-4"
              >
                <p className="text-xl font-lora tracking-widest">{guest.name}</p>
                <p className="text-sm tracking-widest font-lora">{guest.message}</p>
                <div className="flex">
                
                  <Button variant="link"
                    className="rounded-none bg-stone-950
                 text-stone-50 ml-auto">
                  <Link href="/facilities"> LEARN MORE
                  </Link></Button></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>


  );
}
