import * as React from 'react'
import { Footer } from '@/components/custom/footer'
import Athletes from '@/components/custom/athletes'


export default function Home() {
   return (
      <main className="flex min-h-screen flex-col items-center justify-between pt-20">
         <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex-col">
            <img
               src="images/logo.png"
               title="Logo des Jeux Olympiques"
               alt="Logo des Jeux Olympiques"
               className={`w-full h-[5vh] object-contain`}
            />
            <h1>Jeux olympiques</h1>
            <div className="flex flex-col w-full px-16 lg:px-20">
               <h2>Classement par Athlètes / Pays / Pays et Athlètes pour Paris 2024</h2>

               <Athletes />

               {/*    <Choice/>
                           <Whoami />
               <Experiences />
               <Projects />
               <TroisD />
               <Events />
                TODO <Goals />
               <ContactButton />*/}

               {/*              */}

               {/*      <Dropdown>
                  <DropdownTrigger>
                     <Button variant="bordered"
                             className="h-[48px] rounded-r-none bg-white/10 bg-opacity-10 backdrop-blur-md drop-shadow-lg">
                        {selectedSubject.toString()}
                     </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                     aria-label="Search Subject Selection"
                     disallowEmptySelection
                     selectionMode="single"
                     selectedKeys={selectedSubject}
                     onSelectionChange={onSubjectSelected}
                  >
                     {Object.values(SearchSubjectType).map(
                        (subject: string) => (
                           <DropdownItem key={subject}>
                              {subject}
                           </DropdownItem>
                        ),
                     )}
                  </DropdownMenu>
               </Dropdown>*/}

               <Footer />
            </div>
         </div>
      </main>
   )
}