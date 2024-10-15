"use server";
import { readCsv } from "@/functions/readCsv";
import { NextRequest } from "next/server";
import { FilterParamsTypes } from "@/components/custom/filterBar/filterParams";
import { Athlete } from "@/interfaces/athlete";
import { FilterParams } from "@/interfaces/filterParams";

/**
 * Filters athletes based on query parameters
 * @param athletes
 * @param filters
 */
function filterAthletes(athletes: Athlete[], filters: FilterParams) {
  return athletes.filter((athlete: Athlete) => {
    // Filter by name (includes query string)
    if (!athlete.name || (filters.name && !athlete.name.toString().toLowerCase().includes(filters.name.toLowerCase()))) {
      return false;
    }

    // Filter by gender.
    if (filters.gender && athlete.gender !== filters.gender) {
      return false;
    }

    // Filter by country code
    if (filters.country_code && athlete.country_code !== filters.country_code) {
      return false;
    }


    /*
        // Filter by disciplines (check if any of the query disciplines are in the athlete's disciplines)
        if (filters.disciplines && filters.disciplines.length > 0) {
          const disciplinesQuery = filters.disciplines.map(d => d.toLowerCase());
          const athleteDisciplines = athlete.disciplines.map(d => d.toLowerCase());
          if (!disciplinesQuery.some(d => athleteDisciplines.includes(d))) {
            return false;
          }
        }

        // Filter by events (check if any of the query events are in the athlete's events)
        if (filters.events && filters.events.length > 0) {
          const eventsQuery = filters.events.map(e => e.toLowerCase());
          const athleteEvents = athlete.events.map(e => e.toLowerCase());
          if (!eventsQuery.some(e => athleteEvents.includes(e))) {
            return false;
          }
        }

        // Filter by medals (check if any of the query medals are in the athlete's medals)
        if (filters.medals && filters.medals.length > 0) {
          const medalsQuery = filters.medals.map(m => m.toLowerCase());
          const athleteMedals = athlete.medals.map(m => m.toLowerCase());
          if (!medalsQuery.some(m => athleteMedals.includes(m))) {
            return false;
          }
        }*/

    return true;
  });
}

/**
 * Groups athletes by country
 * @param athletes
 * @param sortOrder
 */
function groupByCountry(athletes, sortOrder = "asc") {
  const groupedData = athletes.reduce((acc, athlete) => {
    const country = athlete.country;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(athlete);
    return acc;
  }, {});

  // Sort the countries A-Z or Z-A
  return Object.keys(groupedData)
    .sort((a, b) => sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a))
    .reduce((acc, country) => {
      acc[country] = groupedData[country];
      return acc;
    }, {});
}

/**
 * Handles GET requests with optional filters and grouping/sorting by country
 * @param request
 * @constructor
 */
export async function GET(request: NextRequest) {
  try {
    // Extract search parameters.
    const url = new URL(request.url);
    const filters: FilterParams = {
      name: url.searchParams.get(FilterParamsTypes.ATHLETE_NAME) || "",
      gender: url.searchParams.get(FilterParamsTypes.GENDER) || "",
      sports: url.searchParams.getAll(FilterParamsTypes.SPORTS),
      country_code: url.searchParams.get(FilterParamsTypes.COUNTRY) || "",
      medals: url.searchParams.getAll(FilterParamsTypes.MEDALS),
      season: url.searchParams.get(FilterParamsTypes.SEASON) || "",
      groupByCountry: url.searchParams.get("groupByCountry") === "true",
      sortOrder: url.searchParams.get("sortOrder") || "asc"  // Sort order for countries, default to 'asc'.
    };

    const athletes: Athlete[] = await readCsv(`${process.cwd()}/data/Paris_2024/athletes.csv`);

    const filteredAthletes = filterAthletes(athletes, filters);

    let responseData: {} = filteredAthletes;
    if (filters.groupByCountry) {
      responseData = groupByCountry(filteredAthletes, filters.sortOrder);
    }

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.log(error);
    return new Response("File not found or parsing error", { status: 404 });
  }
}
