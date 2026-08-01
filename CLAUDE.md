# Página de presentes — casa nova + aniversário

> Contexto para o Claude Code. Projeto criado numa sessão do Cowork; este arquivo resume tudo.

## O que é

Página estática de **arquivo único** (`index.html`) com a lista de presentes do Matheus, que está
em processo de mudança e faz aniversário em **04 de agosto**. O tom é leve e descontraído: as faixas
de preço têm nomes brincalhões em vez de valores secos.

- **Repositório:** `github.com/MatheussTI/presentes` (público) — *a criar pelo usuário via GitHub Desktop*
- **URL pretendida:** https://matheussti.github.io/presentes/
- **Deploy:** GitHub Pages, branch `main`, pasta `/`. Commit + push → ~1 min.
- Projeto **separado** do `meu-financeiro` por decisão do usuário.

## Estrutura

Sem build, sem dependências. HTML + CSS + JS inline. Não usa `localStorage` (não há nada a
persistir — é uma página de leitura).

O JS tem, no topo, um bloco de configuração pensado para edição rápida:

```js
const PIX = '';        // chave PIX. Vazio → seção vira "me chama no particular"
const WHATSAPP = '';   // ex.: '5527999999999'. Vazio → botão some
const ITENS = [ {nome, cat, valor, parcela, qtd, link}, ... ];
const JA_TEM = ['Tanquinho','TV'];   // exibidos riscados, evita presente repetido
const TIERS  = [ {id, emoji, nome, sub, range, bg, fg, min, max}, ... ];
```

`renderChips()` / `renderTiers()` / `renderDone()` / `renderPix()` montam a página; `setFiltro(cat)`
filtra por categoria.

## Regras

- **`valor: null` ⇒ cai no tier `t0` ("Surpresa é sempre bom", a combinar).** Itens sem preço
  fechado não devem inventar valor.
- **Faixas por valor** (`tierOf()`): até 150 · 150–500 · 500–1200 · 1200+.
  Nomes: "O que vale é o carinho" · "Presente redondo" · "Tá investindo no meu conforto" ·
  **"Ai tu vai tirar onda"** (esse último foi pedido nominalmente pelo usuário — manter o espírito).
- **"Todo presente é bem-vindo"** precisa continuar em destaque (faixa amarela no topo). Sem valor
  mínimo, sem cobrança — o usuário insistiu nisso.
- **Categorias** iguais às do app de finanças: `Cozinha`, `Quarto e Sala`, `Área de Serviço`,
  `Banheiro`, `Maiores`.
- Itens e valores vieram da aba "Casa" do app de finanças (`meu-financeiro`). Se a lista de lá mudar,
  vale sincronizar manualmente.

## Estilo

Mesmo vocabulário visual do app de finanças: Unbounded + Manrope, navy `#15274a`, azul `#25399e`,
vermelho `#e53a2e`. Hero com gradiente e um círculo vermelho translúcido; cards com hover sutil.
Responsivo em `640px` (grid vira coluna única).

## Cuidados

- Repositório **público**: nada de dado sensível. A chave PIX é o único dado pessoal previsto —
  o usuário decide se entra.
- Depois de editar, conferir integridade (o arquivo é pequeno, mas o hábito vale):
  `tail -3 index.html` deve terminar em `</html>`, e `node --check` no `<script>` extraído.
- `.nojekyll` deve permanecer no repositório.
