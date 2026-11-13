import { siteConfig } from "@/config/site";
import { buildTopicMessage, buildWhatsAppUrl } from "./whatsapp";

export const whatsappUrl = buildWhatsAppUrl({
  phone: siteConfig.contact.whatsapp,
  message: siteConfig.messages.default,
});

/** WhatsApp direto de uma pessoa da equipe, com a mensagem padrão. */
export function whatsappPersonUrl(phone: string): string {
  return buildWhatsAppUrl({ phone, message: siteConfig.messages.default });
}

export function whatsappTopicUrl(topic: string): string {
  return buildWhatsAppUrl({
    phone: siteConfig.contact.whatsapp,
    message: buildTopicMessage(topic, siteConfig.messages.default),
  });
}
