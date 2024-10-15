"use client";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterParamsTypes } from "@/components/custom/filterBar/filterParams";

const lookup = require("country-data").lookup;

// Dropdown options.
const years: string[] = Array.from({ length: 2024 - 1896 + 1 }, (_, i) => (1896 + i).toString());
const seasons: string[] = ["Summer", "Winter"];
const countries: string[] = lookup?.countries()
  .map(country => `${country.name}`);
const genders: string[] = ["Male", "Female"];
const nocs: string[] = ["USA", "FRA", "GER", "JPN"];
const hostCities: string[] = ["Athens", "Paris", "Tokyo", "Los Angeles"];
const sports: string[] = ["Swimming", "Athletics", "Gymnastics", "Basketball"];
const medalOptions: string[] = ["Gold", "Silver", "Bronze"];
const classementsOptions: string[] = [
  "Afficher les Athlètes",
  "Afficher les Pays",
  "Afficher les Médailles"];
const filterOptions: string[] = [
  "A-Z",
  "Z-A"];

export default function FilterBar() {
  const filterParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Current values.
  const currentYear: string | undefined = filterParams.get(FilterParamsTypes.YEAR)?.toString();
  const currentSeason: string | undefined = filterParams.get(FilterParamsTypes.SEASON)?.toString();
  const currentCountry: string | undefined = filterParams.get(FilterParamsTypes.COUNTRY)?.toString();
  const currentAthleteName: string | undefined = filterParams.get(FilterParamsTypes.ATHLETE_NAME)?.toString();
  const currentGender: string | undefined = filterParams.get(FilterParamsTypes.GENDER)?.toString();
  const currentNoc: string | undefined = filterParams.get(FilterParamsTypes.NOC)?.toString();
  const currentHostCity: string | undefined = filterParams.get(FilterParamsTypes.HOST_CITY)?.toString();
  const currentSport: string | undefined = filterParams.get(FilterParamsTypes.SPORTS)?.toString();
  const currentMedals: string[] = filterParams.get(FilterParamsTypes.MEDALS)
    ? (filterParams.get(FilterParamsTypes.MEDALS) as string).split(",").map(medal => medal.trim())
    : [];

  /**
   * Debounced update function to update the query parameters.
   */
  const handleFilterUpdate = useDebouncedCallback(
    ({
       year = currentYear,
       season = currentSeason,
       country_code = currentCountry,
       name = currentAthleteName,
       gender = currentGender,
       noc = currentNoc,
       hostCity = currentHostCity,
       sports = currentSport,
       medals = currentMedals
     }: {
      year?: string;
      season?: string;
      country_code?: string;
      name?: string;
      gender?: string;
      noc?: string;
      hostCity?: string;
      sports?: string;
      medals?: string[];
    }) => {
      const params = new URLSearchParams(filterParams);

      if (year && year != "") params.set(FilterParamsTypes.YEAR, year);
      else params.delete(FilterParamsTypes.YEAR);

      if (season && season != "") params.set(FilterParamsTypes.SEASON, season);
      else params.delete(FilterParamsTypes.SEASON);

      if (country_code && country_code != "") params.set(FilterParamsTypes.COUNTRY, country_code);
      else params.delete(FilterParamsTypes.COUNTRY);

      if (name && name != "") params.set(FilterParamsTypes.ATHLETE_NAME, name);
      else params.delete(FilterParamsTypes.ATHLETE_NAME);

      if (gender && gender != "") params.set(FilterParamsTypes.GENDER, gender);
      else params.delete(FilterParamsTypes.GENDER);

      if (noc && noc != "") params.set(FilterParamsTypes.NOC, noc);
      else params.delete(FilterParamsTypes.NOC);

      if (hostCity && hostCity != "") params.set(FilterParamsTypes.HOST_CITY, hostCity);
      else params.delete(FilterParamsTypes.HOST_CITY);

      if (sports && sports != "") params.set(FilterParamsTypes.SPORTS, sports);
      else params.delete(FilterParamsTypes.SPORTS);

      if (medals && medals.length > 0 && medals != []) params.set(FilterParamsTypes.MEDALS, medals.join(","));
      else params.delete(FilterParamsTypes.MEDALS);

      router.replace(`${pathname}?${params.toString()}`);
    }, 300);


  const resetFilters = useDebouncedCallback(() => {
    router.replace(`${pathname}`);
  }, 300);


  return (
    <div className="flex flex-col space-y-8 p-4 border border-gray-300 rounded-xl shadow-xl lg:flex-row lg:space-x-10 lg:space-y-0 sticky top-0 z-50 bg-white">
      {/* Year Dropdown */}
      <DropdownMenu
        aria-label="Select year"
        selectedKeys={currentYear ? [currentYear] : []}>
        <DropdownMenuTrigger>{currentYear ?? "Year"}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem key={"All"} onSelect={() => handleFilterUpdate({ year: "" })}>
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
        <DropdownMenuTrigger>{currentSeason ?? "Season"}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem key={"All"} onSelect={() => handleFilterUpdate({ season: "" })}>
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
        <DropdownMenuTrigger>{currentCountry ?? "Country"}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem key={"All"} onSelect={() => handleFilterUpdate({ country_code: "" })}>
            All
          </DropdownMenuItem>
          {countries.map((c: string) => (
            <DropdownMenuItem key={c} onSelect={() => handleFilterUpdate({ country_code: lookup?.countries({ name: c })[0]?.alpha3 })}>
              {c} {lookup?.countries({ name: c })[0]?.emoji}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Gender Dropdown */}
      <DropdownMenu
        aria-label="Select gender"
        selectedKeys={currentGender ? [currentGender] : []}>
        <DropdownMenuTrigger>{currentGender ?? "Gender"}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem key={"All"} onSelect={() => handleFilterUpdate({ gender: "" })}>
            All
          </DropdownMenuItem>
          {genders.map((g: string) => (
            <DropdownMenuItem key={g} onSelect={() => handleFilterUpdate({ gender: g.toString() })}>
              {g}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* NOC Dropdown */}
      <DropdownMenu
        aria-label="Select NOC"
        selectedKeys={currentNoc ? [currentNoc] : []}>
        <DropdownMenuTrigger>{currentNoc ?? "NOC"}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem key={"All"} onSelect={() => handleFilterUpdate({ noc: "" })}>
            All
          </DropdownMenuItem>
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
        <DropdownMenuTrigger>{currentHostCity ?? "Host City"}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem key={"All"} onSelect={() => handleFilterUpdate({ hostCity: "" })}>
            All
          </DropdownMenuItem>
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
        <DropdownMenuTrigger>{currentSport ?? "Sport"}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem key={"All"} onSelect={() => handleFilterUpdate({ sports: "" })}>
            All
          </DropdownMenuItem>
          {sports.map((sp: string) => (
            <DropdownMenuItem key={sp} onSelect={() => handleFilterUpdate({ sports: sp.toString() })}>
              {sp}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Medal Multi-select Dropdown */}
      <DropdownMenu
        aria-label="Select medals"
        selectedKeys={currentMedals}>
        <DropdownMenuTrigger>{currentMedals && currentMedals.length > 0 ? (currentMedals.join(", ") as string) : "Medals"}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem key={"All"} onSelect={() => handleFilterUpdate({ medals: [] })}>
            All
          </DropdownMenuItem>
          {medalOptions.map((medal: string) => (
            <DropdownMenuItem key={medal} onSelect={() => {
              const selected: boolean = currentMedals.includes(medal);
              handleFilterUpdate({ medals: selected ? currentMedals.filter(m => m !== medal) : [...currentMedals, medal] });
            }}>
              {medal}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Athlete Name Search */}
      <Input type="text" placeholder={currentAthleteName ?? "Athlete Name"}
             onChange={(e) => handleFilterUpdate({ name: e.target.value.toString() })} />

      <Button onClick={resetFilters}>Reset filters</Button>
    </div>
  );
}