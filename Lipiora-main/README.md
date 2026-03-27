# 📜 LipiSutra — Historical Document AI

> *"We are losing centuries of knowledge without saying a word."*

**LipiSutra** is an end-to-end multimodal AI platform that digitizes, reconstructs and preserves historical Indian manuscripts — doing what no existing tool does. Not just translating, but restoring, reconstructing and preserving while keeping the human touch alive at every step.

![Theme](https://img.shields.io/badge/Theme-AI%2FML%20%C2%B7%20Culture%20%26%20Archives-purple)
![Cost](https://img.shields.io/badge/Operational%20Cost-₹0-green)
![SDG](https://img.shields.io/badge/SDG-4%20%7C%2010%20%7C%2011%20%7C%2017-blue)
![Built With](https://img.shields.io/badge/Built%20With-Google%20Ecosystem-red)

---

## 🚨 The Problem

India holds an estimated **50 million undigitized manuscripts** and historical land records written in complex regional scripts — Maratha-era Modi, Sanskrit, Brahmi — that fewer than **0.1% of the population** can read today.

These documents are:
- Physically deteriorating across fragmented, isolated archives
- Completely inaccessible to modern researchers, cross-linguistic scholars and visually impaired users
- Vulnerable to AI hallucinations being passed off as historical fact — corrupting academic datasets permanently

**There is currently no single platform capable of intelligent reconstruction, multimodal accessibility and rigorous hallucination prevention.**

---

## 💡 The Solution

LipiSutra serves three distinct user types through a **Role-Based Perspective Switcher** — no login required:

| Role | Access | Purpose |
|------|--------|---------|
| 🌍 **Public / Student** | Full read access, free | Upload documents, receive structured output, TTS audio |
| 🏛️ **Historian** | Verified expert layer | Convert AI predictions to permanently verified data |
| 🏢 **Museum / Admin** | Bulk upload portal | Institutional digitization pipeline + analytics dashboard |

---

## ⚙️ System Architecture

```
User Upload
    ↓
SHA-256 Hash Check
    ├── Match Found → Serve cached Purple-verified result (50ms)
    └── New Document → Async Queue
                           ↓
                    Agent 1: OCR + Transliteration
                    (Gemini Vision + Cloud Vision API)
                           ↓
                    Agent 2: Gap Filling + Translation
                    (Gemini 1.5 Pro + Cloud Translation + Bhashini)
                           ↓
                    Agent 3: Output Formatting
                    (Structured text + TTS via Cloud Text-to-Speech)
                           ↓
                    Confidence Scoring → Color Provenance System
                           ↓
                    Firestore → Dashboard Delivery
                           ↓
                    Google Maps Heritage Pin Layer
```

---

## 🚀 5 Core Innovations

### 1. 🔍 Contextual Inpainting — Intelligent Reconstruction
When a manuscript is torn or ink is faded, existing OCR tools output "unreadable." LipiSutra uses surrounding sentences and contextual relationships within the document to logically predict missing words and phrases. This is not a guess — it is a **context-driven reconstruction** treating the document as a living semantic structure.

### 2. 🎨 Confidence-Based Color Provenance System
Every AI prediction carries a confidence score enforced through strict visual accountability:

| Color | Meaning | Confidence |
|-------|---------|------------|
| 🟡 Yellow | AI prediction — flagged for historian review | Above 75% |
| 🔴 Red | AI prediction — mandatory human intervention | Below 75% |
| 🟣 Purple | Historian verified — mathematically confirmed — permanently locked | 100% |

No other historical digitization platform enforces this level of **transparent color-coded AI accountability**. Hallucinations cannot quietly pass as historical fact.

### 3. 🧠 RLHF — The System Gets Smarter Over Time
Every historian correction is logged in Firestore as structured JSON — storing the original AI prediction, corrected version, script type, document era and historian credentials. This builds LipiSutra's own **proprietary ground-truth dataset**.

- **Short term** — verified corrections act as a lookup layer, improving accuracy on similar patterns instantly
- **Long term** — this dataset becomes training data for a specialized model fine-tuned on historical Indian scripts

### 4. 🔐 Cryptographic Deduplication
Every uploaded image is instantly hashed using **SHA-256**. If the document has been previously verified, the entire AI pipeline is bypassed — serving the cached Purple-verified result in **50 milliseconds**. This reduces cloud compute costs by up to **99%** for redundant archives.

### 5. 🤝 Human Touch at Every Layer
Civilians contribute documents. Historians verify predictions. The system learns from corrections. Human participation in LipiSutra is **not optional — it is structural**. This is what makes the dataset mathematically sound and academically trustworthy over time.

---

## 🛠️ Tech Stack

### Frontend
- **React + Vite** — Modern, responsive interface
- **Role-Based Perspective Switcher** — Instant UI switching across 3 user roles
- **Confidence Heatmap UI** — Color-coded provenance display (Yellow/Red/Purple)
- **Real-time progress indicator** — Shows document pipeline stage during async processing
- **Deployed on Vercel**

### Backend Pipeline
- **Python FastAPI** — Async task queuing, SHA-256 hashing, RBAC management
- **Google ADK** — Orchestrates 3 isolated AI agents
- **Firebase Firestore** — Document metadata, RLHF correction logs, historian queue

### Google Ecosystem (12 Tools)

| Tool | Role in Pipeline |
|------|-----------------|
| **Gemini 1.5 Pro** | Core multimodal OCR + contextual gap filling |
| **Cloud Vision API** | Confidence scoring per word/glyph |
| **Cloud Translation API** | Multilingual output (100+ languages) |
| **Bhashini API** | 22 scheduled Indian languages |
| **Cloud Text-to-Speech** | Audio accessibility for visually impaired users |
| **Google Maps JavaScript API** | Heritage site pinning from decoded place names |
| **Firebase Firestore** | Document storage, RLHF correction database |
| **Google ADK** | Multi-agent orchestration framework |
| **Vertex AI** | Model fine-tuning pipeline (RLHF long-term) |
| **Cloud Run** | Bulk processing backend + university API |
| **BigQuery + Looker Studio** | Museum analytics dashboard |
| **Firebase Auth** | Role-based access control |

### What Google Provides vs What We Built

| Google Provides | We Built |
|----------------|---------|
| Gemini multimodal reasoning | Confidence threshold parsing + color coding logic |
| Vertex AI translation | SHA-256 deduplication layer |
| Firebase/Firestore database | RBAC historian verification system |
| ADK agent framework | Async task queue + pipeline orchestration |
| — | RLHF correction logging + ground-truth dataset builder |

---

## 📊 Feature Comparison

| Feature | LipiSutra | Traditional Portals (Namami/NAI) | Generic AI Tools |
|---------|-----------|----------------------------------|-----------------|
| Multi-Script OCR | AI fine-tuned for Modi, Brahmi | No OCR, raw image scans only | Low accuracy on ancient scripts |
| Script Detection | Fully automated via AI | Manual expert identification | Requires user input |
| Multilingual Translation | Context-aware via Gemini | Rare, manual expert only | Literal, loses historical nuance |
| Audio Accessibility | Integrated TTS | None | External third-party only |
| Smart Metadata | Automated tagging by era, region | Manual cataloguing | None |
| Unified Search | Cross-institutional single search | Siloed individual archives | No heritage repository |
| Public Access | Free, no login | Restricted, physical travel required | No public heritage UI |
| Hallucination Prevention | Color provenance + HITL | None | None |
| Deduplication | SHA-256 cryptographic | None | None |

---

## 💰 Feasibility — ₹0 Operational Cost

The entire platform is architected on free and open-source tools:

- **Google ADK** — open source
- **Gemini via Google AI Studio** — free tier
- **Firebase Spark Plan** — free tier
- **React/Vite** — open source
- **Python FastAPI** — open source

**Immediately deployable for underfunded government archives, NGOs and local museums without any financial barrier.**

### Scalability
By decoupling the frontend from heavy AI processing via an asynchronous event-driven queue, LipiSutra remains highly responsive under concurrent upload loads. The SHA-256 deduplication layer means up to **99% of requests** for redundant archives never touch the AI pipeline.

### Flexibility — Model-Agnostic
Our multi-agent orchestration is completely model-agnostic. While we currently leverage Gemini for superior multimodal capabilities, our backend pipeline is not vendor-locked. Specific OCR agents can be swapped as new academic research emerges — making LipiSutra adaptable to **any historical script globally**.

---

## 🌍 SDG Alignment

| SDG | Goal | How LipiSutra Addresses It |
|-----|------|---------------------------|
| **SDG 11** | Sustainable Cities & Communities *(Primary)* | Digital preservation of culturally significant manuscripts, land records and theological texts |
| **SDG 4** | Quality Education | Centuries-old knowledge freely accessible to students and researchers in multiple Indian languages |
| **SDG 10** | Reduced Inequalities | TTS accessibility, free public access, zero economic barrier |
| **SDG 17** | Partnerships for the Goals | Cross-institutional collaboration connecting museums, temples, universities and government archives |

---

## 🔭 Future Scope

LipiSutra's verified dataset and multimodal pipeline could serve as the foundation for:
- **AR/VR heritage reconstruction** — bringing historical manuscripts to life visually
- **Generative animated storytelling** — for education and public engagement
- **Specialized fine-tuned model** — trained entirely on verified historical Indian script data
- **Government API** — serving state archives and national digitization missions

---

## 📚 Research Foundation

Each reference directly validates a specific technical decision in LipiSutra's architecture:

1. **MODI-HChar Dataset — Mendeley** — Validates dataset source for Modi script OCR (575,920 character images across 57 classes)
   `data.mendeley.com/datasets/pk2zrt58pp/1`

2. **INCLUDE — IIT Bombay** — Validates accessibility-first approach and technical feasibility of Indic script recognition using deep learning
   `https://dl.acm.org/doi/epdf/10.1145/3394171.3413528`

3. **AI4Bharat IndicTrans2** — Validates multilingual translation layer across all 22 scheduled Indic languages
   `github.com/AI4Bharat/IndicTrans2`

4. **Printed OCR for Extremely Low-Resource Indic Languages — IIIT Hyderabad** — Validates OCR approach for scripts with minimal training data
   `https://cdn.iiit.ac.in/cdn/cvit.iiit.ac.in/images/ConferencePapers/2024/Printed-OCR-for-Extremely-Lowresource-Indic-Languages.pdf`

5. **PLATTER — Page Level Handwritten Text Recognition for Indic Scripts — arXiv** — Validates handwritten text recognition pipeline
   `https://arxiv.org/html/2502.06172v1`

---

## 🏃 Getting Started

```bash
# Clone the repository
git clone https://github.com/prachi-satbhai0741/LipiSutra

# Install dependencies
cd lipisutra
npm install

# Add your API keys in src/services/
# - gemini.js → GEMINI_KEY
# - vision.js → GOOGLE_KEY
# - translate.js → GOOGLE_KEY
# - tts.js → GOOGLE_KEY
# - MapSection.jsx → GOOGLE_KEY
# - firebase.js → your Firebase config

# Run locally
npm run dev
```

---

## 🔗 Links

- 🌐 **Live Demo:** [lipi-sutra.vercel.app](https://lipi-sutra.vercel.app/)
- 💻 **GitHub:** [github.com/prachi-satbhai0741/LipiSutra](https://github.com/prachi-satbhai0741/LipiSutra)

---

## 👥 Team

Built with ❤️ for the **ML Nashik × Google Hackathon**

*"Building technology that serves humanity, heritage and history."*
