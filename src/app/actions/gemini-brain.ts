'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSabanContext } from "@/lib/saban-brain";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeWhatsAppMessage(message: string, phone: string) {
  const context = await getSabanContext(phone);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const systemPrompt = `
    אתה העוזר של שחר מחברת "סבן הובלות".
    השתמש במידע הבא:
    ${context}

    הנחיות לשיחה:
    1. דבר בעברית זורמת ומקצועית.
    2. אם הלקוח מבקש מחיר - תן לו לפי המחירון.
    3. תמיד תנסה לסגור: "להוציא לך הזמנה?" או "מתי לשלוח את המשאית?".
    4. במידה ומבקשים חומר שלא קיים - תגיד שאתה בודק עם שחר.
    5. תהיה "אח" - תן הרגשה של שירות אישי.
  `;

  const result = await model.generateContent([systemPrompt, message]);
  return result.response.text();
}
