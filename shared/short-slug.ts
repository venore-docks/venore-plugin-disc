// Slug curto pra link de convite de instância (/disc/d/:slug) — substitui o UUID cru que o
// NestPro expunha. 8 caracteres em base36 (~41 bits) é suficiente pro volume de instâncias de um
// plugin de RH; colisão é resolvida por retry no caller (store.ts), não aqui.
export function generateShortSlug(): string {
  return Array.from(crypto.getRandomValues(new Uint32Array(2)))
    .map((value) => value.toString(36))
    .join("")
    .slice(0, 8);
}
