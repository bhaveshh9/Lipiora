
import { useState } from "react";
import { analyzeDocument } from "../services/gemini";
import { saveDocument } from "../services/firebase";
import { translateText } from "../services/translate";
import { speakText } from "../services/tts";
import MapSection from "./MapSection";

const langCodes = { hi: "hi-IN", gu: "gu-IN", te: "te-IN", en: "en-US" };

export default function PublicView() {
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("hi");
  const [translation, setTranslation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("summary");
  const [isTranslating, setIsTranslating] = useState(false);

  function handleFileDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = () => setBase64(reader.result.split(",")[1]);
    reader.readAsDataURL(file);
    setResult(null);
    setTranslation("");
    setActiveTab("summary");
  }

  async function handleAnalyze() {
    if (!base64) return;
    setLoading(true);
    setResult(null);
    try {
      const geminiResult = await analyzeDocument(base64);
      setResult(geminiResult);
      await saveDocument(geminiResult, "public");
    } catch (err) { alert("Error analyzing document: " + err.message); }
    setLoading(false);
  }

  function handleSearch(e) {
    if (e.key === "Enter") {
      alert(`Search feature hooked to Firebase query for: ${searchQuery}`);
    }
  }

  return (
    // ↓ ADD YOUR BACKGROUND IMAGE HERE on this div if needed:
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 py-12 min-h-screen outline-none"

    >


      {/* LANDING PAGE */}
      {!image && !result && (
        <div className="flex flex-col items-center animate-[fadeIn_0.6s_ease-out]">

          {/* Hero Section */}
          <div className="text-center mt-12 mb-20 max-w-4xl">
            {/* Decorative top line */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-300" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-neutral-800">AI-Powered Heritage Scanner</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-300" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)]">

              <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-600 to-yellow-500 mb-6 tracking-tight leading-tight drop-shadow-sm">
                Decode the
              </span>{" "}

              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C9A44C] via-[#B8962E] to-[#A67C2D]">
                Past
              </span>

              <br />

              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E0D6C3] via-[#F5F1E8] to-[#FFFFFF]">
                Preserve the Future.
              </span>

            </h1>

            <p className="text-golden text-lg md:text-xl font-bold mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              Upload ancient manuscripts, engraved decrees, or faded scrolls. Our AI-powered engine
              instantly translates lost scripts and traces them back to their exact geographical origins.
            </p>

            <br />
            {/* Search Bar */}
            {/*<div className="relative group max-w-2xl mx-auto hidden sm:block">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-400 text-lg">🔍</span>
              <input
                className="w-full bg-white border border-blue-100 text-blue-700 rounded-full pl-14 pr-6 py-4 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 shadow-sm hover:border-blue-300 transition-all placeholder-blue-400"
                placeholder="Search the global archives for eras, scripts, or regions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>*/}
          </div>

          {/* Upload Dropzone */}
          <div
            className="w-full max-w-3xl border-2 border-dashed border-blue-200 bg-white rounded-3xl p-16 md:p-24 flex flex-col items-center justify-center transition-all hover:bg-blue-50/50 hover:border-blue-400 cursor-pointer shadow-[0_4px_30px_rgba(30,64,175,0.08)] group hover:shadow-[0_8px_40px_rgba(30,64,175,0.14)] relative overflow-hidden"
            onDragOver={e => e.preventDefault()}
            onDrop={handleFileDrop}
            onClick={() => document.getElementById("file-input").click()}
          >
            {/* Subtle corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-yellow-400/40 rounded-tl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-400/40 rounded-br-3xl pointer-events-none" />

            <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-ble-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-blue-100 group-hover:scale-110 transition-transform duration-500">
              <span className="text-4xl">📜</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-3 tracking-wide">Upload Artifact Image</h2>
            <p className="text-blue-400 font-light text-center text-sm md:text-base">
              Drag and drop a high-resolution image, or{" "}
              <span className="text-blue-600 underline decoration-yellow-400/40 underline-offset-4 font-medium">browse files</span>.
            </p>
            <input type="file" id="file-input" accept="image/*" onChange={handleFileDrop} className="hidden" />
          </div>

        </div>
      )}

      {/* ANALYSIS PIPELINE & RESULTS */}
      {image && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8 animate-[fadeIn_0.5s_ease-out]">

          {/* Left Column: Artifact Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full mb-6">
              <h3 className="text-xs font-bold tracking-[0.25em] text-blue-400 uppercase border-b border-blue-100 pb-3">
                Original Artifact
              </h3>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-[0_4px_24px_rgba(30,64,175,0.08)] w-full flex justify-center overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none rounded-2xl" />
              <img
                src={image}
                alt="Historical Document"
                className="w-full h-auto rounded-xl object-contain max-h-[600px] shadow-sm relative z-0"
              />
            </div>

            {/* CTA Button */}
            {!loading && !result && (
              <button
                onClick={handleAnalyze}
                className="mt-8 w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white px-8 py-4 rounded-xl font-black text-base tracking-widest uppercase hover:-translate-y-1 transition-all shadow-[0_8px_24px_rgba(30,64,175,0.25)] hover:shadow-[0_12px_32px_rgba(30,64,175,0.35)] ring-1 ring-blue-400/20"
              >
                ✨ Decode & Analyze Artifact
              </button>
            )}
            {loading && (
              <button
                disabled
                className="mt-8 w-full bg-blue-50 text-blue-300 px-8 py-4 rounded-xl font-bold text-base tracking-widest uppercase border border-blue-100 cursor-wait"
              >
                <span className="animate-pulse">⏳ Neural Engine Scanning...</span>
              </button>
            )}

            <button
              onClick={() => { setResult(null); setImage(null); setBase64(null); }}
              className="mt-6 text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest text-xs font-semibold underline underline-offset-8 decoration-slate-200 hover:decoration-blue-300"
            >
              Upload a different document
            </button>
          </div>

          {/* Right Column: Loading Skeleton or Tabbed Results */}
          <div className="lg:col-span-7">

            {/* SKELETON LOADER */}
            {loading && (
              <div className="w-full h-full animate-[fadeIn_0.5s_ease-out]">
                <div className="w-full mb-6 flex gap-4 border-b border-blue-100 pb-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-4 bg-blue-50 w-28 rounded-full animate-pulse" />
                  ))}
                </div>
                <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm w-full h-[550px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/60 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <div className="grid grid-cols-2 gap-8 mb-12">
                    {[1, 2].map(i => (
                      <div key={i}>
                        <div className="h-3 bg-blue-50 w-20 rounded mb-4 animate-pulse" />
                        <div className="h-10 bg-blue-50 w-40 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {[100, 90, 95, 80, 85].map((w, i) => (
                      <div key={i} className={`h-4 bg-blue-50 w-[${w}%] rounded animate-pulse`} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ACTUAL RESULTS */}
            {result && !loading && (
              <div className="w-full flex flex-col gap-12 animate-[fadeIn_0.5s_ease-out]">

                {/* Tabs */}
                <div className="w-full flex flex-col h-full">
                  <div className="flex border-b border-blue-100 mb-6 overflow-x-auto no-scrollbar gap-8 pb-1">
                    {[
                      { id: "summary", label: "Summary" },
                      { id: "translation", label: "Linguistic Analysis" },
                      { id: "origin", label: "Geographic Provenience" },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 shrink-0 text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 border-b-2 relative top-[2px]
                          ${activeTab === tab.id
                            ? "text-blue-700 border-blue-600"
                            : "text-slate-400 border-transparent hover:text-blue-500"
                          }`}
                      >
                        {tab.label}
                        {activeTab === tab.id && (
                          <span className="absolute -bottom-[2px] left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 to-yellow-400 rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="bg-white p-8 md:p-12 rounded-2xl border border-blue-100 shadow-[0_4px_24px_rgba(30,64,175,0.07)] flex-1 min-h-[450px]">

                    {/* Summary Tab */}
                    {activeTab === "summary" && (
                      <div className="animate-[fadeIn_0.4s_ease-out]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 pb-8 border-b border-blue-50">
                          <div>
                            <div className="text-[10px] text-blue-400 uppercase font-black tracking-widest mb-3">Palaeographic Script</div>
                            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-yellow-500">
                              {result.script || result.inferredScript}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-blue-400 uppercase font-black tracking-widest mb-3">Chronological Era</div>
                            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-yellow-500">
                              {result.era || "Unknown"}
                            </div>
                          </div>
                        </div>
                        <h4 className="text-[10px] font-black tracking-widest text-blue-400 uppercase mb-6">Scientific Abstract</h4>
                        <p className="text-lg font-light text-slate-600 leading-relaxed italic border-l-[3px] border-gradient-to-b from-blue-500 to-yellow-400 pl-6 py-2"
                          style={{ borderImage: "linear-gradient(to bottom, #1d4ed8, #eab308) 1" }}>
                          "{result.summary || "No summary available."}"
                        </p>
                      </div>
                    )}

                    {/* Translation Tab */}
                    {activeTab === "translation" && (
                      <div className="animate-[fadeIn_0.4s_ease-out]">
                        <h4 className="text-[10px] font-black tracking-widest text-blue-400 uppercase mb-8">Decryption & Translation Layer</h4>
                        <div className="flex flex-col sm:flex-row gap-4 mb-10 bg-blue-50/60 p-6 rounded-xl border border-blue-100">
                          <select
                            value={lang}
                            onChange={e => setLang(e.target.value)}
                            className="flex-1 bg-white border border-blue-200 text-blue-700 px-6 py-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-bold text-xs tracking-widest uppercase"
                          >
                            <option value="en">English (Universal)</option>
                            <option value="hi">हिन्दी (Hindi)</option>
                            <option value="gu">ગુજરાતી (Gujarati)</option>
                            <option value="te">తెలుగు (Telugu)</option>
                            <option value="mr">मराठी (Marathi)</option>
                          </select>
                          <button
                            onClick={async () => {
                              const textToTranslate = result?.modernMarathi || result?.transcript;

                              if (!textToTranslate) {
                                setTranslation("❌ No text found to translate.");
                                return;
                              }

                              setIsTranslating(true);
                              setTranslation("");

                              try {
                                const t = await translateText(textToTranslate, lang);
                                setTranslation(t);
                              } catch (err) {
                                console.error("Translation failed:", err);
                                setTranslation(`❌ Error: ${err.message}`);
                              } finally {
                                setIsTranslating(false); // ← this is the key fix
                              }
                            }}
                            disabled={isTranslating}
                            className="bg-gradient-to-r from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 px-10 py-4 rounded-xl transition-all font-black text-[10px] tracking-[0.2em] uppercase shadow-md disabled:opacity-50"
                          >
                            {isTranslating ? "Processing..." : "Decrypt Metadata"}
                          </button>
                        </div>

                        {translation && (
                          <div className="bg-blue-50/40 p-8 rounded-xl border-t-2 border-yellow-400 shadow-inner">
                            <p className="text-slate-700 text-lg leading-relaxed mb-10 font-light">{translation}</p>
                            <button
                              onClick={() => speakText(translation, langCodes[lang])}
                              className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white hover:from-yellow-600 hover:to-yellow-500 px-10 py-4 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase transition-all hover:-translate-y-1 shadow-md flex items-center justify-center gap-3 w-full sm:w-auto"
                            >
                              🔊 Execute Audio Reproduction
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Origin Tab */}
                    {activeTab === "origin" && (
                      <div className="w-full h-full flex flex-col">
                        <h4 className="text-[10px] font-black tracking-widest text-blue-400 uppercase mb-6">Geographical Provenience</h4>
                        <div className="flex-1 rounded-2xl overflow-hidden border border-blue-100 shadow-inner relative z-0">
                          <MapSection
                            documentLocation={
                              result?.locations?.length > 0 ? result.locations[0] : null
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Full Width Transcript Section */}
                <div className="w-full mt-4 animate-[fadeIn_0.6s_ease-out]">
                  <h3 className="text-xs font-bold tracking-[0.3em] text-blue-400 uppercase mb-6 pl-1 text-center lg:text-left">
                    Original Paleographic Transcript
                  </h3>
                  <div className="bg-white p-10 md:p-16 rounded-3xl border border-blue-100 shadow-[0_4px_24px_rgba(30,64,175,0.07)] relative overflow-hidden">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-blue-600 to-yellow-400 rounded-tr-full" />
                    <div className="text-base md:text-lg text-slate-700 font-heading leading-[1.8] tracking-wide text-center lg:text-left">
                      {result.transcript || "No transcript could be extracted."}
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}