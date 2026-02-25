import masterBrain from '@/data/saban_master_brain.json';

export async function getSabanContext(phone: string): Promise<string> {
  const pricing = masterBrain.find(i => i.id === "pricing_rules")?.data;
  const customers = masterBrain.find(i => i.id === "customers")?.data;
  
  const customer = customers?.find((c: any) => c.phone === phone);
  
  let context = `שם העסק: סבן הובלות ועבודות עפר.\n`;
  context += `מחירון נוכחי: ${JSON.stringify(pricing)}\n`;
  
  if (customer) {
    context += `פרטי לקוח מזוהה: ${customer.name}, סטטוס: ${customer.status}.\n`;
  } else {
    context += `לקוח חדש (לא מזוהה במערכת).\n`;
  }
  
  return context;
}
