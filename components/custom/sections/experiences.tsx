import * as React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { CarouselItemWithHover } from '@/components/custom/carouseltemWithHover'
import { experiencesItems } from '@/data/experiences'
import { Experience } from '@/interfaces/experience'


export const Experiences = (): React.JSX.Element => {
   return (
      <section id="experiences" className="pt-16">
         <h2 className="text-2xl pb-4">Expériences 🛠️</h2>
         <Carousel
            opts={{
               align: 'start',
            }}
            className="w-full max-w-full"
         >
            <CarouselContent>
               {experiencesItems.map((experience: Experience, index: number) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                     <CarouselItemWithHover item={experience} />
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
         </Carousel>
      </section>
   )
}