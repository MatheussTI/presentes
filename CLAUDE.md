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
| `app.js` | Dados (`ITENS`, `JA_TEM`), estado, filtros, sincronização, render |
| `reservas.gs` | Google Apps Script da reserva compartilhada. **Não é servido pelo Pages** — mora aqui só como fonte versionada; roda colado no editor do Apps Script |
| `.nojekyll` | Precisa continuar no repositório |

O topo do `app.js` tem o bloco de configuração rápida: `FONE`, `CHAVE_PIX`, `PIX_LABEL`, `PIX_DONO`,
`RESERVAS_URL`. `FONE` vazio faz os botões de WhatsApp sumirem; `CHAVE_PIX` vazia esconde o cartão
da chave; `RESERVAS_URL` vazia faz a reserva voltar a ser só local.

Render: `renderEstaticos()` (stats, "já tenho", bloco PIX — roda uma vez) e `render()` (grupos,
chips, banner de sugestão — roda a cada mudança de estado). A busca fica no HTML estático, **fora**
do que é re-renderizado, senão o input perde o foco a cada tecla.

## Regras

- **`preco: null` ⇒ item cai na faixa "A combinar"** e o card mostra só "A combinar", sem "aprox.".
  Itens sem preço fechado **não devem receber valor inventado**.
- **Precedência de preço:** valor real do app de finanças > estimativa do handoff > `null`.
  Onde o usuário já escolheu um produto concreto (Fogão, Armário, Guarda-roupas, Cama, Potes), o
  preço real do app manda, mesmo sendo bem menor que a estimativa. Não "arredonde" pra estimativa.
- A faixa **"A combinar"** foi acrescentada às cinco do handoff. Hoje cobre 16 dos 35 itens —
  aqueles que não estão no exemplo do handoff nem têm valor no app. Quando os preços entrarem no
  app de finanças, ela esvazia sozinha.
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

Os preços dos outros 14 itens vieram das **estimativas do handoff** (autorizado pelo usuário em
02/08/2026). Dois casos que não são cópia direta: `lencois` é R$ 450 porque o app funde num item só
o que o handoff separava em "Jogo de lençóis" (200) e "Colcha / edredom" (250); e `potes` ficou em
R$ 89,90, o valor real do app, não os R$ 90 do exemplo. Ao re-sincronizar, **não sobrescreva com
`null`** os preços que hoje vêm do handoff só porque o app ainda tem `0` neles.

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

## Reserva compartilhada

**Está ativa** desde 04/08/2026: `RESERVAS_URL` no `app.js` aponta para o Web App publicado, e a
planilha vive no Google Drive de uma conta pessoal do usuário (não a `@inbazz.com.br` — o Workspace
corporativo dá conflito de conta ao abrir o editor do Apps Script).

Dois conjuntos de ids, e a distinção entre eles é o que impede um visitante de desmarcar a escolha
de outro:

- **`state.reservas`** — tudo que está tomado, seu ou dos outros. Vem do servidor.
- **`state.minhas`** — só o que **este** navegador reservou. Persistido em
  `localStorage["presentes-matheus-reservas-v1"]`.

Três estados de card: livre (`Eu dou esse`) · sua (`Sua escolha` + `Desmarcar`) · de terceiro
(`Escolhido` + `Já é de alguém`, sem ação).

O backend é o `reservas.gs` — Apps Script publicado como Web App, gravando numa planilha
(`item_id | nome | timestamp`), com `LockService` serializando os POSTs. Instruções de publicação
no cabeçalho do próprio arquivo. Depois de publicar, cole a URL `/exec` em `RESERVAS_URL`.

Detalhes que não são óbvios e quebram se mexidos sem cuidado:

- O POST vai com `Content-Type: text/plain` **de propósito**: mantém a requisição "simples" e evita
  o preflight `OPTIONS`, que o Apps Script não sabe responder. O corpo continua sendo JSON.
- O Web App **tem** que ser publicado como "Qualquer pessoa". Quem visita a lista não tem conta
  Google no contexto da página; qualquer outra opção devolve 401.
- A reserva é **otimista com rollback**: a tela marca na hora e desfaz se o POST falhar, senão a
  pessoa sai achando que reservou.
- **Antes de desfazer, o cliente relê o servidor.** Se a mudança já está lá, foi a nossa escrita que
  chegou e só a resposta se perdeu — desfazer nesse caso travava o item: reservado na planilha,
  exibido como "de alguém" pra todo mundo, sem dono que pudesse liberar. Não remova essa releitura.
- Corrida (dois reservando o mesmo item): o servidor responde `{ok:false, erro:'ocupado'}` e a
  página desmarca só a sua, avisando quem chegou depois. O aviso assume que a mensagem do WhatsApp
  já saiu, porque o link abre antes do POST resolver.
- Sincroniza no load, ao voltar o foco pra aba, e a cada 45s com a aba visível.
- **Arranque frio do Apps Script mede 20–30s** (medido: 30,5s · 22,5s · 2,4s em chamadas seguidas).
  Enquanto `state.sync === 'carregando'`, a página mostra "Conferindo o que já foi escolhido…" —
  sem isso o visitante vê a lista toda como livre e escolhe algo já reservado. O clique não sofre:
  a marcação é otimista e o POST resolve em segundo plano. A checagem de `ocupado` no servidor é a
  garantia real de consistência, não o estado da tela.
- Ids que não existem mais em `ITENS` são descartados na leitura, senão a contagem mente.
- Sem `RESERVAS_URL`, nada disso roda e a página funciona como antes, local.

O Web App é anônimo: quem descobrir a URL pode reservar e desmarcar. Para uma lista de presentes
isso é aceitável — o pior caso é alguém zerar as reservas, e a planilha guarda o histórico.

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
