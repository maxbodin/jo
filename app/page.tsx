import * as React from 'react'
import Image from 'next/image'
import FilterBar from '@/components/custom/filterBar'


export default async function HomePage({filterParams}: {
   filterParams?: { year?: string; };
}) {

   const year: string = filterParams?.year ?? '';

   return (
      <main className="flex min-h-screen flex-col items-center justify-between pt-20">
         <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex-col">
            <Image
               width="300"
               height="300"
               src="/images/logo.png"
               title="Logo des Jeux Olympiques"
               alt="Logo des Jeux Olympiques"
               className={`w-full h-[5vh] object-contain`}
            />
            <h1>Jeux olympiques</h1>
            <div className="flex flex-col w-full px-16 lg:px-20">
               <h2>Classement par Athlètes / Pays / Pays et Athlètes pour Paris 2024</h2>
               <FilterBar/>
               {/*<Athletes />*/}

         {/*      <Suspense >
               <Footer />
               </Suspense>*/}
            </div>
         </div>
      </main>
   )
}