"use client"

import { useRef } from "react";
import Guest from "@/components/ui/core/Guest";
import Hero from "@/components/ui/core/Hero";
import Testimonials from "@/components/ui/core/Testimonials";
import WhyUs from "@/components/ui/core/WhyUs";
export default function Home() {

  const dearOurGuest = useRef<HTMLDivElement>(null);

  const srollToGuest = () => {
    if (dearOurGuest.current) {
      dearOurGuest.current.scrollIntoView({ behavior: "smooth" });
    }
  };



  return (
    <div className="w-full min-h-screen bg-stone-500">
      <section>
        <Hero scrollToGuest={srollToGuest}/>
      </section >
      <section ref={dearOurGuest} className="scroll-m-12">
        <Guest />
      </section>
      <section>
        <WhyUs />
      </section>
      <section>
        <Testimonials />
      </section>
    </div>
  );
}
