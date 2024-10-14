'use client';
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/athletes/columns'


export default function Athletes() {
   const [fileContent, setFileContent] = useState<any>({})
   const [error, setError] = useState<string>('')

   useEffect(() => {
      async function fetchFileContent() {
         try {
            const response = await fetch('/api/athletes')
            if (response.ok) {
               const data = await response.json()
               setFileContent(data)
            } else {
               setError('Error: File not found')
            }
         } catch (error) {
            setError('Error: Unable to fetch file content')
         }
      }

      fetchFileContent()
   }, [])


   return (
      <div>
         <h1>Client Component</h1>
         {error && <p>{error}</p>}
         <div>
            <h2>File Contents:</h2>
            <Accordion type="single" collapsible className="w-full">
               {Object.entries(fileContent).map(([country, athletes], index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                     <AccordionTrigger>{country}</AccordionTrigger>
                     <AccordionContent>

                        <div className="container mx-auto py-10">
                           <DataTable columns={columns} data={[
                              {
                                 id: "728ed52f",
                                 amount: 100,
                                 status: "pending",
                                 email: "m@example.com",
                              },
                              // ...
                           ]} />
                        </div>
                        <ul>
                           {athletes.map((athlete, idx) => (
                              <li key={idx}>{athlete.name}</li>
                           ))}
                        </ul>
                     </AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>
         </div>
      </div>
   )
/*
      ,name,name_short,name_tv,gender,function,country_code,country,country_full,nationality,nationality_full,nationality_code,height,weight,disciplines,events,birth_date,birth_place,birth_country,residence_place,residence_country,nickname,hobbies,occupation,education,family,lang,coach,reason,hero,influence,philosophy,sporting_relatives,ritual,other_sports
   1532872,ALEKSANYAN Artur,ALEKSANYAN A,Artur ALEKSANYAN,Male,Athlete,ARM,Armenia,Armenia,Armenia,Armenia,ARM,0,0.0,['Wrestling'],"[""Men's Greco-Roman 97kg""]",1991-10-21,GYUMRI,Armenia,GYUMRI,Armenia,White Bear,Playing and watching football,Athlete,"Graduated from Shirak State University (Gyumri, ARM)","Father, Gevorg Aleksanyan","Armenian, English, Russian","Gevorg Aleksanyan (ARM), father",He followed his father and his uncle into the sport,"Footballer Zinedine Zidane (FRA), World Cup winner (1998) and European champion (2000) with France, won the Champions League as a player and three times as a manager with Real Madrid, three-time FIFA World Player of the Year","His father, Gevorg Aleksanyan","""Wrestling is my life."" (mediamax.am. 18 May 2016)",,,
      1532873,AMOYAN Malkhas,AMOYAN M,Malkhas AMOYAN,Male,Athlete,ARM,Armenia,Armenia,Armenia,Armenia,ARM,0,0.0,['Wrestling'],"[""Men's Greco-Roman 77kg""]",1999-01-22,YEREVAN,Armenia,YEREVAN,Armenia,,,,,,Armenian,,,,,"""To become a good athlete, you first have to be a good person."" (ankakh.com, 6 Oct 2018)","Uncle, Roman Amoyan (wrestling), 2008 Olympic bronze medallist and two-time European champion in Greco-Roman",,
      1532874,GALSTYAN Slavik,GALSTYAN S,Slavik GALSTYAN,Male,Athlete,ARM,Armenia,Armenia,Armenia,Armenia,ARM,0,0.0,['Wrestling'],"[""Men's Greco-Roman 67kg""]",1996-12-21,,,YEREVAN,Armenia,,,,,,Armenian,Personal: Martin Alekhanyan (ARM).<br>National: Armen Babalaryan (ARM),,,,,,,
      1532944,HARUTYUNYAN Arsen,HARUTYUNYAN A,Arsen HARUTYUNYAN,Male,Athlete,ARM,Armenia,Armenia,Armenia,Armenia,ARM,0,0.0,['Wrestling'],"[""Men's Freestyle 57kg""]",1999-11-22,MASIS,Armenia,YEREVAN,Armenia,,,Athlete,Graduated with a Master's degree from the Armenian State Institute of Physical Culture and Sport (2023),"Wife, Diana (married October 2022). Daughter, Marias (born 2023)",Armenian,National: Habetnak Kurghinyan,"While doing karate he noticed wrestlers training and decided to give it a try. He also tried judo but his father, a former wrestler, did not allow him to do both, so he chose wrestling. (sport.mediamax.am, 10 July 2017)","Wrestler Armen Nazaryan (ARM, BUL), two-time Olympic champion (1996, 2000) and 2004 bronze medallist. Eight-time world championship medallist (three gold, two silver, three bronze)",,"“Nothing is impossible, set goals in front of you, fight and achieve it.” (Instagram, 13 May 2023)",,,
      1532945,TEVANYAN Vazgen,TEVANYAN V,Vazgen TEVANYAN,Male,Athlete,ARM,Armenia,Armenia,Armenia,Armenia,ARM,0,0.0,['Wrestling'],"[""Men's Freestyle 65kg""]",1999-10-27,POKR VEDI,Armenia,,Armenia,,,Athlete,"Studied at the Armenian State Institute of Physical Culture and Sport (Yerevan, ARM)","Wife, Sona (married November 2023)","Armenian, Russian",National: Habetnak Kurghinyan (ARM),"“My family did not like wrestling very much. At first I wanted to do boxing but my older friends advised me to go to wrestling training, and after a week, I started to like the sport.” (myInfo)",,,,,,
      1532951,ARENAS Lorena,ARENAS L,Lorena ARENAS,Female,Athlete,COL,Colombia,Colombia,Colombia,Colombia,COL,162,0.0,['Athletics'],"[""Women's 20km Race Walk"", 'Marathon Race Walk Relay Mixed']",1993-09-17,PEREIRA,Colombia,MELBOURNE,Australia,,,Athlete,"Physical Education at Jaime Isaza Cadavid Colombian Polytechnic, Medellin (COL)","Father, Jose Otoniel. Mother, Maria Rudy. Has three siblings",Spanish,Personal: Brent Vallance (AUS),,"Race walker Luis Fernando Lopez (COL), four-time Olympian (2004, 2008, 2012, 2016), 2011 world champion (20km walk)",,,,In competition she wears a ring or earrings her family gave her,
      1533112,McKENZIE Ashley,McKENZIE A,Ashley McKENZIE,Male,Athlete,JAM,Jamaica,Jamaica,Jamaica,Jamaica,JAM,0,0.0,['Judo'],['Men -60 kg'],1989-07-17,LONDON,Great Britain,CAMBERLEY,Great Britain,Bad Boy,Music,Athlete,,"One daughter, Lana-Rose, who lives in France",English,Personal and National: Luke Preston (GBR),"""I was thrown over [an argument about] a Pokemon card and wanted to learn to throw immediately."" (Athlete, 25 Jun 2024)","Boxer Muhammad Ali, born Cassius Clay (USA), former undisputed heavyweight champion of the world, 1960 Olympic champion (light heavyweight), nicknamed 'The Greatest' and regarded as one of the most significant sports figures of the 20th century","""My coach Luke Preston. We've been a team for the last 12 years."" (Athlete, 25 Jun 2024)",,,,
      1533136,BASS BITTAYE Gina Mariam,BASS BITTAYE GM,Gina Mariam BASS BITTAYE,Female,Athlete,GAM,Gambia,Gambia,Gambia,Gambia,GAM,161,0.0,['Athletics'],"[""Women's 100m"", ""Women's 200m""]",1995-05-03,TUBAKUTA,Gambia,,,Earlier in her career she was nicknamed the 'Poor Olympian' due to the financial challenges she faced,,"Athlete, police officer (sub-inspector)",,"Husband, Mustapha Bittaye - physical education lecturer and football referee (married October 2023). One sister and two brothers","English, French",Personal: Christophe Belliard (FRA),"“I started running when I was in primary school, like we have junior championships. It's where I started running and it’s where I started to notice that, if I work hard I will be a great athlete.” (olympics.com, 24 Apr 2024)","Sprinter Shelly-Ann Fraser-Pryce (JAM), three time Olympic champion (four silver, one bronze), 16-time world championship medallist (10 gold, five silver, one bronze). In the 100m, two-time Olympic champion (2008, 2012), five-time world champion (2009, 2013, 2015, 2019, 2022). </p><p>""Shelly-Ann, she is consistent. She is a mother but she still loves what she is doing and she is still performing as she did before."" (Tales of Hagie Drammeh Youtube, 16 Jan 2023)</p><p>Sprinter Marie-Josee Ta Lou (CIV), three fourth places at the Olympic Games (2016, 2020), double world silver medallist (100m-200m) in 2017, world bronze medallist in 2019 (100m)",,"""If you believe in yourself, never be discouraged."" (worldathletics.org, 17 Dec 2019)",,,
*/


      }
