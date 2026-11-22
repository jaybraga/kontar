/* Endereço do Supabase e a chave pública (publishable). Ela sozinha não lê nada:
   toda tabela exige login (RLS). Quem fizer o próprio deploy troca só estes dois valores. */
window.KONTAR_CONFIG = {
  url: 'https://hwqomctwrhwapovctsoy.supabase.co',
  key: 'sb_publishable_HVQVQ4kGHklKSPUaYVbfPQ_8I8bFIcz',
  // MODO DE TESTE: aceita criar conta só com um nome de usuário (vira usuario@kontar.app), sem e-mail válido.
  // Desativar (false) quando o Kontar estiver oficialmente no ar.
  aceitarUsuarioSemEmail: true
};
