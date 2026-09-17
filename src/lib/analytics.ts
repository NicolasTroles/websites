declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fires a GA4 `whatsapp_click` event, identifying where the click came from. */
export function trackWhatsAppClick(origin: string) {
  window.gtag?.('event', 'whatsapp_click', {
    event_category: 'contact',
    event_label: origin,
  });
}

/** Fires when the contact form is submitted, with the chosen subject. */
export function trackFormSubmit(subject: string) {
  window.gtag?.('event', 'contact_form_submit', {
    event_category: 'contact',
    event_label: subject,
  });
}
