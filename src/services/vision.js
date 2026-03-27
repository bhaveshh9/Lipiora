const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!GOOGLE_KEY) {
  console.error("❌ VITE_GOOGLE_API_KEY is missing from .env");
}

export async function getConfidenceScores(base64Image) {
  if (!GOOGLE_KEY) throw new Error("Google API key is not set in .env");

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

  if (data.responses?.[0]?.error) {
    throw new Error(data.responses[0].error.message || "Vision API returned an error");
  }

  const words = [];
  const pages = data.responses[0]?.fullTextAnnotation?.pages || [];
  pages.forEach(page =>
    page.blocks?.forEach(block =>
      block.paragraphs?.forEach(para =>
        para.words?.forEach(word => {
          const text = word.symbols?.map(s => s.text).join("") || "";
          words.push({ word: text, confidence: word.confidence ?? 0 });
        })
      )
    )
  );

  return words;
}