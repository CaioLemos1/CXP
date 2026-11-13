import { siteConfig } from "@/config/site";
import { buildTopicMessage, buildWhatsAppUrl } from "./whatsapp";

export const whatsappUrl = buildWhatsAppUrl({
  phone: siteConfig.contact.whatsapp,
  message: siteConfig.messages.default,
});

export function whatsappTopicUrl(topic: string): string {
  return buildWhatsAppUrl({
    phone: siteConfig.contact.whatsapp,
    message: buildTopicMessage(topic, siteConfig.messages.default),
  });
}
