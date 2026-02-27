import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  return Response.json({ status: "OK - API is alive" });
}

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!supabaseUrl || !supabaseKey || !geminiKey) {
      return NextResponse.json({ reply: "**אחי, חסרים מפתחות בשרת.**" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const genAI = new GoogleGenerativeAI(geminiKey);

    // משיכת נתונים
    const [ { data: products }, { data: memory } ] = await Promise.all([
      supabase.from('products').select('name, sku, stock_quantity'),
      supabase.from('customer_memory').select('accumulated_knowledge').eq('clientId', 'שחר שאול').maybeSingle()
    ]);

    // תיקון השגיאה: שימוש במודל עם הגדרה נקייה
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", // השם המדויק
    });

    const systemInstruction = `
        אתה "Ai-ח.סבן", המוח הלוגיסטי של סבן הנדסה.
        נתוני מלאי: ${JSON.stringify(products || [])}
        זיכרון לקוח: ${memory?.accumulated_knowledge || "אין מידע קודם"}
        חוקים:
        1. מנוף עד 10 מטר בלבד. 15 מטר דורש אישור מראמי מסארוה.
        2. תהיה סמכותי ומקצועי.
    `;

    // הפעלת הצ'אט עם ה-Instruction בצורה תקינה
    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // הוספת ההנחיה כחלק מההודעה הראשונה או כ-System Context
    const result = await model.generateContent([systemInstruction, message]);
    const text = result.response.text();

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ 
      reply: `**אחי, יש בעיה עם Gemini: ${error.message}**` 
    }, { status: 500 });
  }
}
