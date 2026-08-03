import { listarEventos } from "../../services/eventosService.js";
import {
  criarDataLocal,
  escaparTextoHtml as escaparHTML,
  formatarStatus as formatarStatusPadrao,
} from "../../utils/formatadores.js";

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
  return formatarStatusPadrao(status, { padrao: "Lançado" });
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

async function obterEventosFuturos() {
  const eventos = await listarEventos();

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

export async function iniciarCalendarioUsu() {
  const listaEventos = document.querySelector(
    "#lista-eventos-publicos",
  );

  if (!listaEventos) {
    return;
  }

  listaEventos.innerHTML = `
    <div class="calendario-usuario-vazio">
      <span>⏳</span>

      <h2>Carregando eventos...</h2>
    </div>
  `;

  try {
    const eventos = await obterEventosFuturos();

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
  } catch (erro) {
    console.error(erro);

    listaEventos.innerHTML = `
      <div class="calendario-usuario-vazio">
        <span>⚠️</span>

        <h2>Não foi possível carregar os eventos</h2>

        <p>
          Tente novamente dentro de alguns instantes.
        </p>
      </div>
    `;
  }
}
export function renderCalendarioView() {
  return `
    <main class="layout-pagina pagina-calendario">
      <header class="cabecalho-principal">
        <div class="marca-sistema">
          <div class="marca-icone">🥾</div>

          <div class="marca-linha">
            <h1>Calendário de Trilhas</h1>
            <span>Gestão de eventos e clima</span>
          </div>
        </div>

        <button
          id="botao-atualizar-clima"
          class="botao-controle botao-atualizar-clima"
          type="button"
        >
          Atualizar clima
        </button>
      </header>

      <section
        id="painel-previsao-dia"
        class="painel-previsao-dia"
      ></section>

       <section class="conteudo-principal">
        <section class="area-calendario">
          <div class="cabecalho-calendario">
            <div class="controle-mes-principal">
              <button
                id="botao-mes-anterior"
                class="botao-navegacao"
                type="button"
                aria-label="Mês anterior"
              >
                ←
              </button>

              <h2 id="titulo-mes"></h2>

              <button
                id="botao-proximo-mes"
                class="botao-navegacao"
                type="button"
                aria-label="Próximo mês"
              >
                →
              </button>
            </div>
            <!--
            <button
              id="botao-hoje"
              class="botao-controle"
              type="button"
            >
              Hoje
            </button>
            -->
          </div>

          <div class="dias-semana" aria-hidden="true">
            <span>Dom</span>
            <span>Seg</span>
            <span>Ter</span>
            <span>Qua</span>
            <span>Qui</span>
            <span>Sex</span>
            <span>Sáb</span>
          </div>

          <section
            id="calendario"
            class="calendario"
            aria-label="Calendário mensal de trilhas"
          ></section>
        </section>

        <aside id="painel-evento" class="painel-evento">
          <div class="painel-vazio">
            <h2>Detalhes da trilha</h2>

            <p>
              Selecione um dia para visualizar ou cadastrar um evento.
            </p>
          </div>
        </aside>
         
      </section>

      <footer class="rodape-calendario">
        <p id="ultima-atualizacao-clima">
          Clima ainda não atualizado
        </p>
      </footer>
    </main>
  `;
}