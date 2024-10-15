"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/athletes/columns";
import { FilterParams } from "@/interfaces/filterParams";
import { FilterParamsTypes } from "@/components/custom/filterBar/filterParams";


/**
 * Build a query string based on provided filter parameters
 * @param filters
 * @returns string
 */
function buildQueryString(filters: FilterParams): string {
  const query = new URLSearchParams();

  // Add filters if they exist
  if (filters.year) query.append(FilterParamsTypes.YEAR, filters.year);
  if (filters.season) query.append(FilterParamsTypes.SEASON, filters.season);
  if (filters.country_code) query.append(FilterParamsTypes.COUNTRY, filters.country_code);
  if (filters.name) query.append(FilterParamsTypes.ATHLETE_NAME, filters.name);
  if (filters.gender) query.append(FilterParamsTypes.GENDER, filters.gender);
  if (filters.noc) query.append(FilterParamsTypes.NOC, filters.noc);
  if (filters.hostCity) query.append(FilterParamsTypes.HOST_CITY, filters.hostCity);
/* TODO if (filters.sports) query.append(FilterParamsTypes.SPORTS, filters.sports);
  TODO if (filters.medals) query.append(FilterParamsTypes.MEDALS, filters.medals);*/

  // Add default grouping and sorting params
  query.append("groupByCountry", "true");
  query.append("sortOrder", "asc");

  return query.toString();
}


const lookup = require("country-data").lookup;

export default function Athletes({ filterParams }: {
  filterParams?: FilterParams
}) {
  const [fileContent, setFileContent] = useState<Record<any, any[]>>({});
  const [error, setError] = useState<string>("");

  useEffect(() => {

    /**
     * Fetch athletes with filter parameters
     * @returns Promise<Response>
     */
    async function fetchFileContent() {
      try {
        const queryString = buildQueryString(filterParams);
        const url = `/api/athletes?${queryString}`;

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setFileContent(data);
        } else {
          setError("Error: File not found");
        }
      } catch (error) {
        setError("Error: Unable to fetch file content");
      }
    }

    fetchFileContent();
  }, [filterParams]);


  return (
    <div className="p-10 w-full px-32">
      {error && <p>{error}</p>}
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(fileContent).map(([country, athletes], index) => (
            <AccordionItem key={index} value={`item-${index}`} className="w-full mb-8">
              <AccordionTrigger>{lookup?.countries({ name: country })[0]?.emoji} {country}</AccordionTrigger>
              <AccordionContent>
                <div className="container mx-auto py-4">
                  <DataTable columns={columns} data={athletes}/>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
    </div>
  );
}
