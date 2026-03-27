import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img7.jpg";
import img7 from "../assets/img8.jpg";
import img8 from "../assets/img9.jpg";
import img9 from "../assets/img10.jpg";
import { useState, useEffect } from "react";
import { getRecentDocuments } from "../services/firebase";

export default function ArchivesView() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getRecentDocuments(12);

        // ✅ If Firebase empty → use default data
        if (!data || data.length === 0) {
          setDocs([
            {
              id: "1",
              script: "Modi Script",
              era: "Maratha Empire",
              summary: "Administrative script used during Shivaji Maharaj's rule.",
              fileUrl: img1,
              savedByRole: "System",
              timestamp: { toDate: () => new Date() }
            },
            {
              id: "2",
              script: "Brahmi",
              era: "Mauryan Period",
              summary: "One of the earliest writing systems in India.",
              fileUrl: img2,
              savedByRole: "System",
              timestamp: { toDate: () => new Date() }
            },
            {
              id: "3",
              script: "Devanagari",
              era: "Medieval India",
              summary: "Widely used script for Sanskrit and Marathi.",
              fileUrl: img3,
              savedByRole: "System",
              timestamp: { toDate: () => new Date() }
            },
            {
              id: "4",
              script: "Kharosthi",
              era: "Ancient Gandhara",
              summary: "Script used in northwest India, influenced by Aramaic writing.",
              fileUrl: img4,
              savedByRole: "System",
              timestamp: { toDate: () => new Date() }
            },
            {
              id: "5",
              script: "Grantha",
              era: "South Indian Classical Period",
              summary: "Used in Tamil Nadu to write Sanskrit texts.",
              fileUrl: img5,
              savedByRole: "System",
              timestamp: { toDate: () => new Date() }
            },
            {
              id: "6",
              script: "Sharada",
              era: "Kashmir Region",
              summary: "Ancient script used for Sanskrit and Kashmiri texts.",
              fileUrl: img6,
              savedByRole: "System",
              timestamp: { toDate: () => new Date() }
            },
            {
              id: "7",
              script: "Perso-Arabic",
              era: "Mughal Period",
              summary: "Used for administrative and literary works during Mughal rule.",
              fileUrl: img7,
              savedByRole: "System",
              timestamp: { toDate: () => new Date() }
            },
            {
              id: "8",
              script: "Tamil-Brahmi",
              era: "Early South India",
              summary: "Early form of Tamil writing derived from Brahmi script.",
              fileUrl: img8,
              savedByRole: "System",
              timestamp: { toDate: () => new Date() }
            },
            {
              id: "9",
              script: "Gurmukhi",
              era: "Sikh Empire",
              summary: "Script used for writing Punjabi and Sikh religious texts.",
              fileUrl: img9,
              savedByRole: "System",
              timestamp: { toDate: () => new Date() }
            }
          ]);
        } else {
          setDocs(data);
        }

      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 animate-[fadeIn_0.6s_ease-out]">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-yellow-800 mb-6 tracking-tight leading-tight drop-shadow-sm">
          Global Archives<br />
        </h1>

        <p className="text-blue-200 text-lg font-light max-w-2xl mx-auto leading-relaxed">
          A living repository of human history, digitized and deciphered through neural analysis. Explore the scripts and eras recovered by our global community.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 bg-white border border-blue-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docs.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-dashed border-blue-700 rounded-3xl bg-white">
              <span className="text-4xl mb-4 block">🏺</span>
              <p className="text-white font-bold uppercase tracking-widest text-xs">
                No documents found in the vault
              </p>
            </div>
          ) : (
            docs.map(doc => (
              <div
                key={doc.id}
                className="group bg-white backdrop-blur-sm border border-blue-700/50 rounded-2xl p-8 hover:bg-blue-800/50 hover:border-blue-500/30 transition-all duration-500 shadow-xl hover:-translate-y-2 flex flex-col justify-between h-full"
              >
                <div>

                  {/* ✅ IMAGE PREVIEW */}
                  {doc.fileUrl && (
                    <img
                      src={doc.fileUrl}
                      alt="document"
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}

                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black tracking-widest text-blue-500 uppercase border border-blue-500/20 px-3 py-1 rounded-full bg-blue-500/5">
                      {doc.script || "Ancient Script"}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      {doc.timestamp?.toDate?.().toLocaleDateString?.() || "Recently Added"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-heading text-blue-200 mb-4 group-hover:text-blue-400 transition-colors">
                    {doc.era || "Unknown Era"} Artifact
                  </h3>

                  <p className="text-blue-400 text-sm font-light leading-relaxed line-clamp-3 mb-6">
                    {doc.summary || "This artifact holds secrets of a forgotten era, pending further linguistic classification."}
                  </p>
                </div>

                <div className="pt-6 border-t border-blue-700/30 flex items-center justify-between text-[10px] font-black tracking-widest uppercase">
                  <span className="text-blue-500 italic">
                    Saved by {doc.savedByRole || "Public"}
                  </span>

                  {/* ✅ BUTTON WORKING */}
                  <button
                    onClick={() => doc.fileUrl && window.open(doc.fileUrl, "_blank")}
                    className="text-blue-500 hover:text-white transition-colors flex items-center gap-2"
                  >
                    View Record <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}