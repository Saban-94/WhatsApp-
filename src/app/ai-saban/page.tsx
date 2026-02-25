'use client';

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SabanAIPage() {
  return (
    <div className="p-6 text-right" dir="rtl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">המוח של סבן - ניהול AI</h1>
        <p className="text-gray-600">כאן אתה שולט על איך שהעוזר הדיגיטלי עונה ללקוחות שלך.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 border-2 border-blue-100">
          <h2 className="text-xl font-semibold mb-4">סטטוס הודעות WhatsApp</h2>
          <div className="space-y-2">
            <p>הודעות שהתקבלו היום: <span className="font-bold">24</span></p>
            <p>הזמנות שנוצרו אוטומטית: <span className="font-bold text-green-600">5</span></p>
          </div>
          <Button className="mt-4 w-full bg-blue-600">צפייה בצ'אטים פעילים</Button>
        </Card>

        <Card className="p-4 border-2 border-orange-100">
          <h2 className="text-xl font-semibold mb-4">עדכון מחירים מהיר</h2>
          <p className="text-sm text-gray-500 mb-4">שינוי כאן מעדכן את ה-AI באופן מיידי.</p>
          {/* כאן תבוא לוגיקת העדכון */}
          <Button variant="outline" className="w-full">ערוך מחירון</Button>
        </Card>
      </div>
    </div>
  );
}
