const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!GOOGLE_KEY) {
  console.error("❌ VITE_GOOGLE_API_KEY is missing from .env");
}

export async function speakText(text, langCode = "mr-IN") {
  if (!GOOGLE_KEY) throw new Error("Google API key is not set in .env");
  if (!text || text.trim() === "") throw new Error("No text provided for TTS");

  const response = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: langCode, ssmlGender: "FEMALE" },
        audioConfig: { audioEncoding: "MP3" }
      })
    }
  );

  if (!response.ok) {
    const errData = await response.json();
    console.error("TTS API error:", errData);
    throw new Error(errData.error?.message || `TTS API failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data.audioContent) {
    throw new Error("TTS API returned no audio content");
  }

  const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
  audio.play();
}