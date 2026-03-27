import { useEffect, useRef } from "react";

const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_API_KEY; // ✅ correct key

export default function MapSection({ documentLocation }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (!window.google || !mapRef.current) return;

      const lat = documentLocation?.lat || 19.0;
      const lng = documentLocation?.lng || 74.0;
      const zoom = documentLocation ? 11 : 6;

      // ✅ reuse existing map instance instead of recreating
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom,
          disableDefaultUI: true,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#0a192f" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#94A3B8" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#0a192f", weight: 2 }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#060d1b" }] },
            { featureType: "road", stylers: [{ visibility: "simplified" }, { color: "#1E293B" }] },
            { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#cfa341", weight: 0.5 }] }
          ]
        });
      } else {
        // ✅ just pan to new location if map already exists
        mapInstanceRef.current.setCenter({ lat, lng });
        mapInstanceRef.current.setZoom(zoom);
      }

      if (documentLocation) {
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map: mapInstanceRef.current,
          title: documentLocation.name || "Detected Location",
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: "#eaa829",
            fillOpacity: 0.9,
            strokeColor: "#cfa341",
            strokeWeight: 2
          }
        });

        const info = new window.google.maps.InfoWindow({
          content: `<div style="background:#112240;color:#F8F9FA;padding:16px;border-radius:12px;border:1px solid rgba(212,175,55,0.3);font-family:'Inter',sans-serif">
            <strong style="color:#cfa341;font-size:15px;">${documentLocation.name || "Origin Site"}</strong>
            <span style="font-size:12px;color:#94A3B8;margin-top:8px;display:block">Identified from document analysis</span>
          </div>`
        });

        marker.addListener("click", () => info.open(mapInstanceRef.current, marker));
        info.open(mapInstanceRef.current, marker);
      }
    };

    if (window.google) {
      // ✅ google already loaded, just init
      initMap();
    } else if (!document.querySelector(`script[src*="maps.googleapis.com"]`)) {
      // ✅ only add script if not already added
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&callback=initLipisutraMap`;
      script.async = true;
      window.initLipisutraMap = initMap;
      document.head.appendChild(script);
    } else {
      // ✅ script is loading, wait for callback
      window.initLipisutraMap = initMap;
    }
  }, [documentLocation]);

  // ✅ null check — show message if no location
  if (!documentLocation) {
    return (
      <div className="bg-museum-800/40 rounded-xl overflow-hidden border border-museum-700 shadow-xl">
        <div className="p-5 border-b border-museum-700 bg-museum-900/50">
          <h2 className="text-lg font-heading text-gold-500 mb-1">🗺️ Heritage Map</h2>
          <p className="text-slate-400 text-xs">No location data detected for this document.</p>
        </div>
        <div className="w-full h-[400px] bg-museum-900 flex items-center justify-center">
          <p className="text-slate-500 text-sm">📍 Location unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-museum-800/40 rounded-xl overflow-hidden border border-museum-700 shadow-xl">
      <div className="p-5 border-b border-museum-700 bg-museum-900/50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-heading text-gold-500 mb-1">🗺️ Heritage Map</h2>
          <p className="text-slate-400 text-xs">Displaying detected geographical origin.</p>
        </div>
      </div>
      {/* ✅ use ref instead of id to avoid conflicts */}
      <div ref={mapRef} className="w-full h-[400px] bg-museum-900" />
    </div>
  );
}