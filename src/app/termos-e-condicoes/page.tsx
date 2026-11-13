import type { Metadata } from "next";
import { LegalPage, Pending } from "@/components/layout/LegalPage";
import { siteConfig } from "@/config/site";
import { formatPhoneBR } from "@/lib/format";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description: "Condições de uso do site da CXP Crédito & Investimentos e limitações das informações financeiras.",
  alternates: { canonical: "/termos-e-condicoes" },
};

export default function TermsPage() {
  const { legal, contact } = siteConfig;
  return (
    <LegalPage
      title="Termos e Condições"
      intro="Ao acessar este site, você concorda com as condições abaixo. Leia com atenção, especialmente as informações sobre riscos financeiros."
    >
      <h2>1. Natureza informativa do conteúdo</h2>
      <p>
        O conteúdo deste site tem caráter exclusivamente informativo e educativo. Ele não constitui recomendação,
        consultoria individualizada, oferta de compra ou venda de valores mobiliários, oferta de crédito ou promessa de
        resultado. Decisões financeiras devem considerar sua situação, seus objetivos e a leitura integral dos contratos
        e documentos de cada produto.
      </p>

      <h2>2. Limitações das informações financeiras</h2>
      <ul>
        <li>
          Simulações apresentadas no site são ilustrativas, usam taxas hipotéticas e não consideram impostos, custos ou
          oscilações de mercado.
        </li>
        <li>
          Condições de consórcios (prazos, taxa de administração, fundo de reserva, seguros e regras de lance) são
          definidas pela administradora de cada grupo.
        </li>
        <li>
          Operações de crédito estão sujeitas à análise cadastral e à aprovação pela instituição concedente. Não há
          aprovação garantida.
        </li>
        <li>
          Informações podem ficar desatualizadas; confirme sempre as condições vigentes com a equipe antes de decidir.
        </li>
      </ul>

      <h2>3. Riscos associados a investimentos</h2>
      <p>
        Investimentos envolvem riscos, incluindo risco de mercado, de crédito e de liquidez, e podem resultar em perda
        parcial ou total do capital. Ativos de renda variável, como ações negociadas na B3, oscilam de preço e não têm
        retorno previsível.
      </p>

      <h2>4. Ausência de garantia de rentabilidade</h2>
      <p>
        Nenhuma informação deste site deve ser interpretada como garantia de rentabilidade, de contemplação em consórcio
        ou de aprovação de crédito. Rentabilidade passada não é garantia de rentabilidade futura. Consórcio não é
        investimento e não possui rendimento financeiro.
      </p>

      <h2>5. Condições gerais de uso</h2>
      <p>
        Você se compromete a utilizar o site de forma lícita, sem tentar comprometer sua segurança, disponibilidade ou
        integridade. Podemos alterar, suspender ou descontinuar o site ou parte dele a qualquer momento.
      </p>

      <h2>6. Propriedade intelectual</h2>
      <p>
        Marca, logotipo, textos, fotografias, layout e demais elementos deste site pertencem à {legal.legalName} ou são
        utilizados com autorização, sendo vedada sua reprodução sem consentimento prévio por escrito.
      </p>

      <h2>7. Links externos</h2>
      <p>
        O site contém links para serviços de terceiros, como WhatsApp, Instagram e o portal News Rondônia. Não nos
        responsabilizamos pelo conteúdo, disponibilidade ou políticas desses sites, que possuem termos próprios.
      </p>

      <h2>8. Legislação e foro</h2>
      <p>
        Estes termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de{" "}
        <Pending>comarca a definir pela assessoria jurídica</Pending>.
      </p>

      <h2>9. Contato</h2>
      <p>
        {legal.legalName}
        {legal.cnpj ? ` — CNPJ ${legal.cnpj}` : null}
        <br />
        E-mail: <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <br />
        WhatsApp: {formatPhoneBR(contact.whatsapp)}
      </p>
    </LegalPage>
  );
}
