'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSabanContext } from "@/lib/saban-brain";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeWhatsAppMessage(message: string, phone: string) {
  // שליפת ההקשר העסקי מה-Brain
  const sabanContext = await getSabanContext(phone);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const systemPrompt = `
    אתה העוזר החכם של "סבן הובלות ועבודות עפר".
    עליך להשתמש במידע הבא כדי לענות ללקוח בווצאפ:
    ${sabanContext}

    הנחיות:
    1. ענה תמיד בעברית מקצועית אך ידידותית ("אחי", "יקירי" כשמתאים).
    2. אם הלקוח מבקש מחיר, בדוק במחירון המצורף.
    3. אם יש חוב פתוח או בעיית אשראי, הפנה אותו בעדינות לשחר.
    4. במידה וההודעה היא הזמנה חדשה, חלץ: מוצר, כמות, מיקום וזמן.
  `;

  const result = await model.generateContent([systemPrompt, message]);
  return result.response.text();
}
