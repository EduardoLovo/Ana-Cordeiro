import { writeClient, hasWriteToken } from "@/sanity/lib/serverClient";

/**
 * ENDPOINT DO FORMULÁRIO DE CONTATO — POST /api/contato
 * -----------------------------------------------------
 * Valida os dados, barra spam (honeypot) e grava a mensagem no Sanity, onde
 * ela aparece na aba "Mensagens" do painel.
 */

const MAX = { name: 120, email: 160, phone: 40, subject: 120, message: 4000 };

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requisição inválida." }, { status: 400 });
  }

  // Honeypot: campo invisível preenchido = robô.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, MAX.name);
  const email = String(body.email ?? "").trim().slice(0, MAX.email);
  const phone = String(body.phone ?? "").trim().slice(0, MAX.phone);
  const subject = String(body.subject ?? "").trim().slice(0, MAX.subject);
  const message = String(body.message ?? "").trim().slice(0, MAX.message);

  if (!name || !message || !isValidEmail(email)) {
    return Response.json(
      { error: "Preencha nome, um e-mail válido e a mensagem." },
      { status: 400 },
    );
  }

  if (!hasWriteToken) {
    return Response.json(
      {
        error:
          "Não foi possível enviar agora. Tente novamente ou use o e-mail/telefone.",
      },
      { status: 500 },
    );
  }

  try {
    await writeClient.create({
      _type: "contactMessage",
      name,
      email,
      phone: phone || undefined,
      subject: subject || undefined,
      message,
      receivedAt: new Date().toISOString(),
      handled: false,
    });
  } catch (err) {
    console.error("[contato] falha ao gravar no Sanity:", err);
    return Response.json(
      {
        error:
          "Não foi possível enviar agora. Tente novamente ou use o e-mail/telefone.",
      },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
