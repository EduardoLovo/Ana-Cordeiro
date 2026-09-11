/**
 * Preenche os campos de contato em "Configurações do site" (siteSettings).
 * Uso único de conveniência: define endereço (sem a rua), e-mail, telefone,
 * link do WhatsApp e horário. Tudo continua editável no painel depois.
 *
 * Rodar: node scripts/patchContact.mjs
 * (lê o token e o project ID do .env.local — o token não é exposto.)
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

// Lê variáveis do .env.local.
const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1).replace(/^["']|["']$/g, "")];
    }),
);

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("Falta SANITY_API_WRITE_TOKEN no .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const fields = {
  address: "Guaratinguetá — SP\nBrasil",
  email: "contato@anacordeiro.com.br",
  phone: "+55 11 99999-9999",
  whatsappUrl: "https://wa.me/5511999999999",
  hours: "Segunda a Sexta\n09:00 — 18:00",
};

const run = async () => {
  const ids = ["siteSettings", "drafts.siteSettings"];
  const existing = await client.fetch("*[_id in $ids]{_id}", { ids });
  const hasDraft = existing.some((d) => d._id === "drafts.siteSettings");

  const tx = client.transaction();
  tx.createIfNotExists({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Ana Cordeiro",
    tagline: "Arquitetura & Urbanismo",
  });
  tx.patch("siteSettings", (p) => p.set(fields));
  if (hasDraft) tx.patch("drafts.siteSettings", (p) => p.set(fields));

  await tx.commit();
  console.log("✓ Configurações de contato atualizadas (published" + (hasDraft ? " + draft" : "") + ").");
};

run().catch((e) => {
  console.error("Erro:", e.message);
  process.exit(1);
});
