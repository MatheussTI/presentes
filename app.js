/* ===================================================================
   CONFIGURAÇÃO RÁPIDA — edite só estas duas linhas quando quiser.
   FONE vazio  → botões de WhatsApp somem.
   CHAVE_PIX vazia → o cartão da chave e o botão de copiar somem.
   =================================================================== */
const FONE      = '5527999888266';
const CHAVE_PIX = '+5527999888266';
const PIX_LABEL = '+55 27 99988-8266';   // como a chave aparece na tela
const PIX_DONO  = 'Matheus S.';

/* ===================================================================
   ITENS — sincronizados com a aba "Casa" do app meu-financeiro.
   preco: número (R$) ou null quando ainda não há preço fechado.
          null cai na faixa "A combinar" — não invente valor aqui.
   comodo: Cozinha · Quarto e sala · Área de serviço · Banheiro · Itens grandes
   link:  vazio → o botão "Ver loja" cai numa busca no Mercado Livre.
   =================================================================== */
const ITENS = [
  /* ---------- Cozinha ---------- */
  {id:'airfryer',     nome:'Air fryer',              comodo:'Cozinha', preco:null,    nota:'Sim, eu virei essa pessoa.',                          busca:'air fryer fritadeira eletrica'},
  {id:'panelas',      nome:'Jogo de panelas',        comodo:'Cozinha', preco:null,    nota:'O item que decide se eu vou cozinhar ou pedir delivery.', busca:'panelas jogo de panelas'},
  {id:'pratos',       nome:'Jogo de pratos',         comodo:'Cozinha', preco:null,    nota:'Pra parar de comer em pote de sorvete.',              busca:'pratos louça jogo de pratos'},
  {id:'talheres',     nome:'Jogo de talheres',       comodo:'Cozinha', preco:null,    nota:'Garfo, faca, colher. O clássico.',                    busca:'talheres faqueiro'},
  {id:'potes',        nome:'Potes herméticos',       comodo:'Cozinha', preco:89.90,   nota:'Pra marmita de segunda a sexta.',                     busca:'potes hermeticos vasilhas'},
  {id:'tabua',        nome:'Tábua de carne',         comodo:'Cozinha', preco:null,    nota:'Pra parar de cortar tudo em cima do prato.',          busca:'tabua de carne corte madeira'},
  {id:'peneira',      nome:'Peneira',                comodo:'Cozinha', preco:null,    nota:'Pequena, baratinha e faz falta toda semana.',         busca:'peneira coador'},
  {id:'jarras',       nome:'Jarras',                 comodo:'Cozinha', preco:null,    nota:'Água gelada com ares de gente organizada.',           busca:'jarra jarras de vidro'},
  {id:'panos',        nome:'Pano de prato',          comodo:'Cozinha', preco:null,    nota:'O presente mais subestimado da lista.',               busca:'pano de prato panos'},
  {id:'lixeiracoz',   nome:'Lixeira (cozinha)',      comodo:'Cozinha', preco:null,    nota:'Sem glamour nenhum. Tenta viver sem.',                busca:'lixeira lixo cozinha'},
  {id:'tapetecoz',    nome:'Tapete (cozinha)',       comodo:'Cozinha', preco:null,    nota:'Pra frente da pia não virar poça.',                   busca:'tapete cozinha'},
  {id:'itenscoz',     nome:'Itens de cozinha',       comodo:'Cozinha', preco:null,    nota:'Aquelas miudezas que só aparecem na hora de cozinhar.', busca:'utensilios itens de cozinha miudezas'},

  /* ---------- Quarto e sala ---------- */
  {id:'cortina',      nome:'Cortina',                comodo:'Quarto e sala', preco:null, nota:'Pra vizinhança parar de acompanhar minha rotina.',  busca:'cortina cortinas varao'},
  {id:'lencois',      nome:'Lençóis e colchas',      comodo:'Quarto e sala', preco:null, nota:'Cama de casal — anota o tamanho aí.',               busca:'lencol lencois colcha edredom cama casal'},
  {id:'fronhas',      nome:'Fronha',                 comodo:'Quarto e sala', preco:null, nota:'Duas já resolvem minha vida.',                      busca:'fronha fronhas'},
  {id:'travesseiros', nome:'Travesseiro',            comodo:'Quarto e sala', preco:null, nota:'De preferência os que não viram panqueca.',         busca:'travesseiro travesseiros'},
  {id:'cabides',      nome:'Cabide',                 comodo:'Quarto e sala', preco:null, nota:'Nunca são suficientes. Nunca.',                     busca:'cabide cabides'},
  {id:'rack',         nome:'Rack',                   comodo:'Quarto e sala', preco:null, nota:'Onde a TV finalmente para de morar no chão.',       busca:'rack painel tv sala', link:'https://shopee.com.br'},
  {id:'sofa',         nome:'Sofá',                   comodo:'Quarto e sala', preco:null, nota:'O lugar onde essa lista toda vai ser comemorada.',  busca:'sofa estar sala', link:'https://www.madeiramadeira.com.br'},

  /* ---------- Área de serviço ---------- */
  {id:'vassoura',     nome:'Vassoura e pá de lixo',  comodo:'Área de serviço', preco:null, nota:'A dupla que abre qualquer faxina.',               busca:'vassoura pa de lixo'},
  {id:'rodo',         nome:'Rodo',                   comodo:'Área de serviço', preco:null, nota:'Companheiro inseparável do pano de chão.',        busca:'rodo'},
  {id:'panochao',     nome:'Pano de chão',           comodo:'Área de serviço', preco:null, nota:'Compra dois. Sempre some um.',                    busca:'pano de chao'},
  {id:'ferro',        nome:'Ferro de passar roupas', comodo:'Área de serviço', preco:null, nota:'Pra eu parecer um adulto funcional no trabalho.', busca:'ferro de passar roupa vapor'},
  {id:'pregadores',   nome:'Pregador de roupas',     comodo:'Área de serviço', preco:null, nota:'Ninguém lembra dele até o varal voar.',           busca:'pregador prendedor de roupa varal'},
  {id:'centrifuga',   nome:'Centrífuga de roupas',   comodo:'Área de serviço', preco:null, nota:'Meu plano B contra semana inteira de chuva.',     busca:'centrifuga de roupas secadora'},

  /* ---------- Banheiro ---------- */
  {id:'toalhas',      nome:'Toalha de banho e rosto', comodo:'Banheiro', preco:null, nota:'Banho e rosto. Cor: surpresa.',                         busca:'toalha toalhas banho rosto'},
  {id:'portasabonete',nome:'Porta-sabonete',          comodo:'Banheiro', preco:null, nota:'Detalhe bobo que organiza a pia inteira.',              busca:'porta sabonete saboneteira'},
  {id:'portaescova',  nome:'Porta-escova e pasta',    comodo:'Banheiro', preco:null, nota:'Pra escova parar de morar na beirada da pia.',          busca:'porta escova pasta de dente'},
  {id:'lixeirabanh',  nome:'Lixeira (banheiro)',      comodo:'Banheiro', preco:null, nota:'A pequena, de tampa. Essencial.',                       busca:'lixeira banheiro tampa'},
  {id:'tapetebanh',   nome:'Tapete de banheiro',      comodo:'Banheiro', preco:null, nota:'Pra não sair patinando do banho.',                      busca:'tapete banheiro antiderrapante'},

  /* ---------- Itens grandes ---------- */
  {id:'geladeira',    nome:'Geladeira',              comodo:'Itens grandes', preco:null,    nota:'O boss final da lista. Sem pressão.',            busca:'geladeira refrigerador frost free', link:'https://www.amazon.com.br'},
  {id:'fogao',        nome:'Fogão',                  comodo:'Itens grandes', preco:748.44,  nota:'Combina lindamente com o jogo de panelas.',      busca:'fogao 4 bocas', link:'https://a.co/d/0478tlLY'},
  {id:'armario',      nome:'Armário de cozinha',     comodo:'Itens grandes', preco:966.80,  nota:'Pra guardar os potes herméticos, óbvio.',        busca:'armario de cozinha aereo', link:'https://www.mercadolivre.com.br/armario-para-cozinha-12-portas-1-gaveta-clarice-gb/p/MLB62724058'},
  {id:'guardaroupas', nome:'Guarda-roupas',          comodo:'Itens grandes', preco:1103.90, nota:'Enquanto isso, minhas roupas moram na mala.',    busca:'guarda roupas guarda-roupa casal', link:'https://www.casasbahia.com.br/guarda-roupa-casal-6-portas-2-gavetas-franca-cinamomo-off-white/p/1565187788'},
  {id:'cama',         nome:'Cama de casal',          comodo:'Itens grandes', preco:2112.60, nota:'Colchão incluso. Minha coluna agradece adiantado.', busca:'cama box colchao casal queen', link:'https://www.magazineluiza.com.br/cama-box-box-colchao-queen-umaflex-bipartida-de-molas-ensacadas-46cm-de-altura-beta/p/229987700/co/cxqq/'},
];

