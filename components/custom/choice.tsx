'use client'
import * as React from 'react'
import { useEffect } from 'react'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuRadioGroup,
   DropdownMenuRadioItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Athlete } from '@/interfaces/athlete'
import { readCsv } from '@/functions/readCsv'

export const Choice = () => {
   const [position, setPosition] = React.useState('bottom')


   const [athletes, setAthletes] = React.useState<Athlete[]>([])
   const [error, setError] = React.useState('NO ERROR')

   useEffect((): void => {
      readCsv('/data/Paris_2024/athletes.csv')
         .then((value): void => {
            setAthletes(value || [])
         })

   }, [setAthletes])

   return (<><DropdownMenu>
      <DropdownMenuTrigger asChild>
         <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
         <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
         <DropdownMenuSeparator />
         <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
         </DropdownMenuRadioGroup>
      </DropdownMenuContent>
   </DropdownMenu>


      <div>
         {error}
         <h1>Athletes</h1>
         <ul>
            {athletes.map((athlete) => (
               <li key={athlete.code}>
                  {athlete.name} - {athlete.country}
               </li>
            ))}
         </ul>
      </div>


   </>)
}

