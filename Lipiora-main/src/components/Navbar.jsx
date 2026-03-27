import logo from "../assets/islogo2.png";

export default function Navbar({ currentView, onViewChange, currentPage, onPageChange }) {
  const roles = [
    { id: "public", label: "Public / Student" },
    { id: "historian", label: "Historian" },
    { id: "museum", label: "Museum Admin" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-blue-100 shadow-[0_2px_20px_rgba(30,64,175,0.08)]">

      {/* Top accent line — blue-to-gold gradient */}
      <div className="h-[3px] w-full bg-gradient-to-r from-blue-700 via-blue-400 to-yellow-400" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-center py-4 gap-5">

          {/* Logo & Main Nav */}
          <div className="flex items-center gap-10">
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => onPageChange("home")}
            >
              <img
                src={logo}
                alt="LipiSutra"
                className="h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
              />
            </div>

            {/* Page Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 border-l border-blue-100 pl-10">
              <button
                onClick={() => onPageChange("home")}
                className={`relative px-5 py-2.5 text-sm font-semibold tracking-widest uppercase transition-all duration-300 rounded-lg
                  ${currentPage === "home"
                    ? "text-blue-800 bg-blue-50"
                    : "text-slate-500 hover:text-blue-700 hover:bg-blue-50/60"
                  }`}
              >
                {currentPage === "home" && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-yellow-400" />
                )}
                AI Scanner
              </button>

              <button
                onClick={() => onPageChange("archives")}
                className={`relative px-5 py-2.5 text-sm font-semibold tracking-widest uppercase transition-all duration-300 rounded-lg
                  ${currentPage === "archives"
                    ? "text-blue-800 bg-blue-50"
                    : "text-slate-500 hover:text-blue-700 hover:bg-blue-50/60"
                  }`}
              >
                {currentPage === "archives" && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-yellow-400" />
                )}
                Archives
              </button>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center bg-slate-50 rounded-full border border-blue-100 p-1.5 shadow-inner shadow-blue-50">
            <span className="text-xs uppercase tracking-widest text-blue-300 font-bold px-4 hidden md:block">
              Role
            </span>
            <div className="flex">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => onViewChange(r.id)}
                  className={`px-5 py-2.5 text-xs font-semibold tracking-wide rounded-full transition-all duration-300
                    ${currentView === r.id
                      ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md shadow-blue-200 ring-1 ring-blue-400/30"
                      : "text-slate-400 hover:text-blue-600 hover:bg-white"
                    }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}