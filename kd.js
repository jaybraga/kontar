/* Kontar · camada de dados.
   Lê o Supabase uma vez, monta um modelo e entrega ao protótipo 08 os mesmos
   formatos que ele usava como dados de exemplo (ROWS, LIM, FATS, FUT…).
   Nada aqui desenha UI: só números e textos que o protótipo já mostrava. */
(function () {
  'use strict';
  const KD = (window.KD = {});
  const MES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const MESL = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const WDS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const pad = n => String(n).padStart(2, '0');
  const int = n => Math.round(n).toLocaleString('pt-BR');
  const brl0 = n => 'R$ ' + int(n);
  const brl2 = n => 'R$ ' + Math.abs(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const signed = n => (n < 0 ? '– ' : '+ ') + brl2(n);
  const pd = s => { const p = String(s).slice(0, 10).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); };
  const iso = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const mIdx = d => d.getFullYear() * 12 + d.getMonth();
  const mShort = i => MES[i % 12] + '/' + String(Math.floor(i / 12)).slice(2);
  const mStart = i => new Date(Math.floor(i / 12), i % 12, 1);
  const mEnd = i => new Date(Math.floor(i / 12), i % 12 + 1, 0);
  const daysIn = i => mEnd(i).getDate();
  const ddmm = d => pad(d.getDate()) + '/' + pad(d.getMonth() + 1);
  const dmes = d => pad(d.getDate()) + '/' + MES[d.getMonth()];
  const DAY = 864e5;
  const daysBetween = (a, b) => Math.round((b - a) / DAY);
  Object.assign(KD, { MES, MESL, int, brl0, brl2, signed, pd, iso, mIdx, mShort, mStart, mEnd, ddmm });

  KD.today = (() => {
    const q = new URLSearchParams(location.search).get('hoje');
    if (q && /^\d{4}-\d{2}-\d{2}$/.test(q)) return pd(q);
    const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  })();

  /* ATENÇÃO: as cores dos bancos cadastrados vêm do Figma (src/bancos-dados.js → src/bancos.js) e sobrescrevem esta tabela; ela só serve de reserva.
     Cores e tinta dos bancos (handoff §7.4). O banco manda; o que estiver
     gravado na conta/cartão só vale para banco desconhecido. */
  const BANK = {
    'C6': ['#FFBD4C', '#141414'], 'Itaú': ['#EB7001', '#000000'], 'Itaú Azul': ['#EB7001', '#000000'],
    'Nubank': ['#9B03D7', '#FFFFFF'], 'Nubank PJ': ['#FFFFFF', '#000000'], 'Nubank Pessoal': ['#9B03D7', '#FFFFFF'],
    'Mercado Pago': ['#FFE600', '#000000'], 'CDB Mercado Pago': ['#FFE600', '#000000'], 'Amazon': ['#2CBFF8', '#000000'], 'Outro': ['#F2F0EB', '#000000'],
    /* bancos cadastrados em 24/11/2026 (pesquisa de branding: PLANNED_FEATURES.md §12). [cor do cartão, cor do texto] */
    'Bradesco': ['#CC092F', '#FFFFFF'],          // oficial (guia de comunicação visual do Bradesco)
    'Banco do Brasil': ['#F9DD16', '#0038A8'],   // oficial (manual da marca do BB): texto no azul institucional
    'Santander': ['#EC0000', '#FFFFFF'],         // oficial (guia de marca global e site)
    'Next': ['#00FF5F', '#000000'],              // theme-color do site oficial (verde "Electric")
    'XP': ['#FBC105', '#000000'],                // amostrado do site oficial (xpi.com.br)
    'Neon': ['#0030CE', '#FFFFFF'],              // amostrado do site oficial (azul; atenção: neon.com é outra empresa)
    'BV': ['#002BAB', '#FFFFFF'],                // site oficial bv.com.br: azul dos botões e blocos (revisado em 24/11; #0B5FFF estava errado)
    'PagBank': ['#62BD4E', '#000000'],           // verde da arte da marca que o Jay mandou (24/11, medido em pixels). #1BB99A é o verde-água dos botões do site; o amarelo #F5DE3E é de campanha. Texto preto (8,9:1); a marca usa branco (2,3:1)
    'PicPay': ['#21C25E', '#000000'],            // CONFIRMADO: theme-color do site oficial; os botões do site usam texto preto
    'Inter': ['#FF7A00', '#FFFFFF']              // CONFIRMADO: cor dominante do site oficial inter.co, botões com texto branco (2,6:1)
  };
  const INST = { 'c6 bank': 'C6', 'c6': 'C6', 'itaú': 'Itaú', 'itau': 'Itaú', 'nubank': 'Nubank', 'mercado pago': 'Mercado Pago', 'amazon': 'Amazon',
    'caixa': 'Caixa', 'caixa econômica': 'Caixa', 'caixa economica': 'Caixa', 'caixa econômica federal': 'Caixa', 'caixa economica federal': 'Caixa', 'cef': 'Caixa', 'bradesco': 'Bradesco', 'banco do brasil': 'Banco do Brasil', 'bb': 'Banco do Brasil', 'santander': 'Santander', 'next': 'Next', 'xp': 'XP', 'xp investimentos': 'XP', 'neon': 'Neon', 'bv': 'BV', 'banco bv': 'BV', 'banco votorantim': 'BV', 'pagbank': 'PagBank', 'pagseguro': 'PagBank', 'picpay': 'PicPay', 'inter': 'Inter', 'banco inter': 'Inter' };
  const bankOf = (nome, inst) => BANK[nome] ? nome : INST[String(inst || '').toLowerCase()] || null;
  const colorOf = (nome, inst, fb) => { const b = bankOf(nome, inst); return b ? BANK[b] : [fb || '#F2F0EB', inkOn(fb || '#F2F0EB')]; };
  function inkOn(hex) { const h = String(hex).replace('#', ''), n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16), L = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255; return L > 0.55 ? '#000000' : '#FFFFFF'; }
  const CODE = n => ({ 'C6': 'C6', 'Itaú Azul': 'IT', 'Itaú': 'IT', 'Nubank': 'NU', 'Mercado Pago': 'MP', 'Amazon': 'AM' })[n] || String(n).replace(/[^A-Za-zÀ-ú0-9]/g, '').slice(0, 2).toUpperCase();
  KD.BANK = BANK; KD.colorOf = colorOf; KD.CODE = CODE; KD.bankOf = bankOf;
  /* ---------- tema do cartão por cor de fundo (regra única, reutilizável por qualquer banco) ----------
     1) MARCA_INK: se a marca define a cor do texto, ela vence (Itaú = branco).
     2) senão vale a tinta gravada no cartão (banco desconhecido) ou a da tabela BANK;
     3) sem nenhuma, é automático: texto branco enquanto passa de 3:1 contra o fundo, senão preto.
     O resto do cartão acompanha o texto: chip e botão sólidos no mesmo par: fundo escuro (texto branco) → claro com texto preto; fundo claro (texto preto) → preto com texto branco. Para um banco novo basta cadastrar cor em BANK e, se a marca exigir, MARCA_INK. */
  const MARCA_INK = { 'Itaú': '#FFFFFF', 'Itaú Azul': '#FFFFFF' };
  const lumHex = h => { h = String(h || '#000000').replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }; return .2126 * f(parseInt(h.slice(0, 2), 16)) + .7152 * f(parseInt(h.slice(2, 4), 16)) + .0722 * f(parseInt(h.slice(4, 6), 16)); };
  const ratioHex = (a, b) => { const x = lumHex(a), y = lumHex(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  KD.contraste = ratioHex;
  KD.tema = (bg, bank, tintaGravada) => {
    const br = bank && KD.BRAND && KD.BRAND[bank];   // marca do Figma (src/bancos.js): cor do texto e do chip definidas por banco
    const marca = (br && br.ink) || (bank && MARCA_INK[bank]), auto = ratioHex(bg, '#FFFFFF') >= 3 ? '#FFFFFF' : '#000000';
    const ink = marca || tintaGravada || auto, escuro = lumHex(ink) > .5;   // texto claro = cartão "escuro"
    const cb = br ? br.chip : (escuro ? '#F2F0EB' : '#0A0A0A'), ci = br ? br.chipInk : (escuro ? '#0A0A0A' : '#FFFFFF');
    return { ink, escuro, ratio: ratioHex(bg, ink),
      chipBg: cb, chipInk: ci, chipBd: null,   // chip sólido: claro em fundo escuro, preto em fundo claro (a bolinha de status âmbar aparece nos dois)
      btnBg: cb, btnInk: ci };
  };


  /* Categorias padrão do protótipo (§7.3): cor e ordem. O banco guarda o que o usuário mudou. */
  const CAT_DEF = { 'Trabalho': '#6A4BFF', 'Mercado': '#FF5A1F', 'Casa': '#00E08A', 'Transporte': '#FFB800', 'Assinaturas': '#FF3D8B', 'Lazer': '#6AFF2A', 'Transferência': '#78788A', 'Família': '#FF2424', 'Alimentação': '#FF4B3E', 'Saúde': '#4DA3FF', 'Outros': '#D3B073' };
  const ICON_KEYS = ['Alimentação', 'Mercado', 'Casa', 'Transporte', 'Assinaturas', 'Lazer', 'Saúde', 'Trabalho', 'Família', 'Outros'];
  KD.CAT_DEF = CAT_DEF;

  const METH = { cartao: 'Créd', pix: 'Pix', boleto: 'Boleto', debito: 'Déb', transferencia: 'Transf', dinheiro: 'Dinheiro' };

  async function all(sb, table, sel) {
    const out = []; let from = 0;
    for (;;) {
      const r = await sb.from(table).select(sel || '*').range(from, from + 999);
      if (r.error) throw new Error(table + ': ' + r.error.message);
      out.push(...r.data); if (r.data.length < 1000) return out; from += 1000;
    }
  }

  KD.load = async function (sb, user) {
    KD.sb = sb; KD.user = user;
    const [lanc, tx, inst, cards, cyc, accs, cats, ma, goals, prefs, prof, parts, items, notas] = await Promise.all([
      all(sb, 'v_lancamento'), all(sb, 'transactions', 'id,card_id,account_id,category_id,categoria_origem,fora_do_comum,chave,created_at,transfer_id'),
      all(sb, 'installments', 'transaction_id,numero,valor,data_caixa'), all(sb, 'cards'), all(sb, 'card_cycles'), all(sb, 'accounts'),
      all(sb, 'categories'), all(sb, 'merchant_aliases'), all(sb, 'goals'), all(sb, 'user_prefs'), all(sb, 'profiles'),
      all(sb, 'transaction_parts').catch(() => []), all(sb, 'transaction_items').catch(() => []), all(sb, 'transaction_notas').catch(() => [])
    ]);
    KD.raw = { lanc, tx, inst, cards, cyc, accs, cats, ma, goals, prefs, prof, parts, items, notas };
    build();
  };

  function build() {
    const R = KD.raw, T = KD.today, M = (KD.M = {});
    M.CUR = mIdx(T);
    const txById = Object.fromEntries(R.tx.map(t => [t.id, t]));

    /* categorias */
    M.catById = {}; M.catByName = {};
    R.cats.slice().sort((a, b) => a.ordem - b.ordem).forEach(c => { M.catById[c.id] = c; M.catByName[c.nome] = c; });
    M.custom = R.cats.filter(c => !(c.nome in CAT_DEF)).sort((a, b) => a.ordem - b.ordem).map(c => c.nome);

    /* cartões e ciclos */
    const cycOf = (cardId, d) => R.cyc.filter(c => c.card_id === cardId && pd(c.vigencia_inicio) <= d && (!c.vigencia_fim || pd(c.vigencia_fim) > d)).sort((a, b) => pd(b.vigencia_inicio) - pd(a.vigencia_inicio))[0]
      || R.cyc.filter(c => c.card_id === cardId).sort((a, b) => pd(b.vigencia_inicio) - pd(a.vigencia_inicio))[0];
    M.cycOf = cycOf;
    const ARQ = new Set(R.accs.filter(a => a.ativo === false).map(a => a.id));   // contas arquivadas: somem da tela (e os cartões delas), o histórico fica
    const ALF = (x, y) => String(x).localeCompare(String(y), 'pt-BR', { sensitivity: 'base' });   // listas de contas e cartões: sempre em ordem alfabética (só o que a pessoa cadastrou)
    M.cards = R.cards.filter(c => !c.removido_em && !ARQ.has(c.conta_pagamento_id)).sort((a, b) => ALF(a.apelido || a.nome, b.apelido || b.nome) || a.ordem - b.ordem).map(c => {
      const col = colorOf(c.nome, c.instituicao, c.brand_hex), cy = cycOf(c.id, T), lim = Number(c.limite) || 0;
      const used = lim && c.disponivel_informado != null ? Math.max(0, lim - Number(c.disponivel_informado)) : 0;
      return { id: c.id, acc: c.conta_pagamento_id || null, n: c.nome, informed: lim && c.disponivel_informado != null, nick: c.apelido || '', fin: c.final4 || '····', lim, used, cor: col[0], ink: KD.tema(col[0], bankOf(c.nome, c.instituicao), c.tinta || col[1]).ink, bank: bankOf(c.nome, c.instituicao), cy,
        fe: cy ? cy.dia_fechamento : null, ve: cy ? cy.dia_vencimento : null, orig: cy ? ({ fatura: 'fatura real', chute: 'chute', manual: 'cadastro manual' })[cy.origem] || 'chute' : 'chute',
        since: cy && cy.vigencia_inicio > '2025-01-01' ? cy.vigencia_inicio : null };
    });
    M.cardById = Object.fromEntries(M.cards.map(c => [c.id, c]));
    const cardByIdAll = Object.fromEntries(R.cards.map(c => [c.id, c]));

    /* contas */
    M.accs = R.accs.filter(a => a.ativo !== false).sort((a, b) => ALF(a.nome, b.nome) || a.ordem - b.ordem).map(a => ({ id: a.id, inst: a.instituicao || '', fin: a.final4 || '', ordem: a.ordem, nome: a.nome, saldo: Number(a.saldo) || 0, em: a.saldo_em ? pd(a.saldo_em) : T, tipo: a.tipo, funcao: a.funcao, cor: colorOf(a.nome, a.instituicao, a.cor)[0], bank: bankOf(a.nome, a.instituicao) }));

    M.arq = { accs: R.accs.filter(a => a.ativo === false).map(a => ({ id: a.id, nome: a.nome, inst: a.instituicao || '', cor: colorOf(a.nome, a.instituicao, a.cor)[0], n: R.cards.filter(c => c.conta_pagamento_id === a.id && !c.removido_em).length })),
      cards: R.cards.filter(c => c.removido_em && !ARQ.has(c.conta_pagamento_id)).map(c => ({ id: c.id, nome: c.nome, inst: c.instituicao || '', cor: colorOf(c.nome, c.instituicao, c.brand_hex)[0], fin: c.final4 || '' })) };
    { const ao = Object.fromEntries(M.accs.map((a, i) => [a.id, i])); M.accById = Object.fromEntries(M.accs.map(a => [a.id, a])); /* os cartões ficam em ordem alfabética (a página Contas agrupa por conta sozinha, em contas.js) */ }

    /* estabelecimentos (por chave) */
    M.maByChave = Object.fromEntries(R.ma.map(m => [m.chave, m]));

    /* lançamentos */
    const grp = (a, k) => a.reduce((o, x) => ((o[x[k]] = o[x[k]] || []).push(x), o), {});
    const partsBy = grp(R.parts || [], 'transaction_id'), itemsBy = grp(R.items || [], 'transaction_id'), notaBy = Object.fromEntries((R.notas || []).map(n => [n.transaction_id, n]));
    M.rows = R.lanc.map(l => {
      const t = txById[l.id] || {}, dt = pd(l.data_compra), amt = (l.direcao === 'entrada' ? 1 : -1) * Number(l.valor_total);
      const card = l.cartao || null, k = l.cartao || l.conta || '—';
      return { id: l.id, dt, d: ddmm(dt), y: dt.getFullYear(), mi: mIdx(dt), t: METH[l.meio] || 'Pix', meio: l.meio, e: l.nome || l.apelido_global || l.nome_fatura || '—', chave: l.chave,
        sub: !!l.assinatura, atyp: !!t.fora_do_comum, c: (t.category_id && M.catById[t.category_id] ? M.catById[t.category_id].nome : l.categoria) || 'Outros', catId: t.category_id || null, k, card, cardId: t.card_id || null, accId: t.account_id || null,
        v: signed(amt), amt, out: amt < 0 ? -amt : 0, inn: amt > 0 ? amt : 0, pend: l.status === 'pendente_revisao', trab: !!l.trabalho, x: Number(l.parcelas_total) || 1,
        obs: l.observacao || '', dom: l.dominio || null, logo: l.logo_url || null, created: t.created_at || '', iso: String(l.data_compra).slice(0, 10), xfer: t.transfer_id || null, total: Number(l.valor_total), origem: l.origem || '',
        parts: (partsBy[l.id] || []).sort((a, b) => a.ordem - b.ordem).map(p => ({ id: p.id, catId: p.category_id, valor: Number(p.valor), auto: !!p.automatica, rotulo: p.rotulo || '' })),
        items: (itemsBy[l.id] || []).sort((a, b) => a.ordem - b.ordem).map(i => ({ id: i.id, nome: i.nome, qtd: Number(i.quantidade) || 1, un: i.unidade || '', valor: Number(i.valor), catId: i.category_id, partId: i.part_id })),
        nota: notaBy[l.id] || null };
    }).sort((a, b) => b.dt - a.dt || (b.created < a.created ? -1 : b.created > a.created ? 1 : 0));
    M.rowById = Object.fromEntries(M.rows.map(r => [r.id, r]));
    // regra única (igual às visões do banco): meio transferência, vínculo de transferência ou categoria Transferência
    const isTransf = (KD.isTransf = r => r.c === 'Transferência' || r.meio === 'transferencia' || !!r.xfer);

    /* "Fora do comum": bem acima do habitual da categoria (§4.11, proposta).
       Mais de 3× a mediana dos 6 meses anteriores da mesma categoria, mínimo R$ 100,
       com pelo menos 3 compras de referência; ou marcado no banco. */
    (() => {
      const outs = M.rows.filter(r => r.out && !isTransf(r)), months = [...new Set(outs.map(r => r.mi))];
      const catMonth = {}; outs.forEach(r => { const k = r.c + '|' + r.mi; catMonth[k] = (catMonth[k] || 0) + r.out; });
      outs.forEach(r => {
        if (r.atyp || r.out < 100) return;
        const prev = months.filter(m => m < r.mi && m >= r.mi - 6); if (prev.length < 3) return;
        if (prev.filter(m => catMonth[r.c + '|' + m]).length < 2) return;
        if (new Set(outs.filter(o => o.e === r.e && o.mi < r.mi && o.mi >= r.mi - 6).map(o => o.mi)).size >= 2) return;
        const avg = prev.reduce((a, m) => a + (catMonth[r.c + '|' + m] || 0), 0) / prev.length;
        if (r.out > 2 * avg) r.atyp = true;
      });
    })();

    /* parcelas: caixa de cartão acontece no vencimento de cada parcela */
    M.inst = R.inst.map(i => { const r = M.rowById[i.transaction_id]; return r ? { r, n: i.numero, v: Number(i.valor), dt: pd(i.data_caixa), mi: mIdx(pd(i.data_caixa)) } : null; }).filter(Boolean);
    const hasInst = new Set(M.inst.map(i => i.r.id));
    /* eventos de caixa: saída do dinheiro de verdade */
    M.cash = [];
    M.rows.forEach(r => { if (isTransf(r) || hasInst.has(r.id)) return; if (r.out || r.inn) M.cash.push({ r, dt: r.dt, mi: r.mi, out: r.out, inn: r.inn, card: r.out && r.card ? r.card : null }); });
    M.inst.forEach(i => { if (isTransf(i.r)) return; const o = i.r.out ? i.v : 0; M.cash.push({ r: i.r, dt: i.dt, mi: i.mi, out: o, inn: i.r.inn ? i.v : 0, card: o && i.r.card ? i.r.card : null }); });
    /* F1: sem "disponível informado", o limite usado = fatura aberta (compras à vista do ciclo atual) + parcelas que ainda vão vencer */
    M.cards.forEach(c => { if (!c.lim || c.informed) return; const T0 = new Date(T.getFullYear(), T.getMonth(), T.getDate()), fe = Number(c.fe) || 1,
        close = new Date(T0.getFullYear(), T0.getMonth() - (T0.getDate() >= fe ? 0 : 1), fe); let u = 0;
      M.rows.forEach(r => { if (r.card === c.n && r.out && !isTransf(r) && !hasInst.has(r.id) && r.dt > close && r.dt <= T0) u += r.out; });
      M.inst.forEach(i => { if (i.r.card === c.n && i.r.out && !isTransf(i.r) && i.dt > T0) u += i.v; });
      c.used = Math.min(c.lim, Math.round(u * 100) / 100); });

    /* limites mínimos do período */
    const firstData = M.rows.length ? M.rows[M.rows.length - 1].mi : M.CUR;
    M.MIN = Math.min(M.CUR, firstData);

    /* estabelecimentos: agrupados pelo nome exibido (é como o protótipo os identifica) */
    const est = {};
    M.rows.forEach(r => { if (isTransf(r) || !r.out) return; const e = (est[r.e] = est[r.e] || { nome: r.e, n: 0, cats: {}, chaves: new Set(), dom: r.dom, logo: r.logo }); e.n++; e.cats[r.c] = (e.cats[r.c] || 0) + 1; e.chaves.add(r.chave); if (!e.dom) e.dom = r.dom; if (!e.logo) e.logo = r.logo; });
    M.est = Object.values(est).map(e => {
      const mas = [...e.chaves].map(k => M.maByChave[k]).filter(Boolean), def = mas.find(m => m.category_id), byN = Object.entries(e.cats).sort((a, b) => b[1] - a[1]);
      const cat = def && M.catById[def.category_id] ? M.catById[def.category_id].nome : byN[0][0];
      return { nome: e.nome, n: e.n, cat, mix: byN.length > 1 ? byN.slice(0, 2).map(x => x[0]).join(' / ') : '', alterna: mas.some(m => m.sempre_perguntar), chaves: [...e.chaves], orig: [...new Set(mas.map(m => (m.amostra || '').trim()).filter(Boolean))], dom: e.dom, logo: e.logo, assin: mas.some(m => m.assinatura) };
    }).sort((a, b) => b.n - a.n || a.nome.localeCompare(b.nome, 'pt-BR'));
    M.estByName = Object.fromEntries(M.est.map(e => [e.nome, e]));
    M.DOM = {}; M.LOGO = {}; M.est.forEach(e => { if (e.dom) M.DOM[e.nome] = e.dom; if (e.logo) M.LOGO[e.nome] = e.logo; });

    /* assinaturas ativas */
    M.assinAtivas = R.ma.filter(m => m.assinatura && m.assinatura_ativa !== false).length;

    /* metas */
    M.goals = R.goals.filter(g => !g.arquivada_em).sort((a, b) => a.ordem - b.ordem || (a.created_at < b.created_at ? -1 : 1));
    M.prefs = (R.prefs[0] && R.prefs[0].prefs) || {};
    M.profile = R.prof[0] || null;
    KD._mc = {};
  }
  KD.rebuild = () => build();

  /* saldo de cada conta no fim do dia `d`, reconstruído a partir do saldo informado */
  function balAt(a, d) {
    let b = a.saldo;
    KD.M.rows.forEach(r => { if (r.accId !== a.id || r.card) return; if (r.dt > d && r.dt <= a.em) b -= r.amt; else if (r.dt <= d && r.dt > a.em) b += r.amt; });
    return b;
  }

  /* -------- tudo que depende do mês selecionado -------- */
  KD.month = function (mi) {
    if (KD._mc[mi]) return KD._mc[mi];
    const M = KD.M, T = KD.today, isCur = mi === M.CUR, start = mStart(mi), end = mEnd(mi), ref = isCur ? T : end, nd = daysIn(mi), td = isCur ? T.getDate() : nd;
    const inMi = r => r.mi === mi, isTransf = KD.isTransf;
    const rowsMi = M.rows.filter(inMi);
    const out = { mi, isCur };

    /* caixa (Gastos · Mês) */
    const cashMi = M.cash.filter(c => c.mi === mi && c.dt <= ref);
    const cxOut = cashMi.reduce((a, c) => a + c.out, 0), cxCard = cashMi.filter(c => c.card).reduce((a, c) => a + c.out, 0), cxCash = cxOut - cxCard;
    /* competência (Compet., Sobra, Fluxo, Para onde foi) */
    const compRows = rowsMi.filter(r => r.out && !isTransf(r) && r.dt <= ref), compOut = compRows.reduce((a, r) => a + r.out, 0);
    const compParc = compRows.filter(r => r.x > 1).reduce((a, r) => a + r.out, 0);
    const inRows = rowsMi.filter(r => r.inn && !isTransf(r) && r.dt <= ref), compIn = inRows.reduce((a, r) => a + r.inn, 0);
    out.cx = { out: cxOut, card: cxCard, cash: cxCash }; out.comp = { out: compOut, parc: compParc, in: compIn };

    /* ciclo: desde o último fechamento de cada cartão */
    const cyc = (() => {
      let card = 0, next = null;
      M.cards.forEach(c => {
        if (!c.fe || !c.lim) return; const y = ref.getFullYear(), m = ref.getMonth();
        let last = new Date(y, m, Math.min(c.fe, daysIn(mIdx(ref)))); if (last > ref) last = new Date(y, m - 1, Math.min(c.fe, new Date(y, m, 0).getDate()));
        let nx = new Date(y, m, Math.min(c.fe, daysIn(mIdx(ref)))); if (nx <= ref) nx = new Date(y, m + 1, Math.min(c.fe, new Date(y, m + 2, 0).getDate()));
        M.rows.forEach(r => { if (r.cardId === c.id && r.out && !isTransf(r) && r.dt > last && r.dt <= ref) card += r.out; });
        const dd = daysBetween(ref, nx); if (!next || dd < next.d) next = { n: c.nick || c.n, d: dd };
      });
      return { card, cash: cxCash, next };
    })();
    const fmtD = d => d === 0 ? 'hoje' : d === 1 ? 'amanhã' : 'em ' + d + ' dias';
    out.G = {
      mes: { v: int(cxOut), hint: 'Tudo que saiu da conta em ' + MESL[mi % 12].toLowerCase(), a: brl0(cxCard), b: brl0(cxCash), c: isCur ? td + ' de ' + nd + ' dias' : 'mês fechado' },
      ciclo: { v: int(cyc.card + cyc.cash), hint: 'Desde o último fechamento de cada cartão', a: brl0(cyc.card), b: brl0(cyc.cash), c: cyc.next ? cyc.next.n + ' fecha ' + fmtD(cyc.next.d) : '—' },
      comp: { v: int(compOut), hint: 'Compras que você decidiu fazer em ' + MESL[mi % 12].toLowerCase() + ', pelo valor cheio', a: brl0(compParc) + ' parcelado', b: brl0(compOut - compParc) + ' à vista', c: 'valor cheio' }
    };
    /* escopo pessoal / trabalho (recalcula tudo com o filtro) */
    const scoped = w => {
      const cm = cashMi.filter(c => c.r.trab === w), co = cm.reduce((a, c) => a + c.out, 0), cc = cm.filter(c => c.card).reduce((a, c) => a + c.out, 0);
      const cr = compRows.filter(r => r.trab === w), crO = cr.reduce((a, r) => a + r.out, 0), crP = cr.filter(r => r.x > 1).reduce((a, r) => a + r.out, 0);
      return { mes: { v: int(co), a: brl0(cc), b: brl0(co - cc) }, ciclo: { v: int(co), a: brl0(cc), b: brl0(co - cc) }, comp: { v: int(crO), a: brl0(crP) + ' parcelado', b: brl0(crO - crP) + ' à vista' }, tot: crO };
    };
    out.GS = { pessoal: scoped(false), trabalho: scoped(true) };

    /* gráfico do Gastos: uma coluna por dia (caixa) */
    const daySum = Array(nd).fill(0); cashMi.forEach(c => { daySum[c.dt.getDate() - 1] += c.out; });
    const mx = Math.max(1, ...daySum);
    out.bars = daySum.map((v, i) => { const fut = isCur && i + 1 > td; return { tip: (i + 1) + ' ' + MES[mi % 12] + '|' + (fut ? 'ainda não chegou' : v ? brl0(v) : 'sem gastos'), h: !fut && v ? Math.max(2, Math.round(v / mx * 100)) + '%' : '4px', bg: !fut && v ? '#fff' : 'rgba(255,255,255,.3)' }; });
    out.gL = ['1 ' + MES[mi % 12], isCur ? 'hoje · ' + td + ' ' + MES[mi % 12] : '15 ' + MES[mi % 12], nd + ' ' + MES[mi % 12]];

    /* calendário/histograma do Período */
    const cnt = Array(nd).fill(0), sum = Array(nd).fill(0);
    rowsMi.forEach(r => { const d = r.dt.getDate() - 1; cnt[d]++; if (r.out) sum[d] += r.out; });
    out.rg = { n: nd, today: td, cnt, sum, wd0: (start.getDay() + 6) % 7 };

    /* contas e saldo */
    out.CONTAS = M.accs.map(a => { const v = balAt(a, ref), v0 = balAt(a, new Date(start - DAY)); return { nome: a.nome, v: Math.round(v * 100) / 100, d: Math.round(v - v0), cor: a.cor, tipo: a.tipo, funcao: a.funcao }; });
    const corr = out.CONTAS.filter(c => c.tipo !== 'investimento'), res = out.CONTAS.filter(c => c.tipo === 'investimento');
    out.SVAL = { sobra: Math.round(compIn - compOut), saldo: Math.round(corr.reduce((a, c) => a + c.v, 0)) };
    const resAcc = M.accs.find(a => a.tipo === 'investimento');
    out.reserva = { v: res.reduce((a, c) => a + c.v, 0), desde: resAcc ? ddmm(resAcc.em) : '' };
    out.sSub = { sobra: 'entrou ' + brl0(compIn) + ' · saiu ' + brl0(compOut), saldo: '+ ' + brl0(out.reserva.v) + ' em reserva' + (out.reserva.desde ? ' · desde ' + out.reserva.desde : '') };
    const ev6 = f => Array.from({ length: 6 }, (_, k) => { const m = mi - 5 + k; return [MES[m % 12], f(m)]; });
    out.SOBEV = ev6(m => { const rr = M.rows.filter(r => r.mi === m && !isTransf(r) && (m !== M.CUR || r.dt <= T)); return Math.round(rr.reduce((a, r) => a + r.inn - r.out, 0)); });
    const accStart = Math.min(...M.rows.filter(r => r.accId && !r.card).map(r => r.mi), M.CUR);
    out.PATEV = ev6(m => m < accStart ? 0 : Math.round(M.accs.reduce((a, acc) => a + balAt(acc, m === M.CUR ? T : mEnd(m)), 0)));

    /* cartões e limite */
    out.LIM = M.cards.map(c => ({ n: c.n, nick: c.nick, fin: c.fin, cor: c.cor, ink: c.ink, lim: c.lim, u: c.used, p: c.lim ? Math.round(c.used / c.lim * 100) : 0, ciclo: 'fecha ' + (c.fe || '—') + ' · vence ' + (c.ve || '—'), orig: c.orig, id: c.id, since: c.since }));
    const W = out.LIM.filter(c => c.lim > 0), lt = W.reduce((a, c) => a + c.lim, 0), lu = W.reduce((a, c) => a + c.u, 0);
    out.lim = { tot: lt, used: lu, disp: lt - lu, pct: lt ? lu / lt * 100 : 0 };

    /* faturas que vencem no mês */
    const fatOf = (c, m) => M.cash.filter(e => e.card === c.n && e.mi === m).reduce((a, e) => a + e.out, 0);
    const nFat = (c, m) => M.cash.filter(e => e.card === c.n && e.mi === m).length;
    out.FATS = M.cards.map(c => {
      const v = fatOf(c, mi); if (!v) return null;
      const due = c.ve ? new Date(Math.floor(mi / 12), mi % 12, Math.min(c.ve, nd)) : null;
      let close = null; if (c.fe && c.ve) { close = new Date(due.getFullYear(), due.getMonth() - (c.fe >= c.ve ? 1 : 0), c.fe); }
      const open = close && close > T, dd = close ? daysBetween(T, close) : 0;
      const sub = (due ? (due < T ? 'venceu ' : 'vence ') + dmes(due) : 'vence em ' + mShort(mi)) + ' · ' + (open ? 'fecha ' + fmtD(dd) : nFat(c, mi) + (nFat(c, mi) === 1 ? ' lançamento' : ' lançamentos'));
      return { n: c.nick || c.n, v: int(v), sub, cor: c.cor, ink: c.ink };
    }).filter(Boolean);

    /* faturas futuras: o que já está comprometido nos 12 meses seguintes */
    out.FUT = Array.from({ length: 12 }, (_, k) => { const m = mi + 1 + k, s = {}; M.cards.forEach(c => { const v = fatOf(c, m); if (v) s[c.nick || c.n] = Math.round(v * 100) / 100; }); return { m: mShort(m), s }; });
    while (out.FUT.length > 6 && !Object.keys(out.FUT[out.FUT.length - 1].s).length) out.FUT.pop();

    /* parcelamentos ativos na data de referência */
    out.PARC = [];
    const byTx = {}; M.inst.forEach(i => { if (i.r.x > 1) (byTx[i.r.id] = byTx[i.r.id] || []).push(i); });
    Object.values(byTx).forEach(list => {
      const r = list[0].r; if (r.dt > ref) return; list.sort((a, b) => a.n - b.n);
      const pagas = list.filter(i => i.dt <= ref).length, f = r.x - pagas; if (f <= 0) return;
      const rest = list.filter(i => i.dt > ref).reduce((a, i) => a + i.v, 0), last = list[list.length - 1];
      out.PARC.push({ c: r.c, n: r.e, k: r.card ? (M.cards.find(c => c.n === r.card) || {}).nick || r.card : r.k, tot: brl0(r.out) + ' em ' + r.x + 'x', x: r.x, f, ate: mShort(last.mi), r: Math.round(rest * 100) / 100 });
    });
    out.PARC.sort((a, b) => b.r - a.r);

    /* para onde foi (competência por categoria) */
    const byCat = {}; compRows.forEach(r => { const g = (byCat[r.c] = byCat[r.c] || { n: r.c, v: 0, c: 0, big: null }); g.v += r.out; g.c++; if (!g.big || r.out > g.big.out) g.big = r; });
    out.ONDE = Object.values(byCat).sort((a, b) => b.v - a.v).map(g => ({ n: g.n, v: Math.round(g.v), c: g.c, top: g.big.e }));
    out.spent = Object.fromEntries(Object.values(byCat).map(g => [g.n, g.v]));

    /* tetos */
    out.TET = Object.values(M.catById).filter(c => Number(c.teto_mensal) > 0).map(c => ({ n: c.nome, v: Math.round(out.spent[c.nome] || 0), t: Number(c.teto_mensal) }));

    /* lançamentos do mês e assinaturas cobradas */
    out.LANC = rowsMi.filter(r => r.dt <= (isCur ? T : end)).map(r => [r.d, r.t, r.e, r.c, r.k, r.v, r.sub ? 1 : 0, r.atyp ? 1 : 0, r.id]);
    out.ASSIN = rowsMi.filter(r => r.sub && r.out).map(r => ({ n: r.e, d: r.d, k: r.k, v: brl2(r.out), c: r.c }));
    out.assinTot = out.ASSIN.reduce((a, x, i) => a + rowsMi.filter(r => r.sub && r.out)[i].out, 0);

    /* escopo */
    out.tp = { pessoal: out.GS.pessoal.tot, trabalho: out.GS.trabalho.tot };

    /* fora do comum do mês (o mais recente) */
    out.atyp = rowsMi.filter(r => r.atyp && r.out).sort((a, b) => b.dt - a.dt)[0] || null;

    KD._mc[mi] = out; return out;
  };

  /* -------- notificações e alertas (derivadas dos dados) -------- */
  KD.notifs = function () {
    const M = KD.M, T = KD.today, cur = KD.month(M.CUR), N = [];
    const when = d => { const dd = daysBetween(d, T); return dd <= 0 ? 'hoje' : dd === 1 ? 'ontem' : dd < 7 ? WDS[d.getDay()] + ', ' + ddmm(d) : ddmm(d) + '/' + String(d.getFullYear()).slice(2); };
    const noLim = M.cards.filter(c => !c.lim), guess = M.cards.filter(c => c.orig === 'chute');
    const names = a => a.length === 1 ? a[0] : a.slice(0, -1).join(', ') + ' e ' + a[a.length - 1];
    if (noLim.length) N.push({ id: 'lim', g: 'pend', kind: 'block', home: 'a1', bg: '#FFC24A', ink: '#140A00', i: 'warn', ic: '#FFC24A', tag: 'Cadastro incompleto', t: '', title: noLim.length + (noLim.length === 1 ? ' cartão sem limite cadastrado' : ' cartões sem limite cadastrado'), body: 'O módulo de limite não fecha sem isso.', act: 'Resolver', card: noLim[0].n });
    if (guess.length) N.push({ id: 'fech', g: 'pend', kind: 'block', home: 'a1', bg: '#FFC24A', ink: '#140A00', i: 'cal', ic: '#FFC24A', tag: 'Cadastro incompleto', t: '', title: 'Fechamento chutado em ' + guess.length + (guess.length === 1 ? ' cartão' : ' cartões'), body: names(guess.map(c => c.nick || c.n)) + '. Sem uso, não afetam os números.', act: 'Resolver', card: guess[0].n });
    const lem = KD.fontes && KD.fontes.lembrete && KD.fontes.lembrete();   // fechamento do mês atrasado: um aviso só, vermelho
    if (lem) { const fm = lem.pend.map(r => r.nome), nc = lem.pend.filter(r => r.card).length, doc = nc === 0 ? 'sem extrato' : nc === lem.pend.length ? 'sem fatura' : 'em falta';
      N.unshift({ id: 'fechar:' + lem.nome, g: 'pend', kind: 'block', bg: '#E5484D', ink: '#FFFFFF', tagBd: 'rgba(255,255,255,.7)', btnBg: '#FFFFFF', btnInk: '#B3261E', dotBg: '#FFFFFF', i: 'cal', ic: '#E5484D', tag: 'Fechamento do mês', t: '', title: 'Hora de fechar ' + lem.nome.charAt(0).toUpperCase() + lem.nome.slice(1), body: fm.length + (fm.length === 1 ? ' fonte ' : ' fontes ') + doc + ': ' + (fm.length > 3 ? fm.slice(0, 3).join(', ') + ' e mais ' + (fm.length - 3) : names(fm)) + '.', act: 'Fechar o mês', fechar: true }); }
    const at = cur.atyp;
    if (at) N.push({ id: 'atyp:' + at.id, g: 'pend', kind: 'block', home: 'a2', bg: 'linear-gradient(100deg,#FF9A3D 0%,#FF5A1F 45%,#F2301F 100%)', ink: '#140600', i: 'bolt', ic: '#FF7A2A', tag: 'Gasto fora do comum', t: when(at.dt), title: at.e, body: brl2(at.out) + ' — bem acima do que você costuma gastar em ' + at.c + ' num mês.', act: 'Ver no extrato', e: at.e });
    const pend = M.rows.filter(r => r.pend);
    if (pend.length) { const p = pend[0]; N.push({ id: 'rev:' + pend.length + ':' + p.id, g: 'hoje', c: '#5B3DF5', i: 'inbox', ic: '#FFFFFF', t: when(p.dt), title: pend.length + (pend.length === 1 ? ' lançamento pra revisar' : ' lançamentos pra revisar'), body: p.e + ' · ' + brl2(p.out || p.inn) + ' no ' + p.k + '.' + (M.estByName[p.e] && M.estByName[p.e].alterna ? ' Esse lugar está marcado como sempre alterna.' : ''), act: 'Revisar' }); }
    /* fatura que fecha nos próximos 5 dias */
    M.cards.forEach(c => { if (!c.fe || !c.ve || !c.lim) return; let close = new Date(T.getFullYear(), T.getMonth(), c.fe); if (close < T) close = new Date(T.getFullYear(), T.getMonth() + 1, c.fe); const dd = daysBetween(T, close); if (dd > 5) return;
      const due = new Date(close.getFullYear(), close.getMonth() + (c.fe >= c.ve ? 1 : 0), c.ve), v = M.cash.filter(e => e.card === c.n && e.mi === mIdx(due)).reduce((a, e) => a + e.out, 0);
      if (!v) return; N.push({ id: 'fat:' + c.id + ':' + iso(close), g: 'hoje', c: c.cor, i: 'card', ic: c.ink, t: '', title: 'Fatura do ' + (c.nick || c.n) + ' fecha ' + (dd === 0 ? 'hoje' : dd === 1 ? 'amanhã' : 'em ' + dd + ' dias'), body: 'Vence ' + dmes(due) + '.', val: brl0(v), valInk: '#FFFFFF' }); });
    /* tetos ≥ 80% no mês atual */
    cur.TET.filter(t => t.v / t.t >= 0.8).forEach(t => { const nd = daysIn(M.CUR) - T.getDate(); N.push({ id: 'teto:' + t.n + ':' + M.CUR, g: 'antes', c: (M.catByName[t.n] || {}).cor || CAT_DEF[t.n] || '#78788A', i: 'gauge', ic: '#000000', t: '', title: t.n + ' passou de ' + (t.v >= t.t ? '100%' : '80%') + ' do teto', body: brl0(t.v) + ' de ' + brl0(t.t) + ' · faltam ' + nd + (nd === 1 ? ' dia' : ' dias') + ' no mês.', w: Math.min(100, Math.round(t.v / t.t * 100)) + '%' }); });
    /* última entrada e última assinatura */
    const inn = M.rows.find(r => r.inn && !KD.isTransf(r) && r.dt <= T);
    if (inn) N.push({ id: 'ent:' + inn.id, g: daysBetween(inn.dt, T) < 1 ? 'hoje' : 'antes', c: '#6AFF2A', i: 'entrada', ic: '#000000', t: when(inn.dt), title: 'Entrou dinheiro', body: inn.e + ' · ' + inn.k, val: '+ ' + brl0(inn.inn), valInk: '#6AFF2A', dt: inn.dt });
    const sub = M.rows.find(r => r.sub && r.out && r.dt <= T);
    if (sub) N.push({ id: 'assin:' + sub.id, g: daysBetween(sub.dt, T) < 1 ? 'hoje' : 'antes', c: '#FF3D8B', i: 'repeat', ic: '#000000', t: when(sub.dt), title: 'Assinatura renovada', body: sub.e + ' · ' + sub.k, val: '– ' + brl2(sub.out), valInk: '#FFFFFF', dt: sub.dt });
    return N;
  };

  /* -------- estado inicial do protótipo a partir do banco -------- */
  KD.initState = function (st) {
    const M = KD.M, P = M.prefs;
    st.mes = M.CUR;
    { const pg = KD.pageFromHash && KD.pageFromHash(); if (pg) st.page = pg; }
    st.pk = Object.assign({}, st.pk, { y: Math.floor(M.CUR / 12) });
    /* cores/ícones: só o que difere do padrão vira "mudança" (mantém o Restaurar) */
    const cor = {}, ico = {};
    Object.values(M.catById).forEach(c => { const def = CAT_DEF[c.nome]; if (!def || (c.cor && c.cor.toUpperCase() !== def.toUpperCase())) cor[c.nome] = (c.cor || '#78788A').toUpperCase(); if (c.icone && ICON_KEYS.includes(c.icone) && c.icone !== c.nome) ico[c.nome] = c.icone; });
    st.cor = cor; st.ico = ico; st.custom = M.custom.slice();
    st.alt = Object.fromEntries(M.est.map(e => [e.nome, e.alterna]));
    st.pwMail = P.pwMail === true; st.sess24 = P.sess24 || false;
    st.nRead = P.nRead || {}; st.alerts = P.alerts !== false; st.atyp = P.atyp !== false;
    if (P.ms) st.ms = P.ms; if (P.fc) st.fc = P.fc;
    const name = (M.profile && M.profile.nome_exibicao) || (KD.user.email || '').split('@')[0];
    const nm = /\s/.test(name) ? name : name.charAt(0).toUpperCase() + name.slice(1);
    st.ac = Object.assign({}, st.ac, { name: nm, n0: nm, email: KD.user.email, e0: KD.user.email, ses: [{ id: 'cur', dev: KD.device(), loc: '', when: 'agora', cur: true }] });
    if (M.profile && M.profile.avatar_url) st.foto = KD.avatarUrl || '';
    return st;
  };
  KD.device = () => { const u = navigator.userAgent, os = /iPhone/.test(u) ? 'iPhone' : /iPad/.test(u) ? 'iPad' : /Mac/.test(u) ? 'Mac' : /Windows/.test(u) ? 'Windows' : /Android/.test(u) ? 'Android' : 'Navegador', br = /Edg\//.test(u) ? 'Edge' : /Chrome\//.test(u) ? 'Chrome' : /Firefox\//.test(u) ? 'Firefox' : /Safari\//.test(u) ? 'Safari' : ''; return os + (br ? ' · ' + br : ''); };

  /* preferências que o protótipo guarda no localStorage: o banco é a fonte, o localStorage é cache */
  KD.LS_KEYS = { 'kontar-anim': 'anim', 'kontar-saldo-vis': 'sv', 'kontar-layout': 'lay', 'kontar-det-ordem': 'dord', 'kontar-navmodo': 'nm', 'kontar-largura': 'wd', 'kontar-extrato-layout': 'exl' };
  KD.primeLocalStorage = function () {
    const P = KD.M.prefs;
    Object.entries(KD.LS_KEYS).forEach(([k, p]) => { try { if (P[p] == null) return; localStorage.setItem(k, typeof P[p] === 'string' ? P[p] : JSON.stringify(P[p])); } catch (e) {} });
    ['kontar-cat-cores', 'kontar-cat-icones', 'kontar-cat-custom', 'kontar-foto'].forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
  };
})();
