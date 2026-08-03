/* =========================================================
   Funções compartilhadas de formatação (datas, HTML, status)
   usadas em vários pontos do site (calendário, eventos, painel
   de previsão). Centralizadas aqui pra evitar cópias divergentes
   do mesmo comportamento espalhadas pelos componentes.
========================================================= */

export function criarDataLocal(dataString) {
  const [ano, mes, dia] = dataString.split("-").map(Number);

  return new Date(ano, mes - 1, dia);
}

/**
 * Formata uma data "YYYY-MM-DD" em dia da semana + data por extenso.
 * Passe { comAno: true } para incluir o ano (usado no painel de previsão).
 */
export function formatarData(data, { comAno = false } = {}) {
  const dataLocal = criarDataLocal(data);

  const diaSemana = dataLocal.toLocaleDateString("pt-BR", {
    weekday: "long",
  });

  const dataCompleta = dataLocal.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    ...(comAno ? { year: "numeric" } : {}),
  });

  return {
    diaSemana: diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1),

    dataCompleta:
      dataCompleta.charAt(0).toUpperCase() + dataCompleta.slice(1),
  };
}

export function escaparTextoHtml(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Traduz o status de um evento para o texto exibido.
 * Passe { padrao: "Lançado" } para cair num valor padrão quando
 * o status não é reconhecido (usado no calendário público).
 */
export function formatarStatus(status, { padrao } = {}) {
  const nomesStatus = {
    lancado: "Lançado",
    confirmado: "Confirmado",
    cancelado: "Cancelado",
  };

  return nomesStatus[status] ?? padrao;
}
