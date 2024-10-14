import { readCsv } from '@/functions/readCsv'

/**
 * 
 * @param request
 * @constructor
 */
export async function GET(request) {
   try {
      // Group athletes by country
      const groupedData = (await readCsv(`${process.cwd()}/data/Paris_2024/athletes.csv`)).reduce((acc, athlete) => {
         const country = athlete.country;
         if (!acc[country]) {
            acc[country] = [];
         }
         acc[country].push(athlete);
         return acc;
      }, {});

      return new Response(JSON.stringify(groupedData), {
         status: 200,
         headers: {
            'Content-Type': 'application/json',
         },
      });
   } catch (error) {
      return new Response('File not found or parsing error', { status: 404 });
   }
}
