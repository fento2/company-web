'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    image: '/home/rooms.webp',
    title: 'Elegant Rooms',
    description: 'Luxuriously appointed accommodations designed with your comfort and sophistication in mind.',
  },
  {
    image: '/home/location.webp',
    title: 'Serene Location',
    description: 'Nestled in a tranquil setting that offers the perfect escape from the bustling city life.',
  },
  {
    image: '/home/service.webp',
    title: 'Personalized Service',
    description: 'Attentive staff dedicated to anticipating your needs and exceeding your expectations.',
  },
  {
    image: '/home/food.webp',
    title: 'Authentic Culinary Experience',
    description: 'Savor exquisite dishes crafted by our renowned chefs using the finest local ingredients.',
  },
];

export default function WhyUsSwiper() {
  return (
    <section className="relative w-full h-[700px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Text */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
                <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4">{slide.title}</h2>
                <p className="text-lg max-w-2xl font-lora">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
