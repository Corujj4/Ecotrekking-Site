import { carregarEventos } from "../../services/storageService.js";

const configuracaoTipos = {
  trilha: {
    nome: "Trilha",
    icone: "🥾",
  },

  rapel: {
    nome: "Rapel",
    icone: "🧗",
  },

  trip: {
    nome: "Trip",
    icone: "🧭",
  },
};

function escaparHTML(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function criarDataLocal(dataString) {
  const [ano, mes, dia] = dataString.split("-").map(Number);

  return new Date(ano, mes - 1, dia);
}

function formatarDataEvento(dataString) {
  const data = criarDataLocal(dataString);

  return {
    dia: String(data.getDate()).padStart(2, "0"),

    mes: data
      .toLocaleDateString("pt-BR", {
        month: "short",
      })
      .replace(".", "")
      .toUpperCase(),

    diaSemana: data.toLocaleDateString("pt-BR", {
      weekday: "long",
    }),
  };
}

function obterTipoEvento(evento) {
  const tipo = evento.tipo?.toLowerCase();

  return configuracaoTipos[tipo] || configuracaoTipos.trilha;
}

function renderEvento(evento) {
  const tipo = obterTipoEvento(evento);

  const horario =
    evento.horarioInicio && evento.horarioFim
      ? `${evento.horarioInicio} às ${evento.horarioFim}`
      : evento.horarioInicio ||
        evento.horarioFim ||
        "Horário não informado";

  return `
    <article
      class="
        evento-publico
        evento-tipo-${escaparHTML(evento.tipo || "trilha")}
        evento-status-${escaparHTML(evento.status || "lancado")}
      "
      data-evento-id="${escaparHTML(evento.id)}"
    >
      <header class="cabecalho-evento-publico">
        <span class="tipo-evento-publico">
          ${tipo.icone}
          ${tipo.nome}
        </span>

        <span class="status-evento-publico">
          ${formatarStatus(evento.status)}
        </span>
      </header>

      <div class="conteudo-evento-publico">
        <h2>${escaparHTML(evento.titulo)}</h2>

        <div class="informacoes-evento-publico">
          <span>
            📍 ${escaparHTML(evento.local || "Local não informado")}
          </span>

          <span>
            🕒 ${escaparHTML(horario)}
          </span>

          ${
            evento.quilometragem
              ? `
                <span>
                  📏 ${escaparHTML(evento.quilometragem)} km
                </span>
              `
              : ""
          }
        </div>

        ${
          evento.descricao
            ? `
              <p class="descricao-evento-publico">
                ${escaparHTML(evento.descricao)}
              </p>
            `
            : ""
        }
        <div class="acoes-evento-publico">
  <button
    class="botao-detalhes-evento"
    type="button"
    data-acao="ver-detalhes"
    data-evento-id="${escaparHTML(evento.id)}"
  >
    Ver detalhes
    <i class="fa-solid fa-arrow-right"></i>
  </button>
</div>
      </div>
    </article>
  `;
}

function renderGrupoDia(data, eventosDoDia) {
  const dataFormatada = formatarDataEvento(data);

  

  return `
    <section class="grupo-dia-eventos">
      <div class="data-eventos-publicos">
        <strong>${dataFormatada.dia}</strong>
        <span>${dataFormatada.mes}</span>
      </div>

      <div class="conteudo-grupo-dia">
        <span class="dia-semana-eventos">
          ${dataFormatada.diaSemana}
        </span>

       <div class="grade-eventos-publicos">
          ${eventosDoDia.map(renderEvento).join("")}
        </div>
      </div>
    </section>
  `;
}

function formatarStatus(status) {
  const statusFormatados = {
    lancado: "Lançado",
    confirmado: "Confirmado",
    cancelado: "Cancelado",
  };

  return statusFormatados[status] || "Lançado";
}

function agruparEventosPorData(eventos) {
  return eventos.reduce((grupos, evento) => {
    if (!evento.data) {
      return grupos;
    }

    if (!grupos[evento.data]) {
      grupos[evento.data] = [];
    }

    grupos[evento.data].push(evento);

    return grupos;
  }, {});
}

function obterEventosFuturos() {
  const eventos = carregarEventos();

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return eventos
    .filter((evento) => {
      if (!evento.data) {
        return false;
      }

      return criarDataLocal(evento.data) >= hoje;
    })
    .sort((eventoA, eventoB) => {
      const diferencaData =
        criarDataLocal(eventoA.data) -
        criarDataLocal(eventoB.data);

      if (diferencaData !== 0) {
        return diferencaData;
      }

      return (eventoA.horarioInicio || "").localeCompare(
        eventoB.horarioInicio || "",
      );
    });
}

export function renderCalendarioUsu() {
  return `
    <main class="layout-pagina pagina-calendario-usuario">
      <header class="cabecalho-calendario-usuario">
  <div class="titulo-cabecalho-calendario">
    <i class="fa-solid fa-calendar-days"></i>

    <h1>Próximos Eventos</h1>
  </div>

  <p>
    Confira as próximas trilhas, rapéis e trips programadas pela nossa equipe.
  </p>
</header>

      <section
        id="lista-eventos-publicos"
        class="lista-eventos-publicos"
        aria-label="Próximos eventos"
      ></section>
    </main>
  `;
}

export function iniciarCalendarioUsu() {
  const listaEventos = document.querySelector(
    "#lista-eventos-publicos",
  );

  if (!listaEventos) {
    return;
  }

  const eventos = obterEventosFuturos();

  if (eventos.length === 0) {
    listaEventos.innerHTML = `
      <div class="calendario-usuario-vazio">
        <span>🥾</span>

        <h2>Nenhum evento programado</h2>

        <p>
          Assim que novas atividades forem confirmadas,
          elas aparecerão aqui.
        </p>
      </div>
    `;

    return;
  }

  const eventosAgrupados = agruparEventosPorData(eventos);

  listaEventos.innerHTML = Object.entries(eventosAgrupados)
    .map(([data, eventosDoDia]) =>
      renderGrupoDia(data, eventosDoDia),
    )
    .join("");
}