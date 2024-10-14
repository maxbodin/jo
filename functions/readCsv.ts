import { Athlete } from '@/interfaces/athlete'
import Papa from 'papaparse'
import { promises as fs } from 'fs'

/**
 * 
 * @param filePath
 */
export const readCsv = async (filePath: string): Promise<Athlete[]> => {
   const fileContent: string = await fs.readFile(filePath, 'utf8')

   return await new Promise((resolve, reject) => {
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
}