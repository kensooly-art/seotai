import express, { Request, Response } from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import 'dotenv/config';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  // JSON request body parser
  app.use(express.json());

  // Initialize Gemini AI SDK securely on the server
  // Avoid crashing if GEMINI_API_KEY is not defined, but log or notify
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  
  if (apiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
      console.log('Gemini AI system successfully initialized server-side.');
    } catch (e) {
      console.error('Failed to initialize GoogleGenAI:', e);
    }
  } else {
    console.warn('Warning: GEMINI_API_KEY is missing. AI assisted features will fall back to local rule-based simulation.');
  }

  // --- API Endpoints ---

  // Health and Status check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      aiActivated: !!ai,
      currentTime: new Date().toISOString()
    });
  });

  // AI Translation helper: Translates content between Korean and English
  app.post('/api/ai/translate', async (req: Request, res: Response) => {
    const { text, targetLang } = req.body;
    if (!text) {
      res.status(400).json({ error: 'Text content is required' });
      return;
    }

    const languageFullName = targetLang?.toLowerCase() === 'en' ? 'English' : 'Korean';

    if (!ai) {
      // Offline/Local Simulation Fallback
      console.log('[Mock Translation] Client requested translation to:', languageFullName);
      setTimeout(() => {
        let simulated = '';
        if (targetLang === 'en') {
          simulated = `[EN/Trans] ${text} (AI translation simulated)`;
        } else {
          simulated = `[KO/번역] ${text} (AI 번역 시뮬레이션됨)`;
        }
        res.json({ translatedText: simulated, isSimulation: true });
      }, 500);
      return;
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `Translate the following text into fluent, professional UI/tourist-centric ${languageFullName}. Provide only the final translation, do not include comments, explanations, quotes, or meta text. Use elegant and persuasive copywriting words.
Text: ${text}`,
        config: {
          temperature: 0.3,
        }
      });

      const translated = response.text || '';
      res.json({ translatedText: translated.trim(), isSimulation: false });
    } catch (err: any) {
      console.error('Translation prompt error:', err);
      res.status(500).json({ error: err.message || 'Error occurred during translation call.' });
    }
  });

  // AI Tour Copywriter: Generates attractive program description or overview based on brief tags/titles
  app.post('/api/ai/draft-tour', async (req: Request, res: Response) => {
    const { title, tags, lang } = req.body;
    if (!title) {
      res.status(400).json({ error: 'Tour Title is required to draft copy.' });
      return;
    }

    const docLang = lang === 'en' ? 'English' : 'Korean';

    if (!ai) {
      // Sim base fallback
      setTimeout(() => {
        const dummyKo = `🌟 [서태국제여행사 엄선] ${title} 안내. 
편안한 교통과 최적의 동선으로 한국 최고의 핵심 기획 여정을 만끽하세요.
- 일정: 전문가 동반 투어, 엄선된 맛집 탑방과 고품격 서비스
- 혜택: 자유롭고 신속한 일정 조율과 밀착 의전 안내.
최고의 랜드사 직영가로 제공해 드립니다.`;
        
        const dummyEn = `🌟 [Seotai Premium Picks] Discover ${title}.
Experience South Korea's pristine landscapes & dynamic cities with Seotai Travel.
- Itinerary: Direct operating deals, selected boutique dining, and high-end transport.
- Service: Highly personalized land operations and prompt dynamic customizations.`;

        res.json({ 
          draft: lang === 'en' ? dummyEn : dummyKo, 
          isSimulation: true 
        });
      }, 500);
      return;
    }

    try {
      const systemInstruction = lang === 'en' 
        ? "You are an elite, high-end travel marketer specializing in Korea Land Operations. Write a highly persuasive, luxurious, and beautiful summary overview (about 3-4 paragraphs or a beautifully formatted list) for a Korean custom tour package."
        : "당신은 고품격 인바운드/아웃바운드 랜드 오퍼레이터(서태국제여행사)의 엘리트 여행 기획 매케터입니다. 호소력 짙고 세련되며 명료한 톤으로, 해당 한국 맞춤형 기획 투어 상품의 고품격 요약 설명과 일정을 3-4개 문단 또는 아름다운 글머리 기호로 정성스럽게 작성해 주세요.";

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `Create an enchanting, professional tour package summary.
Title: '${title}'
Associated tags/itinerary options: ${tags ? tags.join(', ') : 'None'}
Requested Language: ${docLang}`,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ draft: response.text?.trim() || '', isSimulation: false });
    } catch (err: any) {
      console.error('Copywriting request issue:', err);
      res.status(500).json({ error: err.message || 'Error driving AI writer.' });
    }
  });

  // AI SEO Meta-Tags Assistant: Recommends high-performance keywords and custom descriptive tag structures
  app.post('/api/ai/seo-advisor', async (req: Request, res: Response) => {
    const { siteDescription, targetCoreMarkets } = req.body;

    if (!ai) {
      setTimeout(() => {
        res.json({
          metaTitle: "서태국제여행사 (Seotai Travel) | Korea Land Operator & Custom Travel Expert",
          recommendedKeywords: ["서태국제여행사", "Leading Korea Land Operator", "한국 랜드사", "Custom Korea VIP Tour", "인바운드 럭셔리 투어"],
          suggestedDescription: siteDescription || "대한민국 최고 수준의 랜드 오퍼레이터로서, 비즈니스 출장, VIP 의전, 소형 맞춤 투어에 이르기까지 서태국제여행사가 완벽하게 전담 조율해 드립니다.",
          isSimulation: true
        });
      }, 500);
      return;
    }

    try {
      const prompt = `Give professional SEO advice for travel agency "Seotai Travel" (서태국제여행사).
User's site status/description input: ${siteDescription || 'No input'}
Target client demographics/core markets: ${targetCoreMarkets || 'Inbound VIPs, Land operations, travel customize'}

Generate suggestions in elegant, strictly valid JSON format matching this schema:
{
  "metaTitle": "Highly optimized search title under 60 characters containing Seotai Travel and primary keywords",
  "recommendedKeywords": ["array", "of", "5", "lucrative", "SEO", "keywords"],
  "suggestedDescription": "Beautifully crafted meta description under 160 characters designed to drive clicks"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              metaTitle: { type: Type.STRING },
              recommendedKeywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              suggestedDescription: { type: Type.STRING }
            },
            required: ['metaTitle', 'recommendedKeywords', 'suggestedDescription']
          }
        }
      });

      const dataStr = response.text || '{}';
      const parsed = JSON.parse(dataStr.trim());
      res.json({ ...parsed, isSimulation: false });
    } catch (err: any) {
      console.error('SEO Generator error:', err);
      res.status(500).json({ error: err.message || 'Error occurred querying Gemini.' });
    }
  });

  // --- Vite & Production Server Setup ---

  if (process.env.NODE_ENV !== 'production') {
    // In dev mode, mount Vite as middleware so we gain instantaneous hot dev features
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite development middleware successfully mounted.');
  } else {
    // Serve production static outputs
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Serve HTML fallback for single page routes
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log(`Serving static bundle from directory: ${distPath}`);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server running natively on Port ${PORT} securely.`);
  });
}

startServer().catch((error) => {
  console.error('Fatal initialization error for Web Server:', error);
});
