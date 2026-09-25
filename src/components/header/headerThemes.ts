/**
 * headerThemes.ts
 *
 * O header usa `defaultTheme` (pílula marrom escuro) em
 * TODO o site. Só troca onde for explicitamente modificado: adicione
 * data-header-theme="sua-chave" na section e registre a chave abaixo.
 * Chave não registrada = tema padrão.
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

// ── Tema padrão do site (marrom médio #5C402E) ─────────────────
export const defaultTheme: HeaderTheme = {
  navBorder:      "rgba(239, 232, 220, 0.12)",
  navBg:          "rgba(92, 64, 46, 0.85)",
  navShadow:      "0 1px 6px rgba(0,0,0,0.20)",
  linkColor:      "rgba(239, 232, 220, 0.85)",
  linkHoverColor: "rgba(255, 255, 255, 1)",
  dotColor:       "rgba(239, 232, 220, 0.25)",
  underlineColor: "rgba(251, 191, 36, 0.70)",
  separatorColor: "rgba(239, 232, 220, 0.15)",
  fontFamily:     "inherit",
  fontWeight:     "300",
  letterSpacing:  "0.05em",
}

export const headerThemes: Record<string, HeaderTheme> = {
  hero:   defaultTheme,
  about:  defaultTheme,
  footer: defaultTheme,

  // ── Adicione novas sections abaixo ───────────────────────────
  // Só registre aqui quem precisa FUGIR do padrão marrom:
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

// Sections de fundo marrom escuro também usam o tema padrão
headerThemes.moments = headerThemes.footer
headerThemes.process = headerThemes.footer
