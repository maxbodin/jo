'use client'
import * as React from 'react'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { FilterParams } from '@/components/custom/filterBar/filterParams'
import { Input } from '@/components/ui/input'

export default function FilterBar() {
   const filterParams = useSearchParams()
   const pathname = usePathname()
   const router = useRouter()


   // Current values.
   const currentYear: string | undefined = filterParams.get(FilterParams.YEAR)?.toString()
   const currentSeason: string | undefined = filterParams.get(FilterParams.SEASON)?.toString()
   const currentCountry: string | undefined = filterParams.get(FilterParams.COUNTRY)?.toString()
   const currentAthleteName: string | undefined = filterParams.get(FilterParams.ATHLETE_NAME)?.toString()
   const currentSex: string | undefined = filterParams.get(FilterParams.SEX)?.toString()
   const currentNoc: string | undefined = filterParams.get(FilterParams.NOC)?.toString()
   const currentHostCity: string | undefined = filterParams.get(FilterParams.HOST_CITY)?.toString()
   const currentSport: string | undefined = filterParams.get(FilterParams.SPORT)?.toString()
   const currentMedals: string[] = filterParams.get(FilterParams.MEDALS)
      ? (filterParams.get(FilterParams.MEDALS) as string).split(',').map(medal => medal.trim())
      : []


   /**
    * Debounced update function to update the query parameters.
    */
   const handleFilterUpdate = useDebouncedCallback(
      ({
          year = currentYear,
          season = currentSeason,
          country = currentCountry,
          athleteName = currentAthleteName,
          sex = currentSex,
          noc = currentNoc,
          hostCity = currentHostCity,
          sport = currentSport,
          medals = currentMedals,
       }: {
         year?: string;
         season?: string;
         country?: string;
         athleteName?: string;
         sex?: string;
         noc?: string;
         hostCity?: string;
         sport?: string;
         medals?: string[];
      }) => {
         const params = new URLSearchParams(filterParams)

         if (year && year != '') params.set(FilterParams.YEAR, year)
         else params.delete(FilterParams.YEAR)

         if (season && season != '') params.set(FilterParams.SEASON, season)
         else params.delete(FilterParams.SEASON)

         if (country && country != '') params.set(FilterParams.COUNTRY, country)
         else params.delete(FilterParams.COUNTRY)

         if (athleteName && athleteName != '') params.set(FilterParams.ATHLETE_NAME, athleteName)
         else params.delete(FilterParams.ATHLETE_NAME)

         if (sex && sex != '') params.set(FilterParams.SEX, sex)
         else params.delete(FilterParams.SEX)

         if (noc && noc != '') params.set(FilterParams.NOC, noc)
         else params.delete(FilterParams.NOC)

         if (hostCity && hostCity != '') params.set(FilterParams.HOST_CITY, hostCity)
         else params.delete(FilterParams.HOST_CITY)

         if (sport && sport != '') params.set(FilterParams.SPORT, sport)
         else params.delete(FilterParams.SPORT)

         if (medals && medals.length > 0 && medals != []) params.set(FilterParams.MEDALS, medals.join(','))
         else params.delete(FilterParams.MEDALS)

         router.replace(`${pathname}?${params.toString()}`)
      }, 300)

   // Dropdown options.
   const years = Array.from({ length: 2024 - 1896 + 1 }, (_, i) => (1896 + i).toString())
   const seasons = ['Summer', 'Winter']
   const countries = ['USA', 'FR', 'DE', 'JP']
   const sexes = ['M', 'F']
   const nocs = ['USA', 'FRA', 'GER', 'JPN']
   const hostCities = ['Athens', 'Paris', 'Tokyo', 'Los Angeles']
   const sports = ['Swimming', 'Athletics', 'Gymnastics', 'Basketball']
   const medalOptions = ['Gold', 'Silver', 'Bronze', 'NA']

   return (
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 p-4 bg-gray-100">
         {/* Year Dropdown */}
         <DropdownMenu
            aria-label="Select year"
            selectedKeys={currentYear ? [currentYear] : []}>
            <DropdownMenuTrigger>{currentYear ?? 'Year'}</DropdownMenuTrigger>
            <DropdownMenuContent>
               <DropdownMenuItem key={'All'} onSelect={() => handleFilterUpdate({ year: '' })}>
                  All
               </DropdownMenuItem>
               {years.map((y: string) => (
                  <DropdownMenuItem key={y} onSelect={() => handleFilterUpdate({ year: y })}>
                     {y}
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>

         {/* Season Dropdown */}
         <DropdownMenu
            aria-label="Select season"
            selectedKeys={currentSeason ? [currentSeason] : []}>
            <DropdownMenuTrigger>{currentSeason ?? 'Season'}</DropdownMenuTrigger>
            <DropdownMenuContent>
               <DropdownMenuItem key={'All'} onSelect={() => handleFilterUpdate({ season: '' })}>
                  All
               </DropdownMenuItem>
               {seasons.map((s: string) => (
                  <DropdownMenuItem key={s} onSelect={() => handleFilterUpdate({ season: s.toString() })}>
                     {s}
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>

         {/* Country Dropdown */}
         <DropdownMenu
            aria-label="Select country"
            selectedKeys={currentCountry ? [currentCountry] : []}>
            <DropdownMenuTrigger>{currentCountry ?? 'Country'}</DropdownMenuTrigger>
            <DropdownMenuContent>
               <DropdownMenuItem key={'All'} onSelect={() => handleFilterUpdate({ country: '' })}>
                  All
               </DropdownMenuItem>
               {countries.map((c: string) => (
                  <DropdownMenuItem key={c} onSelect={() => handleFilterUpdate({ country: c.toString() })}>
                     {c}
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>

         {/* Athlete Name Search */}
         <Input type="text" placeholder={currentAthleteName ?? 'Athlete Name'}
                onChange={(e) => handleFilterUpdate({ athleteName: e.target.value.toString() })} />

         {/* Sex Dropdown */}
         <DropdownMenu
            aria-label="Select sex"
            selectedKeys={currentSex ? [currentSex] : []}>
            <DropdownMenuTrigger>{currentSex ?? 'Sex'}</DropdownMenuTrigger>
            <DropdownMenuContent>
               <DropdownMenuItem key={'All'} onSelect={() => handleFilterUpdate({ sex: '' })}>
                  All
               </DropdownMenuItem>
               {sexes.map((s: string) => (
                  <DropdownMenuItem key={s} onSelect={() => handleFilterUpdate({ sex: s.toString() })}>
                     {s}
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>

         {/* NOC Dropdown */}
         <DropdownMenu
            aria-label="Select NOC"
            selectedKeys={currentNoc ? [currentNoc] : []}>
            <DropdownMenuTrigger>{currentNoc ?? 'NOC'}</DropdownMenuTrigger>
            <DropdownMenuContent>
               {nocs.map((n: string) => (
                  <DropdownMenuItem key={n} onSelect={() => handleFilterUpdate({ noc: n.toString() })}>
                     {n}
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>

         {/* Host City Dropdown */}
         <DropdownMenu
            aria-label="Select host city"
            selectedKeys={currentHostCity ? [currentHostCity] : []}>
            <DropdownMenuTrigger>{currentHostCity ?? 'Host City'}</DropdownMenuTrigger>
            <DropdownMenuContent>
               {hostCities.map((city: string) => (
                  <DropdownMenuItem key={city} onSelect={() => handleFilterUpdate({ hostCity: city.toString() })}>
                     {city}
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>

         {/* Sport Dropdown */}
         <DropdownMenu
            aria-label="Select sport"
            selectedKeys={currentSport ? [currentSport] : []}>
            <DropdownMenuTrigger>{currentSport ?? 'Sport'}</DropdownMenuTrigger>
            <DropdownMenuContent>
               {sports.map((sp: string) => (
                  <DropdownMenuItem key={sp} onSelect={() => handleFilterUpdate({ sport: sp.toString() })}>
                     {sp}
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>

         {/* Medal Multi-select Dropdown */}
         <DropdownMenu
            aria-label="Select medals"
            selectedKeys={currentMedals}>
            <DropdownMenuTrigger>{currentMedals ?? 'Medals'}</DropdownMenuTrigger>
            <DropdownMenuContent>
               {medalOptions.map((medal: string) => (
                  <DropdownMenuItem key={medal} onSelect={() => {
                     const selected: boolean = currentMedals.includes(medal)
                     handleFilterUpdate({ medals: selected ? currentMedals.filter(m => m !== medal) : [...currentMedals, medal] })
                  }}>
                     {medal}
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   )
}