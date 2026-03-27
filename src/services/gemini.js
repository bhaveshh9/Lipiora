const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;

if (!GEMINI_KEY) {
  console.error("❌ VITE_GEMINI_KEY is missing from .env");
}

export async function analyzeDocument(base64Image) {
  if (!GEMINI_KEY) throw new Error("Gemini API key is not set in .env");

  const prompt = `You are an expert in Indian historical scripts and archival documents.
Analyze this document image carefully. It may contain Modi script, Devanagari, archaic Marathi, Persian, or Sanskrit.
Return ONLY a valid JSON object with no markdown formatting, no backticks, no explanation before or after:
{
  "script": "detected script name",
  "era": "estimated historical period",
  "transcript": "full transcribed text in original script",
  "modernMarathi": "normalized modern Marathi version of the text",
  "summary": "2-3 sentence English summary of what this document is about",
  "missingWords": [],
  "predictedWords": [],
  "locations": [
    {
      "lat": 18.5204,
      "lng": 73.8567,
      "name": "Pune, Maharashtra"
    }
  ]
}

IMPORTANT RULES FOR LOCATIONS:
- Detect the exact geographical origin of this document/script
- lat and lng must be NUMBER type, not strings
- Provide at least 1 location based on where this script originated
- If script is Modi → likely Maharashtra (Pune/Nagpur/Kolhapur region)
- If script is Sanskrit → likely Varanasi or South India
- If script is Persian → likely Delhi/Hyderabad region
- Always return real coordinates, never leave locations as empty array
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [
            { inlineData: { mimeType: "image/jpeg", data: base64Image } },
            { text: prompt }
          ]
        }]
      })
    }
  );

  if (!response.ok) {
    const errData = await response.json();
    console.error("Gemini HTTP error:", errData);
    throw new Error(errData.error?.message || `Gemini API failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data.candidates || data.candidates.length === 0) {
    console.error("Gemini API error:", JSON.stringify(data));
    throw new Error(data.error?.message || "Gemini API returned no candidates");
  }

  const raw = data.candidates[0].content.parts[0].text;
  const clean = raw.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(clean);

    // ✅ Add temporarily to debug
    console.log("Gemini parsed result:", parsed);
    console.log("Locations from Gemini:", parsed.locations);

    return parsed;
  } catch (parseErr) {
    console.error("Failed to parse Gemini response as JSON:", raw);
    throw new Error("Gemini returned invalid JSON");
  }
}