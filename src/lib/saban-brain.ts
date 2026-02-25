import masterBrain from '@/data/saban_master_brain.json';

export interface SabanContext {
  customer?: any;
  pricing?: any;
  technical?: any;
}

export async function getSabanContext(phone?: string): Promise<string> {
  // שליפת מחירונים ומפרטים טכניים מהמאגר
  const pricing = masterBrain.find(item => item.id === "pricing_rules")?.data;
  const technical = masterBrain.find(item => item.id === "material_specs")?.data;
  
  let customerContext = "";
  if (phone) {
    const customers = masterBrain.find(item => item.id === "customers")?.data;
    const customer = customers?.find((c: any) => c.phone === phone);
    if (customer) {
      customerContext = `
      לקוח מזוהה: ${customer.name}
      סטטוס אשראי: ${customer.credit_status}
      אתרים פעילים: ${customer.sites?.join(', ')}
      `;
    }
  }

  // בניית טקסט הקונטקסט עבור Gemini
  return `
    מידע עסקי ממערכת סבן:
    ${customerContext}
    
    מחירון והנחיות:
    ${JSON.stringify(pricing)}
    
    מפרט חומרים טכני:
    ${JSON.stringify(technical)}
  `;
}