/* Itens que ele já tem — evita presente repetido. */
const JA_TEM = ['Tanquinho', 'TV', 'Jogo de copos', 'Ventilador'];

const ORDEM_COMODOS = ['Cozinha', 'Quarto e sala', 'Área de serviço', 'Banheiro', 'Itens grandes'];

/* A faixa "combinar" existe porque a maioria dos itens ainda não tem preço
   fechado no app de finanças. Assim que os valores entrarem lá, ela esvazia. */
const FAIXAS = [
  {id:'todos',    label:'Todos os valores', min:0,   max:Infinity},
  {id:'ate100',   label:'Até R$ 100',       min:0,   max:100},
  {id:'100a300',  label:'R$ 100 – 300',     min:100, max:300},
  {id:'300a600',  label:'R$ 300 – 600',     min:300, max:600},
  {id:'acima600', label:'Acima de R$ 600',  min:600, max:Infinity},
  {id:'combinar', label:'A combinar',       min:null, max:null},
];

const CHAVE_LS = 'presentes-matheus-reservas-v1';

/* =================================================================== */

const state = { busca:'', faixa:'todos', ordem:'comodo', esconder:false, reservas:[], sugestao:null };

const $ = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s)
  .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

/* Preço redondo sai sem centavos ("R$ 400"); com centavos, sai completo. */
function brl(v){
  const casas = Number.isInteger(v) ? 0 : 2;
  return 'R$ ' + v.toLocaleString('pt-BR', {minimumFractionDigits:casas, maximumFractionDigits:casas});
}

