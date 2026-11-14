/* Kontar · ponte entre os dados (kd.js) e o protótipo 08.
   - install: troca os dados de exemplo do Component pelos dados reais
   - apply:   dados que dependem do mês selecionado
   - vals:    valores que o template usa e que eram fixos no protótipo
   - sync:    grava no banco o que o usuário muda (o protótipo guardava só em memória) */
(function () {
  'use strict';
  const KD = window.KD;
  const { MES, MESL, int, brl0, mShort, mIdx } = KD;
  const last = (a, i) => i === a.length - 1 ? '0' : '1px dashed #2B2B30';

  KD.norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  KD.signedInt = v => (v < 0 ? '−' : '') + int(Math.abs(v));
  KD.daysLeftLbl = () => { const T = KD.today, n = new Date(T.getFullYear(), T.getMonth() + 1, 0).getDate() - T.getDate(); return n === 0 ? 'último dia do mês' : n + (n === 1 ? ' dia até o fim do mês' : ' dias até o fim do mês'); };
  KD.since = () => new Date((KD.user && KD.user.created_at) || Date.now());
  KD.kList = () => [...new Set(KD.M.rows.map(r => r.k))].filter(k => k && k !== '—');
  KD.lastAte = P => { let best = null, bi = -1; P.forEach(p => { const q = p.ate.split('/'), i = (2000 + +q[1]) * 12 + MES.indexOf(q[0]); if (i > bi) { bi = i; best = p.ate; } }); return best || '—'; };
  KD.noFat = mi => ({ n: '—', v: '0', sub: 'nenhuma fatura vence em ' + mShort(mi), cor: '#1C1C20', ink: '#FFFFFF' });
  KD.cardMap = key => { const o = {}; KD.M.cards.forEach(c => { const n = c.nick || c.n; o[n] = key === 'code' ? KD.CODE(c.n) : c[key]; if (n !== c.n) o[c.n] = o[n]; }); return o; };
  KD.accLogo = () => { const o = {}; KD.M.accs.forEach(a => { const b = KD.colorOf(a.nome, '', '') && (KD.BANK[a.nome] ? a.nome : null); o[a.nome] = /Mercado Pago/.test(a.nome) ? 'Mercado Pago' : /Nubank/.test(a.nome) ? 'Nubank' : /Itaú/.test(a.nome) ? 'Itaú' : /C6/.test(a.nome) ? 'C6' : b || a.nome; }); return o; };
  KD.alert = k => (KD._C && KD._C.NOTIFS.find(n => n.home === k && n.kind === 'block' && (k !== 'a1' || n.card))) || {};

  /* ---------------- install ---------------- */
  KD.install = function (C) {
    const M = KD.M; KD._C = C;
    C.CUR = M.CUR; C.MIN = M.MIN;
    C.ROWS = M.rows; C.EST = M.est; C.DOM = M.DOM;
    const CAT = {}; Object.values(M.catById).forEach(c => { if (c.nome in KD.CAT_DEF) CAT[c.nome] = KD.CAT_DEF[c.nome]; }); C.CAT = CAT;
    const KC = {}; M.accs.forEach(a => { KC[a.nome] = a.cor; }); M.cards.forEach(c => { KC[c.n] = c.cor; if (c.nick) KC[c.nick] = c.cor; }); C.KC = KC;
    C.METAS = KD.metas();
    C.NOTIFS = KD.notifs();
    C.EXP.lanc.nav = '';
    const did = C.prototype.componentDidMount, dup = C.prototype.componentDidUpdate;
    C.prototype.componentDidMount = function () { KD.comp = this; KD.snap(this.state); return did && did.apply(this, arguments); };
    C.prototype.componentDidUpdate = function () { try { KD.sync(this); } catch (e) { console.error('[kontar] sync', e); } return dup && dup.apply(this, arguments); };
    KD._applied = null;
  };
  KD.metas = () => KD.M.goals.map(g => {
    const alvo = Number(g.alvo), gd = Number(g.guardado), pz = KD.pd(g.prazo), ink = (c => { const h = c.replace('#', ''), n = parseInt(h, 16), L = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255; return L > 0.55 ? '#0A0A0A' : '#FFFFFF'; })(g.cor);
    return { id: g.id, n: g.nome, p: alvo ? Math.round(gd / alvo * 100) : 0, ate: mShort(mIdx(pz)), g: brl0(gd), of: brl0(alvo), f: brl0(Math.max(0, alvo - gd)), c: g.cor, ink, i: g.icone };
  });

  KD.apply = function (C, mi) {
    if (KD._applied === mi && KD._ver === KD._appliedVer) return;
    const S = KD.month(mi);
    Object.assign(C, { LANC: S.LANC, FATS: S.FATS, FUT: S.FUT, PARC: S.PARC, TET: S.TET, ONDE: S.ONDE, ASSIN: S.ASSIN, SVAL: S.SVAL, SOBEV: S.SOBEV, PATEV: S.PATEV, CONTAS: S.CONTAS, LIM: S.LIM });
    const E = C.EXP, futTot = S.FUT.reduce((a, f) => a + Object.values(f.s).reduce((x, y) => x + y, 0), 0), futM = S.FUT.filter(f => Object.keys(f.s).length);
    E.limite.big = brl0(S.lim.used); E.limite.bigL = 'usados de ' + brl0(S.lim.tot) + ' em limite cadastrado';
    E.futuras.big = brl0(futTot); E.futuras.bigL = futM.length ? 'já comprometidos de ' + futM[0].m + ' a ' + futM[futM.length - 1].m : 'nada comprometido nos próximos meses';
    const half = S.TET.filter(t => t.t && t.v / t.t >= 0.5).length; E.tetos.big = half + ' de ' + S.TET.length; E.tetos.bigL = 'categorias já passaram da metade do teto';
    const ot = S.ONDE.reduce((a, o) => a + o.v, 0), ml = MESL[mi % 12];
    E.onde.d = 'O valor cheio de cada compra, no mês em que você decidiu comprar. ' + ml + ', por competência.'; E.onde.big = brl0(ot); E.onde.bigL = 'em ' + ml.toLowerCase() + ', em ' + S.ONDE.length + (S.ONDE.length === 1 ? ' categoria' : ' categorias');
    const pt = S.PARC.reduce((a, p) => a + p.r, 0); E.parc.big = brl0(pt); E.parc.bigL = 'ainda a pagar em ' + S.PARC.length + (S.PARC.length === 1 ? ' parcelamento' : ' parcelamentos');
    KD._applied = mi; KD._appliedVer = KD._ver;
  };

  /* cartões com as edições da tela (mesma regra do protótipo) */
  function lims(comp) {
    const C = KD._C, st = comp.state, ce = st.ce, cOv = st.cOv || {}, del = st.cDel || [];
    return C.LIM.concat(st.nCards || []).filter(c => del.indexOf(c.n) < 0).map(c => {
      const o = ce && ce.n === c.n && !ce.closing ? ce.d : cOv[c.n]; if (!o) return c;
      const lim = Number(o.lim) || 0, u = c.u != null ? c.u : c.lim * (c.p || 0) / 100;
      return Object.assign({}, c, { u, nick: (o.name || '').trim(), fin: o.fin || c.fin, lim, p: lim ? Math.round(u / lim * 100) : 0, ciclo: 'fecha ' + (o.fe || '—') + ' · vence ' + (o.ve || '—'), fe: o.fe, ve: o.ve, orig: (o.fe || o.ve) ? 'cadastro manual' : c.orig });
    });
  }

  /* ---------------- vals ---------------- */
  KD.vals = function (comp, o) {
    const C = KD._C, st = comp.state, M = KD.M, mi = st.mes, S = KD.month(mi), T = KD.today;
    const L = lims(comp), withL = L.filter(c => c.lim > 0), noL = L.filter(c => !c.lim), U = c => c.u != null ? c.u : c.lim * (c.p || 0) / 100;
    /* Cartões · quanto do limite já foi */
    const hl = withL.concat(noL);
    o.hmLim = hl.map((c, i, a) => { const more = i >= 3, endVis = i === 2 && a.length > 3;
      return { has: c.lim > 0, none: !c.lim, n: c.nick || c.n, cor: c.cor, w: (c.p || 0) + '%', p: (c.p || 0) + '%', tip: (c.nick || c.n) + '|' + brl0(U(c)) + ' de ' + brl0(c.lim),
        more: more ? 'grid' : null, lastrow: endVis ? '1' : null, bd: endVis || i === a.length - 1 ? '0' : '1px dashed #2B2B30', disp: more ? '' : 'display:grid;' }; });
    /* Limite */
    const lt = withL.reduce((a, c) => a + c.lim, 0), lu = withL.reduce((a, c) => a + U(c), 0), pct = lt ? lu / lt * 100 : 0;
    o.hmLimDash = (pct / 100 * 125.7).toFixed(1) + ' 125.7'; o.hmLimW = Math.min(100, pct).toFixed(1) + '%';
    o.hmLimUsed = brl0(lu) + ' usados'; o.hmLimPct = pct.toFixed(1).replace('.', ',') + '%'; o.hmLimDisp = int(lt - lu); o.hmLimDe = 'de ' + brl0(lt) + ' que você definiu';
    o.lmUsed = brl0(lu); o.lmTot = brl0(lt);
    /* Assinaturas */
    o.hmAssinSub = M.assinAtivas + (M.assinAtivas === 1 ? ' cobrança que se repete' : ' cobranças que se repetem'); o.hmAssinV = int(S.assinTot);
    o.assinHead = M.assinAtivas + (M.assinAtivas === 1 ? ' assinatura ativa' : ' assinaturas ativas') + ' · ' + S.ASSIN.length + (S.ASSIN.length === 1 ? ' cobrada' : ' cobradas') + ' em ' + MESL[mi % 12].toLowerCase();
    /* Fluxo */
    const fi = S.comp.in, fo = S.comp.out, fm = Math.max(fi, fo, 1), fv = fi - fo;
    o.fxIn = brl0(fi); o.fxOut = brl0(fo); o.fxInW = (fi / fm * 100).toFixed(1) + '%'; o.fxOutW = (fo / fm * 100).toFixed(1) + '%';
    o.fxV = KD.signedInt(fv); o.fxInk = fv < 0 ? '#FF6A5C' : '#6AFF2A'; o.fxRInk = fv < 0 ? '#C9574D' : '#9A9AA3';
    /* Gastos */
    o.gBars = S.bars; o.gL1 = S.gL[0]; o.gL2 = S.gL[1]; o.gL3 = S.gL[2];
    /* Faturas futuras */
    const F9 = S.FUT.slice(0, 9);
    o.hmFut = F9.map((f, i) => { const tot = Object.values(f.s).reduce((a, b) => a + b, 0);
      return { lc: i === 0 ? '#fff' : '#8A8A93', xm: i >= 6 ? 'w' : null, v: tot ? brl0(tot) : '—', h: Math.min(100, tot / 1000 * 100).toFixed(1) + '%', m: f.m, segs: Object.keys(f.s).map(k => ({ tip: k + ' · ' + f.m + '|' + brl0(f.s[k]), flex: f.s[k].toFixed(2), cor: C.KC[k] || '#78788A' })) }; });
    const legN = [...new Set(F9.flatMap(f => Object.keys(f.s)))];
    o.hmFutLeg = M.cards.filter(c => legN.includes(c.nick || c.n)).map(c => ({ n: c.nick || c.n, cor: c.cor }));
    /* Tetos (home): os 5 mais perto do teto */
    o.hmTet = (o.exTet || []).slice(0, 5).map((t, i, a) => Object.assign({}, t, { xmPrev: i === 2 && a.length > 3 ? '1' : null, xm: i >= 3 ? String(i - 2) : null, xd: i >= 3 ? '--xd:grid;' : '', bd: (i === 2 && a.length > 3) || i === a.length - 1 ? '0' : '1px dashed #2B2B30' }));
    /* Para onde foi (home) */
    const otot = C.ONDE.reduce((a, x) => a + x.v, 0), omx = C.ONDE.length ? C.ONDE[0].v : 1;
    o.hmOnde = C.ONDE.map((t, i, a) => ({ n: t.n, cor: comp.cor(t.n), img: 'url("' + C.uri(comp.icSvg(t.n), '#000') + '")', w: (t.v / omx * 100).toFixed(1) + '%', tip: t.n + '|' + brl0(t.v), v: brl0(t.v), p: (otot ? t.v / otot * 100 : 0).toFixed(1).replace('.', ',') + '%', sub: t.c === 1 ? '1 compra · ' + t.top : t.c + ' compras · maior: ' + t.top, bd: last(a, i) }));
    /* Lançamentos do mês */
    o.lancSub = 'Por data de compra. ' + C.LANC.length + ' neste mês.';
    o.lancRows = (o.lancRows || []).map((r, i) => Object.assign(r, { kc: C.KC[r.k] || r.kc }));
    /* Parcelamentos (home) */
    o.hmParc = C.PARC.map((p, i, a) => { const pagas = p.x - p.f, cor = C.KC[p.k] || '#78788A', cat = p.c || 'Outros';
      return Object.assign(comp.av(p.n, cat), { n: p.n, k: p.k, cor, sub: p.tot + ' · até ' + p.ate, rest: brl0(p.r), falta: 'faltam ' + p.f + ' de ' + p.x, bd: last(a, i),
        segs: Array.from({ length: p.x }, (_, j) => ({ tip: 'Parcela ' + (j + 1) + '/' + p.x + '|' + (j < pagas ? 'paga' : 'a pagar'), c: j < pagas ? cor : '#26262B' })) }); });
    /* Ciclos dos cartões */
    o.hmCic = L.map((c, i, a) => { const fe = c.fe != null ? c.fe : (String(c.ciclo).match(/fecha\s*(\S+)/) || [])[1], ve = c.ve != null ? c.ve : (String(c.ciclo).match(/vence\s*(\S+)/) || [])[1];
      return { n: c.nick || c.n, fin: '•••• ' + c.fin, cor: c.cor, fe: fe || '—', ve: ve || '—', real: c.orig === 'fatura real', chute: c.orig === 'chute', manual: c.orig !== 'fatura real' && c.orig !== 'chute', desde: c.since ? c.since.split('-').reverse().join('/') : '—', has: c.lim > 0, none: !c.lim, lim: brl0(c.lim), bd: last(a, i) }; });
    const reais = L.filter(c => c.orig === 'fatura real').map(c => c.nick || c.n), chut = L.filter(c => c.orig === 'chute').map(c => c.nick || c.n);
    const lst = a => a.length === 1 ? a[0] : a.slice(0, -1).join(', ') + ' e ' + a[a.length - 1];
    o.cicloTxt = (reais.length ? lst(reais) + (reais.length === 1 ? ' foi lido da fatura de verdade.' : ' foram lidos das faturas de verdade.') : '') + (chut.length ? (reais.length ? ' ' : '') + lst(chut) + (chut.length === 1 ? ' ainda está com um dia chutado.' : ' ainda estão com um dia chutado.') : '');
    /* Alertas */
    const used = n => M.rows.some(r => r.card === n);
    const nl = noL.map(c => c.nick || c.n), ng = L.filter(c => c.orig === 'chute').map(c => c.nick || c.n);
    o.a1Lim = nl.length > 0; o.a1LimN = String(nl.length); o.a1LimTxt = (nl.length === 1 ? 'cartão sem limite cadastrado.' : 'cartões sem limite cadastrado.') + ' O módulo de limite não fecha sem isso.';
    o.a1Fech = ng.length > 0; o.a1FechN = String(ng.length); o.a1FechTxt = (ng.length === 1 ? 'cartão ainda com o dia de fechamento chutado — ' : 'cartões ainda com o dia de fechamento chutado — ') + lst(ng) + '.' + (ng.every(n => !used(n)) ? ' Sem uso, não afetam os números.' : '');
    o.showAlerts = st.alerts && (o.a1Lim || o.a1Fech);
    const a2 = KD.alert('a2');
    o.showAtyp = st.atyp && !!a2.title; o.a2Title = a2.title || ''; o.a2Body = a2.body || '';
    const a2c = (M.rows.find(r => r.e === a2.e && r.atyp) || {}).c || 'Outros'; o.a2Cat = a2c; o.atypIc = 'url("' + C.uri(comp.icSvg(a2c), comp.cor(a2c)) + '")';
    /* Seletor de mês, conta, conexões */
    o.hojeLbl = 'Ir pra hoje · ' + mShort(C.CUR); o.desdeLbl = 'Dados desde ' + mShort(C.MIN); o.ac_since = 'Desde ' + mShort(mIdx(KD.since()));
    o.ac_ses = (o.ac_ses || []).map(x => Object.assign(x, { meta: x.meta.replace(/^ · /, '') }));
    o.hasConn = false;
    o.ac_hasOthers = true; o.ac_endAll = () => KD.signOutOthers();
    o.ac_togTfa = () => {}; o.ac_tfaWord = 'Em breve'; o.ac_tfaTxt = 'Ainda não disponível nesta versão.';
    o.ac_doExp = () => { KD.exportCsv(); comp.setState(x => ({ ac: Object.assign({}, x.ac, { exp: true }) })); };
    o.ac_save = ((orig) => () => { orig(); setTimeout(() => KD.saveAccount(comp.state.ac), 0); })(o.ac_save);
    o.ac_delGo = ((orig) => () => { const ok = comp.state.ac.delTxt.trim().toUpperCase() === 'EXCLUIR'; orig(); if (ok) KD.deleteAccount(); })(o.ac_delGo);
    /* Extrato: busca */
    o.xfQ = st.xf.q || ''; o.xfSetQ = e => { const v = e.target.value; comp.setState(x => ({ xf: Object.assign({}, x.xf, { q: v }) })); };
    o.xfAny = o.xfAny || !!st.xf.q; o.xfClear = ((orig) => () => { orig(); comp.setState(x => ({ xf: Object.assign({}, x.xf, { q: '' }) })); })(o.xfClear);
    return o;
  };

  /* ---------------- gravação ---------------- */
  const TRACK = ['cats', 'alt', 'eov', 'tet', 'cor', 'ico', 'custom', 'cOv', 'cDel', 'nCards', 'mU', 'nRead', 'alerts', 'atyp', 'ms', 'fc', 'anim', 'sv', 'lay', 'dord', 'nm', 'wd', 'exl'];
  const PREF = { nRead: 'nRead', alerts: 'alerts', atyp: 'atyp', ms: 'ms', fc: 'fc', anim: 'anim', sv: 'sv', lay: 'lay', dord: 'dord', nm: 'nm', wd: 'wd', exl: 'exl' };
  KD.snap = st => { KD._snap = {}; TRACK.forEach(k => { KD._snap[k] = JSON.stringify(st[k]); }); };
  const changedKeys = (a, b) => { a = a || {}; b = b || {}; return [...new Set(Object.keys(a).concat(Object.keys(b)))].filter(k => JSON.stringify(a[k]) !== JSON.stringify(b[k])); };
  let prefT = null, dataQ = Promise.resolve(), dataDirty = false;
  const sb = () => KD.sb, uid = () => KD.user.id;
  const ck = r => { if (r && r.error) throw r.error; return r; };
  const catId = n => (KD.M.catByName[n] || {}).id || null;
  const queue = fn => { dataDirty = true; dataQ = dataQ.then(fn).catch(e => console.error('[kontar] gravação', e)); };

  KD.sync = function (comp) {
    const st = comp.state, prev = KD._snap; if (!prev) return;
    const ch = TRACK.filter(k => JSON.stringify(st[k]) !== prev[k]); if (!ch.length) return;
    const old = {}; ch.forEach(k => { old[k] = prev[k] === undefined ? undefined : JSON.parse(prev[k]); KD._snap[k] = JSON.stringify(st[k]); });
    const M = KD.M;
    if (ch.some(k => k in PREF)) { clearTimeout(prefT); prefT = setTimeout(() => KD.savePrefs(comp.state), 600); }
    if (ch.includes('cats')) changedKeys(old.cats, st.cats).forEach(id => { const n = st.cats[id]; if (!n) return; queue(async () => ck(await sb().from('transactions').update({ category_id: catId(n), status: 'confirmado', categoria_origem: 'usuario' }).eq('id', id))); });
    if (ch.includes('alt')) changedKeys(old.alt, st.alt).forEach(nome => { const e = M.estByName[nome]; if (!e) return; queue(async () => ck(await sb().from('merchant_aliases').update({ sempre_perguntar: !!st.alt[nome] }).in('chave', e.chaves))); });
    if (ch.includes('tet')) changedKeys(old.tet, st.tet).forEach(n => { const id = catId(n); if (!id) return; queue(async () => ck(await sb().from('categories').update({ teto_mensal: st.tet[n] || null }).eq('id', id))); });
    if (ch.includes('cor')) changedKeys(old.cor, st.cor).forEach(n => { const id = catId(n); if (!id) return; queue(async () => ck(await sb().from('categories').update({ cor: st.cor[n] || KD.CAT_DEF[n] || '#78788A' }).eq('id', id))); });
    if (ch.includes('ico')) changedKeys(old.ico, st.ico).forEach(n => { const id = catId(n); if (!id) return; queue(async () => ck(await sb().from('categories').update({ icone: st.ico[n] || (n in KD.CAT_DEF ? n : 'Outros') }).eq('id', id))); });
    if (ch.includes('custom')) {
      const was = old.custom || [], now = st.custom || [];
      now.filter(n => !was.includes(n)).forEach(n => queue(async () => { const ord = Math.max(0, ...Object.values(M.catById).map(c => c.ordem || 0)) + 1;
        ck(await sb().from('categories').insert({ user_id: uid(), nome: n, slug: KD.norm(n).replace(/[^a-z0-9]+/g, '-'), cor: (st.cor[n] || '#22D3EE').toUpperCase(), cor_barra: (st.cor[n] || '#22D3EE').toUpperCase(), icone: st.ico[n] || 'Outros', ordem: ord })); }));
      was.filter(n => !now.includes(n)).forEach(n => { const id = catId(n); if (!id) return; queue(async () => {
        ck(await sb().from('transactions').update({ category_id: null, status: 'pendente_revisao', categoria_origem: null }).eq('category_id', id));
        ck(await sb().from('merchant_aliases').update({ category_id: null }).eq('category_id', id));
        ck(await sb().from('categories').delete().eq('id', id)); }); });
    }
    if (ch.includes('eov')) changedKeys(old.eov, st.eov).forEach(nome => { const e = M.estByName[nome], ov = st.eov[nome]; if (!e || !ov) return; queue(async () => {
      const p = {}; if (ov.name != null && ov.name.trim() && ov.name.trim() !== nome) p.apelido = ov.name.trim(); if (ov.cat) p.category_id = catId(ov.cat);
      if (ov.logo !== undefined) p.logo_url = ov.logo ? await KD.smallImage(ov.logo) : null;
      if (Object.keys(p).length) ck(await sb().from('merchant_aliases').update(p).in('chave', e.chaves));
      if (p.apelido) ck(await sb().from('transactions').update({ apelido: null }).in('chave', e.chaves)); }); });
    if (ch.includes('cOv')) changedKeys(old.cOv, st.cOv).forEach(n => { const c = M.cards.find(x => x.n === n), o = st.cOv[n]; if (!c || !o) return; queue(async () => {
      const lim = Number(o.lim) || null; ck(await sb().from('cards').update({ apelido: o.name || null, final4: o.fin || null, limite: lim, disponivel_informado: lim != null ? Math.max(0, lim - c.used) : null, limite_em: KD.iso(KD.today) }).eq('id', c.id));
      const fe = +o.fe || null, ve = +o.ve || null;
      if (fe && ve && (fe !== c.fe || ve !== c.ve)) { if (c.cy) ck(await sb().from('card_cycles').update({ vigencia_fim: KD.iso(KD.today) }).eq('card_id', c.id).eq('vigencia_inicio', c.cy.vigencia_inicio));
        ck(await sb().from('card_cycles').insert({ user_id: uid(), card_id: c.id, vigencia_inicio: KD.iso(KD.today), dia_fechamento: fe, dia_vencimento: ve, regra: 'dia_fixo', origem: 'manual' })); } }); });
    if (ch.includes('cDel')) (st.cDel || []).filter(n => !(old.cDel || []).includes(n)).forEach(n => { const c = M.cards.find(x => x.n === n); if (!c) return; queue(async () => ck(await sb().from('cards').update({ removido_em: new Date().toISOString(), ativo: false }).eq('id', c.id))); });
    if (ch.includes('nCards')) (st.nCards || []).slice((old.nCards || []).length).forEach(c => queue(async () => {
      const m = String(c.ciclo).match(/fecha\s*(\d+).*?vence\s*(\d+)/), lim = c.lim || null;
      const r = ck(await sb().from('cards').insert({ user_id: uid(), nome: c.n, instituicao: c.n, brand_hex: c.cor, tinta: c.ink, final4: /\d{4}/.test(c.fin) ? c.fin : null, limite: lim, disponivel_informado: lim, limite_em: lim ? KD.iso(KD.today) : null, ordem: M.cards.length + 1, ativo: true }).select());
      const id = r.data && r.data[0] && r.data[0].id;
      if (id && m) ck(await sb().from('card_cycles').insert({ user_id: uid(), card_id: id, vigencia_inicio: KD.iso(KD.today), dia_fechamento: +m[1], dia_vencimento: +m[2], regra: 'dia_fixo', origem: 'manual' })); }));
    if (ch.includes('mU')) (st.mU || []).slice((old.mU || []).length).forEach(m => { if (!m._new) return; queue(async () => {
      const ord = Math.max(0, ...M.goals.map(g => g.ordem || 0)) + 1, pz = KD.mStart(m._new.m);
      ck(await sb().from('goals').insert({ user_id: uid(), nome: m.n, icone: m.i, cor: m.c, alvo: m._new.v, guardado: m._new.g, prazo: KD.iso(pz), ordem: ord })); }); });
    if (dataDirty) { dataDirty = false; dataQ = dataQ.then(() => KD.refresh(comp)); }
  };

  KD.savePrefs = st => { const P = Object.assign({}, KD.M.prefs); Object.keys(PREF).forEach(k => { if (st[k] !== undefined) P[PREF[k]] = st[k]; }); KD.M.prefs = P;
    sb().from('user_prefs').upsert({ user_id: uid(), prefs: P, updated_at: new Date().toISOString() }, { onConflict: 'user_id' }).then(r => r && r.error && console.error('[kontar] preferências', r.error)); };
  KD.saveAccount = async ac => {
    try { ck(await sb().from('profiles').upsert({ user_id: uid(), nome_exibicao: ac.n0 }, { onConflict: 'user_id' }));
      if (ac.e0 && ac.e0 !== KD.user.email) ck(await sb().auth.updateUser({ email: ac.e0 }, { emailRedirectTo: location.origin + location.pathname })); } catch (e) { console.error('[kontar] conta', e); } };
  KD.saveAvatar = async blob => { try { const path = uid() + '/avatar.jpg';
    ck(await sb().storage.from('avatars').upload(path, blob, { upsert: true, contentType: 'image/jpeg' }));
    ck(await sb().from('profiles').upsert({ user_id: uid(), avatar_url: path }, { onConflict: 'user_id' })); } catch (e) { console.error('[kontar] foto', e); } };
  KD.smallImage = src => new Promise(res => { if (/^data:/.test(src) || /^https?:/.test(src)) return res(src); const im = new Image(); im.onload = () => { const s = 128, cv = document.createElement('canvas'); cv.width = cv.height = s; const g = cv.getContext('2d'), k = Math.min(s / im.width, s / im.height); g.drawImage(im, (s - im.width * k) / 2, (s - im.height * k) / 2, im.width * k, im.height * k); res(cv.toDataURL('image/png')); }; im.onerror = () => res(null); im.src = src; });
  KD.sendReset = () => sb().auth.resetPasswordForEmail(KD.user.email, { redirectTo: location.origin + location.pathname });
  KD.signOut = () => sb().auth.signOut();
  KD.signOutOthers = () => sb().auth.signOut({ scope: 'others' });
  KD.relogin = () => location.reload();
  KD.deleteAccount = async () => { try { ck(await sb().rpc('kontar_excluir_conta')); await sb().auth.signOut(); setTimeout(() => location.reload(), 1600); } catch (e) { console.error('[kontar] excluir', e); } };
  KD.exportCsv = () => {
    const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
    const lines = [['data', 'estabelecimento', 'valor', 'meio', 'categoria', 'cartao_ou_conta', 'parcelas', 'trabalho', 'observacao'].join(',')]
      .concat(KD.M.rows.map(r => [KD.iso(r.dt), q(r.e), r.amt.toFixed(2), r.meio, q(r.c), q(r.k), r.x, r.trab ? 1 : 0, q(r.obs)].join(',')));
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' })); a.download = 'kontar-' + KD.iso(KD.today) + '.csv'; document.body.appendChild(a); a.click(); a.remove();
  };

  /* recarrega do banco e devolve à tela os dados já com as mudanças */
  KD.refresh = async comp => {
    await KD.load(KD.sb, KD.user); KD._ver = (KD._ver || 0) + 1;
    const C = KD._C; C.ROWS = KD.M.rows; C.EST = KD.M.est; C.DOM = KD.M.DOM; C.METAS = KD.metas(); C.NOTIFS = KD.notifs();
    const KC = {}; KD.M.accs.forEach(a => { KC[a.nome] = a.cor; }); KD.M.cards.forEach(c => { KC[c.n] = c.cor; if (c.nick) KC[c.nick] = c.cor; }); C.KC = KC;
    const busy = comp.state.ce || comp.state.es || comp.state.nc || comp.state.mf || comp.state.edit;
    const reset = { cats: {}, eov: {}, alt: Object.fromEntries(KD.M.est.map(e => [e.nome, e.alterna])), cOv: {}, cDel: [], nCards: [], mU: [] };
    if (busy) { setTimeout(() => KD.refresh2(comp, reset), 900); return; }
    KD.refresh2(comp, reset);
  };
  KD.refresh2 = (comp, reset) => { Object.keys(reset).forEach(k => { KD._snap[k] = JSON.stringify(reset[k]); }); comp.setState(reset); };
})();
