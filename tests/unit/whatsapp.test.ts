import { describe, expect, it } from "vitest";
import { buildTopicMessage, buildWhatsAppUrl, normalizeBrazilianPhone, onlyDigits } from "@/lib/whatsapp";

describe("onlyDigits", () => {
  it("remove tudo que não é dígito", () => {
    expect(onlyDigits("+55 (69) 99257-9620")).toBe("5569992579620");
    expect(onlyDigits("abc")).toBe("");
  });
});

describe("normalizeBrazilianPhone", () => {
  it.each([
    ["69 99257-9620", "5569992579620"],
    ["(69) 99257-9620", "5569992579620"],
    ["+55 69 99257-9620", "5569992579620"],
    ["005569992579620", "5569992579620"],
    ["5569992579620", "5569992579620"],
    ["(11) 3333-4444", "551133334444"],
    ["551133334444", "551133334444"],
  ])("normaliza %s", (input, expected) => {
    expect(normalizeBrazilianPhone(input)).toBe(expected);
  });

  it.each([
    ["", "vazio"],
    ["12345", "curto demais"],
    ["1569992579620", "DDI diferente de 55"],
    ["550999257962", "DDD inválido (09)"],
    ["5510992579620", "DDD inválido (10)"],
    ["5569892579620", "celular sem 9 inicial"],
    ["556999257962000", "longo demais"],
    ["55699925796", "nacional com 9 dígitos"],
  ])("rejeita %s (%s)", (input) => {
    expect(normalizeBrazilianPhone(input)).toBeNull();
  });

  it("aceita os limites de DDD 11 e 99", () => {
    expect(normalizeBrazilianPhone("11912345678")).toBe("5511912345678");
    expect(normalizeBrazilianPhone("99912345678")).toBe("5599912345678");
  });
});

describe("buildWhatsAppUrl", () => {
  it("gera URL wa.me com mensagem codificada", () => {
    const url = buildWhatsAppUrl({ phone: "69 99257-9620", message: "Olá! Quero falar sobre consórcio & crédito?" });
    expect(url).toBe(
      "https://wa.me/5569992579620?text=Ol%C3%A1!%20Quero%20falar%20sobre%20cons%C3%B3rcio%20%26%20cr%C3%A9dito%3F",
    );
    expect(new URL(url).searchParams.get("text")).toBe("Olá! Quero falar sobre consórcio & crédito?");
  });

  it("omite o parâmetro text quando não há mensagem", () => {
    expect(buildWhatsAppUrl({ phone: "5569992579620" })).toBe("https://wa.me/5569992579620");
    expect(buildWhatsAppUrl({ phone: "5569992579620", message: "   " })).toBe("https://wa.me/5569992579620");
  });

  it("remove espaços nas pontas da mensagem", () => {
    expect(buildWhatsAppUrl({ phone: "5569992579620", message: "  oi  " })).toBe("https://wa.me/5569992579620?text=oi");
  });

  it("lança erro para número inválido", () => {
    expect(() => buildWhatsAppUrl({ phone: "000" })).toThrowError(/inválido/);
  });
});

describe("buildTopicMessage", () => {
  it("monta mensagem contextual", () => {
    expect(buildTopicMessage(" consórcios ", "padrão")).toBe(
      "Olá! Conheci a CXP pelo site e gostaria de conversar com a equipe sobre consórcios.",
    );
  });
  it("usa o fallback quando o tópico é vazio", () => {
    expect(buildTopicMessage("  ", "padrão")).toBe("padrão");
  });
});
