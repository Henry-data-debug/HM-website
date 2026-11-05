export interface QuoteNotificationPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  timeline?: string;
  description: string;
  sourcePage?: string;
}

export interface ContactNotificationPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

const RECIPIENT_EMAIL = 'wambuahenry15@gmail.com';

/**
 * Sends quote request notification email to wambuahenry15@gmail.com
 */
export async function sendQuoteEmail(quote: QuoteNotificationPayload): Promise<{ success: boolean; message?: string }> {
  const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: `New Quote Request: ${quote.name} (${quote.service})`,
      _template: 'table',
      _captcha: 'false',
      _replyto: quote.email,
      'Client Name': quote.name,
      'Client Email': quote.email,
      'Phone Number': quote.phone || 'Not provided',
      'Company': quote.company || 'Not provided',
      'Service Required': quote.service,
      'Estimated Budget': quote.budget || 'Not specified',
      'Preferred Timeline': quote.timeline || 'Not specified',
      'Submitted From': quote.sourcePage || '/',
      'Project Description': quote.description,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Failed to send quote notification (Status: ${response.status})`);
  }

  return { success: true, message: data.message };
}

/**
 * Sends general contact notification email to wambuahenry15@gmail.com
 */
export async function sendContactEmail(contact: ContactNotificationPayload): Promise<{ success: boolean; message?: string }> {
  const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: `New Contact Inquiry from ${contact.name}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: contact.email,
      'Full Name': contact.name,
      'Email Address': contact.email,
      'Phone Number': contact.phone || 'Not provided',
      'Company': contact.company || 'Not provided',
      'Service Interested In': contact.service || 'General inquiry',
      'Message': contact.message,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Failed to send contact notification (Status: ${response.status})`);
  }

  return { success: true, message: data.message };
}
