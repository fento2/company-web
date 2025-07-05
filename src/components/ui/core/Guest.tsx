import { Playfair_Display, Lora } from "next/font/google"

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
})

const lora = Lora({
    subsets: ["latin"],
    variable: "--font-lora",
})

export default function Guest() {

    return (
        <div className={`${playfair.variable} ${lora.variable}`}>
            {/* Why Choose Us Section */}
            <section className="relative overflow-hidden py-20 px-4 md:px-6">
                <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center bg-stone-300 p-8">

                    {/* Left Content */}
                    <div className="relative z-10">
                        <h2 className="font-playfair text-5xl md:text-6xl font-bold text-slate-800 mb-8">
                            Dear Our Guest
                        </h2>

                        <div className="font-lora text-lg md:text-xl leading-relaxed space-y-6 text-slate-700">
                            <p className="italic text-xl font-light">
                                Welcome to Grand Villia, your peaceful sanctuary in the heart of Langgur.
                            </p>
                            <p>
                                Here, we believe that hospitality is more than service — it’s about warmth, comfort, and creating timeless memories.
                            </p>
                            <p>
                                Let every detail, every smile, and every moment at Grand Villia make you feel truly at home.
                            </p>
                            <p className="pt-8 italic">
                                Warm regards,<br />
                                <span className="not-italic">Grand Villia Team</span>
                            </p>
                        </div>
                    </div>

                    {/*Parallax Image */}
                    <div
                        className="md:h-[800px] h-[400px] shadow-lg 
                        bg-[url('/images/lobby_hotel.webp')] 
                        bg-fixed bg-cover bg-center"
                    />
                </div>
            </section>
        </div>
    )
}
