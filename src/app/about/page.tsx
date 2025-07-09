

export default function AboutPage() {
  return (
    <div className={` bg-stone-500`}>
      {/* Section 1: About Us */}
      <section className="h-[400px] relative 
           bg-[url('/about/about.webp')] bg-cover bg-center py-20 text-center">

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Content */}
        <div className="relative z-10 mt-16">
          <h1 className="text-5xl font-playfair text-stone-50 tracking-widest font-bold">
            About Grand Villia
          </h1>
          <p className="mt-4 text-xl text-stone-50 font-lora tracking-widest italic">
            &quot;Crafting memories with passion, recognized with pride.&quot;
          </p>
        </div>
      </section>

      {/* Section 2: Our Story */}
      <section className="relative overflow-hidden py-20 px-4 md:px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center bg-stone-300 p-8 shadow-md">
          <div
            className="md:h-[800px] h-[400px] shadow-lg 
            bg-[url('/about/ourstory.webp')] 
            bg-fixed bg-cover bg-center"
          />
          {/* Text Side */}
          <div className="relative z-10">
            <h2 className="font-playfair text-4xl font-bold text-slate-800 mb-8">
              Our Story
            </h2>
            <div className="font-lora text-lg md:text-xl leading-relaxed space-y-6 text-slate-700">
              <p>
                Grand Villia was founded with a clear vision: to create a sanctuary where elegance meets heartfelt hospitality.
                Nestled in the tranquil heart of Langgur, our hotel is more than just a destination — it is a feeling, a memory,
                and an experience that stays with you.
              </p>
              <p>
                From the very beginning, we have believed that true luxury lies not only in refined design or fine cuisine,
                but in the warmth of a smile, the comfort of a quiet moment, and the attention to every detail that makes
                our guests feel genuinely at home.
              </p>
              <p>
                Each corner of Grand Villia is thoughtfully crafted to reflect a harmony of local charm and international standards.
                Whether you’re staying for a romantic escape, a family retreat, or a special celebration, we aim to make every
                stay uniquely personal and unforgettable.
              </p>
              <p>
                Our story continues every day — in the laughter shared over breakfast, in the sunsets viewed from the terrace,
                and in the trust of every guest who walks through our doors. We are honored to be part of your journey.
              </p>
              <p className="pt-8 italic">
                With sincerity and pride,<br />
                <span className="not-italic">The Grand Villia Team</span>
              </p>
            </div>
          </div>
        </div>
      </section>



      <section className="relative overflow-hidden py-20 px-4 md:px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center bg-stone-300 p-8 shadow-2xl">
          {/* Text Side */}
          <div className="relative z-10">
            <h2 className="font-playfair text-4xl font-bold text-slate-800 mb-8">
              Certified Hospitality Excellence
            </h2>
            <div className="font-lora text-lg md:text-xl leading-relaxed space-y-6 text-slate-700">
              <p>
                <span className="font-bold">Langgur, August 2, 2018</span> — Grand Vilia Hotel is committed to continuously improving the quality of our services and facilities for every guest. As part of this mission, we participated in the Hotel Business Certification program and underwent a thorough three-day audit by the auditing team from <span className="italic">Pariwisata Bali Mandiri</span>.
              </p>

              <p>
                The audit provided valuable feedback covering various aspects, including our facilities, safety measures, and operational standards — all aimed at elevating the guest experience to meet national and international expectations.
              </p>

              <p>
                In preparation, Grand Vilia ensured all staff members received <span className="italic">Professional Certification</span>. This was made possible through a collaboration with the Sahid School of Tourism (STP Sahid) from Jakarta, who delivered intensive training and certification to our dedicated local team.
              </p>

              <p>
                <span className="italic">Rosmitha Indah Lestari</span>, General Manager of Grand Vilia Hotel, shared that the team welcomed the certification process with great enthusiasm. She emphasized that it was not only essential for maintaining high standards, but also served as a motivating milestone in our continuous journey of improvement.
              </p>

              <p>
                She further expressed her hope that other tourism operators in Southeast Maluku would follow suit and join similar certification programs to uplift the region’s tourism standards. Support from local government and the Tourism Office will be key to achieving this vision.
              </p>
            </div>
          </div>


          <div className="relative md:h-[800px] h-[400px] 
         shadow-lg bg-[url('/about/award.webp')] 
         bg-cover bg-center">
            <div className="absolute -right-15 -bottom-15 
             bg-stone-200 px-10 py-8 shadow-xl mx-4">
              <p className="text-sm text-slate-700 italic text-center leading-relaxed">
                Official awarding of the <span className="font-semibold">3-Star Hotel Certification</span> to Grand Vilia Hotel,<br />
                received by <span className="font-semibold">General Manager Rosmitha Indah Lestari</span>,<br />
                as a recognition of excellence in hospitality and service standards.
              </p>
            </div>
          </div>


        </div>

      </section>
    </div>
  );
}
