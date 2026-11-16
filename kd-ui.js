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
  KD.isDemo = () => !!(KD.user && KD.user.email === 'teste@kontar.app');
  const DEMO_MSG = 'Esta é a conta de demonstração: isso fica travado para todo mundo poder testar.';
  KD.since = () => new Date((KD.user && KD.user.created_at) || Date.now());
  KD.kList = () => [...new Set(KD.M.rows.map(r => r.k))].filter(k => k && k !== '—');
  KD.lastAte = P => { let best = null, bi = -1; P.forEach(p => { const q = p.ate.split('/'), i = (2000 + +q[1]) * 12 + MES.indexOf(q[0]); if (i > bi) { bi = i; best = p.ate; } }); return best || '—'; };
  KD.noFat = mi => ({ n: '—', v: '0', sub: 'nenhuma fatura vence em ' + mShort(mi), cor: '#1C1C20', ink: '#FFFFFF' });
  KD.cardMap = key => { const o = {}; KD.M.cards.forEach(c => { const n = c.nick || c.n; o[n] = key === 'code' ? KD.CODE(c.n) : c[key]; if (n !== c.n) o[c.n] = o[n]; }); return o; };
  KD.accLogo = () => { const o = {}; KD.M.accs.forEach(a => { const b = KD.colorOf(a.nome, '', '') && (KD.BANK[a.nome] ? a.nome : null); o[a.nome] = /Mercado Pago/.test(a.nome) ? 'Mercado Pago' : /Nubank/.test(a.nome) ? 'Nubank' : /Itaú/.test(a.nome) ? 'Itaú' : /C6/.test(a.nome) ? 'C6' : b || a.nome; }); return o; };
  KD.alert = k => (KD._C && KD._C.NOTIFS.find(n => n.home === k && n.kind === 'block' && (k !== 'a1' || n.card))) || {};


  /* ---------------- rotas: a página atual vive no endereço (#/extrato), voltar/avançar e reload funcionam ---------------- */
  const SLUG = { home: '', extrato: 'extrato', metas: 'metas', categorias: 'categorias', cartoes: 'cartoes', estab: 'estabelecimentos', config: 'preferencias', conta: 'conta', ajuda: 'ajuda' };
  const REV = Object.fromEntries(Object.entries(SLUG).filter(e => e[1]).map(e => [e[1], e[0]]));
  KD.pageFromHash = () => { const h = String(location.hash || '').replace(/^#\/?/, '').split(/[?&/]/)[0].toLowerCase(); return h === '' ? 'home' : (REV[h] || null); };
  KD.urlFor = pg => location.pathname + location.search + (SLUG[pg] ? '#/' + SLUG[pg] : '');
  KD.routeStart = c => {
    KD._lastPage = c.state.page;
    try { history.replaceState({ kpg: c.state.page }, '', KD.urlFor(c.state.page)); } catch (e) {}
    if (c.state.page !== 'home') setTimeout(() => { try { c.pgSeq(c.state.page); } catch (e) {} }, 140);
    window.addEventListener('popstate', () => {
      const pg = KD.pageFromHash() || 'home', go = n => { const k = KD.comp; if (!k || pg === k.state.page) return; if (k._fading && n < 12) return setTimeout(() => go(n + 1), 120); KD._popTo = pg; k.goPage(pg); };
      go(0);
    });
  };
  KD.routeSync = c => {
    const pg = c.state.page; if (pg === KD._lastPage) return; KD._lastPage = pg;
    if (KD._popTo === pg) { KD._popTo = null; return; }
    try { history.pushState({ kpg: pg }, '', KD.urlFor(pg)); } catch (e) {}
  };

  /* ---------------- install ---------------- */
  KD.install = function (C) {
    const M = KD.M; KD._C = C;
    C.CUR = M.CUR; C.MIN = M.MIN;
    C.ROWS = M.rows; C.EST = M.est; C.DOM = M.DOM;
    const CAT = {}; Object.values(M.catById).forEach(c => { if (c.nome in KD.CAT_DEF) CAT[c.nome] = KD.CAT_DEF[c.nome]; }); C.CAT = CAT;
    const KC = {}; M.accs.forEach(a => { KC[a.nome] = a.cor; }); M.cards.forEach(c => { KC[c.n] = c.cor; if (c.nick) KC[c.nick] = c.cor; }); C.KC = KC;
    C.METAS = KD.metas();
    C.NOTIFS = KD.notifs();
    KD.ux();
    C.EXP.lanc.nav = '';
    const did = C.prototype.componentDidMount, dup = C.prototype.componentDidUpdate;
    C.prototype.componentDidMount = function () {
      KD.comp = this; KD.snap(this.state);
      const r = did && did.apply(this, arguments);
      KD.routeStart(this); KD.sessGuard();
      return r;
    };
    C.prototype.componentDidUpdate = function () {
      try { KD.sync(this); } catch (e) { console.error('[kontar] sync', e); }
      try { KD.routeSync(this); } catch (e) { console.error('[kontar] rota', e); }
      return dup && dup.apply(this, arguments);
    };
    KD._applied = null;
  };
  KD.metas = () => KD.M.goals.map(g => {
    const alvo = Number(g.alvo), gd = Number(g.guardado), pz = KD.pd(g.prazo), ink = (c => { const h = c.replace('#', ''), n = parseInt(h, 16), L = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255; return L > 0.55 ? '#0A0A0A' : '#FFFFFF'; })(g.cor);
    return { id: g.id, n: g.nome, p: alvo ? Math.round(gd / alvo * 100) : 0, ate: mShort(mIdx(pz)), g: brl0(gd), of: brl0(alvo), f: brl0(Math.max(0, alvo - gd)), c: g.cor, ink, i: g.icone, _v: alvo, _g: gd };
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
    o.ac_hasOthers = true; o.ac_othDone = !!st.ac.oth; o.ac_othIdle = !st.ac.oth; o.ac_endAll = () => { if (!KD.isDemo()) KD.signOutOthers(); comp.setState(x => ({ ac: Object.assign({}, x.ac, { oth: true }) })); };
    { /* Conta: nome em duas linhas, pílulas do topo, senha, toggles de segurança */
      const ac = st.ac, A = p => comp.setState(x => ({ ac: Object.assign({}, x.ac, p) }));
      const nmv = (ac.n0 || '').trim(), sp = nmv.split(/\s+/).filter(Boolean), l1 = sp[0] || '', l2 = sp.slice(1).join(' ');
      /* nome: uma linha se couber (≥84px de corpo); senão quebra entre nome e sobrenome */
      const fullW = st.vw / st.vh >= 2 && st.wd !== 'full' ? Math.round(st.vw * 0.75) : st.vw, avail = Math.max(240, Math.min(fullW - 48, 1000) - 380 - 8);
      const fs1 = Math.min(172, Math.floor(avail / (Math.max(nmv.length, 3) * 0.53))), one = !l2 || fs1 >= 84;
      const Lm = Math.max(l1.length, l2.length, 3), ln = one ? 1 : 2, fs = one ? Math.max(56, fs1) : Math.max(56, Math.min(118, Math.floor(avail / (Lm * 0.53))));
      o.ac_nm1 = one ? nmv : l1; o.ac_nm2 = one ? '' : l2; o.ac_nm2on = !one; o.ac_nameFs = fs + 'px'; o.ac_nameB = Math.round(-fs * 0.08) + 'px'; o.ac_heroH = Math.max(210, Math.round(fs * 0.86 * ln + 56)) + 'px';
      o.ac_nmFull = nmv || l1; o.ac_name0 = l1; o.ac_ini = (l1.charAt(0) || 'J').toUpperCase();
      o.ac_countLbl = M.accs.length + (M.accs.length === 1 ? ' conta' : ' contas'); o.ac_chipTfa = M.cards.length + (M.cards.length === 1 ? ' cartão' : ' cartões'); o.ac_chipBd = '#3A3A40'; o.ac_chipInk = '#B4B4BC';
      o.ac_inName = e => A({ name: e.target.value.slice(0, 60) }); o.ac_inEmail = e => A({ email: e.target.value.slice(0, 80) });
      o.ac_pw1 = ac.pw1 || ''; o.ac_pw2 = ac.pw2 || ''; o.ac_pwCodeV = ac.pwCodeV || ''; o.ac_pwCode = ac.pwStep === 1;
      o.ac_inPw1 = e => A({ pw1: e.target.value.slice(0, 72), pwMsg: '' }); o.ac_inPw2 = e => A({ pw2: e.target.value.slice(0, 72), pwMsg: '' });
      o.ac_inPwCode = e => A({ pwCodeV: e.target.value.replace(/\D/g, '').slice(0, 8) });
      o.ac_pwMsg = ac.pwMsg || ''; o.ac_pwMsgC = ac.pwErr ? '#FF6A5C' : '#6AFF2A';
      { const c = KD.pwCheck(ac.pw1 || '', ac.pw2 || ''); o.ac_pwPct = c.pct; o.ac_pwCol = c.col; o.ac_pwLbl = c.lbl; o.ac_pwHint = c.hint; o.ac_pwHintC = c.hintC;
        o.ac_pwOk = !ac.pwBusy && (ac.pwStep === 1 ? (ac.pwCodeV || '').length >= 6 : c.ok); }
      o.ac_pwBtn = ac.pwBusy ? 'Aguarde…' : ac.pwStep === 1 ? 'Confirmar código' : 'Salvar senha'; o.ac_pwO = o.ac_pwOk ? '1' : '.35'; o.ac_pwCur = o.ac_pwOk ? 'pointer' : 'default';
      o.ac_pwGo = () => { if (o.ac_pwOk) KD.changePassword(comp); };
      const sw = (p, on) => { o[p + '_track'] = on ? '#5B3DF5' : '#26262B'; o[p + '_knob'] = on ? '31px' : '3px'; };
      o.ac_ss_knob = st.sess24 ? '49px' : '3px'; o.ac_ss_inkA = st.sess24 ? '#9A9AA3' : '#000'; o.ac_ss_inkB = st.sess24 ? '#000' : '#9A9AA3';
      o.ac_ss_lbl = 'Duração da sessão'; o.ac_ss_word = st.sess24 ? '24 horas' : 'Sem limite';
      o.ac_ss_txt = st.sess24 ? 'Por segurança, o Kontar pede seu login de novo a cada 24 horas, mesmo que você não saia.' : 'Você fica conectado neste aparelho até sair por conta própria. Indicado para um computador só seu.';
      o.ac_togSs = () => KD.isDemo() ? A({ pwMsg: DEMO_MSG, pwErr: true }) : comp.setState(x => ({ sess24: x.sess24 ? false : Date.now() }));
    }
    o.ac_doExp = () => { KD.exportCsv(); comp.setState(x => ({ ac: Object.assign({}, x.ac, { exp: true }) })); };
    o.ac_save = ((orig) => () => { orig(); setTimeout(() => KD.saveAccount(comp.state.ac), 0); })(o.ac_save);
    o.ac_delGo = ((orig) => () => { if (KD.isDemo()) return comp.setState(x => ({ ac: Object.assign({}, x.ac, { delTxt: '', pwMsg: DEMO_MSG, pwErr: true }) })); const ok = comp.state.ac.delTxt.trim().toUpperCase() === 'EXCLUIR'; orig(); if (ok) KD.deleteAccount(); })(o.ac_delGo);
    /* Extrato: busca */
    o.xfQ = st.xf.q || ''; o.xfSetQ = e => { const v = e.target.value; comp.setState(x => ({ xf: Object.assign({}, x.xf, { q: v }) })); };
    o.xfAny = o.xfAny || !!st.xf.q; o.xfClear = ((orig) => () => { orig(); comp.setState(x => ({ xf: Object.assign({}, x.xf, { q: '' }) })); })(o.xfClear);
    /* listas longas: 50 por vez; as próximas entram em cascata quando o fim da lista é alcançado */
    KD._more = KD._more || {}; KD._sig = KD._sig || {};
    const lim = (k, sig) => { const l = (st.lim || {})[k]; KD._sig[k] = sig; return l && l.sig === sig ? l : { n: 50, prev: 0, sig }; };
    const AN = (i, L) => (L.prev > 0 && i >= L.prev) ? 'animation:kRowIn .5s cubic-bezier(.2,.7,.2,1) both;animation-delay:' + Math.min(1100, (i - L.prev) * 32) + 'ms;' : '';
    if (Array.isArray(o.days)) {
      const L = lim('extrato', JSON.stringify([st.mes, st.xf])); let c = 0, tot = 0; o.days.forEach(d => { tot += (d.rows || []).length; });
      o.days = o.days.map(d => { const rows = (d.rows || []).slice(0, Math.max(0, L.n - c)).map((r, i) => Object.assign({}, r, { an: AN(c + i, L) })); c += rows.length; return rows.length ? Object.assign({}, d, { rows }) : null; }).filter(Boolean);
      KD._more.extrato = tot > L.n;
    }
    if (Array.isArray(o.estRowsF)) {
      const L = lim('estab', JSON.stringify([st.ef, st.eq, st.mes])); KD._more.estab = o.estRowsF.length > L.n;
      o.estRowsF = o.estRowsF.slice(0, L.n).map((r, i) => Object.assign({}, r, { an: AN(i, L) }));
    }
    return o;
  };
  KD.loadMore = function (k) {
    const comp = KD.comp; if (!comp || !KD._more[k] || Date.now() - (KD._lm || 0) < 450) return; KD._lm = Date.now();
    comp.setState(x => { const cur = (x.lim || {})[k], sig = KD._sig[k], n = cur && cur.sig === sig ? cur.n : 50; return { lim: Object.assign({}, x.lim, { [k]: { n: n + 50, prev: n, sig } }) }; });
  };


  /* ---------------- interações globais: arrastar com o mouse e rolar pelas laterais ---------------- */
  KD.ux = function () {
    if (KD._ux) return; KD._ux = true;
    const sx = e => { const c = getComputedStyle(e); return (c.overflowX === 'auto' || c.overflowX === 'scroll') && e.scrollWidth > e.clientWidth + 2; };
    const sy = e => { const c = getComputedStyle(e); return (c.overflowY === 'auto' || c.overflowY === 'scroll') && e.scrollHeight > e.clientHeight + 2; };
    /* 1) clicar e arrastar pro lado em qualquer lista com scroll horizontal */
    let d = null;
    document.addEventListener('pointerdown', ev => {
      if (ev.pointerType !== 'mouse' || ev.button !== 0) return;
      if (ev.target.closest && ev.target.closest('input,textarea,select,[data-rg-hist],[data-nodrag]')) return;
      let el = ev.target; while (el && el !== document.body && !sx(el)) el = el.parentElement;
      if (!el || el === document.body) return;
      d = { el, x: ev.clientX, sl: el.scrollLeft, on: false, snap: el.style.scrollSnapType, id: ev.pointerId };
    }, true);
    document.addEventListener('pointermove', ev => {
      if (!d) return; const dx = ev.clientX - d.x;
      if (!d.on) { if (Math.abs(dx) < 6) return; d.on = true; d.el.style.scrollSnapType = 'none'; d.el.style.cursor = 'grabbing'; d.el.style.userSelect = 'none'; try { d.el.setPointerCapture(d.id); } catch (e) {} }
      d.el.scrollLeft = d.sl - dx; ev.preventDefault();
    }, true);
    const end = () => { if (!d) return; const q = d; d = null; if (!q.on) return;
      q.el.style.cursor = ''; q.el.style.userSelect = ''; const cur = q.el.scrollLeft; q.el.style.scrollSnapType = q.snap;
      /* devolve o snap suavemente à coluna mais próxima */
      q.el.scrollTo({ left: cur, behavior: 'auto' }); KD._dragged = Date.now(); };
    document.addEventListener('pointerup', end, true); document.addEventListener('pointercancel', end, true);
    document.addEventListener('click', ev => { if (KD._dragged && Date.now() - KD._dragged < 250) { ev.stopPropagation(); ev.preventDefault(); KD._dragged = 0; } }, true);
    const st = document.createElement('style'); st.textContent = '.kscroll[data-dragx]{cursor:grab}'; document.head.appendChild(st);
    document.addEventListener('scroll', ev => { const el = ev.target; if (!el || !el.getAttribute) return; const pg = el.getAttribute('data-page-scroll'); if (!pg || !KD._more || !KD._more[pg]) return; if (el.scrollTop + el.clientHeight >= el.scrollHeight - 200) KD.loadMore(pg); }, true);
    const mark = () => document.querySelectorAll('.kscroll').forEach(e => { if (sx(e)) e.setAttribute('data-dragx', '1'); else e.removeAttribute('data-dragx'); });
    new MutationObserver(() => { clearTimeout(KD._mk); KD._mk = setTimeout(mark, 200); cancelAnimationFrame(KD._lp); KD._lp = requestAnimationFrame(() => { KD.lgPass(); KD.wide(); }); }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] }); setTimeout(mark, 1500);
    /* 2) laterais (fora do artboard) fazem parte do scroll: o scroller se estende até as bordas da janela, então a roda é nativa (mesma suavização do conteúdo) */
    KD.wide = function () {
      const ab = document.querySelector('[data-screen-label]'); if (!ab) return;
      const r = ab.getBoundingClientRect(), k = (ab.offsetWidth ? r.width / ab.offsetWidth : 1) || 1, L = Math.max(0, Math.round(r.left)), R = Math.max(0, Math.round(window.innerWidth - r.right));
      const out = L > 2 || R > 2; const sy2 = (el, v) => { if (el.style.overflow !== v) el.style.overflow = v; };
      document.querySelectorAll('[data-px-scroll],[data-page-scroll]').forEach(sc => {
        if (!sc.offsetParent) return;
        const D = sc.dataset, cs = getComputedStyle(sc), l = out ? L / k : 0, rr = out ? R / k : 0;
        let pl = parseFloat(cs.paddingLeft) || 0, pr = parseFloat(cs.paddingRight) || 0;
        if (D.kwPL && Math.abs(parseFloat(sc.style.paddingLeft) - parseFloat(D.kwPL)) < 0.6) pl -= +D.kwL || 0; if (D.kwPR && Math.abs(parseFloat(sc.style.paddingRight) - parseFloat(D.kwPR)) < 0.6) pr -= +D.kwR || 0;
        const nl = (pl + l) + 'px', nr = (pr + rr) + 'px', ml = (-l) + 'px', mr = (-rr) + 'px';
        const df = (a, b) => Math.abs((parseFloat(a) || 0) - parseFloat(b)) > 0.6;
        if (df(sc.style.marginLeft, ml)) sc.style.marginLeft = ml; if (df(sc.style.marginRight, mr)) sc.style.marginRight = mr;
        if (df(sc.style.paddingLeft, nl)) sc.style.paddingLeft = nl; if (df(sc.style.paddingRight, nr)) sc.style.paddingRight = nr;
        D.kwPL = nl; D.kwPR = nr; D.kwL = l; D.kwR = rr;
        if (out) for (let e = sc.parentElement; e && e.getBoundingClientRect().width < window.innerWidth - 1; e = e.parentElement) sy2(e, 'visible clip');
      });
    };
    window.addEventListener('resize', () => KD.wide()); setTimeout(() => KD.wide(), 600);
    /* 3) clique na lateral (fora do conteúdo) fecha o painel/menu aberto mais acima */
    document.addEventListener('click', ev => {
      const ab = document.querySelector('[data-screen-label]'); if (!ab) return; const rc = ab.getBoundingClientRect(); if (ev.clientX >= rc.left && ev.clientX <= rc.right) return;
      let best = null, bz = -1; document.querySelectorAll('[data-away]').forEach(o => { const c = getComputedStyle(o); if (c.display === 'none' || c.pointerEvents === 'none' || +c.opacity < 0.05) return; const z = parseInt(c.zIndex, 10) || 0; if (z >= bz) { bz = z; best = o; } });
      if (best) best.click();
    }, true);
  };
  /* ---------------- gravação ---------------- */
  const TRACK = ['cats', 'alt', 'eov', 'tet', 'cor', 'ico', 'custom', 'cOv', 'cDel', 'nCards', 'mU', 'mEd', 'mDel', 'nRead', 'alerts', 'atyp', 'ms', 'fc', 'anim', 'sv', 'lay', 'dord', 'nm', 'wd', 'exl', 'pwMail', 'sess24'];
  const PREF = { nRead: 'nRead', alerts: 'alerts', atyp: 'atyp', ms: 'ms', fc: 'fc', anim: 'anim', sv: 'sv', lay: 'lay', dord: 'dord', nm: 'nm', wd: 'wd', exl: 'exl', pwMail: 'pwMail', sess24: 'sess24' };
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
    if (ch.includes('mEd')) changedKeys(old.mEd, st.mEd).forEach(id => { const e = st.mEd[id]; if (!e) return; queue(async () => {
      ck(await sb().from('goals').update({ nome: e.n, icone: e.i, cor: e.c, alvo: e.v, guardado: e.g, prazo: KD.iso(KD.mStart(e.m)) }).eq('id', id)); }); });
    if (ch.includes('mDel')) (st.mDel || []).filter(id => !(old.mDel || []).includes(id)).forEach(id => queue(async () => ck(await sb().from('goals').update({ arquivada_em: new Date().toISOString() }).eq('id', id))));
    if (dataDirty) { dataDirty = false; dataQ = dataQ.then(() => KD.refresh(comp)); }
  };

  KD.savePrefs = st => { const P = Object.assign({}, KD.M.prefs); Object.keys(PREF).forEach(k => { if (st[k] !== undefined) P[PREF[k]] = st[k]; }); KD.M.prefs = P;
    sb().from('user_prefs').upsert({ user_id: uid(), prefs: P, updated_at: new Date().toISOString() }, { onConflict: 'user_id' }).then(r => r && r.error && console.error('[kontar] preferências', r.error)); };
  KD.saveAccount = async ac => {
    try { ck(await sb().from('profiles').upsert({ user_id: uid(), nome_exibicao: ac.n0 }, { onConflict: 'user_id' }));
      if (!KD.isDemo() && ac.e0 && ac.e0 !== KD.user.email) ck(await sb().auth.updateUser({ email: ac.e0 }, { emailRedirectTo: location.origin + location.pathname })); } catch (e) { console.error('[kontar] conta', e); } };
  KD.saveAvatar = async blob => { try { const path = uid() + '/avatar.jpg';
    ck(await sb().storage.from('avatars').upload(path, blob, { upsert: true, contentType: 'image/jpeg' }));
    ck(await sb().from('profiles').upsert({ user_id: uid(), avatar_url: path }, { onConflict: 'user_id' })); } catch (e) { console.error('[kontar] foto', e); } };

  /* ---- logos: modos de encaixe (ajustar / preencher / estender cor) + URL de imagem ---- */
  const hsh = u => { let h = 5381; for (let i = 0; i < u.length; i++) h = ((h << 5) + h + u.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
  KD.lg = { info: {}, tmpU: null, tmpM: null,
    fit(u) { if (!u) return 'cor'; if (KD.lg.tmpU === u && KD.lg.tmpM) return KD.lg.tmpM; return ((KD.M && KD.M.prefs && KD.M.prefs.lgFit) || {})[hsh(u)] || 'cor'; },
    tmp(u, m) { KD.lg.tmpU = u; KD.lg.tmpM = m; KD.lgPass(); },
    clear() { KD.lg.tmpU = KD.lg.tmpM = null; KD.lgPass(); },
    set(u, m) { if (!u || !m) return; const P = Object.assign({}, KD.M.prefs); P.lgFit = Object.assign({}, P.lgFit); if (m === 'cor') delete P.lgFit[hsh(u)]; else P.lgFit[hsh(u)] = m; KD.M.prefs = P;
      sb().from('user_prefs').upsert({ user_id: uid(), prefs: P, updated_at: new Date().toISOString() }, { onConflict: 'user_id' }).then(r => r && r.error && console.error('[kontar] logo', r.error)); KD.lg.clear(); },
    probe(u) { if (u in KD.lg.info) return KD.lg.info[u]; KD.lg.info[u] = null; const im = new Image(); im.crossOrigin = 'anonymous';
      im.onload = () => { try { const n = 24, cv = document.createElement('canvas'); cv.width = cv.height = n; const g = cv.getContext('2d', { willReadFrequently: true }); g.drawImage(im, 0, 0, n, n); const d = g.getImageData(0, 0, n, n).data; let r = 0, gg = 0, b = 0, a = 0, c = 0;
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { if (y > 1 && y < n - 2 && x > 1 && x < n - 2) continue; const i = (y * n + x) * 4; r += d[i]; gg += d[i + 1]; b += d[i + 2]; a += d[i + 3]; c++; }
          a /= c; const col = a < 128 ? '#ffffff' : 'rgb(' + Math.round(r / c) + ',' + Math.round(gg / c) + ',' + Math.round(b / c) + ')'; const lum = a < 128 ? 1 : (0.2126 * r + 0.7152 * gg + 0.0722 * b) / c / 255;
          KD.lg.info[u] = { ok: true, col: col, dark: lum < 0.16 }; } catch (e) { KD.lg.info[u] = { ok: false }; } KD.lgPass(); };
      im.onerror = () => { KD.lg.info[u] = { ok: false }; KD.lgPass(); }; im.src = u; return null; } };
  KD.lgPass = function () {
    document.querySelectorAll('[data-lg]').forEach(el => { const m = /url\(["']?(.*?)["']?\)/.exec(el.style.backgroundImage || ''); if (!m) return; const u = m[1].replace(/&amp;/g, '&');
      if (!el.dataset.lgS) el.dataset.lgS = el.style.backgroundSize || '';
      const mode = KD.lg.fit(u), inf = mode === 'cor' ? KD.lg.probe(u) : null, base = el.dataset.lgS;
      let size = base, bg = '#fff', sh = 'none';
      if (mode === 'preencher') size = '136%';
      else if (mode === 'cor') { if (inf && inf.ok) { size = '100%'; bg = inf.col; sh = inf.dark ? 'inset 0 0 0 1px rgba(255,255,255,.22)' : 'none'; } else if (inf) size = '136%'; }
      if (el.style.backgroundSize !== size) el.style.backgroundSize = size; if (el.style.backgroundColor !== bg) el.style.backgroundColor = bg; if (el.style.boxShadow !== sh) el.style.boxShadow = sh; }); };
  KD.imgFromUrl = u => new Promise(res => { fetch(u, { mode: 'cors' }).then(r => r.ok ? r.blob() : Promise.reject()).then(b => /^image\//.test(b.type) ? res(URL.createObjectURL(b)) : res(null)).catch(() => { const im = new Image(); im.onload = () => res(u); im.onerror = () => res(null); im.src = u; }); });
  KD.smallImage = src => new Promise(res => { if (/^data:/.test(src) || /^https?:/.test(src)) return res(src); const im = new Image(); im.onload = () => { const s = 128, cv = document.createElement('canvas'); cv.width = cv.height = s; const g = cv.getContext('2d'), k = Math.min(s / im.width, s / im.height); g.drawImage(im, (s - im.width * k) / 2, (s - im.height * k) / 2, im.width * k, im.height * k); res(cv.toDataURL('image/png')); }; im.onerror = () => res(null); im.src = src; });
  /* força da senha + dicas curtas: UMA função, usada na Conta e na tela Nova senha (boot.js) */
  KD.pwCheck = (pw, c) => {
    pw = pw || ''; c = c || ''; const cls = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter(r => r.test(pw)).length, pts = (pw.length >= 8) + (pw.length >= 12) + cls,
      lv = !pw ? 0 : pw.length < 8 || pts <= 3 ? 1 : pts <= 5 ? 2 : 3, same = !!pw && pw === c, lst = a => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' e ' + a[a.length - 1], miss = [];
    if (pw.length < 8) miss.push('mais ' + (8 - pw.length) + (8 - pw.length === 1 ? ' caractere' : ' caracteres')); if (!/[A-Z]/.test(pw)) miss.push('maiúscula'); if (!/[a-z]/.test(pw)) miss.push('minúscula'); if (!/\d/.test(pw)) miss.push('número'); if (!/[^A-Za-z0-9]/.test(pw)) miss.push('símbolo');
    return { lv, same, ok: lv >= 2 && same, pct: ['0%', '33.3%', '66.6%', '100%'][lv], col: ['#26262B', '#FF4436', '#F5B83D', '#00E08A'][lv], lbl: ['', 'Fraca', 'Média', 'Forte'][lv],
      hint: !pw ? 'Mínimo 8 caracteres' : lv === 1 ? 'Falta ' + lst(miss.slice(0, 2)) : lv === 2 && miss.length ? 'Melhore com ' + lst(miss.slice(0, 2)) : (c && !same) ? 'As senhas não são iguais' : !c ? 'Repita a senha acima' : 'Tudo certo',
      hintC: !pw ? '#7C7C85' : lv === 1 || (c && !same) ? '#FF6A5C' : lv === 3 && same ? '#00E08A' : '#B4B4BC' };
  };
  KD.sendReset = () => sb().auth.resetPasswordForEmail(KD.user.email, { redirectTo: location.origin + location.pathname });

  KD.changePassword = async comp => {
    const A = p => comp.setState(x => ({ ac: Object.assign({}, x.ac, p) })), ac = comp.state.ac, S = sb();
    if (ac.pwBusy) return;
    if (KD.isDemo()) return A({ pwMsg: DEMO_MSG, pwErr: true });
    if ((ac.pw1 || '').length < 8) return A({ pwMsg: 'Use pelo menos 8 caracteres.', pwErr: true });
    if (ac.pw1 !== ac.pw2) return A({ pwMsg: 'As duas senhas não conferem.', pwErr: true });
    A({ pwBusy: true, pwMsg: '', pwErr: false });
    const askCode = async txt => { ck(await S.auth.reauthenticate()); A({ pwBusy: false, pwStep: 1, pwMsg: txt, pwErr: false }); };
    try {
      if (ac.pwStep !== 1) return await askCode('Mandamos um código de 6 dígitos para o seu e-mail.');
      const body = { password: ac.pw1 }; if (ac.pwStep === 1) body.nonce = (ac.pwCodeV || '').trim();
      const r = await S.auth.updateUser(body);
      if (r.error) { if (/reauth/i.test(r.error.message || '') && ac.pwStep !== 1) return await askCode('Por segurança, mandamos um código de 6 dígitos para o seu e-mail.'); throw r.error; }
      A({ pwBusy: false, pwStep: 0, pw1: '', pw2: '', pwCodeV: '', pwMsg: 'Senha trocada.', pwErr: false });
    } catch (e) { A({ pwBusy: false, pwMsg: /nonce|token|expired|invalid/i.test(e.message || '') ? 'Código inválido ou vencido.' : (e.message || 'Não deu pra trocar a senha.'), pwErr: true }); }
  };
  /* sessão de 24h (opcional): vale a partir do último login ou do momento em que o toggle foi ligado */
  KD.sessGuard = () => {
    clearInterval(KD._sg);
    const chk = () => { try { const t = KD.comp && KD.comp.state.sess24; if (!t) return; const last = Date.parse((KD.user && KD.user.last_sign_in_at) || '') || 0, since = Math.max(last, Number(t) || 0);
      if (since && Date.now() - since > 864e5) { try { localStorage.setItem('kontar-sessao-vencida', JSON.stringify({ email: KD.user.email, nome: (KD.M.profile && KD.M.profile.nome_exibicao) || '' })); } catch (e) {} KD.signOut().then(() => location.reload()); } } catch (e) {} };
    chk(); KD._sg = setInterval(chk, 300000);
  };
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
    const busy = comp.state.ce || comp.state.es || comp.state.nc || comp.state.mf || comp.state.me || comp.state.edit;
    const reset = { cats: {}, eov: {}, alt: Object.fromEntries(KD.M.est.map(e => [e.nome, e.alterna])), cOv: {}, cDel: [], nCards: [], mU: [], mEd: {}, mDel: [] };
    if (busy) { setTimeout(() => KD.refresh2(comp, reset), 900); return; }
    KD.refresh2(comp, reset);
  };
  KD.refresh2 = (comp, reset) => { Object.keys(reset).forEach(k => { KD._snap[k] = JSON.stringify(reset[k]); }); comp.setState(reset); };
})();