function linkLoja(item){
  if (item.link) return item.link;
  return 'https://lista.mercadolivre.com.br/' + encodeURIComponent(item.nome.replace(/\(.*\)/, '').trim());
}

function reservado(id){ return state.reservas.indexOf(id) >= 0; }

function salvar(lista){
  state.reservas = lista;
  try { localStorage.setItem(CHAVE_LS, JSON.stringify(lista)); } catch(e) {}
}

function reservar(item){
  if (reservado(item.id)) {
    salvar(state.reservas.filter(x => x !== item.id));
    render();
    return;
  }
  salvar(state.reservas.concat([item.id]));
  render();
  if (FONE) {
    const texto = 'Oi Matheus! Vou ficar com "' + item.nome + '" da sua lista de casa nova. Parabéns adiantado!';
    window.open('https://wa.me/' + FONE + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
  }
}

/* ---------- filtro / agrupamento ---------- */

function filtrar(){
  const termo = state.busca.trim().toLowerCase();
  const faixa = FAIXAS.find(f => f.id === state.faixa) || FAIXAS[0];

  return ITENS.filter(i => {
    if (termo && (i.nome + ' ' + i.busca).toLowerCase().indexOf(termo) < 0) return false;
    if (state.esconder && reservado(i.id)) return false;
    if (faixa.id === 'todos') return true;
    if (faixa.id === 'combinar') return i.preco == null;
    if (i.preco == null) return false;              // sem preço só aparece em "todos" e "a combinar"
    return i.preco >= faixa.min && i.preco <= faixa.max;
  });
}

/* Sem preço vai pro fim, tanto no "mais barato" quanto no "mais caro". */
function porPreco(a, b){
  if (a.preco == null && b.preco == null) return 0;
  if (a.preco == null) return 1;
  if (b.preco == null) return -1;
  return state.ordem === 'barato' ? a.preco - b.preco : b.preco - a.preco;
}

function agrupar(filtrados){
  if (state.ordem === 'comodo') {
    return ORDEM_COMODOS
      .map(c => ({ nome:c, itens: filtrados.filter(i => i.comodo === c) }))
      .filter(g => g.itens.length > 0);
  }
  const ord = filtrados.slice().sort(porPreco);
  return ord.length ? [{
    nome: state.ordem === 'barato' ? 'Do mais barato ao mais caro' : 'Do mais caro ao mais barato',
    itens: ord
  }] : [];
}

/* ---------- render ---------- */

function cardHTML(i){
  const marcado = reservado(i.id);
  const preco   = i.preco != null ? brl(i.preco) : 'A combinar';
  // "aprox." só faz sentido ao lado de um número; em "A combinar" a linha fica limpa.
  const nota    = i.preco != null ? 'aprox.' : '';
  const selo    = marcado ? '<span class="selo">Escolhido</span>' : '';
  return `<article class="item${marcado ? ' escolhido' : ''}">
    <div class="item-topo">
      <div class="item-txt">
        <div class="item-nome">${esc(i.nome)}</div>
        <div class="item-nota">${esc(i.nota)}</div>
      </div>
      ${selo}
    </div>
    <div class="item-base">
      <div class="item-preco">
        <span class="preco">${esc(preco)}</span>
        <span class="preco-nota">${esc(nota)}</span>
      </div>
      <div class="item-acoes">
        <button type="button" class="btn-dou" data-reservar="${esc(i.id)}">${marcado ? 'Desmarcar' : 'Eu dou esse'}</button>
        <a class="btn-loja" href="${esc(linkLoja(i))}" target="_blank" rel="noopener">Ver loja</a>
      </div>
    </div>
  </article>`;
}

function grupoHTML(g){
  const n = g.itens.length;
  // Não reservados primeiro, dentro do grupo.
  const ordenados = g.itens.filter(i => !reservado(i.id)).concat(g.itens.filter(i => reservado(i.id)));
  return `<div class="grupo">
    <div class="grupo-head">
      <h3>${esc(g.nome)}</h3>
      <span class="regua"></span>
      <span class="grupo-contagem">${n === 1 ? '1 item' : n + ' itens'}</span>
    </div>
    <div class="grid">${ordenados.map(cardHTML).join('')}</div>
  </div>`;
}

function renderFaixas(){
  $('faixas').innerHTML = FAIXAS.map(f =>
    `<button type="button" class="chip${f.id === state.faixa ? ' is-on' : ''}" data-faixa="${f.id}" aria-pressed="${f.id === state.faixa}">${esc(f.label)}</button>`
  ).join('');
}

function renderSugestao(){
  const item = state.sugestao ? ITENS.find(i => i.id === state.sugestao) : null;
  if (!item) { $('sugestao').innerHTML = ''; return; }
  const preco = item.preco != null ? '~' + brl(item.preco) : 'a combinar';
  $('sugestao').innerHTML = `<div class="sugestao">
    <span class="sugestao-kicker">Sugestão da casa</span>
    <span class="sugestao-nome">${esc(item.nome)}</span>
    <span class="sugestao-preco">${esc(preco)}</span>
  </div>`;
}

function render(){
  const grupos = agrupar(filtrar());
  $('grupos').innerHTML = grupos.length
    ? grupos.map(grupoHTML).join('')
    : `<div class="vazio">
         <div class="vazio-titulo">Nada por aqui</div>
         Tenta afrouxar o filtro — ou manda um PIX e a gente resolve na conversa.
       </div>`;
  $('stat-reservados').textContent = state.reservas.length;
  renderFaixas();
  renderSugestao();
}

function renderEstaticos(){
  const comPreco = ITENS.filter(i => i.preco != null).map(i => i.preco);
  $('stat-total').textContent   = ITENS.length;
  $('stat-menor').textContent   = comPreco.length ? brl(Math.min.apply(null, comPreco)) : '—';
  $('stat-comodos').textContent = new Set(ITENS.map(i => i.comodo)).size;

  const box = $('jatem-box');
  if (JA_TEM.length) {
    $('jatem').innerHTML = JA_TEM.map(n => `<span class="jatem-pill">${esc(n)}</span>`).join('');
  } else {
    box.style.display = 'none';
  }

  let html = '';
  if (CHAVE_PIX) {
    html += `<div class="pix-card">
      <span class="pix-rotulo">Chave PIX (celular)</span>
      <span class="pix-chave">${esc(PIX_LABEL || CHAVE_PIX)}</span>
      <span class="pix-dono">${esc(PIX_DONO)}</span>
    </div>
    <button type="button" class="btn-copiar" id="copiar">Copiar chave PIX</button>`;
  }
  if (FONE) {
    const texto = 'Oi Matheus! Vi tua lista de casa nova';
    html += `<a class="btn-whats" href="https://wa.me/${esc(FONE)}?text=${encodeURIComponent(texto)}" target="_blank" rel="noopener">Falar comigo no WhatsApp</a>`;
  }
  if (!CHAVE_PIX && !FONE) {
    html = `<div class="pix-card"><span class="pix-chave">Me chama no particular que a gente combina 😉</span></div>`;
  }
  $('pix-linha').innerHTML = html;

  const btn = $('copiar');
  if (btn) btn.addEventListener('click', () => {
    const volta = () => { btn.textContent = 'Copiar chave PIX'; };
    navigator.clipboard.writeText(CHAVE_PIX)
      .then(() => { btn.textContent = 'Copiado!'; setTimeout(volta, 2000); })
      .catch(() => { btn.textContent = 'Copia manualmente: ' + CHAVE_PIX; setTimeout(volta, 4000); });
  });
}

/* ---------- eventos ---------- */

$('busca').addEventListener('input', e => { state.busca = e.target.value; render(); });
$('ordem').addEventListener('change', e => { state.ordem = e.target.value; render(); });

$('esconder').addEventListener('click', e => {
  state.esconder = !state.esconder;
  e.currentTarget.setAttribute('aria-pressed', String(state.esconder));
  render();
});

$('faixas').addEventListener('click', e => {
  const b = e.target.closest('[data-faixa]');
  if (!b) return;
  state.faixa = b.dataset.faixa;
  render();
});

$('grupos').addEventListener('click', e => {
  const b = e.target.closest('[data-reservar]');
  if (!b) return;
  const item = ITENS.find(i => i.id === b.dataset.reservar);
  if (item) reservar(item);
});

$('surpreenda').addEventListener('click', () => {
  const livres = ITENS.filter(i => !reservado(i.id) && i.id !== state.sugestao);
  const pool = livres.length ? livres : ITENS;
  state.sugestao = pool[Math.floor(Math.random() * pool.length)].id;
  state.busca = '';
  state.faixa = 'todos';
  $('busca').value = '';
  render();
  $('sugestao').scrollIntoView({behavior:'smooth', block:'center'});
});

/* ---------- boot ---------- */

try {
  const raw = localStorage.getItem(CHAVE_LS);
  if (raw) {
    const lista = JSON.parse(raw);
    // Descarta ids que não existem mais na lista, senão a contagem mente.
    if (Array.isArray(lista)) state.reservas = lista.filter(id => ITENS.some(i => i.id === id));
  }
} catch(e) {}

renderEstaticos();
render();
