import axios from "axios";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface ITeamMember {
  name: string;
  photo: string;
  role: string;
  bio: string;
}

interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
}


const roles = [
  "General Manager",
  "Head Chef",
  "Front Office Manager",
  "Housekeeping Supervisor",
  "Guest Relations",
  "Marketing Specialist",
];

const bios = [
  "Dedicated professional with years of experience in hospitality.",
  "Passionate about creating unforgettable guest experiences.",
  "Committed to excellence and team leadership.",
  "Specializes in comfort and cleanliness standards.",
  "Ensures every guest feels welcome and valued.",
  "Crafts compelling strategies to elevate our brand.",
];

export default async function TeamsPage() {
  const res = await axios.get("https://randomuser.me/api/?results=6");
  const data = res.data;

  const team: ITeamMember[] = data.results.map((user: RandomUser, index: number) => ({
  name: `${user.name.first} ${user.name.last}`,
  photo: user.picture.large,
  role: roles[index % roles.length],
  bio: bios[index % bios.length],
}));


  return (
    <div className={`bg-stone-100`}>
      <section
        className="h-[400px] relative 
        bg-[url('/images/team.webp')] bg-cover bg-center py-20 text-center"
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 mt-16">
          <h1 className="text-5xl font-playfair text-stone-50 tracking-widest font-bold">
            Our Team
          </h1>
          <p className="mt-4 text-xl text-stone-50 font-lora tracking-widest italic">
            &quot;Passionate professionals behind Grand Villia&apos;s excellence.&quot;
          </p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <Card
                key={index}
                className="bg-stone-300 rounded-none shadow-sm hover:shadow-md transition p-6 flex flex-col items-center text-center"
              >
                <div className="relative w-28 h-28 mb-4 overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-800 font-playfair">
                    {member.name}
                  </h3>
                  <p className="text-sm text-stone-500">{member.role}</p>
                  <p className="text-sm text-slate-700 font-lora">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
