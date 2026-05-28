/**
 * headerThemes.ts
 *
 * Adicione uma section com  data-header-theme="sua-chave"  no JSX.
 * Registre a chave aqui com os valores desejados — o header aplica
 * automaticamente com animação ao entrar na section.
 *
 * Propriedades disponíveis:
 *   navBorder        — cor da borda da pílula nav
 *   navBg            — cor de fundo da pílula nav (aceita rgba)
 *   navShadow        — box-shadow da pílula nav
 *   linkColor        — cor dos links no estado normal
 *   linkHoverColor   — cor dos links no hover
 *   dotColor         — cor dos separadores "·" entre links
 *   underlineColor   — cor do underline animado no hover
 *   separatorColor   — cor da linha divisória dentro da ilha
 *   fontFamily       — família tipográfica dos links
 *   fontWeight       — peso da fonte ("300", "400", "500" …)
 *   letterSpacing    — espaçamento entre letras ("0.05em", "0" …)
 */

export type HeaderTheme = {
  navBorder: string
  navBg: string
  navShadow: string
  linkColor: string
  linkHoverColor: string
  dotColor: string
  underlineColor: string
  separatorColor: string
  fontFamily: string
  fontWeight: string
  letterSpacing: string
}

export const headerThemes: Record<string, HeaderTheme> = {
  // ── Section hero (vídeo escuro) ──────────────────────────────
  hero: {
    navBorder:      "rgba(255, 255, 255, 0.10)",
    navBg:          "rgba(0, 0, 0, 0.25)",
    navShadow:      "0 1px 6px rgba(0,0,0,0.15)",
    linkColor:      "rgba(255, 255, 255, 0.85)",
    linkHoverColor: "rgba(255, 255, 255, 1)",
    dotColor:       "rgba(255, 255, 255, 0.20)",
    underlineColor: "rgba(251, 191, 36, 0.70)",
    separatorColor: "rgba(255, 255, 255, 0.15)",
    fontFamily:     "inherit",
    fontWeight:     "300",
    letterSpacing:  "0.05em",
  },

  // ── Section about (fundo claro) ──────────────────────────────
  about: {
    navBorder:      "rgba(30, 20, 10, 0.12)",
    navBg:          "rgba(255, 250, 245, 0.55)",
    navShadow:      "0 1px 6px rgba(0,0,0,0.07)",
    linkColor:      "rgba(30, 20, 10, 0.80)",
    linkHoverColor: "rgba(30, 20, 10, 1)",
    dotColor:       "rgba(30, 20, 10, 0.25)",
    underlineColor: "rgba(180, 83, 9, 0.70)",
    separatorColor: "rgba(30, 20, 10, 0.15)",
    fontFamily:     "inherit",
    fontWeight:     "300",
    letterSpacing:  "0.05em",
  },

  // ── Adicione novas sections abaixo ───────────────────────────
  // exemplo:
  // products: {
  //   navBorder:      "rgba(20, 40, 30, 0.15)",
  //   navBg:          "rgba(20, 40, 30, 0.75)",
  //   navShadow:      "0 1px 6px rgba(0,0,0,0.20)",
  //   linkColor:      "rgba(255, 255, 255, 0.85)",
  //   linkHoverColor: "rgba(255, 255, 255, 1)",
  //   dotColor:       "rgba(255, 255, 255, 0.25)",
  //   underlineColor: "rgba(251, 191, 36, 0.70)",
  //   separatorColor: "rgba(255, 255, 255, 0.15)",
  //   fontFamily:     "inherit",
  //   fontWeight:     "300",
  //   letterSpacing:  "0.05em",
  // },
}

export const defaultTheme: HeaderTheme = headerThemes.hero
