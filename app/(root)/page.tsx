import { Globe } from "@/components/Globe";
import { InfiniteMovingProfile } from "@/components/ui/infinite-moving-profile";

export default function Home() {
  const profiles = [
    {
      id: 0,
      name: "Ceavin Rufus",
      bio: "(aspiring) software engineer at Google",
      image: "/cepus.jpg",
    },
    {
      id: 1,
      name: "Syafiq Ziyadul",
      bio: "A student with willingness to learn",
      image: "/sapiq.jpg",
    },
    {
      id: 2,
      name: "fawwaz abrial",
      bio: "hi! i'm fawwaz abrial, you can call me abil. I'm an aspiring back-end engineer based in Indonesia. Currently, i'm in college",
      image: "/abil.jpg",
    },
    {
      id: 3,
      name: "Fikri Naufal",
      bio: "Hi I'm Fikri an art curator focused on promoting local artists and their work.",
      image: "/fikri.jpg",
    },
  ];

  return (
    <main className="flex flex-col items-center w-full justify-center gap-3">
      <div className="w-full ">
        <Globe />
      </div>
      <div className="w-full bg-gray-100 py-10 flex flex-col justify-center items-center">
        <h1 className="text-center text-3xl font-bold">
          a lot of amazing people has joined our community
        </h1>
        <InfiniteMovingProfile speed="slow" items={profiles} />
      </div>
    </main>
  );
}
