import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  return Response.json({ status: "OK - API is alive" });
}

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    // בדיקה שהמפתחות קיימים ב-Environment Variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!supabaseUrl || !supabaseKey || !geminiKey) {
      console.error("Missing Keys:", { supabaseUrl: !!supabaseUrl, supabaseKey: !!supabaseKey, geminiKey: !!geminiKey });
      return NextResponse.json({ reply: "**אחי, חסרים מפתחות גישה בשרת (Supabase/Gemini). בדוק את ה-Settings ב-Vercel.**" }, { status: 500 });
    }

    // יצירת הלקוח של Supabase בתוך הפונקציה (מונע בעיות Cache)
    const supabase = createClient(supabaseUrl, supabaseKey);
    const genAI = new GoogleGenerativeAI(geminiKey);

    // 1. משיכת נתונים מהמאגר הראשי (מלאי וזיכרון)
    // הערה: וודא שהטבלאות האלו קיימות ב-Supabase שלך בדיוק בשמות האלו
    const [ { data: products, error: prodError }, { data: memory, error: memError } ] = await Promise.all([
      supabase.from('products').select('name, sku, stock_quantity'),
      supabase.from('customer_memory').select('accumulated_knowledge').eq('clientId', 'שחר שאול').single()
    ]);

    if (prodError) throw new Error(`Supabase Products Error: ${prodError.message}`);

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
    console.error("FULL CHAT ERROR:", error);
    return NextResponse.json({ reply: `**אחי, יש תקלה בחיבור למאגר: ${error.message}**` }, { status: 500 });
  }
}
