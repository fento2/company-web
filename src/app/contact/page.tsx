import { Playfair_Display, Lora } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export default function ContactPage() {
  return (
    <div className={`${playfair.variable} ${lora.variable} bg-stone-500`}>
      {/* Hero Section */}
      <section className="h-[400px] relative bg-[url('/images/lobby_hotel.webp')] bg-cover bg-center py-20 text-center">
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 mt-16">
          <h1 className="text-5xl font-playfair text-stone-50 tracking-widest font-bold">
            Contact Us
          </h1>
          <p className="mt-4 text-xl text-stone-50 font-lora tracking-widest italic">
            &quot;Lets connect and make your stay unforgettable.&quot;
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="relative overflow-hidden py-20 px-4 md:px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-start bg-stone-300 p-8 shadow-2xl">
          {/* Contact Info */}
          <div className="space-y-6 text-slate-700 font-lora text-lg leading-relaxed">
            <h2 className="font-playfair text-3xl font-bold text-slate-800 mb-6">Reach Us At</h2>

            <p>
              <strong>Address:</strong><br />
              Jl. Raya Langgur No. 25, Southeast Maluku, Indonesia
            </p>

            <p>
              <strong>Email:</strong><br />
              contact@grandvillia.com
            </p>

            <p>
              <strong>Phone:</strong><br />
              +62 812-3456-7890
            </p>

            <p>
              <strong>Social Media:</strong><br />
              Follow us on Instagram, Facebook, or WhatsApp to stay connected!
            </p>

            <div className="pt-6">
              <h3 className="font-semibold mb-2">Book via:</h3>
              <a
                href="https://www.traveloka.com/en-id/hotel/indonesia/grand-vilia-hotel-langgur-tual-3000010025958"
                target="_blank"
              >
                <Image
                  src="https://ik.imagekit.io/tvlk/blog/2025/05/Traveloka_Primary_Logo-1.webp?tr=q-70,c-at_max,w-500,h-250,dpr-2"
                  alt="Traveloka"
                  width={150}
                  height={50}
                  className="object-contain"
                />
              </a>
            </div>
          </div>

          {/* Google Map */}
          <div className="rounded overflow-hidden shadow-lg w-full h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.2949226632804!2d132.7377086!3d-5.6704304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d301b5c2dc40247%3A0x602282c2fc284226!2sHotel%20Grand%20Vilia!5e0!3m2!1sid!2sid!4v1751985524295!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
