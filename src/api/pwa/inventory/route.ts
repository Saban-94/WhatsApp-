import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxb__a0moggMuPt1hUFGJGNwcCN9PMtnNhBq702QuF0qBIV5enXHHf85zFsPAfueRo9/exec";

export async function GET() {
  try {
    // השרת פונה לגוגל - כאן אין הגבלת CORS
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'GET',
      redirect: 'follow' // חובה כדי לעקוב אחרי ה-Redirect של גוגל
    });

    if (!response.ok) throw new Error("Google Script Error");

    const data = await response.json();
    
    // מחזירים לאפליקציה את הנתונים נקיים
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("PWA Proxy Error:", error.message);
    return NextResponse.json({ error: "Failed to fetch inventory from Google" }, { status: 500 });
  }
}
