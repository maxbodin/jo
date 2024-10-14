import * as React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { GithubIcon, LinkedinIcon, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ItchIoIcon } from '@/components/custom/icons/ItchIoIcon'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'

const tooltipDelayDuration: number = 100

export const Whoami = (): React.JSX.Element => {
   return (
      <section id="whoami" className="pt-8 flex flex-col lg:flex-row items-start space-x-4">
         <Avatar className="flex-shrink-0">
            <AvatarImage src="/images/id.webp" />
            <AvatarFallback>🤓</AvatarFallback>
         </Avatar>
         <div className="flex flex-col space-y-2 pt-4">
            <h1 className="text-xl font-semibold">@MaxBodin</h1>
            <Badge className="p-1 px-2 bg-green-100 w-fit hover:bg-green-400 hover:cursor-pointer">
               <Link className="flex flex-row " href="mailto:maxbod.contact@gmail.com">
                  <Search className="h-4 text-green-800" />
                  <p className="px-1 text-green-700">En recherche d’Alternance !</p>
               </Link>
            </Badge>
            <p className="text-justify">Avide de connaissances et autodidacte, je suis passionné par de nombreux
               domaines de l’informatique (intelligence artificielle, développement logiciel/web et 3D, ...). J’ai
               obtenu en 2024 mon Bachelor Universitaire de Technologie Informatique à l’IUT de La Rochelle, j’ai
               réalisé ma troisième année de BUT en alternance au sein de l’entreprise Enedis.
               J’aime concevoir et réaliser des projets innovants et apprendre de nouvelles connaissances en les réalisant.
            </p>
            <div className="flex flex-row space-x-2">
               <TooltipProvider delayDuration={tooltipDelayDuration}>
                  <Tooltip>
                     <TooltipTrigger>
                        <Button variant="outline" size="icon" asChild>
                           <Link href="https://github.com/maxbodin/"><GithubIcon className="h-4 w-4" /></Link>
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side="bottom">
                        Github
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
               <TooltipProvider delayDuration={tooltipDelayDuration}>
                  <Tooltip>
                     <TooltipTrigger>
                        <Button variant="outline" size="icon" asChild>
                           <Link href="https://www.linkedin.com/in/maxime-bodin-dev/">
                              <LinkedinIcon className="h-4 w-4 text-blue-800" />
                           </Link>
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side="bottom">
                        <p className="text-blue-800">Linkedin</p>
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
               <TooltipProvider delayDuration={tooltipDelayDuration}>
                  <Tooltip>
                     <TooltipTrigger>
                        <Button variant="outline" size="icon" asChild>
                           <Link href="https://makzime.itch.io">
                              <ItchIoIcon />
                           </Link>
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side="bottom">
                        <p className="text-[#fa5c5c]">Itch.io</p>
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
               <TooltipProvider delayDuration={tooltipDelayDuration}>
                  <Tooltip>
                     <TooltipTrigger className="pl-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-gray-300 hover:bg-gray-400" asChild>
                           <Link href="https://github.com/maxkzime"><GithubIcon className="h-4 w-4" /></Link>
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side="bottom" className="bg-gray-300">
                        Ancien Github
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            </div>
         </div>
      </section>
   )
}