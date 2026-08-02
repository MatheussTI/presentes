# Página de presentes — casa nova + aniversário

> Contexto para o Claude Code. Refatorada em 02/08/2026 a partir do handoff de design
> "Refatoração do site de presentes" (design system **Organic**). Antes disso era uma
> página de arquivo único com faixas de preço brincalhonas — esse desenho não existe mais.

## O que é

Lista de presentes do Matheus, que está montando casa e faz aniversário em **04 de agosto**.
Página pública única: quem entra busca/filtra um item, clica em **"Eu dou esse"** (marca o item e
abre o WhatsApp) ou manda um PIX.

- **Repositório:** `github.com/MatheussTI/presentes` (público)
- **URL:** https://matheussti.github.io/presentes/
- **Deploy:** GitHub Pages, branch `main`, pasta `/`. Commit + push → ~1 min.
- Projeto **separado** do `meu-financeiro` por decisão do usuário.

## Estrutura

Sem build, sem dependências, vanilla. Quatro arquivos:

| Arquivo | O quê |
|---|---|
| `index.html` | Casca estática: header, faixa de stats, controles, âncoras de render, bloco PIX, footer |
| `styles.css` | Tokens do design system Organic (verbatim do handoff) + camada da página |
| `app.js` | Dados (`ITENS`, `JA_TEM`), estado, filtros, render |
| `.nojekyll` | Precisa continuar no repositório |

O topo do `app.js` tem o bloco de configuração rápida: `FONE`, `CHAVE_PIX`, `PIX_LABEL`, `PIX_DONO`.
`FONE` vazio faz os botões de WhatsApp sumirem; `CHAVE_PIX` vazia esconde o cartão da chave.

Render: `renderEstaticos()` (stats, "já tenho", bloco PIX — roda uma vez) e `render()` (grupos,
chips, banner de sugestão — roda a cada mudança de estado). A busca fica no HTML estático, **fora**
do que é re-renderizado, senão o input perde o foco a cada tecla.

## Regras

- **`preco: null` ⇒ item cai na faixa "A combinar"** e o card mostra só "A combinar", sem "aprox.".
  Itens sem preço fechado **não devem receber valor inventado**.
- A faixa **"A combinar"** foi acrescentada às cinco do handoff porque hoje 30 dos 35 itens estão
  sem preço no app de finanças. Quando os valores entrarem lá, ela esvazia sozinha.
- Itens sem preço vão **para o fim** na ordenação por preço, nos dois sentidos.
- **`JA_TEM`** (Tanquinho, TV, Jogo de copos, Ventilador) evita presente repetido. Essa seção
  **não** vinha no handoff — foi mantida da versão anterior, no vocabulário visual novo.
- **"Não tem item pequeno demais."** no parágrafo de abertura é o que substituiu a antiga faixa
  amarela "Todo presente é bem-vindo". O usuário insistiu nesse recado; ele precisa continuar visível.
- **Cômodos** (nomes do handoff, diferentes das categorias do app de finanças):
  `Cozinha`, `Quarto e sala`, `Área de serviço`, `Banheiro`, `Itens grandes`.
- **"Ver loja"**: usa `item.link` se existir; senão cai numa busca no Mercado Livre pelo nome
  (parênteses removidos).

## Dados

Os 35 itens vieram da aba **"Casa"** do `meu-financeiro`. Atenção: **essa lista não está no
repositório do meu-financeiro** — o `seed()` cria `casa: []` e os itens moram no `localStorage`
do navegador do usuário, sob a chave `financas_app_v1`.

Para re-sincronizar, peça ao usuário que rode no console do app de finanças:

```js
JSON.stringify(JSON.parse(localStorage.getItem('financas_app_v1')).casa)
```

O item de lá é `{nome, cat, valor, parcela, qtd, link, ess, comprado}`. Mapeamento: `valor: 0` ⇒
`preco: null`; `comprado: true` ⇒ vai para `JA_TEM`; `cat` ⇒ `comodo` (`Maiores` ⇒ `Itens grandes`).
`nota` e `busca` são escritos à mão, não vêm do app.

## Estilo

Design system **Organic**, do handoff: creme `#f5ead8` / areia `#ebddc5`, acento terracota
`#c67139`, segundo acento sálvia `#7a8a5e`, **Caprasimo** (títulos) sobre **Figtree** (corpo).
Cantos bem arredondados: cards 32px, bloco PIX 40px, botões e inputs pill 999px.

Consuma os tokens (`var(--color-*)`, `var(--font-*)`, `var(--shadow-*)`) — **não repita hex**.
A única exceção são `--text-2/3/4`, os três tons de texto secundário que o próprio handoff derivou
do ramp neutro. O bloco `:root` do Organic em `styles.css` é cópia fiel do handoff: retoque a
camada da página, não os tokens.

As fontes entram por `<link>` no `index.html` (com o peso 500 do Figtree, que os rótulos usam);
o `@import` original do `styles.css` foi removido pra não fazer duas requisições em série.

## Estado

`localStorage["presentes-matheus-reservas-v1"]` guarda os ids reservados — **a reserva é local ao
navegador de quem reservou**. Outro visitante não vê o item como escolhido; o dono descobre pelo
WhatsApp. Tornar isso compartilhado (Apps Script / Supabase) é a maior melhoria pendente, descrita
no README do handoff. Ids que não existem mais em `ITENS` são descartados na leitura.

## Cuidados

- Repositório **público** e o telefone real `5527999888266` está no `app.js`, como chave PIX e
  destino do WhatsApp. O usuário autorizou explicitamente em 02/08/2026. Se mudar de ideia, é só
  esvaziar `FONE` e `CHAVE_PIX` — a página degrada sozinha.
- **Push exige a conta `MatheussTI`.** O git desta máquina autentica como `mrangel-data`, que leva
  403 nesse repositório. O commit local funciona; o push tem que sair pelo GitHub Desktop.
- Depois de editar: `node --check app.js` e conferir que o `index.html` termina em `</html>`.
- Dá pra conferir visualmente sem instalar nada — o Chromium do Playwright está em cache:
  `chrome.exe --headless=new --no-sandbox --screenshot=out.png --window-size=1280,2400 file:///...`
  Mate só os processos que você abriu (filtre pelo `--user-data-dir`), nunca todos os `chrome.exe`.
