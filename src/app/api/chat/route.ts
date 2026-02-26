import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// חיבור ל-Supabase המשותף (באמצעות המפתחות שהזנת ב-Vercel)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// רשימת מפתחות Gemini למניעת חסימות (Load Balancing)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    // 1. משיכת נתונים מהמאגר הראשי (מלאי וזיכרון)
    const [ { data: products }, { data: memory } ] = await Promise.all([
      supabase.from('products').select('name, sku, stock_quantity'),
      supabase.from('customer_memory').select('accumulated_knowledge').eq('clientId', 'שחר שאול').single()
    ]);

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `
        אתה "Ai-ח.סבן", המוח הלוגיסטי של סבן הנדסה.
        
        נתוני מלאי מהמאגר הראשי: ${JSON.stringify(products)}
        זיכרון על הלקוח: ${memory?.accumulated_knowledge || "אין מידע קודם"}

        חוקים:
        1. מנוף עד 10 מטר בלבד. 15 מטר דורש אישור מראמי מסארוה.
        2. תהיה סמכותי, השתמש ב**הדגשות**.
        3. אם לקוח שואל על מוצר, תענה לפי המלאי האמיתי שמופיע כאן.
      `
    });

    const chat = model.startChat({ history: history || [] });
    const result = await chat.sendMessage(message);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("Chat Error:", error);
    return NextResponse.json({ reply: "**אחי, יש תקלה בחיבור למאגר הראשי. נסה שוב.**" }, { status: 500 });
  }
}
