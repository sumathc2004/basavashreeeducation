export const CONTACT_PHONE_DISPLAY = "+91 90366 86633";
export const CONTACT_PHONE_TEL = "+919036686633";
export const CONTACT_EMAIL = "hello@basavashreeeducation.com";
export const CONTACT_ADDRESS = "2nd Floor, Suvarna Complex, No. 706/1, 3rd Block, BEL Layout, Vidyaranyapura, Bengaluru - 560097";
export const CONTACT_ADDRESS_SHORT = "Vidyaranyapura, Bengaluru - 560097";

export const WHATSAPP_NUMBER = "919036686633";
export const WHATSAPP_DEFAULT_MESSAGE = "Hi Basavashree Education, I'd like to know more about your courses.";

export function getWhatsAppLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
