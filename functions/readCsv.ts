import { promises as fs } from 'fs'
import Papa from 'papaparse'
import { Athlete } from '@/interfaces/athlete'

export const readCsv = async (filePath: string): Promise<Athlete[]> => {

}


export async function getCsvFileLength(filePath: string): Promise<number> {
   const fileContent: string = await fs.readFile(process.cwd() + filePath, 'utf8')

   return new Promise((resolve, reject): void => {
      Papa.parse(fileContent, {
         header: true,
         dynamicTyping: true,
         complete: (result): void => {
            resolve(result.data.length);
         },
         error: (error): void => {
            reject(error);
         }
      });
   });
}
