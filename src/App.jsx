import { useState } from "react";
import Navbar from "./components/Navbar";
import PublicView from "./components/PublicView";
import HistorianView from "./components/HistorianView";
import MuseumView from "./components/MuseumView";
import ArchivesView from "./components/ArchivesView";
import bgVideo from "./assets/greek12.mp4";

export default function App() {
   const [view, setView] = useState("public"); // "public", "historian", "museum"
   const [page, setPage] = useState("home"); // "home", "archives"

   return (
      <div className="min-h-screen relative flex flex-col font-sans">
         <video
            autoPlay
            loop
            muted
            playsInline
            className="fixed top-0 left-0 w-full h-full object-cover -z-10"
         >
            <source src={bgVideo} type="video/mp4" />
         </video>
         <Navbar currentView={view} onViewChange={setView} currentPage={page} onPageChange={setPage} />
         <main className="flex-1 overflow-x-hidden relative z-10 max-w-6xl mx-auto animate-[fadeIn_0.5s_ease-out]">
            {page === "archives" ? (
               <ArchivesView />
            ) : (
               <>
                  {view === "public" && <PublicView />}
                  {view === "historian" && <HistorianView />}
                  {view === "museum" && <MuseumView />}
               </>
            )}
         </main>
      </div>
   );
}