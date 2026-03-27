const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!GOOGLE_KEY) {
  console.error("❌ VITE_GOOGLE_API_KEY is missing from .env");
}

// ✅ TRANSLATE FUNCTION
export async function translateText(text, targetLang) {
  if (!GOOGLE_KEY) throw new Error("Google API key is not set in .env");

  console.log("TRANSLATE FUNCTION CALLED");

  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "hi",   // ✅ tell API the input is Hindi
        target: targetLang  // en, gu, te etc.
      })
    }
  );

  if (!response.ok) {
    const errData = await response.json();
    console.error("Translate API error:", errData);
    throw new Error(errData.error?.message || `Translate API failed with status ${response.status}`);
  }

  const data = await response.json();
  console.log("TRANSLATE RESPONSE:", data);

  if (!data.data?.translations?.[0]?.translatedText) {
    throw new Error("Translate API returned no translation");
  }

  return data.data.translations[0].translatedText;
}


// ✅ SCAN FUNCTION — uses real Google Vision API
export async function scanText(base64Image) {
  if (!GOOGLE_KEY) throw new Error("Google API key is not set in .env");

  console.log("SCAN FUNCTION STARTED");

  const response = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [{
          image: { content: base64Image },
          features: [{ type: "DOCUMENT_TEXT_DETECTION" }]
        }]
      })
    }
  );

  if (!response.ok) {
    const errData = await response.json();
    console.error("Vision API error:", errData);
    throw new Error(errData.error?.message || `Vision API failed with status ${response.status}`);
  }

  const data = await response.json();
  console.log("SCAN DATA:", data);

  const text = data.responses?.[0]?.fullTextAnnotation?.text || "";
  return text;
}