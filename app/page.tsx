import * as React from "react";
import Image from "next/image";
import FilterBar from "@/components/custom/filterBar/filterBar";
import { Footer } from "@/components/custom/footer";
import Athletes from "@/components/custom/athletes";
import { FilterParams } from "@/interfaces/filterParams";


export default async function HomePage({ searchParams }: {
  searchParams?: FilterParams
}) {

  return (
    <main className="flex flex-col items-center justify-between pt-14 text-sm">
        <Image
          width="300"
          height="300"
          src="/images/logo.png"
          title="Logo des Jeux Olympiques"
          alt="Logo des Jeux Olympiques"
          className="w-full h-[5vh] object-contain mb-10"
        />
        <FilterBar />
        <Athletes filterParams={searchParams} />
        <Footer />
    </main>
  );
}