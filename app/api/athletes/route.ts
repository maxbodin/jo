import { promises as fs } from 'fs'
import Papa from 'papaparse'

export async function GET(request) {
   try {
      const fileContent: string = await fs.readFile(process.cwd() + '/data/Paris_2024/athletes.csv', 'utf8')

      const parsedData = await new Promise((resolve, reject) => {
         Papa.parse(fileContent, {
            header: true,
            dynamicTyping: true,
            complete: (result) => {
               resolve(result.data);
            },
            error: (error) => {
               reject(error);
            },
         });
      });

      // Group athletes by country
      const groupedData = parsedData.reduce((acc, athlete) => {
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
