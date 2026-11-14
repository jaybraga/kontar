/* Kontar · entrada: login, carregamento e partida do protótipo.
   A tela de login reaproveita a composição da tela "Você saiu." do protótipo 08
   (quadrado roxo, título 84px, texto cinza, botão osso). O carregamento é a mesma
   composição, só com o quadrado e uma linha de texto. */
(function () {
  'use strict';
  const CFG = window.KONTAR_CONFIG || {};
  const css = `
  #kboot{position:fixed;inset:0;z-index:2147483000;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;transition:opacity .42s cubic-bezier(0,0,.2,1)}
  #kboot .w{display:flex;flex-direction:column;align-items:flex-start;width:420px;max-width:calc(100vw - 32px);animation:kbIn .6s cubic-bezier(.65,0,.35,1) both}
  #kboot .lg{width:44px;height:44px;border-radius:14px;background:#5B3DF5;display:block}
  #kboot .lg.p{animation:kbPulse 1.6s cubic-bezier(.65,0,.35,1) infinite}
  #kboot h1{margin:28px 0 0;font-size:84px;font-weight:700;letter-spacing:-0.065em;line-height:.85}
  #kboot p{margin:16px 0 0;font-size:15px;color:#9A9AA3;line-height:1.45}
  #kboot form{margin-top:28px;display:flex;flex-direction:column;gap:10px;width:100%}
  #kboot input{height:46px;box-sizing:border-box;padding:0 20px;border-radius:9999px;border:1px solid #3A3A40;background:#000;color:#fff;font:inherit;font-size:15px;outline:0;transition:border-color .25s ease}
  #kboot input:focus{border-color:#F2F0EB}
  #kboot button{margin-top:8px;align-self:flex-start;height:46px;display:inline-flex;align-items:center;padding:0 24px;border-radius:9999px;border:0;background:#F2F0EB;color:#000;font:inherit;font-size:14.5px;font-weight:700;cursor:pointer;transition:filter .25s ease}
  #kboot button:hover{filter:brightness(.92)} #kboot button[disabled]{opacity:.5;cursor:default}
  #kboot .err{margin-top:12px;font-size:13.5px;color:#FF6A5C;min-height:18px}
  #kboot .lk{margin-top:14px;font-size:13px;color:#9A9AA3;cursor:pointer;text-decoration:underline;text-underline-offset:3px}
  #kboot .lk:hover{color:#fff}
  @keyframes kbIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  @keyframes kbPulse{0%,100%{opacity:1}50%{opacity:.35}}
  @media (max-width:520px){#kboot h1{font-size:64px}}
  @media (prefers-reduced-motion:reduce){#kboot .w,#kboot .lg.p{animation:none}}`;
  let root;
  function shell() {
    if (root) return root;
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    root = document.createElement('div'); root.id = 'kboot'; document.body.appendChild(root); return root;
  }
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  function loading(msg) { shell().innerHTML = `<div class="w"><span class="lg p"></span><p style="margin-top:28px">${esc(msg || 'Carregando seus dados…')}</p></div>`; }
  function failed(msg) {
    shell().innerHTML = `<div class="w"><span class="lg"></span><h1>Opa.</h1><p>Não deu pra carregar seus dados. ${esc(msg || '')}</p><form><button type="button" id="kbRetry">Tentar de novo</button></form></div>`;
    document.getElementById('kbRetry').onclick = () => location.reload();
  }
  function login(sb, note) {
    shell().innerHTML = `<div class="w"><span class="lg"></span><h1>Entrar.</h1><p>${esc(note || 'Seus dados ficam salvos e só você vê.')}</p>
      <form id="kbF" autocomplete="on"><input id="kbE" type="text" inputmode="email" autocapitalize="none" autocorrect="off" spellcheck="false" name="email" placeholder="E-mail ou usuário" autocomplete="username" required>
      <input id="kbP" type="password" name="password" placeholder="Senha" autocomplete="current-password" required>
      <button id="kbB" type="submit">Entrar</button><div class="err" id="kbX"></div><span class="lk" id="kbR">Esqueci a senha</span></form></div>`;
    const f = document.getElementById('kbF'), b = document.getElementById('kbB'), x = document.getElementById('kbX');
    f.onsubmit = async e => { e.preventDefault(); b.disabled = true; x.textContent = '';
      const r = await sb.auth.signInWithPassword({ email: (v => /@/.test(v) ? v : v.toLowerCase() + '@kontar.app')(document.getElementById('kbE').value.trim()), password: document.getElementById('kbP').value });
      if (r.error) { b.disabled = false; x.textContent = /Invalid login/i.test(r.error.message) ? 'E-mail/usuário ou senha não conferem.' : r.error.message; return; }
      start(sb, r.data.user); };
    document.getElementById('kbR').onclick = async () => { const em = document.getElementById('kbE').value.trim(); if (!em) { x.textContent = 'Escreva seu e-mail primeiro.'; return; }
      const r = await sb.auth.resetPasswordForEmail(em, { redirectTo: location.origin + location.pathname }); x.style.color = r.error ? '#FF6A5C' : '#6AFF2A'; x.textContent = r.error ? r.error.message : 'Mandamos um link pro seu e-mail. Vale por 30 min.'; };
  }
  function newPassword(sb) {
    shell().innerHTML = `<div class="w"><span class="lg"></span><h1>Nova senha.</h1><p>Escolha a senha que você vai usar daqui pra frente.</p>
      <form id="kbF"><input id="kbP" type="password" placeholder="Nova senha" autocomplete="new-password" minlength="8" required><button id="kbB" type="submit">Salvar senha</button><div class="err" id="kbX"></div></form></div>`;
    document.getElementById('kbF').onsubmit = async e => { e.preventDefault(); const b = document.getElementById('kbB'), x = document.getElementById('kbX'); b.disabled = true;
      const r = await sb.auth.updateUser({ password: document.getElementById('kbP').value });
      if (r.error) { b.disabled = false; x.textContent = r.error.message; return; } history.replaceState(null, '', location.pathname); start(sb, r.data.user); };
  }
  let started = false;
  async function start(sb, user) {
    if (started) return; started = true; loading();
    try {
      await window.KD.load(sb, user);
      const p = window.KD.M.profile;
      if (p && p.avatar_url && sb.storage) { try { const r = await sb.storage.from('avatars').createSignedUrl(p.avatar_url, 3600 * 24 * 30); window.KD.avatarUrl = (r.data && r.data.signedUrl) || ''; } catch (e) {} }
      window.KD.primeLocalStorage();
    } catch (e) { console.error(e); started = false; return failed(e.message || ''); }
    const s = document.createElement('script'); s.src = './support.js'; document.body.appendChild(s);
    const t0 = Date.now(), iv = setInterval(() => {
      if (document.querySelector('[data-screen-label]') || Date.now() - t0 > 20000) { clearInterval(iv); requestAnimationFrame(() => { root.style.opacity = '0'; root.style.pointerEvents = 'none'; setTimeout(() => root.remove(), 450); }); }
    }, 60);
  }
  async function main() {
    loading('Abrindo o Kontar…');
    const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname), mock = local && /[?&]mock=1/.test(location.search);
    let sb;
    if (mock) {
      await new Promise((ok, no) => { const s = document.createElement('script'); s.src = '../test/mock-sb.js'; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
      sb = window.KontarMock.make(await (await fetch('../test/fixture.json')).json());
    } else {
      if (!CFG.url || !CFG.key) return failed('Faltam as chaves do Supabase em config.js.');
      sb = window.supabase.createClient(CFG.url, CFG.key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
    }
    window.KD_SB = sb;
    let recovering = /type=recovery/.test(location.hash);
    sb.auth.onAuthStateChange((ev, session) => { if (ev === 'PASSWORD_RECOVERY') { recovering = true; newPassword(sb); } });
    const { data } = await sb.auth.getSession();
    if (recovering) return newPassword(sb);
    if (data && data.session) start(sb, data.session.user); else login(sb);
  }
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('./sw.js').catch(() => {});
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', main); else main();
})();
