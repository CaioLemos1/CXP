import Link from "next/link";

export default function NotFound() {
  return (
    <main id="conteudo" className="grid min-h-[100svh] place-items-center bg-navy px-6 text-center text-white">
      <div>
        <p className="eyebrow text-gold-soft">Erro 404</p>
        <h1 className="heading mt-6 text-5xl sm:text-6xl">Página não encontrada.</h1>
        <Link
          href="/"
          className="mt-10 inline-flex h-12 items-center rounded-full border border-gold px-7 text-sm font-semibold text-gold-soft hover:bg-gold/10"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
