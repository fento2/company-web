import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown, MapPin, Users } from "lucide-react"
import Link from "next/link"
interface HeroProps {
  scrollToGuest: () => void;
}
export default function Hero(props: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video autoPlay muted loop playsInline preload="none"
        className="absolute inset-0 h-full w-full object-cover">
        <source src="/home/hero.webm" type="video/webm" />
        {/* Fallback image if video doesn't load */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-700" />
      </video>

      <div className="absolute inset-0 bg-black/40" />


      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center text-stone-100">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Grand Villia
                </h1>
                <p className="mx-auto max-w-2xl text-lg sm:text-xl md:text-2xl text-white/90">
                  Experience unparalleled comfort and elegance in the heart of the city. Where every moment becomes a
                  cherished memory.
                </p>
              </div>

              {/* Quick booking info */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Downtown Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>5-Star Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Available Year-Round</span>
                </div>
              </div>


              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a href="https://www.traveloka.com/en-id/hotel/indonesia/grand-vilia-hotel-langgur-tual-3000010025958"
                  target="_blank">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-lg font-semibold bg-white text-black hover:bg-white/90 transition-all duration-300 transform hover:scale-105 rounded-none"
                  >
                    Book Now
                  </Button>
                </a>
                <Link href="/facilities"><Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-lg font-semibold border-white text-white hover:bg-white hover:text-black transition-all duration-300 bg-transparent rounded-none"
                >
                  Explore Rooms
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-25 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="animate-bounce cursor-pointer
          " onClick={props.scrollToGuest}/>
        </div>
      </div>
    </section>
  )
}
