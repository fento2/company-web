import Guest from "@/components/ui/core/Guest";
import Hero from "@/components/ui/core/Hero";
import Testimonials from "@/components/ui/core/Testimonials";
import WhyUs from "@/components/ui/core/WhyUs";
export default function Home() {
  return (

    <div className="w-full min-h-screen bg-stone-500">
      <Hero/>
      <Guest/>
      <WhyUs/>
      <Testimonials/>
    </div>

  );
}
