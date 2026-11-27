/* Kontar · entrada: Carregando (7), Erro (8), Login (5), Sessão encerrada (3), Nova senha (6) e Onboarding (9).
   Fonte visual: canvas "Kontar 09b…09g". O CSS de cada tela é o do canvas, só que prefixado por #kboot/#kload em tempo de execução (scope()),
   então não vaza pro app. Este arquivo é montado por /build.py a partir de src/boot/*.js — não edite app/boot.js à mão. */
(function () {
  'use strict';
  const CFG = window.KONTAR_CONFIG || {};
  const EXP = 'kontar-sessao-vencida';
  const reduce = () => matchMedia('(prefers-reduced-motion:reduce)').matches;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const toEmail = v => /@/.test(v) ? v : v.toLowerCase() + '@kontar.app';
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const LS = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }, del(k) { try { localStorage.removeItem(k); } catch (e) {} } };
  const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname), qs = k => local && new URLSearchParams(location.search).get(k);

  /* ---- CSS do canvas → prefixado (sem Shadow DOM: o filtro "goo" e o @property precisam do escopo do documento) ---- */
  const PROPS = [];
  function scope(css, S) {
    let out = '', i = 0; const n = css.length;
    while (i < n) {
      const m = css.slice(i).match(/^(\s|\/\*[\s\S]*?\*\/)*/); i += m[0].length; if (i >= n) break;
      const b = css.indexOf('{', i), head = css.slice(i, b).trim(); let d = 1, j = b + 1;
      while (j < n && d) { const c = css[j]; if (c === '{') d++; else if (c === '}') d--; j++; }
      const body = css.slice(b + 1, j - 1); i = j;
      if (/^@(media|supports)/.test(head)) out += head + '{' + scope(body, S) + '}';
      else if (/^@(keyframes|font-face)/.test(head)) out += head + '{' + body + '}';
      else if (/^@property/.test(head)) PROPS.push(head + '{' + body + '}');
      else out += head.split(',').map(s => { s = s.trim(); return /^(html|body|:root)$/.test(s) ? S : S + ' ' + s.replace(/^(html|body)\s+/, ''); }).join(',') + '{' + body + '}';
    }
    return out;
  }
  function injectProps() { if (!PROPS.length || document.getElementById('kb-props')) return; const s = document.createElement('style'); s.id = 'kb-props'; s.textContent = PROPS.join(''); document.head.appendChild(s); }

  const GOO = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="goo" x="-20%" y="-50%" width="140%" height="200%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b"/><feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 34 -15"/></filter></svg>';
  const ARROW = (c, w) => '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="' + c + '" stroke-width="' + (w || 2.2) + '" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';
  const LQ = (id, label) => '<button class="lq" id="' + id + '" type="submit"><span class="shp glow" aria-hidden="true"><span class="pill"></span><span class="dot"></span></span><span class="shp g" aria-hidden="true"><span class="pill"></span><span class="dot"></span></span><span class="shp d" aria-hidden="true"><span class="pill"></span><span class="dot"></span></span><span class="lb">' + label + '</span><span class="arr" aria-hidden="true">' + ARROW('#fff') + '</span></button>';

  /* ---- #kboot: uma tela por vez ---- */
  let root, styleEl;
  const css0 = '#kboot{position:fixed;inset:0;z-index:2147483000;overflow:auto;background:#000;color:#fff;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;transition:opacity .5s ease}';
  function shell() {
    if (root && root.isConnected) return root;
    const st = document.createElement('style'); st.textContent = css0; document.head.appendChild(st);
    styleEl = document.createElement('style'); document.head.appendChild(styleEl);
    root = document.createElement('div'); root.id = 'kboot'; document.body.appendChild(root); return root;
  }
  const $ = s => root ? root.querySelector(s) : null, $$ = s => root ? [...root.querySelectorAll(s)] : [];
  function mount(css, html) { shell(); styleEl.textContent = scope(css, '#kboot'); injectProps(); root.style.opacity = '1'; root.style.pointerEvents = ''; root.removeAttribute('style'); root.innerHTML = html; root.scrollTop = 0; }
  const dismissRoot = () => { if (!root) return; const r = root; root = null; r.style.opacity = '0'; r.style.pointerEvents = 'none'; setTimeout(() => r.remove(), 600); };

  /* botão líquido: a pílula mede o próprio texto */
  function liq() { $$('.lq').forEach(b => { const l = b.querySelector('.lb, .lbl'); const set = () => b.style.setProperty('--pw', l.offsetWidth + 'px'); set(); if (document.fonts) document.fonts.ready.then(set); }); }
  /* botão de olho dentro de cada campo de senha: mostra/oculta o que está sendo digitado (mantém o foco e o cursor) */
  function pwEye() {
    const OLHO = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
    const RISCO = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path d="M4 4l16 16"/></svg>';
    document.querySelectorAll('input[type="password"]').forEach(inp => {
      if (inp.dataset.eye) return; inp.dataset.eye = '1';
      const w = document.createElement('div'); w.style.cssText = 'position:relative;width:100%'; inp.parentNode.insertBefore(w, inp); w.appendChild(inp); inp.style.paddingRight = '56px';
      const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Mostrar senha'); b.setAttribute('aria-pressed', 'false'); b.title = 'Mostrar senha';
      b.style.cssText = 'position:absolute;right:8px;top:50%;transform:translateY(-50%);width:36px;height:36px;border:0;border-radius:50%;background:transparent;color:#7C7C85;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;transition:color .25s ease,background .25s ease';
      const ic = document.createElement('span'); ic.style.cssText = 'display:flex;transition:opacity .18s ease'; ic.innerHTML = OLHO; b.appendChild(ic);
      b.onmouseenter = () => { b.style.color = '#F2F0EB'; b.style.background = 'rgba(255,255,255,.08)'; };
      b.onmouseleave = () => { b.style.color = inp.type === 'text' ? '#F2F0EB' : '#7C7C85'; b.style.background = 'transparent'; };
      b.addEventListener('mousedown', e => e.preventDefault());   // não tira o foco do campo
      b.addEventListener('click', () => {
        const ver = inp.type === 'password', a = inp.selectionStart, z = inp.selectionEnd;
        inp.type = ver ? 'text' : 'password'; try { inp.setSelectionRange(a, z); } catch (e) {}
        b.setAttribute('aria-pressed', ver ? 'true' : 'false'); b.setAttribute('aria-label', ver ? 'Ocultar senha' : 'Mostrar senha'); b.title = ver ? 'Ocultar senha' : 'Mostrar senha';
        ic.style.opacity = '0'; setTimeout(() => { ic.innerHTML = ver ? RISCO : OLHO; ic.style.opacity = '1'; }, 140); b.style.color = ver ? '#F2F0EB' : '#7C7C85';
      });
      w.appendChild(b);
    });
  }
  const measure = b => { const l = b.querySelector('.lb, .lbl'); b.style.setProperty('--pw', l.offsetWidth + 'px'); };
  /* parallax da imagem canelada (±16px/±11px), suavização por tempo (dt), não por frame */
  function parallax() {
    const img = $('.L .img'); if (!img || reduce()) return; let tx = 0, ty = 0, x = 0, y = 0, last = performance.now();
    const mv = e => { tx = (e.clientX / innerWidth - .5) * 32; ty = (e.clientY / innerHeight - .5) * 22; }; addEventListener('mousemove', mv);
    const tick = t => { if (!img.isConnected) { removeEventListener('mousemove', mv); return; } const dt = Math.min(64, t - last); last = t; const k = 1 - Math.exp(-dt / 140);
      x += (tx - x) * k; y += (ty - y) * k; img.style.setProperty('--px', x.toFixed(2) + 'px'); img.style.setProperty('--py', y.toFixed(2) + 'px'); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }
  const busyBtn = (go, on, txt, idle) => { go.classList.toggle('busy', on); go.setAttribute('aria-busy', on); go.querySelector('.lb').textContent = on ? txt : idle; measure(go); };

  /* ---- logo do Kontar (item 10): ícone + wordmark em contorno. Dados em src/logo.json ---- */
  const LOGO_ICON = 'M206.50 3.50A3.5 3.5 0 0 0 203.00 0.00L42.45 0.00A3.5 3.5 0 0 0 39.97 1.03L1.03 39.97A3.5 3.5 0 0 0 0.00 42.45L0.00 47.50A3.5 3.5 0 0 0 1.03 49.98L161.63 210.53A3.5 3.5 0 0 0 166.57 210.53L204.03 173.07A3.5 3.5 0 0 0 204.03 168.13L95.90 60.00L203.00 60.00A3.5 3.5 0 0 0 206.50 56.50ZM60.00 122.35A3.5 3.5 0 0 0 54.03 119.87L1.03 172.87A3.5 3.5 0 0 0 0.00 175.35L0.00 209.50A3.5 3.5 0 0 0 3.50 213.00L56.50 213.00A3.5 3.5 0 0 0 60.00 209.50Z', LOGO_TEXT = 'M111 0H419V-410L616 -639L1037 0H1392L819 -846L1377 -1490H1008L640 -1060C566 -971 492 -883 419 -795V-1490H111ZM1845.32 24C2166.32 24 2382.32 -196 2382.32 -527C2382.32 -858 2166.32 -1080 1845.32 -1080C1525.32 -1080 1309.32 -858 1309.32 -527C1309.32 -196 1525.32 24 1845.32 24ZM1845.32 -215C1702.32 -215 1606.32 -331 1606.32 -527C1606.32 -724 1703.32 -841 1845.32 -841C1988.32 -841 2085.32 -724 2085.32 -527C2085.32 -331 1989.32 -215 1845.32 -215ZM2767.64 -587C2767.64 -751 2852.64 -824 2974.64 -824C3097.64 -824 3168.64 -749 3168.64 -607V0H3462.64V-661C3462.64 -928 3317.64 -1078 3092.64 -1078C2940.64 -1078 2833.64 -1010 2762.64 -890V-1056H2472.64V0H2767.64ZM4206.96 -1056H3990.96V-1344H3695.96V-1056H3513.96V-825H3695.96V-280C3695.96 -88 3802.96 0 4034.96 0H4206.96V-231H4093.96C4013.96 -231 3990.96 -254 3990.96 -326V-825H4206.96ZM4625.28 18C4787.28 18 4878.28 -46 4934.28 -149H4938.28V0H5226.28V-716C5226.28 -942 5060.28 -1078 4771.28 -1078C4481.28 -1078 4309.28 -940 4296.28 -722H4573.28C4580.28 -803 4652.28 -859 4762.28 -859C4870.28 -859 4935.28 -805 4935.28 -727V-720C4935.28 -652 4867.28 -643 4674.28 -624C4454.28 -604 4262.28 -536 4262.28 -298C4262.28 -87 4414.28 18 4625.28 18ZM4707.28 -187C4608.28 -187 4544.28 -231 4544.28 -306C4544.28 -390 4624.28 -429 4725.28 -444C4820.28 -459 4903.28 -473 4937.28 -492V-386C4937.28 -272 4849.28 -187 4707.28 -187ZM5362.6 0H5657.6V-572C5657.6 -731 5746.6 -815 5867.6 -815C5917.6 -815 5972.6 -811 5994.6 -810V-1061C5970.6 -1062 5941.6 -1063 5907.6 -1063C5768.6 -1063 5688.6 -1003 5649.6 -876H5646.6V-1056H5362.6Z';
  /* lockup horizontal; h = altura do ícone em px. txt/ic = cores (use 'transparent' pra esconder uma parte) */
  const LOGO = (h, txt, ic) => '<svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700.87 213" height="' + h + '" width="' + (h * 700.87 / 213).toFixed(1) + '" role="img" aria-label="Kontar" style="display:block;flex:none"><path fill="' + (ic || '#5B3DF5') + '" d="' + LOGO_ICON + '"/><path transform="translate(270.40 159.75) scale(0.07148)" fill="' + (txt || '#FFFFFF') + '" d="' + LOGO_TEXT + '"/></svg>';

  /* ================= 7. CARREGANDO (09e) ================= */
  const CSS_LOAD = `
:root{--roxo:#5B3DF5;--claro:#F4F3F1;--E:cubic-bezier(.65,0,.35,1);--T:650ms}
*{box-sizing:border-box}
.ld{position:fixed;inset:0;z-index:10;background:var(--claro);isolation:isolate;transition:opacity .55s ease;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;color:#fff}
.ld.gone{opacity:0;pointer-events:none}
.cols{position:absolute;inset:0;display:flex}
.col{position:relative;flex:1 1 0;height:100%;overflow:hidden;margin-right:-.5px}
.col i{position:absolute;left:0;right:0;height:calc(50% + 1px);overflow:hidden}
.col .t{top:0}.col .b{bottom:0}
.col i::before{content:"";position:absolute;left:0;right:0;height:200%;will-change:transform;transition:transform var(--T) var(--E);transition-delay:var(--d)}
.col .t::before{bottom:0;background:linear-gradient(to bottom,rgba(244,243,241,0) 0%,#D9D0FF 7%,#8B6DFF 17%,#4B25F0 27%,#2A0FB4 35%,#0C043C 40%,#000 45%,#000 100%)}
.col .b::before{top:0;background:linear-gradient(to top,rgba(244,243,241,0) 0%,#D9D0FF 7%,#8B6DFF 17%,#4B25F0 27%,#2A0FB4 35%,#0C043C 40%,#000 45%,#000 100%)}
.ld.light .col .t::before{transform:translateY(100%)}
.ld.light .col .b::before{transform:translateY(-100%)}
.col::after{content:"";position:absolute;top:0;bottom:0;right:0;width:1px;background:rgba(255,255,255,.035)}
.ld::after{content:"";position:absolute;inset:0;z-index:3;pointer-events:none;opacity:.28;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
.cc{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;text-align:center;pointer-events:none;mix-blend-mode:difference;color:#fff}
.cc h1{margin:0;font-size:clamp(34px,4.4vw,60px);font-weight:700;letter-spacing:-.055em;line-height:.9;text-transform:uppercase}
.cc .ln{width:1px;height:34px;background:#fff;opacity:.7}
.cc .wm{display:flex;align-items:center;gap:10px;font-size:19px;font-weight:700;letter-spacing:-.02em}
.mk{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;pointer-events:none;visibility:hidden}
.mk>*{visibility:hidden}.mk .wm{display:flex;align-items:center;gap:10px;font-size:19px;font-weight:700;letter-spacing:-.02em}
.mk .wm svg{visibility:visible}
.mk h1{margin:0;font-size:clamp(34px,4.4vw,60px);font-weight:700;letter-spacing:-.055em;line-height:.9;text-transform:uppercase}.mk .ln{width:1px;height:34px}
.cc>*,.mk .wm svg{transition:transform .9s var(--E),opacity .7s ease}
.ld.fin .cc>*,.ld.fin .mk .wm svg{transform:translateY(-36px);opacity:0}
.ld.fin .cc h1{transition-delay:.35s}.ld.fin .cc .ln{transition-delay:.45s}.ld.fin .cc .wm,.ld.fin .mk .wm svg{transition-delay:.55s}
@media (prefers-reduced-motion:reduce){.col i::before{transition:none}.ld{transition:opacity .3s ease}}`;
  /* Roteiro (cada gatilho move as colunas UMA vez): abre no preto → claro → (não carregou) preto → claro … ; a conclusão entra na fila e o ÚLTIMO gatilho é sempre claro → preto.
     Tempo encurtado a pedido do Jay (≈2,7s numa carga rápida; o canvas tinha ≈4,2s). */
  let LOADER = null;
  window.KontarLoaderNovo = () => loader();   // pra conferir a animação quadro a quadro com o app aberto
  function loader() {
    if (LOADER) LOADER.abort(true);
    const st = document.createElement('style'); st.textContent = scope(CSS_LOAD, '#kload'); injectProps(); document.head.appendChild(st);
    const el = document.createElement('div'); el.id = 'kload';
    el.innerHTML = '<div class="ld" role="status" aria-live="polite" aria-label="Carregando"><div class="cols" aria-hidden="true"></div><div class="cc"><h1>Organizando<br>suas finanças</h1><span class="ln"></span><span class="wm">' + LOGO(28, '#FFFFFF', 'transparent') + '</span></div><div class="mk" aria-hidden="true"><h1>Organizando<br>suas finanças</h1><span class="ln"></span><span class="wm">' + LOGO(28, 'transparent', '#5B3DF5') + '</span></div></div>';
    document.body.appendChild(el); const ld = el.firstChild, cols = ld.firstChild; el.style.cssText = 'position:fixed;inset:0;z-index:2147483600';
    const N = 20, T = 650, SPREAD = 380, HOLD = 300, TOTAL = T + SPREAD + 80, J = [.31, .82, .12, .67, .45, .93, .05, .58, .24, .76, .39, .88, .17, .63, .5, .97, .09, .71, .28, .84];
    for (let i = 0; i < N; i++) { const c = document.createElement('div'); c.className = 'col'; c.innerHTML = '<i class="t"></i><i class="b"></i>'; cols.appendChild(c); }
    const each = fn => [...cols.children].forEach((c, i) => c.style.setProperty('--d', Math.round(fn(i)) + 'ms')), edge = i => 1 - Math.abs(i - (N - 1) / 2) / ((N - 1) / 2);
    /* espera que acaba antes se o app ficar pronto: a abertura sai na hora, sem terminar a fase em que está */
    const waitOr = ms => new Promise(r => { const t0 = Date.now(), iv = setInterval(() => { if (ready || dead || Date.now() - t0 >= ms) { clearInterval(iv); r(); } }, 30); });
    let claro = false;
    const toLight = () => { each(i => edge(i) * SPREAD * .8 + J[i] * SPREAD * .2); ld.classList.add('light'); claro = true; return waitOr(TOTAL); };
    const toDark = () => { each(i => (1 - i / (N - 1)) * SPREAD * .55 + edge(i) * SPREAD * .3 + J[i] * SPREAD * .15); ld.classList.remove('light'); claro = false; return waitOr(TOTAL); };
    let ready = false, dead = false, resolveGone; const gone = new Promise(r => { resolveGone = r; });
    const end = () => { if (dead) return; dead = true; ld.classList.add('gone'); setTimeout(() => { el.remove(); st.remove(); resolveGone(); if (LOADER === ctl) LOADER = null; }, 650); };
    const ctl = { finish: () => { ready = true; return gone; }, abort: (now) => { if (now) { dead = true; el.remove(); st.remove(); resolveGone(); LOADER = null; } else end(); return gone; } };
    LOADER = ctl; window.KontarLoader = ctl;
    (async () => { await wait(250);
      if (reduce()) { while (!ready && !dead) await wait(120); end(); return; }
      for (;;) { if (dead || ready) break; await toLight(); if (ready) break; await waitOr(HOLD); if (ready || dead) break; await toDark(); if (ready) break; await waitOr(HOLD); }
      if (dead) return;
      /* saída: o último gatilho é sempre claro → escuro; as colunas fecham enquanto o texto sobe e a tela toda faz fade */
      if (claro) { each(i => (1 - i / (N - 1)) * SPREAD * .55 + edge(i) * SPREAD * .3 + J[i] * SPREAD * .15); ld.classList.remove('light'); claro = false; await wait(420); }
      ld.classList.add('fin'); await wait(260); end(); })();
    return ctl;
  }

  /* ================= 8. ERRO (09f) ================= */
  const CSS_ERR = `
:root{--ink:#fff;--mut:#9A9AA3;--bone:#F2F0EB;--roxo:#5B3DF5;--amar:#FFC24A;--verm:#FF5A4D;--rule:rgba(255,255,255,.2);--pad:clamp(20px,4.4vw,64px)}
*{box-sizing:border-box}
html,body{margin:0;min-height:100%;background:#000;color:var(--ink);font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
body{overflow-x:hidden}
@keyframes up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes wipe{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
.sign{min-height:100vh;display:grid;grid-template-rows:auto 1fr auto;padding:0 var(--pad)}
.top{display:flex;align-items:center;justify-content:space-between;height:84px;position:relative}
.top::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--rule);transform-origin:left;animation:wipe .9s cubic-bezier(.65,0,.35,1) both}
.wm{display:flex;align-items:center;gap:9px;font-size:21px;font-weight:700;letter-spacing:-.02em}
.wm i{width:27px;height:27px;border-radius:8px;background:var(--roxo);display:block}
.lbl{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--mut);display:flex;align-items:center;gap:10px}
.lbl::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--verm);animation:pulse 1.8s ease-in-out infinite}
.mid{display:flex;flex-direction:column;justify-content:center;gap:clamp(28px,5vh,48px);padding:clamp(28px,6vh,64px) 0}
.hd{display:flex;align-items:center;gap:clamp(20px,3vw,44px);animation:up .7s cubic-bezier(.65,0,.35,1) .1s both}
.bul{flex:none;width:clamp(76px,10vw,148px);aspect-ratio:1;border-radius:50%;background:var(--amar);color:#000;display:grid;place-items:center;font-weight:700;font-size:clamp(52px,7vw,104px);line-height:1;letter-spacing:-.04em;padding-bottom:.04em}
h1{margin:0;font-size:clamp(34px,5.8vw,88px);font-weight:700;letter-spacing:-.06em;line-height:.88;text-transform:uppercase}
.row{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:clamp(20px,3vw,44px);animation:up .7s cubic-bezier(.65,0,.35,1) .22s both}
.sp{width:clamp(76px,10vw,148px)}
.row p{margin:0;font-size:clamp(16px,1.5vw,20px);line-height:1.4;color:var(--mut);max-width:440px;text-wrap:pretty}.row p b{color:#fff;font-weight:500}
.go{height:56px;padding:0 10px 0 28px;border-radius:9999px;border:0;background:var(--bone);color:#000;font:inherit;font-size:15.5px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:18px;transition:filter .25s ease}
.go .ar{width:36px;height:36px;border-radius:50%;background:#000;display:grid;place-items:center;transition:transform .3s cubic-bezier(.65,0,.35,1)}
.go:hover{filter:brightness(.93)}.go:hover .ar{transform:translateX(3px)}.go:disabled{opacity:.5;cursor:default}.go:disabled .ar{transform:none}
.bot{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:84px;position:relative}
.bot::before{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:var(--rule);transform-origin:left;animation:wipe .9s cubic-bezier(.65,0,.35,1) .1s both}
.det{display:inline-flex;align-items:center;gap:9px;min-height:34px;padding:7px 15px;border-radius:9999px;border:1px solid var(--verm);color:var(--verm);font:500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.01em;max-width:100%;overflow-wrap:anywhere}
.det::before{content:"";flex:none;width:6px;height:6px;border-radius:50%;background:var(--verm)}
.bot small{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#6A6A72}
@media (max-width:760px){.row{grid-template-columns:1fr}.sp{display:none}.hd{align-items:flex-start;flex-direction:column}.bot small{display:none}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}`;
  function failed(msg, retry) {
    mount(CSS_ERR, '<main class="sign"><header class="top"><span class="wm">' + LOGO(30) + '</span><span class="lbl">Erro ao carregar</span></header><section class="mid" aria-labelledby="t"><div class="hd"><span class="bul" aria-hidden="true">!</span><h1 id="t">Não deu pra<br>carregar seus dados</h1></div><div class="row"><span class="sp" aria-hidden="true"></span><p>Pode ser a internet ou uma instabilidade nossa. <b>Seus dados continuam salvos.</b></p><button class="go" type="button" id="go"><span class="t">Tentar de novo</span><span class="ar" aria-hidden="true">' + ARROW('#fff', 2.4) + '</span></button></div></section><footer class="bot"><span class="det" id="det" role="status">Detalhe: ' + esc(msg || 'erro desconhecido') + '</span><small>Se continuar, tente mais tarde</small></footer></main>');
    const go = $('#go'), t = go.querySelector('.t');
    go.onclick = async () => { t.textContent = 'Tentando…'; go.disabled = true; try { await retry(); } finally { if (go.isConnected) { t.textContent = 'Tentar de novo'; go.disabled = false; } } };
  }

  /* ================= CSS comum (Login 09c + Nova senha 09d): painel 2 colunas, botão líquido escuro, stroke opaco ================= */
  const CSS_PANEL = `
@property --a{syntax:'<angle>';inherits:true;initial-value:0deg}
:root{--ink:#fff;--mut:#9A9AA3;--bone:#F2F0EB;--roxo:#5B3DF5;--amar:#FFC24A;--dk:#07060C}
*{box-sizing:border-box}
html,body{margin:0;min-height:100%;background:#05030F;color:var(--ink);font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
.stage{position:relative;z-index:1;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px 24px}
.panel{position:relative;display:grid;grid-template-columns:1.04fr 1fr;border-radius:30px;overflow:hidden;isolation:isolate;background:var(--dk);box-shadow:0 40px 120px rgba(0,0,0,.55);animation:cIn .9s cubic-bezier(.65,0,.35,1) both}
.panel::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;z-index:5;background:linear-gradient(160deg,#3A345A,#130F29);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
@keyframes cIn{from{opacity:0;transform:translateY(16px) scale(.985)}to{opacity:1;transform:none}}
.L{position:relative;padding:56px;display:flex;flex-direction:column;min-width:0;overflow:hidden}
.L .img{position:absolute;left:-6%;right:-6%;top:-5%;z-index:-2;transform:translate3d(var(--px,0px),var(--py,0px),0);will-change:transform;background:url("assets/fluted-glass.webp") 60% 30%/cover no-repeat,#15112B;animation:drift 22s cubic-bezier(.65,0,.35,1) infinite alternate}
.L .shade{position:absolute;inset:0;z-index:-1}
@keyframes drift{from{background-position:58% 26%}to{background-position:66% 36%}}
.wm{display:flex;align-items:center;gap:12px;font-size:21px;font-weight:700;letter-spacing:-.02em;color:var(--bone)}
.wm i{width:27px;height:27px;border-radius:9px;background:var(--roxo);display:block}
.tt{display:flex;flex-direction:column;gap:18px}
h1{margin:0;font-size:84px;font-weight:700;letter-spacing:-0.065em;line-height:.85}
.sub{margin:0;font-size:26px;line-height:1.2;font-weight:500;letter-spacing:-.02em;color:#fff;max-width:400px;text-wrap:balance}
.R{position:relative;padding:56px;display:flex;flex-direction:column;gap:36px;min-width:0;background:rgba(7,6,12,.58);-webkit-backdrop-filter:blur(26px) saturate(1.2);backdrop-filter:blur(26px) saturate(1.2);border-left:1px solid rgba(255,255,255,.06)}
.form{display:flex;flex-direction:column}
.fld{display:flex;flex-direction:column;gap:8px}
input{height:52px;width:100%;padding:0 22px;border-radius:9999px;border:1px solid rgba(255,255,255,.2);background:rgba(0,0,0,.4);color:#fff;font:inherit;font-size:15px;outline:0;transition:border-color .25s ease,background .25s ease}
input::placeholder{color:#6A6A72}
input:focus{border-color:var(--bone);background:rgba(0,0,0,.55)}
.lk{font-size:13px;color:var(--mut);text-decoration:underline;text-underline-offset:3px;cursor:pointer;white-space:nowrap}
.lk:hover{color:#fff}
.lq{--h:52px;--gap:16px;--E:cubic-bezier(.22,1,.36,1);--pw:140px;--uw:var(--pw);--off:calc(var(--pw) - var(--h));position:relative;height:var(--h);width:var(--pw);flex:none;display:inline-block;text-align:left;cursor:pointer;border:0;padding:0;background:none;font:inherit;color:#fff;transition:width .7s var(--E);animation:spin 5.5s linear infinite}
@keyframes spin{to{--a:360deg}}
.lq:hover{--uw:calc(var(--pw) + var(--gap) + var(--h));--off:calc(var(--pw) + var(--gap));width:var(--uw)}
.lq .shp{position:absolute;inset:-14px -80px -14px -14px;pointer-events:none}
.lq .g{filter:url(#goo)}
.lq .glow{filter:blur(13px) saturate(1.3);opacity:.45;transition:opacity .5s ease}
.lq:hover .glow{opacity:.95}
.lq .shp span{position:absolute;top:14px;height:var(--h)}
.lq .g span,.lq .glow span{background:conic-gradient(from var(--a),#fff 0deg,#CDBBFF 9deg,#7F59FF 34deg,rgba(120,90,255,.55) 85deg,rgba(110,80,255,.38) 170deg,rgba(120,90,255,.55) 265deg,#8E5CFF 322deg,#E8DFFF 350deg,#fff 360deg);background-size:var(--uw) var(--h);transition:left .7s var(--E),width .7s var(--E),background-size .7s var(--E),background-position .7s var(--E)}
.lq .shp .pill{left:14px;width:var(--pw);border-radius:9999px;background-position:0 0}
.lq .shp .dot{width:var(--h);border-radius:50%;left:calc(14px + var(--off));background-position:calc(-1 * var(--off)) 0}
.lq .d span{background:#08070D;transition:left .7s var(--E)}
.lq .d .pill{left:15.5px;top:15.5px;width:calc(var(--pw) - 3px);height:calc(var(--h) - 3px);border-radius:9999px}
.lq .d .dot{top:15.5px;width:calc(var(--h) - 3px);height:calc(var(--h) - 3px);border-radius:50%;left:calc(15.5px + var(--off))}
.lq .lb{position:relative;display:inline-flex;align-items:center;height:var(--h);padding:0 28px;font-size:14.5px;font-weight:700;white-space:nowrap;letter-spacing:.01em}
.lq .arr{position:absolute;top:0;width:var(--h);height:var(--h);left:var(--off);display:flex;align-items:center;justify-content:center;opacity:0;transition:left .7s var(--E),opacity .35s ease}
.lq .arr svg{transform:rotate(-45deg);transition:transform .6s var(--E)}
.lq:hover .arr{opacity:1;transition:left .7s var(--E),opacity .5s ease .12s}
.lq:hover .arr svg{transform:rotate(0)}
.lq:focus-visible{outline:2px solid #A594FF;outline-offset:6px;border-radius:9999px}
.lq:active .d span{background:#000}
.lq.busy{animation-duration:1.5s;pointer-events:none;cursor:progress}
.lq.busy .glow{opacity:.9}
.L>*,.R>*{animation:up .7s cubic-bezier(.65,0,.35,1) both}
.R>*:nth-child(1){animation-delay:.25s}.R>*:nth-child(2){animation-delay:.35s}.R>*:nth-child(3){animation-delay:.45s}
@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}`;

  const CSS_LOGIN = CSS_PANEL + `
.bg{position:fixed;inset:0;overflow:hidden;background:#0A0A0E url("assets/login-bg.jpg") center/cover no-repeat;pointer-events:none;z-index:0}
.bg::after{content:"";position:absolute;inset:0;opacity:.18;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
.panel{width:min(1080px,100%,calc((100vh - 64px)*1.6));aspect-ratio:16/10}
.L{justify-content:space-between}
.L .img{height:92%}
.L .shade{background:linear-gradient(180deg,rgba(7,6,12,0) 0%,rgba(7,6,12,.08) 22%,rgba(7,6,12,.72) 52%,rgba(7,6,12,.95) 72%,#07060C 88%)}
.R{justify-content:space-between}
.form{gap:14px}
.err{min-height:18px;font-size:12.5px;line-height:1.4;color:#FF6A5C}
.acts{display:flex;align-items:center;gap:22px;margin-top:10px}
.foot{display:flex;align-items:center;gap:14px;font-size:12px;line-height:1.5;color:#8A8A93}
.foot svg{flex:none}
.foot span{max-width:300px}
.lq:disabled{opacity:.5;cursor:default;pointer-events:none}
.L>.wm{animation-delay:.2s}.L>.tt{animation-delay:.3s}
@media (max-width:860px){.stage{padding:16px}.panel{grid-template-columns:1fr;aspect-ratio:auto;width:min(560px,100%)}.L{min-height:340px;padding:36px 28px}.R{padding:36px 28px}h1{font-size:72px}}`;

  const CSS_NOVA = CSS_PANEL + `
.bg{position:fixed;inset:0;background:#000;pointer-events:none;z-index:0}
.panel{width:min(1080px,100%)}
.L{justify-content:flex-end;min-height:300px}
.L .img{height:112%}
.L .shade{background:linear-gradient(40deg,#07060C 0%,rgba(7,6,12,.95) 22%,rgba(7,6,12,.8) 42%,rgba(7,6,12,.5) 58%,rgba(7,6,12,.14) 78%,rgba(7,6,12,0) 100%)}
.tt .ico{display:block;margin-bottom:6px}
.R{justify-content:stretch}
.form{justify-content:space-between;gap:14px;flex:1}
.grp{display:flex;flex-direction:column;gap:14px}
.meter{display:grid;grid-template-columns:minmax(0,auto) minmax(40px,1fr) auto;align-items:center;column-gap:14px;padding:0 16px;margin-top:-2px;font-size:12.5px;line-height:1.2;white-space:nowrap}
.meter #mh{min-width:0;overflow:hidden;text-overflow:ellipsis;color:#7C7C85;transition:color .3s ease}
.meter b{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#7C7C85;transition:color .5s ease}
.bar{display:block;height:4px;border-radius:9999px;background:#26262B;overflow:hidden}.bar span{display:block;height:100%;width:0;border-radius:9999px;background:#26262B;transition:width .5s cubic-bezier(.65,0,.35,1),background .5s cubic-bezier(.65,0,.35,1)}
.acts{display:flex;align-items:center;justify-content:space-between;gap:22px}
.lq:disabled{opacity:.35;cursor:default;pointer-events:none}
.L>.tt{animation-delay:.3s}
@media (max-width:860px){.stage{padding:16px}.panel{grid-template-columns:1fr;width:min(560px,100%)}.L{min-height:340px;padding:36px 28px}.R{padding:36px 28px}h1{font-size:72px}}`;

  /* ================= 5. LOGIN (09c) ================= */
  function login(sb, note) {
    mount(CSS_LOGIN, GOO + '<div class="bg" aria-hidden="true"></div><main class="stage"><section class="panel" aria-labelledby="t"><div class="L"><div class="img" aria-hidden="true"></div><div class="shade" aria-hidden="true"></div><span class="wm">' + LOGO(30) + '</span><div class="tt"><p class="sub">' + esc(note || 'Seus dados ficam salvos e só você vê.') + '</p></div></div>'
      + '<div class="R"><h1 id="t">Entrar.</h1><form class="form" id="f" autocomplete="on" novalidate><div class="fld"><input id="u" type="text" inputmode="email" autocapitalize="none" autocorrect="off" spellcheck="false" name="email" placeholder="E-mail ou usuário" autocomplete="username" aria-label="E-mail ou usuário"></div><div class="fld"><input id="p" type="password" name="password" placeholder="Senha" autocomplete="current-password" aria-label="Senha"></div><div class="err" id="x" role="alert" aria-live="polite"></div><div class="acts">' + LQ('go', 'Fazer Login') + '<span class="lk" id="r" role="button" tabindex="0">Esqueci a senha</span></div></form><div class="foot" style="margin-top:-6px"><span>Ainda não tem conta? <span class="lk" id="cc" role="button" tabindex="0">Criar conta</span></span></div>'
      + '<div class="foot"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9A9AA3" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><span>Esqueceu a senha? Escreva seu e-mail e toque em “Esqueci a senha”: mandamos um link pra criar outra.</span></div></div></section></main>');
    liq(); parallax(); pwEye();
    const x = $('#x'), u = $('#u'), p = $('#p'), go = $('#go'), say = (t, ok) => { x.style.color = ok ? '#00E08A' : '#FF6A5C'; x.textContent = t; };
    const lock = on => { busyBtn(go, on, 'Entrando…', 'Fazer Login'); u.disabled = p.disabled = on; };
    $('#f').addEventListener('submit', async e => { e.preventDefault(); if (go.classList.contains('busy')) return; x.textContent = '';
      if (!(u.value.trim() && p.value)) return say('Preencha e-mail e senha.');
      lock(true); let r; try { r = await sb.auth.signInWithPassword({ email: toEmail(u.value.trim()), password: p.value }); } catch (er) { r = { error: er }; }
      if (r.error) { lock(false); return say(/Invalid login/i.test(r.error.message) ? 'E-mail/usuário ou senha não conferem.' : r.error.message); }
      LS.del(EXP); start(sb, r.data.user); });
    const forgot = async () => { const em = u.value.trim(); if (!em) return say('Escreva seu e-mail primeiro.');
      const r = await sb.auth.resetPasswordForEmail(toEmail(em), { redirectTo: location.origin + location.pathname }); say(r.error ? r.error.message : 'Mandamos um link pro seu e-mail. Vale por 30 min.', !r.error); };
    $('#cc').onclick = () => signup(sb); $('#cc').onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); signup(sb); } };
    $('#r').onclick = forgot; $('#r').onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); forgot(); } };
  }

  /* ================= 5b. CRIAR CONTA ================= */
  function signup(sb) {
    mount(CSS_NOVA, GOO + '<div class="bg" aria-hidden="true"></div><main class="stage"><section class="panel" aria-labelledby="t"><div class="L"><div class="img" aria-hidden="true"></div><div class="shade" aria-hidden="true"></div><div class="tt"><h1 id="t">Criar<br>conta.</h1><p class="sub">Leva um minuto. Depois a gente monta o seu Kontar juntos.</p></div></div>'
      + '<div class="R"><form class="form" id="f" autocomplete="on" novalidate><div class="grp"><div class="fld"><input id="e" type="text" inputmode="email" autocapitalize="none" autocorrect="off" spellcheck="false" name="email" placeholder="E-mail" autocomplete="email" aria-label="E-mail"></div><div class="fld"><input id="p1" type="password" name="new-password" placeholder="Senha" autocomplete="new-password" aria-label="Senha"></div><div class="fld"><input id="p2" type="password" name="confirm-password" placeholder="Confirmar senha" autocomplete="new-password" aria-label="Confirmar senha"></div><div class="meter" aria-live="polite"><span id="mh">Mínimo 8 caracteres</span><span class="bar"><span id="mb"></span></span><b id="ml">Força</b></div><div class="err" id="x" role="alert" aria-live="polite"></div></div><div class="acts">' + LQ('go', 'Criar conta').replace('type="submit"', 'type="submit" disabled') + '<span class="lk" id="vo" role="button" tabindex="0">Já tenho conta</span></div></form></div></section></main>');
    liq(); parallax(); pwEye();
    const e = $('#e'), p1 = $('#p1'), p2 = $('#p2'), go = $('#go'), mb = $('#mb'), ml = $('#ml'), mh = $('#mh'), x = $('#x');
    const lax = !!CFG.aceitarUsuarioSemEmail;   // flag de teste (config.js): aceita usuário sem e-mail
    const ok = () => { const v = e.value.trim(); return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || (lax && /^[^\s@]{3,}$/.test(v)); };
    if (lax) { e.placeholder = 'E-mail ou usuário'; e.setAttribute('aria-label', 'E-mail ou usuário'); e.inputMode = 'text'; }
    const upd = () => { const c = KD.pwCheck(p1.value, p2.value); mb.style.width = c.pct; mb.style.background = c.col; ml.style.color = c.lv ? c.col : '#7C7C85'; ml.textContent = c.lbl || 'Força'; mh.textContent = c.hint; mh.style.color = c.hintC; if (c.ok && !ok()) { mh.textContent = lax ? 'Falta o usuário (mínimo 3 caracteres, sem espaço)' : e.value.trim() ? 'Falta um e-mail válido' : 'Falta o e-mail'; mh.style.color = '#F5B83D'; } go.disabled = !(c.ok && ok()); };
    [e, p1, p2].forEach(i => i.addEventListener('input', upd));
    const back = () => login(sb); $('#vo').onclick = back; $('#vo').onkeydown = ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); back(); } };
    $('#f').addEventListener('submit', async ev => { ev.preventDefault(); if (go.disabled || go.classList.contains('busy')) return; x.textContent = '';
      busyBtn(go, true, 'Criando…', 'Criar conta'); e.disabled = p1.disabled = p2.disabled = true;
      let r; try { r = await sb.auth.signUp({ email: toEmail(e.value.trim()), password: p1.value, options: { emailRedirectTo: location.origin + location.pathname } }); } catch (er) { r = { error: er }; }
      if (r.error) { busyBtn(go, false, '', 'Criar conta'); e.disabled = p1.disabled = p2.disabled = false; x.style.color = '#FF6A5C';
        x.textContent = /already|registered/i.test(r.error.message) ? 'Esse e-mail já tem conta. Volte e entre.' : /not allowed|disabled/i.test(r.error.message) ? 'A criação de contas está fechada por enquanto.' : r.error.message; return; }
      if (r.data && r.data.session) { LS.del(EXP); start(sb, r.data.session.user); return; }
      x.style.color = '#00E08A'; x.textContent = /@kontar\.app$/i.test(toEmail(e.value.trim())) ? 'Conta criada. Ela ainda precisa ser liberada por quem administra antes de entrar.' : 'Quase lá: mandamos um link de confirmação pro seu e-mail. Abra e volte pra entrar.'; busyBtn(go, false, '', 'Criar conta'); go.disabled = true; });
  }

  /* ================= 6. NOVA SENHA (09d) ================= */
  function newPassword(sb) {
    mount(CSS_NOVA, GOO + '<div class="bg" aria-hidden="true"></div><main class="stage"><section class="panel" aria-labelledby="t"><div class="L"><div class="img" aria-hidden="true"></div><div class="shade" aria-hidden="true"></div><div class="tt"><svg class="ico" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#5B3DF5" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="10.5" width="17" height="11" rx="3"/><path d="M7.5 10.5V7.5a4.5 4.5 0 0 1 9 0v3"/><circle cx="12" cy="15" r="1.3" fill="#5B3DF5"/><path d="M12 16.3V18"/></svg><h1 id="t">Nova<br>senha.</h1><p class="sub">Escolha a senha que você vai usar daqui pra frente.</p></div></div>'
      + '<div class="R"><form class="form" id="f" autocomplete="off" novalidate><div class="grp"><div class="fld"><input id="p1" type="password" name="new-password" placeholder="Nova senha" autocomplete="new-password" aria-label="Nova senha"></div><div class="fld"><input id="p2" type="password" name="confirm-password" placeholder="Confirmar senha" autocomplete="new-password" aria-label="Confirmar senha"></div><div class="meter" aria-live="polite"><span id="mh">Mínimo 8 caracteres</span><span class="bar"><span id="mb"></span></span><b id="ml">Força</b></div></div><div class="acts">' + LQ('go', 'Salvar senha').replace('type="submit"', 'type="submit" disabled') + '<span class="wm">' + LOGO(30) + '</span></div></form></div></section></main>');
    liq(); parallax(); pwEye();
    const p1 = $('#p1'), p2 = $('#p2'), go = $('#go'), mb = $('#mb'), ml = $('#ml'), mh = $('#mh');
    const upd = () => { const c = KD.pwCheck(p1.value, p2.value); mb.style.width = c.pct; mb.style.background = c.col; ml.style.color = c.lv ? c.col : '#7C7C85'; ml.textContent = c.lbl || 'Força'; mh.textContent = c.hint; mh.style.color = c.hintC; go.disabled = !c.ok; };
    p1.addEventListener('input', upd); p2.addEventListener('input', upd);
    $('#f').addEventListener('submit', async e => { e.preventDefault(); if (go.disabled || go.classList.contains('busy')) return;
      busyBtn(go, true, 'Salvando…', 'Salvar senha'); p1.disabled = p2.disabled = true;
      const r = await sb.auth.updateUser({ password: p1.value });
      if (r.error) { busyBtn(go, false, '', 'Salvar senha'); p1.disabled = p2.disabled = false; mh.style.color = '#FF6A5C'; mh.textContent = r.error.message; return; }
      mh.style.color = '#00E08A'; mh.textContent = 'Senha salva. Entrando…'; history.replaceState(null, '', location.pathname); LS.del(EXP); start(sb, r.data.user); });
  }

  /* ================= 3. SESSÃO ENCERRADA (09b) ================= */
  const CSS_SESS = `
:root{--bg:#000;--ink:#fff;--mut:#9A9AA3;--line:#3A3A40;--bone:#F2F0EB;--roxo:#5B3DF5;--amar:#FFC24A}
*{box-sizing:border-box}
html,body{margin:0;min-height:100%;background:var(--bg);color:var(--ink);font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
body{overflow-x:hidden}
.stage{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.card{position:relative;width:min(560px,100%);border-radius:30px;overflow:hidden;isolation:isolate;background:#07060C;box-shadow:0 40px 120px rgba(0,0,0,.6);animation:cIn .9s cubic-bezier(.65,0,.35,1) both}
.card .img{position:absolute;left:0;right:0;top:0;height:78%;z-index:-2;background:url("assets/fluted-glass.webp") 60% 30%/cover no-repeat,#15112B;animation:drift 22s cubic-bezier(.65,0,.35,1) infinite alternate}
.card::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;background:linear-gradient(160deg,#3A345A,#130F29);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.card .shade{position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(7,6,12,0) 0%,rgba(7,6,12,.08) 18%,rgba(7,6,12,.72) 40%,rgba(7,6,12,.94) 56%,#07060C 70%)}
@keyframes drift{from{background-position:58% 26%}to{background-position:66% 36%}}
.in{position:relative;min-height:min(733px,calc(100vh - 48px));padding:60px;display:flex;flex-direction:column;justify-content:space-between;align-items:stretch}
.wm{display:flex;align-items:center;gap:12px;font-size:21px;font-weight:700;letter-spacing:-.02em;color:var(--bone)}
.wm i{width:27px;height:27px;border-radius:9px;background:var(--roxo);display:block}
.body{display:flex;flex-direction:column;gap:41px}
.tt{display:flex;flex-direction:column;gap:18px}
h1{margin:0;font-size:84px;font-weight:700;letter-spacing:-0.065em;line-height:.85}
.sub{margin:0;font-size:15px;line-height:1.45;color:#B4B4BC;text-wrap:pretty}
.login{display:flex;flex-direction:column;gap:32px}
.uinfo{display:flex;flex-direction:column;gap:16px}
.urow{display:flex;align-items:center;justify-content:space-between;gap:10px}
.who{display:flex;align-items:center;gap:12px;min-width:0}
.av{flex:none;width:40px;height:40px;border-radius:50%;background:var(--bone);color:#000;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px}
.who .t{display:flex;flex-direction:column;gap:2px;min-width:0}
.who b{font-size:15px;line-height:1.2;color:var(--bone)}
.who .em{font-size:13px;color:var(--mut);overflow:hidden;text-overflow:ellipsis}
.notme{font-size:12.5px;color:var(--mut);text-decoration:underline;text-underline-offset:3px;cursor:pointer;white-space:nowrap}
.notme:hover{color:#fff}
input{height:48px;width:100%;padding:0 20px;border-radius:9999px;border:1px solid rgba(255,255,255,.22);background:rgba(0,0,0,.4);color:#fff;font:inherit;font-size:15px;outline:0;transition:border-color .25s ease}
input::placeholder{color:#6A6A72}
input:focus{border-color:var(--bone)}
.err{min-height:0;font-size:12.5px;line-height:1.4;color:#FF6A5C}.err:empty{display:none}
.acts{display:flex;align-items:center;gap:20px}
.lk{font-size:13px;color:var(--mut);text-decoration:underline;text-underline-offset:3px;cursor:pointer}
.lk:hover{color:#fff}
.lq{--h:48px;--gap:16px;--E:cubic-bezier(.22,1,.36,1);position:relative;height:var(--h);width:var(--pw);flex:none;display:inline-block;text-align:left;cursor:pointer;border:0;padding:0;background:none;font:inherit;color:#000;transition:width .7s var(--E)}
.lq .shp{position:absolute;inset:-14px -80px -14px -14px;filter:url(#goo);pointer-events:none}
.lq .pill,.lq .dot{position:absolute;top:14px;height:var(--h);background:var(--bone)}
.lq .pill{left:14px;width:var(--pw);border-radius:9999px}
.lq .dot{width:var(--h);border-radius:50%;left:calc(14px + var(--pw) - var(--h));transition:left .7s var(--E)}
.lq .lbl{position:relative;display:inline-flex;align-items:center;height:var(--h);padding:0 24px;font-size:14.5px;font-weight:700;white-space:nowrap}
.lq .arr{position:absolute;top:0;width:var(--h);height:var(--h);left:calc(var(--pw) - var(--h));display:flex;align-items:center;justify-content:center;opacity:0;transition:left .7s var(--E),opacity .35s ease}
.lq .arr svg{transform:rotate(-45deg);transition:transform .6s var(--E)}
.lq:hover{width:calc(var(--pw) + var(--gap) + var(--h))}
.lq:hover .dot{left:calc(14px + var(--pw) + var(--gap))}
.lq:hover .arr{left:calc(var(--pw) + var(--gap));opacity:1;transition:left .7s var(--E),opacity .5s ease .12s}
.lq:hover .arr svg{transform:rotate(0)}
.lq:active .pill{filter:brightness(.94)}
.lq:focus-visible{outline:2px solid var(--roxo);outline-offset:6px;border-radius:9999px}
.lq.busy{pointer-events:none;opacity:.6;cursor:progress}
.foot{display:flex;align-items:center;gap:16px;font-size:12px;line-height:1.45;color:#9A9AA3}
.foot span{max-width:285px}
.foot svg{flex:none}
@keyframes cIn{from{opacity:0;transform:translateY(16px) scale(.985)}to{opacity:1;transform:none}}
.in>*,.body>*{animation:up .7s cubic-bezier(.65,0,.35,1) both}
.in>.wm{animation-delay:.2s}.body>*:nth-child(1){animation-delay:.3s}.body>*:nth-child(2){animation-delay:.4s}.body>*:nth-child(3){animation-delay:.5s}
.in>.body{animation:none}
@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@media (max-width:560px){h1{font-size:60px}.in{padding:28px 24px;min-height:0;gap:90px}.urow{flex-direction:column;align-items:flex-start}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}`;
  function expired(sb, info) {
    const nome = (info.nome || '').trim(), who = nome || info.email.split('@')[0], ini = (who.charAt(0) || 'K').toUpperCase();
    mount(CSS_SESS, GOO + '<div class="stage"><section class="card" aria-labelledby="t"><div class="img" aria-hidden="true"></div><div class="shade" aria-hidden="true"></div><div class="in"><span class="wm">' + LOGO(30) + '</span><div class="body"><div class="tt"><h1 id="t">Sessão<br>encerrada.</h1><p class="sub">Por segurança, o Kontar pede seu login de novo a cada 24 horas. Entre de novo pra continuar de onde parou.</p></div>'
      + '<form class="login" id="f" novalidate><div class="uinfo"><div class="urow"><div class="who"><span class="av">' + esc(ini) + '</span><span class="t"><b>' + esc(who) + '</b><span class="em">' + esc(info.email) + '</span></span></div><span class="notme" id="nm" role="button" tabindex="0">Não é você? Entrar com outra conta</span></div><input id="p" type="password" placeholder="Senha" autocomplete="current-password" aria-label="Senha"><div class="err" id="x" role="alert" aria-live="polite"></div></div>'
      + '<div class="acts"><button class="lq" id="go" type="submit"><span class="shp" aria-hidden="true"><span class="pill"></span><span class="dot"></span></span><span class="lbl">Entrar de novo</span><span class="arr" aria-hidden="true">' + ARROW('#000') + '</span></button><span class="lk" id="r" role="button" tabindex="0">Esqueci a senha</span></div></form>'
      + '<div class="foot"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFC24A" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg><span>Pra não ver mais isso, troque para “Sem limite” em Minha Conta › Duração da sessão.</span></div></div></div></section></div>');
    liq(); pwEye(); const x = $('#x'), p = $('#p'), go = $('#go'), say = (t, ok) => { x.style.color = ok ? '#00E08A' : '#FF6A5C'; x.textContent = t; };
    $('#nm').onclick = () => { LS.del(EXP); login(sb); };
    $('#f').addEventListener('submit', async e => { e.preventDefault(); if (go.classList.contains('busy')) return; x.textContent = '';
      if (!p.value) return say('Escreva sua senha.');
      go.classList.add('busy'); p.disabled = true; let r; try { r = await sb.auth.signInWithPassword({ email: info.email, password: p.value }); } catch (er) { r = { error: er }; }
      if (r.error) { go.classList.remove('busy'); p.disabled = false; return say(/Invalid login/i.test(r.error.message) ? 'Senha não confere.' : r.error.message); }
      LS.del(EXP); start(sb, r.data.user); });
    const forgot = async () => { const r = await sb.auth.resetPasswordForEmail(info.email, { redirectTo: location.origin + location.pathname }); say(r.error ? r.error.message : 'Mandamos um link pro seu e-mail. Vale por 30 min.', !r.error); };
    $('#r').onclick = forgot;
  }

  /* ================= 9. ONBOARDING (09g) ================= */
  const CSS_ONB = `
:root{--ink:#fff;--mut:#9A9AA3;--dim:#6A6A72;--bone:#F2F0EB;--roxo:#5B3DF5;--amar:#FFC24A;--verde:#3FCF7F;--ln:#2A2A2F;--card:#111114;--btn:#1C1C20;--E:cubic-bezier(.65,0,.35,1);--ac:var(--roxo);--on:#fff}
*{box-sizing:border-box}
html,body{margin:0;min-height:100%;background:#000;color:var(--ink);font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
body{overflow-x:hidden}
button,input{font:inherit;color:inherit}
@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.cap{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
.stage{min-height:100vh;display:grid;place-items:center;padding:28px 24px}
.board{position:relative;isolation:isolate;width:min(1240px,100%);height:740px;min-height:740px;display:grid;grid-template-rows:73px 1fr;border-radius:30px 0 0 30px;overflow:hidden}
.board>svg{position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none}
.hdr,.ftr{display:grid;align-items:stretch}
.hdr{grid-template-columns:auto 1fr;position:relative}.hdr::after{content:"";position:absolute;left:0;right:18px;bottom:0;height:1px;background:var(--ln)}
.ftr{grid-template-columns:1fr auto;border-top:1px solid var(--ln);color:var(--mut)}
.hdr>*,.ftr>*{display:flex;align-items:center;padding:0 22px;border-right:1px solid var(--ln)}
.hdr>*:last-child{border-right:0}.hdr .wm{padding-left:36px}
.wm{gap:9px;font-size:21px;font-weight:700;letter-spacing:-.02em}.wm i{width:27px;height:27px;border-radius:8px;background:var(--roxo);display:block}
.hdr .cap{color:var(--mut)}
.route{position:absolute;top:18px;right:0;height:36px;display:flex;align-items:center;z-index:3}
.route b{width:36px;height:36px;font-size:14px!important;border-radius:50%;flex:none;display:grid;place-items:center;font-size:13px;font-weight:700;color:var(--dim);border:1.5px solid #3A3A40;transition:background .45s var(--E),color .45s var(--E),border-color .45s var(--E)}
.route u{width:28px;height:2px;background:#2A2A2F;position:relative;overflow:hidden}.route u::after{content:"";position:absolute;inset:0;background:#fff;transform:scaleX(0);transform-origin:left;transition:transform .55s var(--E)}
.route u.done::after{transform:scaleX(1)}
.route b.done{background:#fff;border-color:#fff;color:#000}
.route b.cur{background:var(--ac);border-color:var(--ac);color:var(--on)}
.body{display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1fr);min-height:0}
.T{position:relative;display:flex;flex-direction:column;justify-content:space-between;padding:36px;border-right:1px solid var(--ln);overflow:hidden}
.T .row{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
.T .num{width:clamp(132px,15vw,188px);aspect-ratio:1;border-radius:50%;flex:none;display:grid;place-items:center;background:var(--ac);color:var(--on);font-size:clamp(84px,9.4vw,120px);font-weight:700;letter-spacing:0;line-height:1;transition:background .55s var(--E),color .55s var(--E)}
.T .num .g{display:block;line-height:1;will-change:transform}
.T .note{max-width:150px;line-height:1.5;color:var(--mut)}
h1{margin:0;font-size:clamp(40px,5.3vw,76px);letter-spacing:-.06em;line-height:.9;text-transform:uppercase;font-weight:700}
.anim{animation:up .55s var(--E) both}
.U{display:grid;grid-template-rows:1fr auto auto;min-height:0;min-width:0}
.desc{position:relative;display:flex;flex-direction:column;justify-content:flex-start;gap:18px;padding:36px 36px 26px}
.desc p{margin:0;font-size:clamp(20px,1.9vw,26px);font-weight:500;line-height:1.25;letter-spacing:-.02em;color:#fff;max-width:none}
.desc .cap{color:var(--ac);transition:color .45s}
.ctl{min-width:0;padding:0 36px 36px}
.step{display:none;flex-direction:column;gap:10px;animation:up .5s var(--E) both}.step.on{display:flex}
.lab{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--mut);margin:0 0 2px 20px}
.fld{display:flex;align-items:center;gap:10px;height:56px;padding:0 22px;border-radius:9999px;border:1px solid #3A3A40;background:var(--btn);transition:border-color .25s}
.fld:focus-within{border-color:var(--ac)}
.fld input{flex:1;min-width:0;background:none;border:0;outline:0;font-size:17px;font-weight:500;letter-spacing:-.01em}
.fld input::placeholder{color:#5E5E66}
.fld .pre{color:var(--mut);font-size:16px;font-weight:500}.fld .suf{color:var(--dim)}
.hint{margin:2px 0 0 20px;font-size:13px;color:var(--dim);line-height:1.4}
.opt{display:grid;grid-template-columns:40px 1fr 24px;align-items:center;gap:16px;text-align:left;padding:14px 18px 14px 14px;border-radius:24px;border:1px solid #2A2A2F;background:var(--btn);cursor:pointer;transition:border-color .25s,background .25s}
.opt .n{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;border:1.5px solid #3A3A40;font-size:15px;font-weight:700;transition:all .3s}
.opt b{display:block;font-size:16px;font-weight:700;letter-spacing:-.02em}.opt small{display:block;margin-top:3px;font-size:13.5px;color:var(--mut)}
.opt .rd{width:22px;height:22px;border-radius:50%;border:1.5px solid #4A4A52;display:grid;place-items:center;transition:all .25s}
.opt:hover{border-color:#4A4A52}
.opt[aria-checked=true]{border-color:var(--ac)}
.opt[aria-checked=true] .n{background:var(--ac);border-color:var(--ac);color:var(--on)}
.opt[aria-checked=true] .rd{background:var(--ac);border-color:var(--ac)}
.opt[aria-checked=true] .rd::after{content:"";width:9px;height:5px;border-left:2px solid var(--on);border-bottom:2px solid var(--on);transform:rotate(-45deg) translate(1px,-1.5px)}
.dh{display:flex;justify-content:space-between;align-items:center;margin:8px 0 2px 20px}
.dh .lab{margin:0}
.skip{border:0;background:none;color:var(--dim);font-size:12.5px;cursor:pointer;text-decoration:underline;text-underline-offset:3px;padding:0}.skip:hover{color:#fff}
.days{display:grid;grid-template-columns:repeat(14,1fr);gap:5px}
.days button{aspect-ratio:1;width:100%;max-width:36px;justify-self:center;border-radius:50%;border:1px solid #2A2A2F;background:var(--btn);font-size:12.5px;font-weight:600;font-variant-numeric:tabular-nums;cursor:pointer;padding:0;transition:background .2s,color .2s,border-color .2s}
.days button:hover{border-color:#4A4A52}.days button[aria-pressed=true]{background:var(--ac);border-color:var(--ac);color:var(--on);font-weight:700}
.sum{border-radius:24px;background:var(--btn);border:1px solid #2A2A2F;padding:4px 18px}
.sum div{display:grid;grid-template-columns:30px 1fr auto;gap:14px;align-items:center;min-height:52px;border-bottom:1px solid #2A2A2F}.sum div:last-child{border-bottom:0}
.sum i{font-style:normal;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;border:1.5px solid #3A3A40;font-size:12px;font-weight:700;color:var(--mut)}
.sum span{color:var(--mut);font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.sum b{font-size:16px;font-weight:700;letter-spacing:-.02em}
.acts .lt{display:flex;flex-direction:column;align-items:flex-start;gap:2px}.acts .lt .cap{color:var(--dim);padding-left:4px}
.acts{display:flex;align-items:center;height:85px;padding:0 36px;position:relative}.acts::before{content:"";position:absolute;left:0;right:18px;top:0;height:1px;background:var(--ln)}
.back{border:0;background:none;color:var(--mut);font-size:15px;font-weight:600;cursor:pointer;padding:4px;transition:color .2s}.back:hover{color:#fff}.back:disabled{color:#3A3A40;cursor:default}
.go{position:absolute;right:0;bottom:18px;z-index:3;height:48px;padding:0 6px 0 0;border-radius:9999px;border:0;background:var(--bone);color:#000;font-size:15px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:16px;transition:filter .25s,opacity .25s}
.go .t{flex:1;text-align:left;padding-left:22px;white-space:nowrap}.go .ar{flex:none;width:36px;height:36px;border-radius:50%;background:#000;display:grid;place-items:center;transition:transform .3s var(--E)}
.go:hover{filter:brightness(.93)}.go:hover .ar{transform:translateX(3px)}.go:disabled{opacity:.3;cursor:default}.go:disabled .ar{transform:none}
.route b{position:relative}
.route b .rg{position:absolute;left:-1.5px;top:-1.5px;width:calc(100% + 3px);height:calc(100% + 3px);transform:rotate(-90deg);opacity:0;transition:opacity .45s var(--E);pointer-events:none}
.route b .rg circle{fill:none;stroke-width:2.5}.route b .rg .rb{stroke:#3A3A40}
.route b .rg .rp{stroke:var(--ac);stroke-linecap:round;stroke-dasharray:103.67;stroke-dashoffset:103.67;transition:stroke-dashoffset .65s var(--E)}
.route b .rn,.route b .rc{grid-area:1/1;display:grid;place-items:center;transition:opacity .4s var(--E)}
.route b .rc{opacity:0}
.route b.cur.ring{background:transparent;border-color:transparent;color:var(--ac)}.route b.cur.ring .rg{opacity:1}
.route b.cur.ring.full{background:var(--ac);border-color:var(--ac);color:var(--on)}.route b.cur.ring.full .rg{opacity:0}
.route b.full .rn{opacity:0}.route b.full .rc{opacity:1}
.U{grid-template-rows:1fr minmax(0,auto) auto}.U .ctl{overflow-y:auto;min-height:0}.U.bk{grid-template-rows:auto minmax(0,1fr) auto}
.seg{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));padding:4px;border-radius:99px;border:1.5px solid #3A3A40;background:#0B0B0D}
.seg .th{position:absolute;top:4px;bottom:4px;left:4px;width:calc((100% - 8px) / 4);border-radius:99px;background:var(--bone);transition:transform .45s var(--E);will-change:transform;pointer-events:none}
.seg button{position:relative;z-index:1;height:34px;border:0;background:none;border-radius:99px;display:flex;align-items:center;justify-content:center;gap:6px;padding:0 4px;font-size:10.5px;font-weight:800;letter-spacing:.06em;color:#fff;cursor:pointer;white-space:nowrap;transition:color .35s var(--E)}
.seg button svg{flex:none;width:14px;height:14px}
.seg button[aria-checked=true]{color:#0A0A0A}
.U{position:relative}
.U .ctl{scrollbar-width:thin;scrollbar-color:#3A3A40 transparent;padding-right:30px;margin-right:6px}
.U .ctl::-webkit-scrollbar{width:6px}.U .ctl::-webkit-scrollbar-track{background:transparent}.U .ctl::-webkit-scrollbar-thumb{background:#3A3A40;border-radius:99px}.U .ctl::-webkit-scrollbar-thumb:hover{background:#55555C}
.cfade{position:absolute;left:0;right:0;bottom:85px;height:64px;pointer-events:none;opacity:0;transition:opacity .35s var(--E);background:linear-gradient(to top,#111114 8%,rgba(17,17,20,0))}
.cfade.on{opacity:1}
.fld.big{height:auto;padding:0 6px 14px 20px;border:0;border-radius:0;background:none;border-bottom:2px solid #3A3A40;align-items:baseline;gap:16px}
.fld.big:focus-within{border-color:var(--ac)}
.fld.big .pre{font-size:clamp(24px,2.6vw,34px);font-weight:700;letter-spacing:-.03em;color:var(--dim)}
.fld.big input{font-size:clamp(56px,7vw,96px);font-weight:700;letter-spacing:-.06em;line-height:1;font-variant-numeric:tabular-nums;padding:0}
.bigs{color:var(--dim);margin:2px 0 6px 20px}
.cfade.tp{bottom:auto;top:0;height:40px;background:linear-gradient(to bottom,#111114 10%,rgba(17,17,20,0))}
.sbk{display:flex;flex-direction:column;gap:8px;margin-top:4px}.sbk .oft .tile{height:54px}
.sbk .tile .ck{background:var(--verde);color:#000}.sbk .tile[aria-pressed=false]{border-color:#2A2A2F}
.sbk .lgd{display:flex;align-items:center;gap:8px;margin:6px 0 10px 0;font-size:12.5px;color:var(--dim)}.sbk .lgd i{width:14px;height:14px;border-radius:50%;background:var(--verde);color:#000;font-style:normal;font-size:9px;font-weight:900;display:grid;place-items:center}
.pal{display:flex;gap:8px;flex-wrap:nowrap;padding:4px;align-items:center;margin:-4px 0 -4px 16px}.pal button,.pal label{width:26px;height:26px;border-radius:50%;border:0;padding:0;cursor:pointer;position:relative;display:block;flex:none}
.tile{height:58px;border-radius:20px;border:1.5px solid #3A3A40;background:var(--btn);display:flex;align-items:center;justify-content:center;position:relative;cursor:pointer;transition:border-color .25s,background .25s;padding:0}
.tile:hover{border-color:#4A4A52}.tile[aria-pressed=true]{border-color:var(--ac)}
.tile .ck{position:absolute;top:7px;right:8px;width:18px;height:18px;border-radius:50%;background:var(--ac);color:var(--on);font-size:11px;font-weight:900;display:grid;place-items:center;opacity:0;transform:scale(.6);transition:opacity .25s,transform .3s var(--E)}
.tile[aria-pressed=true] .ck{opacity:1;transform:none}
.outro{margin:3px 0 0 4px;border:0;background:none;color:var(--mut);font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:8px;padding:4px 6px;border-radius:99px;transition:color .25s}.outro:hover{color:#fff}
.outro .ck{width:16px;height:16px;border-radius:50%;border:1.5px solid #4A4A52;font-size:10px;font-weight:900;display:grid;place-items:center;color:transparent;transition:all .25s var(--E)}
.outro[aria-pressed=true]{color:#fff}.outro[aria-pressed=true] .ck{background:var(--ac);border-color:var(--ac);color:var(--on)}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.bkh{display:flex;align-items:center;gap:14px;margin:0 0 2px 4px}
.bkh .lg{height:28px;display:flex;align-items:center}
#bkf{gap:8px}#bkf .fld{height:50px}#bkf .lab{margin-bottom:0}.obr{display:flex;gap:10px;align-items:center}.obr .fld{flex:1;min-width:0}.icb{height:50px;flex:none;display:flex;align-items:center;gap:8px;padding:0 12px 0 11px;border-radius:9999px;border:1px solid #3A3A40;background:var(--btn);color:#9A9AA3;cursor:pointer;font:inherit;font-size:11px;font-weight:800;letter-spacing:.08em;transition:border-color .25s}.icb:hover{border-color:#6E6E78}.icb i{width:30px;height:30px;border-radius:50%;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-style:normal}
.bkr{display:flex;align-items:center;justify-content:space-between;gap:12px}
.pills{display:flex;gap:8px;flex-wrap:wrap}.pills button{height:40px;border-radius:99px;border:1.5px solid #3A3A40;background:transparent;padding:0 16px;font-size:12px;font-weight:800;letter-spacing:.08em;color:var(--mut);cursor:pointer;transition:all .25s}
.pills button[aria-pressed=true]{background:#fff;color:#000;border-color:#fff}
.sw{display:flex;align-items:center;gap:14px;padding:13px 18px;border-radius:24px;border:1px solid #2A2A2F;background:var(--btn);cursor:pointer;user-select:none}
.sw i{width:44px;height:26px;border-radius:99px;background:#2A2A2F;position:relative;flex:none;transition:background .3s}.sw i::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:left .3s var(--E)}
.sw[aria-checked=true] i{background:var(--ac)}.sw[aria-checked=true] i::after{left:21px}
.sw b{font-size:15px;letter-spacing:-.02em}
.cr{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.cr .fld{height:50px;padding:0 14px}.cr .fld input{font-size:15px}
.bkm{min-height:16px;margin:0 0 0 20px;font-size:12.5px;color:#FF6A5C}
.later{border:0;background:none;color:var(--dim);font-size:12.5px;cursor:pointer;text-decoration:underline;text-underline-offset:3px;padding:0;align-self:flex-start;margin-left:20px}.later:hover{color:#fff}
.ofw{gap:10px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.tall{display:flex;flex-direction:column;align-items:flex-start;gap:8px;text-align:left;min-height:200px;padding:18px;border-radius:24px;border:1.5px solid #2A2A2F;background:var(--btn);cursor:pointer;transition:border-color .3s var(--E),background .3s var(--E)}
.tall:hover{border-color:#4A4A52}.tall[aria-checked=true]{border-color:var(--ac)}
.tall i{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;color:#000;margin-bottom:6px}.tall i svg{width:22px;height:22px}
.tall b{font-size:17px;letter-spacing:-.02em}.tall small{font-size:13.5px;line-height:1.4;color:var(--mut)}
.tall .tg{margin-top:auto;font-size:10px;font-weight:800;letter-spacing:.14em;color:#6AFF2A}
.ps{display:flex;flex-direction:column;gap:12px;padding:16px 18px;border-radius:24px;border:1px solid #2A2A2F;background:var(--btn)}
.ps .pl{display:flex;gap:14px;align-items:center;font-size:14.5px;line-height:1.4}
.ps .pl .n{width:30px;height:30px;border-radius:50%;background:var(--bone);color:#000;display:grid;place-items:center;font-weight:800;font-size:14px;flex:none}
.oft{display:flex;flex-wrap:wrap;gap:8px}.oft .tile{cursor:default;min-width:0}.oft .tile:hover{border-color:#3A3A40}.oft .tile[aria-pressed=true]{border-color:var(--ac)}
.oft .tile .nm{font-size:12px;font-weight:800;letter-spacing:.06em;color:#fff;padding:0 8px;text-align:center}
.btnl{align-self:flex-start;height:42px;display:inline-flex;align-items:center;border-radius:99px;border:1.5px solid #3A3A40;padding:0 18px;color:#fff;font-size:14px;font-weight:700;text-decoration:none;transition:border-color .25s}.btnl:hover{border-color:#fff}
.lst{border-radius:24px;border:1px solid #2A2A2F;background:var(--btn);padding:2px 16px}
.lst button{width:100%;display:grid;grid-template-columns:24px 76px minmax(0,1fr) auto;gap:12px;align-items:center;min-height:56px;border:0;border-bottom:1px solid #2A2A2F;background:none;text-align:left;cursor:pointer;padding:0;transition:opacity .3s var(--E)}
.lst button:last-child{border-bottom:0}.lst button[aria-checked=false]{opacity:.45}
.lst em{width:22px;height:22px;border-radius:50%;border:1.5px solid #4A4A52;display:grid;place-items:center;font-style:normal;font-size:12px;font-weight:900;color:transparent;transition:all .25s var(--E)}
.lst button[aria-checked=true] em{background:var(--ac);border-color:var(--ac);color:var(--on)}
.lst .lg{display:flex;align-items:center;height:22px;overflow:hidden}
.lst b{display:block;font-size:15px;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.lst small{display:block;font-size:12.5px;color:var(--mut);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lst s{text-decoration:none;font-size:14px;font-weight:700;white-space:nowrap}
#ofp .bkr .later{margin:0}.oft .lgs{display:flex;align-items:center;justify-content:center}
.U.bk #ofp.on{min-height:100%}#ofp .two{flex:1;min-height:200px}#ofp .tall{min-height:0}
@media (max-width:820px){.two{grid-template-columns:1fr}.tall{min-height:0}.lst button{grid-template-columns:24px minmax(0,1fr) auto}.lst .lg{display:none}}
@media (max-width:820px){.board{height:auto}.body{grid-template-columns:1fr}.T{border-right:0;border-bottom:1px solid var(--ln);min-height:260px}.hdr .cap{display:none}.days{grid-template-columns:repeat(7,1fr)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}`;

  /* Devolve uma Promise com as respostas ({nm, nomes (nomes no banco), how, rd (centavos|null), dia}) quando o Jay/usuário clica "Abrir meu Kontar". */
  function onboarding(nameGuess) {
    mount(CSS_ONB, '<main class="stage"><div class="board" id="board"><svg id="bgs" aria-hidden="true"></svg><nav class="route" id="route" aria-label="Progresso"></nav><header class="hdr"><span class="wm">' + LOGO(30) + '</span><span class="cap">Primeiro acesso</span></header>'
      + '<div class="body"><section class="T" aria-live="polite"><div class="row"><span class="num" id="num">1</span><span class="cap note" id="note"></span></div><h1 id="h"></h1></section><section class="U"><div class="desc"><span class="cap" id="tag"></span><p id="sb"></p></div><div class="ctl">'
      + '<div class="step" data-s="0"><label class="lab" for="nm">Nome</label><div class="fld"><input id="nm" type="text" placeholder="Como te chamamos?" autocomplete="given-name"></div><p class="hint">Você muda isso depois, em Minha Conta.</p></div>'
      + '<div class="step" data-s="1"><label class="lab" for="nl">Seu nome completo, como no banco</label><div class="fld"><input id="nl" type="text" placeholder="Ex.: João da Silva" autocomplete="name"></div><label class="lab" for="nj" style="margin-top:8px">Nome da sua empresa (PJ), se tiver</label><div class="fld"><input id="nj" type="text" placeholder="Ex.: Silva Serviços LTDA" autocomplete="organization"></div><p class="hint">Pode deixar em branco. Dá pra adicionar mais nomes depois, em Minha Conta.</p></div><div class="step" data-s="2"><div class="lab" style="margin-bottom:6px">Toque nos bancos em que você tem conta ou cartão</div><div class="grid4" id="tiles"></div><div id="outroRow"></div><p class="hint" id="tcount"></p></div><div class="step" id="bkf" data-s="2b"></div><div class="step ofw" id="ofp" data-s="2c"></div><div class="step" data-s="3" role="radiogroup" aria-label="Como começar"><button class="opt" role="radio" aria-checked="false" data-v="import"><span class="n">A</span><span><b>Importar extrato</b><small>CSV, OFX ou PDF do seu banco ou cartão.</small></span><span class="rd"></span></button><button class="opt" role="radio" aria-checked="false" data-v="manual"><span class="n">B</span><span><b>Lançar manualmente</b><small>Começa do zero e você vai adicionando.</small></span><span class="rd"></span></button><button class="opt" role="radio" aria-checked="false" data-v="demo"><span class="n">C</span><span><b>Explorar com dados demo</b><small>Veja tudo funcionando antes de usar os seus.</small></span><span class="rd"></span></button></div>'
      + '<div class="step" data-s="4"><label class="lab" for="rd">Renda mensal</label><div class="fld big"><span class="pre">R$</span><input id="rd" inputmode="numeric" placeholder="0,00" autocomplete="off"></div><span class="cap bigs">por mês</span><p class="hint">Pode deixar em branco e ajustar depois.</p></div>'
      + '<div class="step" data-s="5"><div class="sbk" id="sbk"></div><div class="sum" id="sum"></div></div></div>'
      + '<div class="cfade" id="cfade" aria-hidden="true"></div><div class="cfade tp" id="cfadeT" aria-hidden="true"></div><div class="acts"><div class="lt"><button class="back" type="button" id="bk" disabled>← Voltar</button><span class="cap" id="fn"></span></div><button class="go" type="button" id="nx"><span class="t">Continuar</span><span class="ar" aria-hidden="true">' + ARROW('#fff', 2.4) + '</span></button></div></section></div></div></main>');
    return new Promise(done => {
      const drawNotch = () => { const g = $('#bgs'), b = $('#board'); if (!g || !b) return; const W = b.offsetWidth, H = b.offsetHeight, Dp = 72, gp = 18, F = 18, R = 36, D2 = 84, R2 = 42, RW = $('#route').offsetWidth, N = RW + gp + F, x = W - N; $('#nx').style.width = RW + 'px';
        const d = 'M0 30A30 30 0 0 1 30 0H' + x + 'A' + F + ' ' + F + ' 0 0 1 ' + (x + F) + ' ' + F + 'V' + (Dp - R) + 'A' + R + ' ' + R + ' 0 0 0 ' + (x + F + R) + ' ' + Dp + 'H' + (W - F) + 'A' + F + ' ' + F + ' 0 0 1 ' + W + ' ' + (Dp + F) + 'V' + (H - D2 - F) + 'A' + F + ' ' + F + ' 0 0 1 ' + (W - F) + ' ' + (H - D2) + 'H' + (x + F + R2) + 'A' + R2 + ' ' + R2 + ' 0 0 0 ' + (x + F) + ' ' + (H - D2 + R2) + 'V' + (H - F) + 'A' + F + ' ' + F + ' 0 0 1 ' + x + ' ' + H + 'H30A30 30 0 0 1 0 ' + (H - 30) + 'Z';
        g.setAttribute('viewBox', '0 0 ' + W + ' ' + H); g.innerHTML = '<defs><clipPath id="nc"><path d="' + d + '"/></clipPath></defs><path d="' + d + '" fill="#111114" stroke="#2A2A2F" stroke-width="2" clip-path="url(#nc)"/>'; };
      const optic = (el, txt) => { const cs = getComputedStyle(el), fs = parseFloat(cs.fontSize), c = document.createElement('canvas').getContext('2d'); c.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily; const m = c.measureText(txt);
        const L = m.actualBoundingBoxLeft, Rt = m.actualBoundingBoxRight, A = m.fontBoundingBoxAscent, Dd = m.fontBoundingBoxDescent, base = (fs - (A + Dd)) / 2 + A;
        const dy = fs / 2 - (base + (m.actualBoundingBoxDescent - m.actualBoundingBoxAscent) / 2);
        /* centro de massa da tinta: 70% centroide, 30% caixa da tinta */
        const cv = document.createElement('canvas'), k = 2, cw = Math.ceil((L + Rt) * k) + 4, ch = Math.ceil((m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) * k) + 4; cv.width = cw; cv.height = ch;
        const x2 = cv.getContext('2d'); x2.font = c.font; x2.scale(k, k); x2.fillText(txt, L + 1, m.actualBoundingBoxAscent + 1);
        const px = x2.getImageData(0, 0, cw, ch).data; let sx = 0, sw = 0; for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) { const a = px[(y * cw + x) * 4 + 3]; sx += a * x; sw += a; }
        const cx = sw ? sx / sw / k - 1 - L : (Rt - L) / 2, bx = (Rt - L) / 2, dxo = m.width / 2 - (bx * .3 + cx * .7);
        return 'translate(' + dxo.toFixed(2) + 'px,' + dy.toFixed(2) + 'px)'; };
      const setNum = n => { const el = $('#num'); if (!el) return; el.innerHTML = '<span class="g"></span>'; const g = el.firstChild; g.textContent = n; g.style.transform = optic(el, String(n)); };
      const ST = [
        { n: 'Boas-vindas', h: 'Oi. Vamos<br>começar.', sb: 'Leva menos de um minuto.<br>Seus dados ficam salvos e só você vê.', note: 'Seis paradas até o seu painel', tag: '≈ 1 min', ac: 'var(--roxo)', on: '#fff' },
        { n: 'Nome no banco', h: 'Seu nome<br>no banco.', sb: 'O Kontar usa isso pra reconhecer transferências entre as suas contas e não contar como gasto.', note: 'Opcional. Dá pra pular', tag: 'Opcional', ac: '#6EC1FF', on: '#000' },
        { n: 'Seus bancos', h: 'Seus<br>bancos.', sb: 'Marque os bancos onde você tem conta ou cartão. Depois você preenche cada um, ou deixa pra mais tarde.', note: 'Opcional. Dá pra pular', tag: 'Opcional', ac: '#FF8A5B', on: '#000' },
        { n: 'Ponto de partida', h: 'Por onde<br>começar?', sb: 'Escolha um caminho pra trazer seus lançamentos. Dá pra mudar a qualquer hora.', note: 'Escolha um dos três caminhos', tag: '3 caminhos', ac: 'var(--amar)', on: '#000' },
        { n: 'Renda', h: 'Sua<br>renda.', sb: 'Com isso o Kontar já calcula<br>seus tetos de gasto.', note: 'Opcional. Dá pra pular', tag: 'Opcional', ac: 'var(--verde)', on: '#000' },
        { n: 'Tudo pronto', h: 'Pronto,<br><span id="who"></span>', sb: 'Confira o resumo.<br>O resto você ajusta nos próprios cards.', note: 'Confira e abra o seu painel', tag: 'Resumo', ac: 'var(--bone)', on: '#000' }];
      const D = { nm: nameGuess || '', nl: '', nj: '', how: null, rd: '', dia: null, bancos: [], dados: {}, caminho: null, of: [] }; let i = 0; const LAST = ST.length - 1;
      /* ---- passo "Seus bancos": grade de logos → uma tela por banco; o passo vira anel de progresso na barra de cima ---- */
      const KD2 = window.KD, GRADE = ['Caixa', 'Nubank', 'Itaú', 'Bradesco', 'Banco do Brasil', 'Santander', 'Mercado Pago', 'PicPay', 'Inter', 'C6', 'PagBank', 'Neon', 'XP', 'Next', 'BV', 'Amazon'];   /* popularidade aproximada no Brasil */
      // botão do ícone (conta "Outro"): mesmo seletor das categorias (KD.icPicker, src/cat-grade.js)
      const icoBtn = d => { const lum = h => { const n = parseInt(String(h).slice(1), 16); return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255; };
        const url = d.ico && window.KD && KD.icUri ? KD.icUri(d.ico, lum(d.cor) > .55 ? '#000000' : '#FFFFFF') : '';
        return '<button type="button" class="icb" data-ic="1" aria-label="Escolher ícone" style="border-color:' + (url ? '#F2F0EB' : '#3A3A40') + '"><i style="' + (url ? 'background:' + d.cor : 'border:1.5px dashed #5E5E66') + '">' + (url ? '<span style="width:17px;height:17px;background:url(\'' + url + '\') center / contain no-repeat"></span>' : '+') + '</i>' + (url ? '' : 'ÍCONE') + '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg></button>'; };
      const COR_OUTRO = ['#6A4BFF', '#FF5A1F', '#00E08A', '#FFB800', '#FF3D8B', '#6AFF2A', '#B18CFF', '#FF5C5C', '#2CBFF8', '#F2F0EB'];
      const ICO = { corrente: '<path d="M3 21h18"/><path d="M5 21V10"/><path d="M19 21V10"/><path d="M9 21V10"/><path d="M15 21V10"/><path d="M12 3 3 8h18z"/>',
        poupanca: '<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h.01"/>',
        investimento: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
        carteira: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>' };
      const icone = k => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICO[k] + '</svg>';
      const TIPOS = [['corrente', 'CORRENTE', 'pagamento'], ['poupanca', 'POUPANÇA', 'reserva'], ['investimento', 'INVESTIMENTO', 'reserva'], ['carteira', 'CARTEIRA', 'pagamento']];
      const logoDe = (b, h, w) => KD2.logo && b !== 'Outro' ? KD2.logo.slot(b, { forma: 'extensa', fundo: 'escuro', estilo: 'cor', tinta: 'pre' }, h, w, KD2.BANK[b] && KD2.BANK[b][0]) : '';
      const moeda = v => { const d = String(v).replace(/\D/g, '').slice(0, 11); return d ? (+d / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : ''; };
      const num = v => { const d = String(v || '').replace(/\D/g, ''); return d ? +d / 100 : 0; };
      let sub = -1, ringOn = false, busy = false, ofx = null, ofErr = '';   // ofx: null | 'como' | 'mp' | 'achou' (caminho Open Finance)   // sub: -1 = grade; k = k-ésimo banco marcado
      const RING = '<svg class="rg" viewBox="0 0 36 36" aria-hidden="true"><circle class="rb" cx="18" cy="18" r="16.5"/><circle class="rp" cx="18" cy="18" r="16.5"/></svg><span class="rn">3</span><span class="rc"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span>';
      const rb = () => $$('#route b')[2];
      const progresso = f => { const b = rb(), p = b && b.querySelector('.rp'); if (p) p.style.strokeDashoffset = String(103.67 * (1 - f)); };
      const entraAnel = () => { const b = rb(); if (!b || ringOn) return; ringOn = true; b.innerHTML = RING; void b.offsetWidth; b.classList.remove('full'); b.classList.add('ring'); progresso(0); };
      const saiAnel = () => { ringOn = false; const b = rb(); if (b) { b.classList.remove('ring', 'full'); } };
      /* ---- Open Finance: escolher o caminho, ligar no MeuPluggy, conectar pela janela da Pluggy, escolher o que entra ---- */
      const PREV = new URLSearchParams(location.search).get('onb') === '1';
      const chaveDe = n => (KD2.logo && KD2.logo.chave && KD2.logo.chave(n)) || null;
      const bancoIt = it => it.banco || (D.of.find(x => x.cx === it.cx && x.banco) || {}).banco || null;
      const coberto = b => D.of.some(x => x.on && bancoIt(x) === b);
      const usouOF = () => D.caminho === 'of' && D.of.some(x => x.on);
      const LB = () => D.caminho === 'of' ? D.bancos.filter(b => !coberto(b)) : D.bancos;   // bancos que ainda pedem formulário à mão
      const proximo = () => { if (usouOF()) { D.how = 'open_finance'; return 4; } if (D.how === 'open_finance') D.how = null; return 3; };
      const brlOf = v => (+v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const SVG = p => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
      const tall = (v, ic, cor, t, sb, tg) => '<button type="button" class="tall" role="radio" data-cm="' + v + '" aria-checked="' + (D.caminho === v) + '"><i style="background:' + cor + '">' + SVG(ic) + '</i><b>' + t + '</b><small>' + sb + '</small>' + (tg ? '<span class="tg">' + tg + '</span>' : '') + '</button>';
      const tilesOf = () => { const n = D.bancos.length, linhas = Math.ceil(n / 6), por = Math.ceil(n / linhas);   // até 6 numa linha; acima disso, linhas equilibradas e sempre de ponta a ponta
        return '<div class="oft">' + D.bancos.map(b => '<span class="tile" data-lg="' + esc(b) + '" aria-pressed="' + coberto(b) + '" style="flex:1 1 calc((100% - ' + (por - 1) * 8 + 'px) / ' + por + ')">' + (b === 'Outro' ? '<span class="nm">' + esc((dado(b).outro || 'Outro banco')) + '</span>' : '<span class="lgs"></span>') + '<span class="ck">✓</span></span>').join('') + '</div>'; };
      /* logo completo ou so o simbolo, conforme a largura real do tile (com muitos bancos por linha o completo fica espremido) */
      const ajustaLogos = () => { ['#ofp', '#sbk'].forEach(q => ajustaEm(q)); };
      const ajustaEm = q => { const ts = $$(q + ' .oft .tile'); if (!ts.length || !KD2.logo || !KD2.logo.seletor) return; const w = ts[0].clientWidth; if (!w) return; const comp = w < 150, chave = comp ? 'c' : 'e';
        ts.forEach(t => { const g = t.querySelector('.lgs'); if (!g || g.dataset.f === chave) return; g.dataset.f = chave; g.innerHTML = KD2.logo.seletor(t.dataset.lg, 20, comp ? Math.min(44, w - 24) : Math.min(96, w - 28), comp); }); };
      new ResizeObserver(ajustaLogos).observe($('#ofp')); new ResizeObserver(() => { if (i === LAST) desenhaResumo(); }).observe($('#sbk'));
      /* logo na lista do que veio: o mesmo do seletor (Mercado Pago com o nome claro); o Itaú vai com o nome escrito, a pedra sozinha some na linha */
      const logoLista = b => { const L = KD2.logo; if (!L) return '';
        if (b === 'Itaú' && L.svg) { const sv = L.svg('Itaú', { forma: 'palavra', fundo: 'escuro', estilo: 'cor' }); if (sv) return '<span aria-hidden="true" style="width:76px;height:20px;flex:none;display:block;background:url(\'data:image/svg+xml,' + encodeURIComponent(sv) + '\') center/contain no-repeat"></span>'; }
        return L.seletor ? L.seletor(b, 18, 76) : logoDe(b, 18, 76); };
      const bancosResumo = () => { const of = D.caminho === 'of' ? D.of.filter(x => x.on).map(bancoIt).filter(Boolean) : [], ordem = GRADE.concat(['Outro']);
        const todos = [...new Set([...D.bancos, ...of])].sort((x, y) => (ordem.indexOf(x) + 1 || 99) - (ordem.indexOf(y) + 1 || 99));
        return todos.map(b => ({ b, ok: of.includes(b) })); };
      let resumoW = -1;
      const desenhaResumo = () => { const e = $('#sbk'); if (!e) return; const L = bancosResumo(); if (!L.length) { e.innerHTML = ''; resumoW = -1; return; }
        const W = e.clientWidth || 600; if (Math.abs(W - resumoW) < 4 && e.innerHTML) return ajustaLogos(); resumoW = W;
        const cabe = Math.max(1, Math.min(8, Math.floor((W + 8) / (84 + 8)))), linhas = Math.ceil(L.length / cabe), por = Math.ceil(L.length / linhas);
        e.innerHTML = '<div class="oft">' + L.map(x => '<span class="tile" data-lg="' + esc(x.b) + '" aria-pressed="' + x.ok + '" title="' + esc(x.b === 'Outro' ? (dado(x.b).outro || 'Outro banco') : x.b) + (x.ok ? ' · conectado' : ' · preenchido à mão') + '" style="flex:1 1 calc((100% - ' + (por - 1) * 8 + 'px) / ' + por + ')">' + (x.b === 'Outro' ? '<span class="nm">' + esc(dado(x.b).outro || 'Outro banco') + '</span>' : '<span class="lgs"></span>') + '<span class="ck">✓</span></span>').join('') + '</div>'
          + (L.some(x => x.ok) ? '<div class="lgd"><i>✓</i>Conectado pelo Open Finance' + (L.some(x => !x.ok) ? '. Os outros você preencheu à mão.' : '') + '</div>' : '');
        ajustaLogos(); };
      const msgOf = t => { ofErr = t || ''; const m = $('#ofm'); if (m) m.textContent = ofErr; };
      const desenhaOf = () => {
        const e = $('#ofp'); let h = '';
        if (ofx === 'como') h = '<div class="two" role="radiogroup" aria-label="Como trazer os bancos">' + tall('of', '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>', '#6AFF2A', 'Conectar pelo Open Finance', 'Saldos, cartões e lançamentos chegam sozinhos e se atualizam todo dia. O Kontar só lê.', 'RECOMENDADO') + tall('manual', '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>', '#FFB800', 'Preencher à mão', 'Você digita nome, saldo e cartão de cada banco. Dá pra conectar depois, em Contas.') + '</div>';
        else if (ofx === 'mp') h = '<div class="ps"><div class="pl"><span class="n">1</span><span>Abra o MeuPluggy (gratuito, da Pluggy) e ligue lá estes bancos:</span></div>' + tilesOf() + '<a class="btnl" href="https://meu.pluggy.ai/connections" target="_blank" rel="noopener">Abrir o MeuPluggy</a><div class="pl"><span class="n">2</span><span>Volte aqui e toque em Conectar. Na janela, escolha MeuPluggy e marque os bancos.</span></div></div>'
          + '<div class="bkr"><div class="bkm" id="ofm"></div>' + (D.of.length ? '<button class="later" type="button" data-ofver="1">Ver o que já veio</button>' : '<button class="later" type="button" data-ofman="1">Preencher à mão em vez disso</button>') + '</div>';
        else if (ofx === 'achou') { const falta = LB();
          h = '<div class="lst">' + D.of.map((x, k) => { const c = x.c, b = bancoIt(x), cred = c.tipo === 'CREDIT';
            return '<button type="button" role="checkbox" data-oft="' + k + '" aria-checked="' + x.on + '"><em>✓</em><span class="lg">' + (b ? logoLista(b) : '') + '</span><span><b>' + esc(String(c.nome || '').trim()) + (c.final ? ' ···· ' + esc(c.final) : '') + '</b><small>' + (cred ? 'Cartão' + (c.fecha ? ' · fecha dia ' + c.fecha : '') : (c.subtipo === 'SAVINGS_ACCOUNT' ? 'Poupança' : 'Conta corrente')) + (b ? ' · ' + esc(b) : '') + '</small></span><s>' + (cred ? (c.limite ? 'limite R$ ' + brlOf(c.limite) : '') : 'R$ ' + brlOf(c.saldo)) + '</s></button>'; }).join('') + '</div>'
            + '<div class="bkr"><div class="bkm" id="ofm" style="color:var(--mut)">' + (falta.length ? 'Não vieram: ' + esc(falta.map(b => b === 'Outro' ? (dado(b).outro || 'outro banco') : b).join(', ')) + '. Conecte também ou preencha à mão no próximo passo.' : '') + '</div><button class="later" type="button" data-ofmais="1">Conectar outro banco</button></div>'; }
        e.innerHTML = h; ajustaLogos(); if (ofErr) msgOf(ofErr); e.classList.remove('on'); void e.offsetWidth; e.classList.add('on'); fadeCtl();
      };
      const textoOf = () => { const n = D.bancos.length; $('#sb').innerHTML = ofx === 'como' ? 'Escolha como ' + (n === 1 ? 'o banco marcado entra' : 'os ' + n + ' bancos marcados entram') + ' no Kontar.' : ofx === 'mp' ? 'O Kontar lê seus bancos pelo MeuPluggy. Eles precisam estar ligados lá antes.' : 'Achamos ' + D.of.length + (D.of.length === 1 ? ' item' : ' itens') + '. Desmarque o que não quer trazer. Os lançamentos chegam quando o painel abrir.'; $('#tag').textContent = ofx === 'como' ? 'Dois caminhos' : 'Open Finance'; };
      const ofInv = async body => { const r = await window.KD_SB.functions.invoke('open-finance', { body }); if (r.error) { let d = ''; try { const j = await r.error.context.json(); d = j.detalhe || j.erro || j.motivo || ''; } catch (e) { /* sem corpo */ } throw new Error(d || r.error.message || 'erro'); } return r.data; };
      const widget = () => new Promise((ok, no) => { if (window.PluggyConnect) return ok(); const s = document.createElement('script'); s.src = 'https://cdn.pluggy.ai/pluggy-connect/v2.8.0/pluggy-connect.js'; s.onload = ok; s.onerror = () => no(new Error('Não carreguei a janela do banco. Confira a internet.')); document.head.appendChild(s); });
      async function conecta() {
        if (busy) return; if (PREV) return msgOf('Na pré-visualização a conexão fica desligada.');
        busy = true; msgOf(''); $('#nx .t').textContent = 'Abrindo…'; $('#nx').disabled = true; $('#bk').disabled = true; let recebido = false;
        try {
          const { accessToken } = await ofInv({ acao: 'connect-token' }); await widget();
          await new Promise((ok, no) => { const w = new window.PluggyConnect({ connectToken: accessToken, includeSandbox: false,
            onSuccess: async d => { recebido = true; try { $('#nx .t').textContent = 'Lendo o banco…'; const item = d && d.item; if (!item || !item.id) throw new Error('A conexão não devolveu o banco.');
              const reg = await ofInv({ acao: 'registrar', itemId: item.id, instituicao: item.connector && item.connector.name });
              const r = await ofInv({ acao: 'contas', itemId: item.id }), lista = (r.contas || []).filter(c => c.tipo === 'BANK' || c.tipo === 'CREDIT');
              if (!lista.length) throw new Error('O banco não trouxe nenhuma conta ou cartão.');
              lista.forEach(c => { if (!D.of.some(x => x.c.id === c.id)) D.of.push({ c, on: true, cx: reg.conexaoId, banco: chaveDe(c.nome) }); }); ok(); } catch (e) { no(e); } },
            onError: e => no(new Error('O banco recusou a conexão' + (e && e.message ? ': ' + e.message : '') + '.')),
            onClose: () => { if (!recebido) ok(); } }); w.init(); });
          if (D.of.length && recebido) ofx = 'achou';
        } catch (e) { console.error('[kontar] onboarding conectar', e); ofErr = e.message || String(e); }
        busy = false; render();
      }
      $('#ofp').addEventListener('click', e => { const t = e.target.closest('[data-cm],[data-oft],[data-ofman],[data-ofmais],[data-ofver]'); if (!t || busy) return;
        if (t.dataset.cm) { D.caminho = t.dataset.cm; $$('#ofp [data-cm]').forEach(x => x.setAttribute('aria-checked', String(x === t))); $('#nx').disabled = !ok(); }
        else if (t.dataset.oft) { const x = D.of[+t.dataset.oft]; x.on = !x.on; t.setAttribute('aria-checked', String(x.on)); const k = $('#ofm'), f = LB(); if (k) k.textContent = f.length ? 'Não vieram: ' + f.map(b => b === 'Outro' ? (dado(b).outro || 'outro banco') : b).join(', ') + '. Conecte também ou preencha à mão no próximo passo.' : ''; }
        else if (t.dataset.ofman) { D.caminho = 'manual'; ofx = null; ofErr = ''; sub = 0; entraAnel(); render(); desenhaBanco(); }
        else if (t.dataset.ofver) { ofx = 'achou'; ofErr = ''; render(); }
        else if (t.dataset.ofmais) conecta(); });
      const dado = b => D.dados[b] || (D.dados[b] = { nome: '', tipo: 'corrente', saldo: '', cred: false, final: '', limite: '', fecha: '', vence: '', outro: '', ico: null, cor: '#6A4BFF', pulou: false });
      const nomePadrao = b => (b === 'Outro' ? (dado(b).outro || 'Outro banco').trim() : b) + ' Conta';
      const desenhaGrade = () => {
        $('#tiles').innerHTML = GRADE.map(b => '<button class="tile" type="button" data-b="' + esc(b) + '" aria-pressed="' + D.bancos.includes(b) + '" aria-label="' + esc(b) + '">' + (KD2.logo && KD2.logo.seletor ? KD2.logo.seletor(b, 20, 84) : logoDe(b, 20, 80)) + '<span class="ck">✓</span></button>').join('');
        $('#outroRow').innerHTML = '<button class="outro" type="button" data-b="Outro" aria-pressed="' + D.bancos.includes('Outro') + '"><span class="ck">✓</span>Meu banco não está na lista</button>';
        const n = D.bancos.length; $('#tcount').textContent = n ? n + (n === 1 ? ' banco marcado: vira 1 conta.' : ' bancos marcados: viram ' + n + ' contas.') + '' : 'Dá pra pular e criar as contas depois, na página Contas.';
      };
      const msgBk = t => { const m = $('#bkm'); if (m) m.textContent = t || ''; };
      const desenhaBanco = () => {
        const b = LB()[sub], d = dado(b), n = LB().length;
        const f = (k, ph, v, pre) => '<div class="fld">' + (pre ? '<span class="pre">' + pre + '</span>' : '') + '<input data-k="' + k + '" value="' + esc(v) + '" placeholder="' + ph + '" inputmode="' + (/saldo|limite|final|fecha|vence/.test(k) ? 'numeric' : 'text') + '" autocomplete="off"></div>';
        $('#bkf').innerHTML = '<div class="bkh"><span class="lg">' + (b === 'Outro' ? '<span class="cap" style="color:#fff">Outro banco</span>' : logoDe(b, 26, 120)) + '</span><span class="cap" style="color:var(--mut)">Banco ' + (sub + 1) + ' de ' + n + '</span></div>'
          + (b === 'Outro' ? '<label class="lab">Nome do banco</label><div class="obr">' + f('outro', 'Ex.: Banco Pan', d.outro) + icoBtn(d) + '</div><label class="lab">Cor do banco</label><div class="pal" id="pal">' + COR_OUTRO.map(c => '<button type="button" data-cor="' + c + '" aria-label="Cor ' + c + '" style="background:' + c + ';box-shadow:' + (d.cor === c ? '0 0 0 2px #111114,0 0 0 4px #fff' : 'none') + '"></button>').join('')
          + '<label title="Escolher outra cor" style="background:' + (COR_OUTRO.includes(d.cor) ? 'conic-gradient(#FF5C5C,#FFB800,#6AFF2A,#2CBFF8,#B18CFF,#FF3D8B,#FF5C5C)' : d.cor) + ';box-shadow:' + (COR_OUTRO.includes(d.cor) ? 'none' : '0 0 0 2px #111114,0 0 0 4px #fff') + '"><input type="color" data-cp="1" value="' + d.cor + '" aria-label="Escolher a cor do banco" style="position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;border:0;padding:0"></label></div>' : '')
          + '<label class="lab">Nome da conta</label>' + f('nome', nomePadrao(b), d.nome)
          + '<div class="seg" role="radiogroup" aria-label="Tipo de conta"><i class="th" id="th" style="transform:translateX(' + TIPOS.findIndex(t => t[0] === d.tipo) * 100 + '%)"></i>' + TIPOS.map(t => '<button type="button" role="radio" data-tp="' + t[0] + '" aria-checked="' + (d.tipo === t[0]) + '">' + icone(t[0]) + '<span>' + t[1] + '</span></button>').join('') + '</div>'
          + '<label class="lab">Saldo atual</label>' + f('saldo', '0,00', d.saldo, 'R$')
          + '<div class="sw" role="switch" tabindex="0" aria-checked="' + d.cred + '" data-sw="1"><i></i><b>Tem cartão de crédito</b></div>'
          + (d.cred ? '<div class="cr">' + f('final', 'Final ····', d.final) + f('limite', 'Limite R$', d.limite) + f('fecha', 'Fecha dia', d.fecha) + f('vence', 'Vence dia', d.vence) + '</div>' : '')
          + '<div class="bkr"><div class="bkm" id="bkm"></div><button class="later" type="button" data-later="1" style="margin:0 20px 0 0;flex:none">Preencher depois</button></div>';
        const e = $('#bkf'); e.classList.remove('on'); void e.offsetWidth; e.classList.add('on');
      };
      const fadeCtl = () => { const c = $('.ctl'), f = $('#cfade'), t = $('#cfadeT'); if (!c || !f) return; const rola = c.scrollHeight > c.clientHeight + 2, fim = c.scrollTop + c.clientHeight >= c.scrollHeight - 3; f.classList.toggle('on', rola && !fim); if (t) { t.style.top = c.offsetTop + 'px'; t.classList.toggle('on', rola && c.scrollTop > 2); } };
      $('.ctl').addEventListener('scroll', fadeCtl, { passive: true }); new ResizeObserver(fadeCtl).observe($('.ctl')); new MutationObserver(fadeCtl).observe($('#bkf'), { childList: true, subtree: true, attributes: true });
      const textoBanco = () => { const b = LB()[sub], n = LB().length, nome = b === 'Outro' ? (dado(b).outro || 'outro banco') : b; $('#sb').innerHTML = 'Dados do ' + esc(nome) + '. Tudo é opcional: dá pra deixar pra depois.'; $('#tag').textContent = 'Banco ' + (sub + 1) + ' de ' + n; $('#note').textContent = 'Cada banco vira uma conta'; ['#sb'].forEach(q => { const e = $(q); e.classList.remove('anim'); void e.offsetWidth; e.classList.add('anim'); }); };
      const validaBanco = () => {
        const b = LB()[sub], d = dado(b);
        if (b === 'Outro' && d.outro.trim().length < 2) return 'Escreva o nome do banco.';
        const nome = (d.nome || nomePadrao(b)).trim(); if (nome.length < 2) return 'Dê um nome para a conta.';
        const usados = LB().filter((x, k) => k !== sub).map(x => (dado(x).nome || nomePadrao(x)).trim().toLowerCase()); if (usados.includes(nome.toLowerCase())) return 'Você já tem uma conta com esse nome aqui.';
        if (d.cred) { const fe = +d.fecha, ve = +d.vence; if (!(fe >= 1 && fe <= 31 && ve >= 1 && ve <= 31)) return 'Informe os dias de fechamento e de vencimento (1 a 31).'; }
        return '';
      };
      const nomesBanco = () => { const seen = new Set(), out = []; [D.nl, D.nj].forEach(v => { const t = String(v || '').trim().replace(/\s+/g, ' '); if (t.length >= 3 && !seen.has(t.toLowerCase())) { seen.add(t.toLowerCase()); out.push(t); } }); return out; };
      $('#nm').value = D.nm;
      $('#route').innerHTML = ST.map((_, k) => '<b>' + (k + 1) + '</b>' + (k < LAST ? '<u></u>' : '')).join('');
      
      const HOW = { import: 'Importar extrato', manual: 'Lançar manualmente', demo: 'Dados demo', open_finance: 'Open Finance' }, ok = () => i === 0 ? D.nm.trim().length > 0 : i === 3 ? !!D.how : i === 2 && ofx === 'como' ? !!D.caminho : true;
      let lastI = -1;
      function render() {
        const s = ST[i]; root.style.setProperty('--ac', s.ac); root.style.setProperty('--on', s.on);
        const mudou = lastI !== i; lastI = i; if (i !== 2 && ringOn) ringOn = false;
        if (mudou) setNum(i + 1); $('#h').innerHTML = s.h; $('#sb').innerHTML = s.sb; $('#note').textContent = s.note; $('#tag').textContent = s.tag; $('#fn').textContent = s.n;
        (mudou ? ['#num', '#h', '#sb'] : []).forEach(q => { const e = $(q); e.classList.remove('anim'); void e.offsetWidth; e.classList.add('anim'); });
        if (i === LAST) { $('#who').textContent = (D.nm.trim().split(/\s+/)[0] || 'você') + '.'; const nb = nomesBanco(), rows = [['Nome', D.nm.trim()], ['Nomes no banco', nb.length ? nb.length + (nb.length === 1 ? ' nome' : ' nomes') : '—'], ['Contas', (nC => nC ? nC + (nC === 1 ? ' conta' : ' contas') : '—')(LB().length + (D.caminho === 'of' ? D.of.filter(x => x.on).length : 0))], ['Começando por', HOW[D.how]], ['Renda mensal', D.rd ? 'R$ ' + D.rd : '—']];
          $('#sum').innerHTML = rows.map((r, k) => '<div><i>' + (k + 1) + '</i><span>' + r[0] + '</span><b></b></div>').join(''); $$('#sum b').forEach((e, k) => { e.textContent = rows[k][1]; }); }
        $$('.step').forEach(e => e.classList.toggle('on', +e.dataset.s === i));
        $('.U').classList.toggle('bk', i === 2 && (sub >= 0 || !!ofx));
        if (i === 2) { if (sub < 0 && !ofx) desenhaGrade(); $('[data-s="2"]').classList.toggle('on', sub < 0 && !ofx); $('#bkf').classList.toggle('on', sub >= 0); $('#ofp').classList.toggle('on', sub < 0 && !!ofx); if (sub >= 0) textoBanco(); else if (ofx) { textoOf(); desenhaOf(); } } else $('#ofp').classList.remove('on');
        if (i === LAST) { resumoW = -1; desenhaResumo(); }
        fadeCtl();
        $$('#route u').forEach((e, k) => e.classList.toggle('done', k < i));
        $$('#route b').forEach((e, k) => { e.classList.toggle('done', k < i); e.classList.toggle('cur', k === i);
          if (k === 2 && (ringOn || e.querySelector('.rg'))) { if (!ringOn && !e._tm) e._tm = setTimeout(() => { e._tm = 0; if (!ringOn) { e.classList.remove('ring', 'full'); e.textContent = i > 2 ? '✓' : '3'; } }, 520); return; }
          e.textContent = k < i ? '✓' : k + 1; });
        $('#bk').disabled = i === 0 || busy; $('#nx .t').textContent = i === LAST ? 'Abrir meu Kontar' : i === 2 && ofx === 'mp' ? 'Conectar' : 'Continuar'; $('#nx').disabled = !ok() || busy;
      }
      new ResizeObserver(drawNotch).observe($('#board')); new ResizeObserver(drawNotch).observe($('#route')); new ResizeObserver(() => setNum(i + 1)).observe($('#num'));
      $('#nm').oninput = e => { D.nm = e.target.value; $('#nx').disabled = !ok(); };
      $('#nm').onkeydown = e => { if (e.key === 'Enter') $('#nx').click(); };
      $('#nl').oninput = e => { D.nl = e.target.value; }; $('#nj').oninput = e => { D.nj = e.target.value; };
      $('#nl').onkeydown = e => { if (e.key === 'Enter') $('#nj').focus(); }; $('#nj').onkeydown = e => { if (e.key === 'Enter') $('#nx').click(); };
      $$('.opt').forEach(b => { b.onclick = () => { D.how = b.dataset.v; $$('.opt').forEach(o => o.setAttribute('aria-checked', o === b)); $('#nx').disabled = !ok(); }; });
      $('#rd').oninput = e => { const d = e.target.value.replace(/\D/g, '').slice(0, 11); e.target.value = d ? (+d / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : ''; D.rd = e.target.value; };
      $('#bk').onclick = () => { if (busy) return; ofErr = '';
        if (i === 2 && sub >= 0) { if (sub > 0) { sub--; progresso(sub / LB().length); render(); desenhaBanco(); } else { sub = -1; saiAnel(); ofx = D.caminho === 'of' ? 'achou' : 'como'; render(); } return; }
        if (i === 2 && ofx) { ofx = ofx === 'achou' ? 'mp' : ofx === 'mp' ? 'como' : null; render(); return; }
        if (i === 4 && usouOF()) { i = 2; ofx = LB().length ? null : 'achou'; if (!ofx) { sub = LB().length - 1; entraAnel(); progresso(sub / LB().length); render(); desenhaBanco(); return; } render(); return; }
        if (i > 0) { i--; render(); } };
      const avancaBanco = pulou => {
        const b = LB()[sub], n = LB().length; if (!pulou) { const m = validaBanco(); if (m) return msgBk(m); } dado(b).pulou = !!pulou;
        if (sub < n - 1) { sub++; progresso(sub / n); render(); desenhaBanco(); }
        else { busy = true; progresso(1); $('#nx').disabled = true; $('#bk').disabled = true; setTimeout(() => { const r = rb(); if (r) r.classList.add('full'); }, 720); setTimeout(() => { busy = false; sub = -1; i = proximo(); render(); }, 1550); }
      };
      $('[data-s="2"]').onclick = e => { const t = e.target.closest('[data-b]'); if (!t) return; const b = t.dataset.b, k = D.bancos.indexOf(b); if (k >= 0) D.bancos.splice(k, 1); else { D.bancos.push(b); D.bancos.sort((x, y) => GRADE.concat(['Outro']).indexOf(x) - GRADE.concat(['Outro']).indexOf(y)); }
        t.setAttribute('aria-pressed', String(k < 0)); const n = D.bancos.length; $('#tcount').textContent = n ? n + (n === 1 ? ' banco marcado: vira 1 conta.' : ' bancos marcados: viram ' + n + ' contas.') + '' : 'Dá pra pular e criar as contas depois, na página Contas.'; };
      $('#bkf').addEventListener('input', e => { const k = e.target.dataset && e.target.dataset.k; if (!k || sub < 0) return; const d = dado(LB()[sub]); let v = e.target.value;
        if (k === 'saldo' || k === 'limite') v = e.target.value = moeda(v); else if (k === 'final') v = e.target.value = v.replace(/[^0-9]/g, '').slice(0, 4); else if (k === 'fecha' || k === 'vence') v = e.target.value = v.replace(/[^0-9]/g, '').slice(0, 2);
        d[k] = v; msgBk(''); if (k === 'outro') textoBanco(); });
      $('#bkf').addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.dataset && e.target.dataset.k) { e.preventDefault(); $('#nx').click(); } else if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset && e.target.dataset.sw) { e.preventDefault(); e.target.click(); } });
      $('#bkf').addEventListener('input', e => { if (!(e.target.dataset && e.target.dataset.cp) || sub < 0) return; const d = dado(LB()[sub]); d.cor = e.target.value; const lb = e.target.parentElement; lb.style.background = d.cor; lb.style.boxShadow = '0 0 0 2px #111114,0 0 0 4px #fff'; $$('#pal button').forEach(x => { x.style.boxShadow = 'none'; }); });
      $('#bkf').addEventListener('change', e => { if (e.target.dataset && e.target.dataset.cp && sub >= 0) desenhaBanco(); });
      $('#bkf').addEventListener('click', e => { const t = e.target.closest('[data-tp],[data-sw],[data-later],[data-cor],[data-ic]'); if (!t || busy || sub < 0) return; const d = dado(LB()[sub]);
        if (t.dataset.ic) { if (window.KD && KD.icPicker) KD.icPicker.abre(t, { atual: d.ico, cor: d.cor, onPick: k => { d.ico = k; desenhaBanco(); } }); return; }
        if (t.dataset.cor) { d.cor = t.dataset.cor; desenhaBanco(); return; }
        if (t.dataset.tp) { d.tipo = t.dataset.tp; $$('#bkf [data-tp]').forEach(x => x.setAttribute('aria-checked', String(x === t))); const th = $('#th'); if (th) th.style.transform = 'translateX(' + TIPOS.findIndex(x => x[0] === d.tipo) * 100 + '%)'; }
        else if (t.dataset.sw) { d.cred = !d.cred; desenhaBanco(); } else if (t.dataset.later) avancaBanco(true); });
      $('#nx').onclick = () => { if (!ok() || busy) return;
        if (i === 2) { ofErr = '';
          if (sub >= 0) return avancaBanco(false);
          if (!ofx) { if (D.bancos.length) { ofx = 'como'; render(); return; } }
          else if (ofx === 'como') { if (D.caminho === 'manual') { ofx = null; sub = 0; entraAnel(); render(); desenhaBanco(); } else { ofx = 'mp'; render(); } return; }
          else if (ofx === 'mp') return conecta();
          else { if (LB().length) { ofx = null; sub = 0; entraAnel(); render(); desenhaBanco(); } else { ofx = null; i = proximo(); render(); } return; } }
        if (i < LAST) { i++; render(); } else { $('#nx .t').textContent = 'Abrindo…'; $('#nx').disabled = true; $('#bk').disabled = true;
        done({ nm: D.nm.trim(), nomes: nomesBanco(), of: D.caminho === 'of' ? D.of.filter(x => x.on).map(x => ({ c: x.c, cx: x.cx, banco: bancoIt(x) })) : [], contas: LB().map(b => { const d = dado(b), p = d.pulou; return { banco: b, outro: (d.outro || '').trim(), ico: b === 'Outro' ? (d.ico || null) : null, cor: d.cor, nome: (p ? '' : d.nome).trim() || nomePadrao(b), tipo: p ? 'corrente' : d.tipo, saldo: p ? 0 : num(d.saldo), cred: !p && d.cred, final: d.final, limite: num(d.limite), fecha: +d.fecha || null, vence: +d.vence || null, pulou: p }; }), how: D.how, rd: D.rd ? parseInt(D.rd.replace(/\D/g, ''), 10) : null, dia: D.dia }); } };
      render(); drawNotch();
    });
  }

  /* ================= partida ================= */
  let started = false;
  const mountApp = () => new Promise(res => {
    const s = document.createElement('script'); s.src = './support.js'; document.body.appendChild(s);
    const t0 = Date.now(), iv = setInterval(() => { if (document.querySelector('[data-screen-label]') || Date.now() - t0 > 20000) { clearInterval(iv); requestAnimationFrame(() => res()); } }, 60);
  });
  /* primeiro acesso = conta nova: sem lançamentos, sem a marca "onboarded" (guardada em user_prefs.prefs) e que não seja a conta demo */
  const prevOnb = () => new URLSearchParams(location.search).get('onb') === '1';   /* ?onb=1 mostra o onboarding sem salvar nada (vale em qualquer endereço) */
  const needsOnboarding = () => { const KD = window.KD; if (prevOnb()) return true; return !KD.isDemo() && !(KD.M.prefs && KD.M.prefs.onboarded) && !(KD.M.rows && KD.M.rows.length); };
  async function saveOnboarding(sb, user, a) {
    const KD = window.KD, P = Object.assign({}, KD.M.prefs, { onboarded: true, inicio: a.how });
    if (a.rd != null) P.renda = a.rd; if (a.dia) P.diaFech = a.dia;            /* renda em centavos (inteiro), como o resto do banco */
    KD.M.prefs = P; KD.M.profile = Object.assign({}, KD.M.profile, { nome_exibicao: a.nm }, a.nomes && a.nomes.length ? { nomes_titular: a.nomes } : {});
    if (prevOnb()) return;
    const r1 = await sb.from('profiles').upsert(Object.assign({ user_id: user.id, nome_exibicao: a.nm }, a.nomes && a.nomes.length ? { nomes_titular: a.nomes } : {}), { onConflict: 'user_id' });
    const r2 = await sb.from('user_prefs').upsert({ user_id: user.id, prefs: P, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
    if (r1.error || r2.error) console.error('[kontar] onboarding', r1.error || r2.error);
    if (a.contas && a.contas.length) await createContas(sb, user, a.contas);
    if (a.of && a.of.length) await createOF(sb, user, a.of);
  }

  /* contas e cartões que vieram do Open Finance no onboarding: cria ligados à conexão e dispara a primeira sincronização (sem travar a abertura do painel) */
  async function createOF(sb, user, lista) {
    const KD = window.KD, hoje = KD.iso ? KD.iso(KD.today) : new Date().toISOString().slice(0, 10);
    const ink = h => { const n = parseInt(String(h).slice(1), 16); return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255 > 0.55 ? '#000000' : '#FFFFFF'; };
    const corDe = b => (b && KD.BANK && KD.BANK[b]) || ['#6A4BFF', '#FFFFFF'];
    const usados = new Set(((KD.M && KD.M.accs) || []).map(x => String(x.nome || '').toLowerCase()));
    try { const r = await sb.from('accounts').select('nome'); (r.data || []).forEach(x => usados.add(String(x.nome || '').toLowerCase())); } catch (e) { /* segue */ }
    const nomeLivre = base => { let n = base, k = 2; while (usados.has(n.toLowerCase())) n = base + ' ' + k++; usados.add(n.toLowerCase()); return n; };
    const liga = x => ({ fonte_modo: 'open_finance', conexao_id: x.cx, of_conta_id: x.c.id });
    let ordA = 100, ordC = 100; const porCx = {}, porBanco = {}; let primeira = null;
    for (const x of lista.filter(x => x.c.tipo === 'BANK')) {
      const c = x.c, inst = x.banco || String(c.nome || 'Conta').trim(), poup = c.subtipo === 'SAVINGS_ACCOUNT';
      const nome = nomeLivre(inst + (poup ? ' Poupança' : ''));
      const r = await sb.from('accounts').insert(Object.assign({ user_id: user.id, nome, instituicao: inst, tipo: poup ? 'poupanca' : 'corrente', funcao: poup ? 'reserva' : 'pagamento', saldo: +c.saldo || 0, saldo_em: hoje, cor: corDe(x.banco)[0], ordem: ++ordA, ativo: true, final4: c.final || null }, liga(x))).select().single();
      if (r.error) { console.error('[kontar] onboarding OF conta', r.error); continue; }
      const a = { id: r.data.id, inst, cor: corDe(x.banco)[0], banco: x.banco };
      if (!porCx[x.cx] && !poup) porCx[x.cx] = a; if (x.banco && !porBanco[x.banco]) porBanco[x.banco] = a; primeira = primeira || a;
    }
    for (const x of lista.filter(x => x.c.tipo === 'CREDIT')) {
      const c = x.c, host = porCx[x.cx] || (x.banco && porBanco[x.banco]) || null;   // o nome do cartão ("MASTERCARD LIVRE") raramente diz o banco: a conta da mesma conexão diz
      const b = x.banco || (host && host.banco) || null, inst = b || (host && host.inst) || String(c.nome || 'Cartão').trim();
      const cor = b ? corDe(b)[0] : host ? host.cor : '#6A4BFF', tinta = b ? corDe(b)[1] : ink(cor), lim = c.limite || null;
      const r = await sb.from('cards').insert(Object.assign({ user_id: user.id, nome: inst, instituicao: inst, brand_hex: cor, tinta, final4: c.final || null, limite: lim, disponivel_informado: c.disponivel != null ? c.disponivel : lim, limite_em: lim ? hoje : null, conta_pagamento_id: host ? host.id : null, ordem: ++ordC, ativo: true }, liga(x))).select().single();
      if (r.error) { console.error('[kontar] onboarding OF cartão', r.error); continue; }
      const y = await sb.from('card_cycles').insert({ user_id: user.id, card_id: r.data.id, vigencia_inicio: hoje, dia_fechamento: c.fecha || 1, dia_vencimento: c.vence || 10, regra: 'dia_fixo', origem: 'chute' });
      if (y.error) console.error('[kontar] onboarding OF ciclo', y.error);
    }
    try { await KD.load(sb, user); } catch (e) { console.error(e); }
    sb.functions.invoke('open-finance', { body: { acao: 'sync' } }).then(async r => {   // lançamentos chegam em segundo plano; o painel atualiza quando terminar
      if (r.error) return console.error('[kontar] onboarding sync', r.error);
      try { if (KD.refresh && KD.comp) await KD.refresh(KD.comp); else await KD.load(sb, user); if (KD.fontes && KD.fontes.carregar) KD.fontes.carregar(); } catch (e) { console.error(e); }
    });
  }

  /* contas escolhidas no onboarding: cada banco vira uma conta (e um cartão de crédito, se o usuário informou) */
  async function createContas(sb, user, lista) {
    const KD = window.KD, hoje = KD.iso ? KD.iso(KD.today) : new Date().toISOString().slice(0, 10), TF = { corrente: 'pagamento', poupanca: 'reserva', investimento: 'reserva', carteira: 'pagamento' };
    let ordC = 0;
    for (let k = 0; k < lista.length; k++) {
      const c = lista[k], inst = c.banco === 'Outro' ? (c.outro || 'Outro banco') : c.banco, br = c.banco === 'Outro' ? [c.cor || '#6A4BFF', ((h => { const n = parseInt(h.slice(1), 16); return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255 > 0.55 ? '#000000' : '#FFFFFF'; })(c.cor || '#6A4BFF'))] : (KD.BANK[c.banco] || ['#F2F0EB', '#000000']);
      const r = await sb.from('accounts').insert({ user_id: user.id, nome: c.nome, instituicao: inst, tipo: c.tipo, funcao: TF[c.tipo] || 'pagamento', saldo: c.saldo || 0, saldo_em: hoje, cor: br[0], ordem: k + 1, ativo: true, icone: c.ico || null }).select().single();
      if (r.error) { console.error('[kontar] onboarding conta', r.error); continue; }
      if (!c.cred) continue;
      const lim = c.limite || null, rc = await sb.from('cards').insert({ user_id: user.id, nome: inst, instituicao: inst, brand_hex: br[0], tinta: br[1], final4: c.final && c.final.length === 4 ? c.final : null, limite: lim, disponivel_informado: lim, limite_em: lim ? hoje : null, conta_pagamento_id: r.data.id, ordem: ++ordC, ativo: true }).select().single();
      if (rc.error) { console.error('[kontar] onboarding cartão', rc.error); continue; }
      const y = await sb.from('card_cycles').insert({ user_id: user.id, card_id: rc.data.id, vigencia_inicio: hoje, dia_fechamento: c.fecha, dia_vencimento: c.vence, regra: 'dia_fixo', origem: 'manual' });
      if (y.error) console.error('[kontar] onboarding ciclo', y.error);
    }
    try { await KD.load(sb, user); } catch (e) { console.error(e); }
  }
  async function start(sb, user) {
    if (started) return; started = true;
    const L = loader(), KD = window.KD;
    /* o runtime do protótipo e o React baixam enquanto os dados chegam (antes só começavam depois deles) */
    ['./support.js', './vendor/react.production.min.js', './vendor/react-dom.production.min.js'].forEach(h => { const l = document.createElement('link'); l.rel = 'preload'; l.as = 'script'; l.href = h; document.head.appendChild(l); });
    try {
      await KD.load(sb, user); performance.mark('kontar:dados');
      const p = KD.M.profile;
      if (p && p.avatar_url && sb.storage) { try { const r = await sb.storage.from('avatars').createSignedUrl(p.avatar_url, 3600 * 24 * 30); KD.avatarUrl = (r.data && r.data.signedUrl) || ''; } catch (e) {} }
      KD.primeLocalStorage();
    } catch (e) { console.error(e); started = false; L.abort(); return failed(e.message || String(e), () => start(sb, user)); }
    if (needsOnboarding()) {
      const guess = (KD.M.profile && KD.M.profile.nome_exibicao) || '', done = onboarding(guess);   /* monta embaixo do carregando */
      await L.finish(); const a = await done;
      try { await saveOnboarding(sb, user, a); } catch (e) { console.error(e); }
      const L2 = loader(); await mountApp(); dismissRoot(); await L2.finish(); return;
    }
    await mountApp(); performance.mark('kontar:app'); dismissRoot(); await L.finish(); performance.mark('kontar:pronto');
    syncSeVelho(sb, user);
  }
  /* Open Finance: ao abrir o app, se a última atualização tem mais de 12h, busca do banco em segundo plano e redesenha quando chegar */
  async function syncSeVelho(sb, user) {
    try {
      if (window.KD.isDemo && window.KD.isDemo()) return;
      const r = await sb.from('fonte_conexoes').select('ultima_sync,status').eq('user_id', user.id).eq('provedor', 'pluggy').neq('status', 'desconectado');
      const cx = r.data || []; if (!cx.length) return;
      const velha = cx.some(c => !c.ultima_sync || Date.now() - Date.parse(c.ultima_sync) > 12 * 3600e3); if (!velha) return;
      const s = await sb.functions.invoke('open-finance', { body: { acao: 'sync' } }); if (s.error) return console.error('[kontar] sync ao abrir', s.error);
      const KD = window.KD; if (KD.refresh && KD.comp) await KD.refresh(KD.comp); else await KD.load(sb, user);
      if (KD.fontes && KD.fontes.carregar) KD.fontes.carregar();
    } catch (e) { console.error('[kontar] sync ao abrir', e); }
  }
  async function main() {
    const mock = local && /[?&]mock=1/.test(location.search), tela = qs('tela');
    if (tela === 'carregando') { loader(); return; }
    if (tela === 'erro') return failed('Failed to fetch', async () => { await wait(1200); });
    let sb;
    const boot = async () => {
      if (mock) {
        await new Promise((ok, no) => { const s = document.createElement('script'); s.src = '../test/mock-sb.js'; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
        sb = window.KontarMock.make(await (await fetch('../test/fixture.json')).json());
      } else {
        if (!CFG.url || !CFG.key) throw new Error('Faltam as chaves do Supabase em config.js.');
        sb = window.supabase.createClient(CFG.url, CFG.key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
      }
      window.KD_SB = sb;
      let recovering = /type=recovery/.test(location.hash);
      sb.auth.onAuthStateChange((ev) => { if (ev === 'PASSWORD_RECOVERY') { recovering = true; newPassword(sb); } });
      const { data } = await sb.auth.getSession();
      if (tela === 'login') return login(sb); if (tela === 'criar') return signup(sb); if (tela === 'nova') return newPassword(sb);
      if (tela === 'sessao') return expired(sb, { email: 'lia@kontar.app', nome: 'Lia Santos' });
      if (recovering) return newPassword(sb);
      if (data && data.session) return start(sb, data.session.user);
      let info = null; try { info = JSON.parse(LS.get(EXP) || 'null'); } catch (e) {}
      if (info && info.email) expired(sb, info); else login(sb);
    };
    const run = async () => { try { await boot(); } catch (e) { console.error(e); failed(e.message || String(e), run); } };
    await run();
  }
  window.KontarBoot = { start, main };
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('./sw.js').catch(() => {});
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', main); else main();
})();
