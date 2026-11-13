import type { Metadata } from "next";
import { LegalPage, Pending } from "@/components/layout/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a CXP Crédito & Investimentos trata dados pessoais, em conformidade com a LGPD (Lei nº 13.709/2018).",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPolicyPage() {
  const { legal, contact, name } = siteConfig;
  return (
    <LegalPage
      title="Política de Privacidade"
      intro="Transparência sobre quais dados pessoais podem ser tratados quando você navega neste site ou entra em contato com a nossa equipe, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)."
    >
      <h2>1. Quem é o controlador</h2>
      <p>
        O controlador dos dados pessoais é a {legal.legalName}, inscrita no CNPJ{" "}
        {legal.cnpj ?? <Pending>CNPJ a preencher</Pending>}, com endereço em{" "}
        {contact.address ?? <Pending>endereço a preencher</Pending>}. Encarregado(a) pelo tratamento de dados:{" "}
        {legal.dataProtectionOfficer ?? <Pending>nome do(a) encarregado(a) a preencher</Pending>}, contato:{" "}
        <a href={`mailto:${legal.privacyEmail}`}>{legal.privacyEmail}</a>.
      </p>

      <h2>2. Dados que podem ser tratados</h2>
      <p>Este site não possui formulários de cadastro. Os dados pessoais podem ser tratados nas seguintes situações:</p>
      <ul>
        <li>
          <strong>Contato por WhatsApp, e-mail ou Instagram:</strong> nome, telefone, e-mail, mensagens trocadas e
          informações que você decidir compartilhar sobre seus objetivos financeiros.
        </li>
        <li>
          <strong>Navegação:</strong> registros técnicos de acesso (como endereço IP, data e hora, navegador e páginas
          acessadas) gerados automaticamente pelo provedor de hospedagem, para segurança e funcionamento do site.
        </li>
        <li>
          <strong>Atendimento e propostas:</strong> quando você decide avançar em uma conversa, poderemos solicitar
          dados adicionais necessários à análise da solução desejada, sempre informando a finalidade.
        </li>
      </ul>

      <h2>3. Finalidades e bases legais</h2>
      <ul>
        <li>
          Responder às suas solicitações e prestar atendimento — procedimentos preliminares a contrato (art. 7º, V).
        </li>
        <li>Executar contratos e serviços contratados — execução de contrato (art. 7º, V).</li>
        <li>Cumprir obrigações legais e regulatórias — cumprimento de obrigação legal (art. 7º, II).</li>
        <li>Garantir a segurança do site e prevenir fraudes — legítimo interesse (art. 7º, IX).</li>
        <li>
          Enviar convites para eventos e conteúdos educativos — consentimento (art. 7º, I), que pode ser revogado a
          qualquer momento.
        </li>
      </ul>

      <h2>4. Compartilhamento com terceiros</h2>
      <p>Não vendemos dados pessoais. O compartilhamento pode ocorrer com:</p>
      <ul>
        <li>
          Administradoras de consórcio e instituições financeiras parceiras, quando necessário para a solução que você
          solicitou e com seu conhecimento;
        </li>
        <li>Prestadores de serviços de tecnologia (hospedagem, e-mail e comunicação);</li>
        <li>Autoridades públicas, mediante obrigação legal ou ordem judicial.</li>
      </ul>
      <p>
        Ao clicar em um botão de WhatsApp ou Instagram, você é direcionado a serviços operados pela Meta Platforms, que
        possuem políticas de privacidade próprias.
      </p>

      <h2>5. Ferramentas de análise, cookies e tecnologias semelhantes</h2>
      <p>
        Na versão atual, este site não utiliza cookies de publicidade nem ferramentas de análise de terceiros, e as
        fontes tipográficas são servidas pelo próprio site. Caso ferramentas de análise ou marketing venham a ser
        adotadas, esta política será atualizada e, quando exigido, será solicitado seu consentimento por meio de um
        aviso de cookies.
      </p>

      <h2>6. Direitos do titular</h2>
      <p>Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento:</p>
      <ul>
        <li>Confirmação da existência de tratamento e acesso aos dados;</li>
        <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
        <li>Portabilidade dos dados a outro fornecedor;</li>
        <li>Eliminação dos dados tratados com base no consentimento e revogação do consentimento;</li>
        <li>Informação sobre as entidades com as quais os dados foram compartilhados;</li>
        <li>Revisão de decisões tomadas exclusivamente com base em tratamento automatizado.</li>
      </ul>
      <p>Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).</p>

      <h2>7. Como fazer uma solicitação</h2>
      <p>
        Envie sua solicitação para <a href={`mailto:${legal.privacyEmail}`}>{legal.privacyEmail}</a>. Poderemos pedir
        informações para confirmar sua identidade antes de atender ao pedido, a fim de proteger seus dados.
      </p>

      <h2>8. Retenção e segurança</h2>
      <p>
        Os dados são mantidos apenas pelo tempo necessário às finalidades informadas ou pelo prazo exigido em lei.
        Adotamos medidas técnicas e administrativas razoáveis para proteger os dados contra acessos não autorizados,
        perda ou alteração. Nenhum sistema é totalmente imune a incidentes; caso ocorra um incidente relevante,
        adotaremos as medidas previstas na LGPD.
      </p>

      <h2>9. Alterações desta política</h2>
      <p>
        Esta política pode ser atualizada a qualquer momento. A data da última atualização está indicada no topo da
        página. Dúvidas: <a href={`mailto:${contact.email}`}>{contact.email}</a> — {name}.
      </p>
    </LegalPage>
  );
}
