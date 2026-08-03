import { listarAtividades } from "../../services/atividadesService.js";
import L from "leaflet";
import "leaflet-routing-machine";

function normalizarTexto(texto) {
  return String(texto ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function escaparHtml(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function obterValor(valor, textoPadrao = "Não informado") {
  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {
    return textoPadrao;
  }

  return valor;
}

function obterDistancia(atividade) {
  return (
    atividade.distancia ??
    atividade.quilometragem ??
    null
  );
}

function formatarDistancia(atividade) {
  const distancia = obterDistancia(atividade);

  if (
    distancia === null ||
    distancia === undefined ||
    distancia === ""
  ) {
    return "Não informada";
  }

  return `${distancia} km`;
}

function formatarNivel(atividade) {
  const nivel = obterValor(
    atividade.nivel,
    "Não informado"
  );

  if (nivel === "Não informado") {
    return nivel;
  }

  return `${nivel}/10`;
}

function formatarCapacidade(atividade) {
  const capacidade = obterValor(
    atividade.capacidade,
    "Não informada"
  );

  if (capacidade === "Não informada") {
    return capacidade;
  }

  return `${capacidade} pessoas`;
}

function formatarAltura(atividade) {
  const altura =
    atividade.altura ??
    atividade.altimetria ??
    atividade.metros ??
    null;

  if (
    altura === null ||
    altura === undefined ||
    altura === ""
  ) {
    return "Não informada";
  }

  return `${altura} m`;
}

function obterNomeClima(clima) {
  switch (Number(clima)) {
    case 1:
      return "Verão";

    case 2:
      return "Primavera / Outono";

    case 3:
      return "Inverno";

    default:
      return obterValor(clima);
  }
}

function obterLocal(atividade) {
  const cidade = atividade.cidade;
  const estado = atividade.estado;
  const local = atividade.local;

  if (cidade && estado) {
    return `${cidade} - ${estado}`;
  }

  return obterValor(
    local || cidade,
    "Local não informado"
  );
}

function obterClasseDificuldade(dificuldade) {
  const texto = normalizarTexto(dificuldade)
    .replaceAll("-", " ")
    .replace(/\s+/g, " ")
    .trim();

  if (texto.includes("muito dificil")) {
    return "dificuldade-muito-dificil";
  }

  if (texto.includes("facil media")) {
    return "dificuldade-facil-media";
  }

  if (texto.includes("dificil")) {
    return "dificuldade-dificil";
  }

  if (texto.includes("media")) {
    return "dificuldade-media";
  }

  return "dificuldade-facil";
}

const CAMPOS_PADRAO = {
  distancia: {
    titulo: "Distância",
    icone: "fa-route",

    obterValor(atividade) {
      return formatarDistancia(atividade);
    }
  },

  nivel: {
    titulo: "Nível",
    icone: "fa-chart-line",

    obterValor(atividade) {
      return formatarNivel(atividade);
    }
  },

  dificuldade: {
    titulo: "Dificuldade",
    icone: "fa-gauge-high",

    obterValor(atividade) {
      return obterValor(
        atividade.dificuldade
      );
    }
  },

  temperatura: {
    titulo: "Temperatura",
    icone: "fa-temperature-half",

    obterValor(atividade) {
      return obterValor(
        atividade.temperatura
      );
    }
  },

  clima: {
    titulo: "Grupo climático",
    icone: "fa-cloud-sun",

    obterValor(atividade) {
      return obterNomeClima(
        atividade.clima
      );
    }
  },

  local: {
    titulo: "Local",
    icone: "fa-location-dot",

    obterValor(atividade) {
      return obterLocal(atividade);
    }
  },

  cidade: {
    titulo: "Cidade",
    icone: "fa-city",

    obterValor(atividade) {
      const cidade = atividade.cidade;
      const estado = atividade.estado;

      if (cidade && estado) {
        return `${cidade} - ${estado}`;
      }

      return obterValor(
        cidade || atividade.local
      );
    }
  },

  estado: {
    titulo: "Estado",
    icone: "fa-map",

    obterValor(atividade) {
      return obterValor(
        atividade.estado
      );
    }
  },

  capacidade: {
    titulo: "Capacidade",
    icone: "fa-users",

    obterValor(atividade) {
      return formatarCapacidade(
        atividade
      );
    }
  },

  altura: {
    titulo: "Altura",
    icone: "fa-arrow-up-long",

    obterValor(atividade) {
      return formatarAltura(
        atividade
      );
    }
  },

  duracao: {
    titulo: "Duração",
    icone: "fa-clock",

    obterValor(atividade) {
      return obterValor(
        atividade.duracao
      );
    }
  },

  dias: {
    titulo: "Duração",
    icone: "fa-calendar-days",

    obterValor(atividade) {
      const dias =
        atividade.dias ??
        atividade.duracao_dias ??
        null;

      if (
        dias === null ||
        dias === undefined ||
        dias === ""
      ) {
        return "Não informada";
      }

      return Number(dias) === 1
        ? "1 dia"
        : `${dias} dias`;
    }
  },

  equipamento: {
    titulo: "Equipamento",
    icone: "fa-helmet-safety",

    obterValor(atividade) {
      return obterValor(
        atividade.equipamento ??
        atividade.equipamentos
      );
    }
  },

  equipamentos: {
    titulo: "Equipamentos",
    icone: "fa-helmet-safety",

    obterValor(atividade) {
      return obterValor(
        atividade.equipamentos ??
        atividade.equipamento
      );
    }
  },

  descricao: {
    titulo: "Descrição",
    icone: "fa-align-left",
    largo: true,

    obterValor(atividade) {
      return obterValor(
        atividade.descricao
      );
    }
  }
};

function resolverCampo(campo) {
  if (typeof campo === "string") {
    return {
      chave: campo,
      ...CAMPOS_PADRAO[campo]
    };
  }

  if (
    campo &&
    typeof campo === "object"
  ) {
    const configuracaoPadrao =
      campo.chave
        ? CAMPOS_PADRAO[campo.chave]
        : null;

    return {
      ...configuracaoPadrao,
      ...campo
    };
  }

  return null;
}

export function criarCatalogo(configuracao) {
  let atividades = [];
  let atividadeSelecionadaId = null;

  const {
    tipo,
    prefixo,
    titulo,
    descricao,
    icone,
    nomeSingular,
    nomePlural,

    camposDetalhes = [
      "distancia",
      "nivel",
      "local",
      "capacidade"
    ],

    mostrarDificuldade = true,

    mostrarFiltroDificuldade =
      mostrarDificuldade,

    mostrarFiltroClima = false,

    mostrarCapacidadeItem = true,

    criarResumoItem = null,

    renderExtra = null,

    depoisDeRenderizarDetalhes = null,

    aoClicarCalendario = null,

    aoClicarDetalhes = null
  } = configuracao;

  if (!tipo) {
    throw new Error(
      "O catálogo precisa receber a propriedade 'tipo'."
    );
  }

  if (!prefixo) {
    throw new Error(
      "O catálogo precisa receber a propriedade 'prefixo'."
    );
  }

  /* =======================================================
     SELETORES DO CATÁLOGO
     ======================================================= */

  function obterRaiz() {
    return document.querySelector(
      `[data-catalogo="${prefixo}"]`
    );
  }

  function obterLista() {
    return document.querySelector(
      `#lista-${prefixo}`
    );
  }

  function obterPainel() {
    return document.querySelector(
      `#painel-detalhes-${prefixo}`
    );
  }

  function obterCampoBusca() {
    return document.querySelector(
      `#busca-${prefixo}`
    );
  }

  function obterFiltroDificuldade() {
    return document.querySelector(
      `#filtro-dificuldade-${prefixo}`
    );
  }

  function obterFiltroClima() {
    return document.querySelector(
      `#filtro-clima-${prefixo}`
    );
  }

  /* =======================================================
     RESUMO DO ITEM
     ======================================================= */

  function obterResumoItem(atividade) {
    if (
      typeof criarResumoItem ===
      "function"
    ) {
      return criarResumoItem(atividade);
    }

    const distancia =
      formatarDistancia(atividade);

    const nivel = obterValor(
      atividade.nivel
    );

    if (
      distancia !== "Não informada"
    ) {
      return `${distancia} · nível ${nivel}`;
    }

    const altura =
      formatarAltura(atividade);

    if (altura !== "Não informada") {
      return `${altura} · nível ${nivel}`;
    }

    return `Nível ${nivel}`;
  }

  /* =======================================================
     ITEM DA LISTA
     ======================================================= */

  function renderItem(atividade) {
    const id = obterValor(
      atividade.id,
      "-"
    );

    const nome = obterValor(
      atividade.nome,
      `Sem nome`
    );

    const resumo =
      obterResumoItem(atividade);

    return `
      <button
        class="catalogo-item"
        type="button"
        data-atividade-id="${escaparHtml(id)}"
        aria-pressed="false"
      >
        <div class="catalogo-item-principal">
          <span class="catalogo-item-id">
            #${escaparHtml(id)}
          </span>

          <div>
            <h2 title="${escaparHtml(nome)}">
              ${escaparHtml(nome)}
            </h2>

            <p title="${escaparHtml(resumo)}">
              ${escaparHtml(resumo)}
            </p>
          </div>
        </div>

        <div class="catalogo-item-resumo">
          ${
            mostrarDificuldade
              ? `
                <span
                  class="
                    catalogo-badge
                    ${obterClasseDificuldade(
                      atividade.dificuldade
                    )}
                  "
                >
                  ${escaparHtml(
                    obterValor(
                      atividade.dificuldade
                    )
                  )}
                </span>
              `
              : ""
          }

          ${
            mostrarCapacidadeItem
              ? `
                <span>
                  <i class="fa-solid fa-users"></i>

                  ${escaparHtml(
                    obterValor(
                      atividade.capacidade,
                      "-"
                    )
                  )}
                </span>
              `
              : ""
          }
        </div>
      </button>
    `;
  }

  /* =======================================================
     CAMPOS DO PAINEL
     ======================================================= */

  function obterValorCampo(
    campo,
    atividade
  ) {
    if (
      typeof campo.obterValor ===
      "function"
    ) {
      return campo.obterValor(
        atividade
      );
    }

    if (campo.chave) {
      return obterValor(
        atividade[campo.chave]
      );
    }

    return "Não informado";
  }

  function renderCampoDetalhe(
    campoOriginal,
    atividade
  ) {
    const campo =
      resolverCampo(campoOriginal);

    if (
      !campo ||
      !campo.titulo ||
      !campo.icone
    ) {
      return "";
    }

    const valor =
      obterValorCampo(
        campo,
        atividade
      );

    const classeLargo =
      campo.largo
        ? "catalogo-detalhe-largo"
        : "";

    return `
      <div
        class="
          catalogo-detalhe
          ${classeLargo}
        "
      >
        <i
          class="fa-solid ${escaparHtml(
            campo.icone
          )}"
        ></i>

        <div>
          <span>
            ${escaparHtml(
              campo.titulo
            )}
          </span>

          <strong
            title="${escaparHtml(valor)}"
          >
            ${escaparHtml(valor)}
          </strong>
        </div>
      </div>
    `;
  }

  /* =======================================================
     CONTEÚDO EXTRA
     ======================================================= */

  function obterConteudoExtra(
    atividade
  ) {
    if (
      typeof renderExtra !==
      "function"
    ) {
      return "";
    }

    try {
      return (
        renderExtra(atividade) ??
        ""
      );
    } catch (erro) {
      console.error(
        `Erro ao renderizar conteúdo extra de ${prefixo}:`,
        erro
      );

      return "";
    }
  }

  /* =======================================================
     PAINEL DE DETALHES
     ======================================================= */

  function renderDetalhes(atividade) {
    const id = obterValor(
      atividade.id,
      "-"
    );

    const nome = obterValor(
      atividade.nome,
      "Sem nome"
    );

    return `
      <div class="catalogo-detalhes-conteudo">
        <header class="catalogo-detalhes-cabecalho">
          <div>
            <span class="catalogo-detalhes-id">
              ${escaparHtml(
                nomeSingular
              )} #${escaparHtml(id)}
            </span>

            <h2>
              ${escaparHtml(nome)}
            </h2>
          </div>

          ${
            mostrarDificuldade
              ? `
                <span
                  class="
                    catalogo-badge
                    ${obterClasseDificuldade(
                      atividade.dificuldade
                    )}
                  "
                >
                  ${escaparHtml(
                    obterValor(
                      atividade.dificuldade
                    )
                  )}
                </span>
              `
              : ""
          }
        </header>

        <div class="catalogo-detalhes-grid">
          ${camposDetalhes
            .map((campo) =>
              renderCampoDetalhe(
                campo,
                atividade
              )
            )
            .join("")}
        </div>

        ${obterConteudoExtra(atividade)}

        <div class="catalogo-acoes">
          <button
            class="
              catalogo-botao
              catalogo-botao-secundario
            "
            type="button"
            data-acao-catalogo="calendario"
          >
            Ver no calendário
          </button>

          <button
            class="
              catalogo-botao
              catalogo-botao-principal
            "
            type="button"
            data-acao-catalogo="detalhes"
          >
            Ver detalhes completos
          </button>
        </div>
      </div>
    `;
  }

  function renderPlaceholder(
    mensagem =
      `Selecione um ${nomeSingular} para visualizar os detalhes.`
  ) {
    return `
      <div class="catalogo-placeholder">
        <i class="fa-solid ${escaparHtml(
          icone
        )}"></i>

        <p>
          ${escaparHtml(mensagem)}
        </p>
      </div>
    `;
  }

  /* =======================================================
     EVENTOS DO PAINEL
     ======================================================= */

  function adicionarEventosPainel(
    atividade
  ) {
    const painel = obterPainel();

    if (!painel) {
      return;
    }

    const botaoCalendario =
      painel.querySelector(
        '[data-acao-catalogo="calendario"]'
      );

    const botaoDetalhes =
      painel.querySelector(
        '[data-acao-catalogo="detalhes"]'
      );

    botaoCalendario?.addEventListener(
      "click",
      () => {
        if (
          typeof aoClicarCalendario ===
          "function"
        ) {
          aoClicarCalendario(
            atividade
          );

          return;
        }

        console.log(
          "Abrir no calendário:",
          atividade
        );
      }
    );

    botaoDetalhes?.addEventListener(
      "click",
      () => {
        if (
          typeof aoClicarDetalhes ===
          "function"
        ) {
          aoClicarDetalhes(
            atividade
          );

          return;
        }

        console.log(
          "Abrir detalhes completos:",
          atividade
        );
      }
    );
  }

  /* =======================================================
     SELEÇÃO
     ======================================================= */

  function atualizarItemAtivo(id) {
    const raiz = obterRaiz();

    if (!raiz) {
      return;
    }

    raiz
      .querySelectorAll(
        ".catalogo-item"
      )
      .forEach((item) => {
        const ativo =
          String(
            item.dataset.atividadeId
          ) === String(id);

        item.classList.toggle(
          "ativa",
          ativo
        );

        item.setAttribute(
          "aria-pressed",
          String(ativo)
        );
      });
  }

  function selecionarAtividade(id) {
    const atividade =
      atividades.find(
        (item) =>
          String(item.id) ===
          String(id)
      );

    const painel = obterPainel();

    if (
      !atividade ||
      !painel
    ) {
      return;
    }

    atividadeSelecionadaId =
      atividade.id;

    painel.innerHTML =
      renderDetalhes(atividade);

    atualizarItemAtivo(
      atividade.id
    );

    adicionarEventosPainel(
      atividade
    );

    if (
      typeof depoisDeRenderizarDetalhes ===
      "function"
    ) {
      try {
        depoisDeRenderizarDetalhes(
          atividade,
          painel
        );
      } catch (erro) {
        console.error(
          `Erro após renderizar detalhes de ${prefixo}:`,
          erro
        );
      }
    }
  }

  /* =======================================================
     EVENTOS DOS ITENS
     ======================================================= */

  function adicionarEventosItens() {
    const raiz = obterRaiz();

    if (!raiz) {
      return;
    }

    raiz
      .querySelectorAll(
        ".catalogo-item"
      )
      .forEach((item) => {
        item.addEventListener(
          "click",
          () => {
            selecionarAtividade(
              item.dataset.atividadeId
            );
          }
        );
      });
  }

  /* =======================================================
     PESQUISA E FILTROS
     ======================================================= */

  function obterTextoPesquisa(
    atividade
  ) {
    return [
      atividade.id,
      atividade.tipo,
      atividade.nome,

      atividade.distancia,
      atividade.quilometragem,

      atividade.nivel,
      atividade.dificuldade,
      atividade.clima,
      atividade.temperatura,

      atividade.local,
      atividade.cidade,
      atividade.estado,

      atividade.capacidade,

      atividade.altura,
      atividade.altimetria,

      atividade.duracao,
      atividade.dias,
      atividade.duracao_dias,

      atividade.equipamento,
      atividade.equipamentos,

      atividade.descricao
    ]
      .filter(
        (valor) =>
          valor !== undefined &&
          valor !== null
      )
      .join(" ");
  }

  function atividadeCombinaComBusca(
    atividade,
    busca
  ) {
    if (!busca) {
      return true;
    }

    const texto =
      normalizarTexto(
        obterTextoPesquisa(
          atividade
        )
      );

    return texto.includes(busca);
  }

  function atividadeCombinaComDificuldade(
    atividade,
    dificuldade
  ) {
    if (!dificuldade) {
      return true;
    }

    const dificuldadeAtividade =
      normalizarTexto(
        atividade.dificuldade
      );

    const dificuldadeFiltro =
      normalizarTexto(
        dificuldade
      );

    return dificuldadeAtividade.includes(
      dificuldadeFiltro
    );
  }

  function atividadeCombinaComClima(
    atividade,
    clima
  ) {
    if (!clima) {
      return true;
    }

    return (
      String(atividade.clima) ===
      String(clima)
    );
  }

  function renderResultado(
    resultado
  ) {
    const lista = obterLista();
    const painel = obterPainel();

    if (!lista) {
      return;
    }

    if (!resultado.length) {
      lista.innerHTML = `
        <div class="catalogo-vazio">
          <i class="fa-solid fa-magnifying-glass"></i>

          <p>
            Nenhum ${escaparHtml(
              nomeSingular
            )} encontrado.
          </p>
        </div>
      `;

      if (painel) {
        painel.innerHTML =
          renderPlaceholder(
            `Nenhum ${nomeSingular} corresponde aos filtros selecionados.`
          );
      }

      atividadeSelecionadaId =
        null;

      return;
    }

    lista.innerHTML =
      resultado
        .map(renderItem)
        .join("");

    adicionarEventosItens();

    const atividadeSelecionadaAindaExiste =
      resultado.some(
        (atividade) =>
          String(atividade.id) ===
          String(
            atividadeSelecionadaId
          )
      );

    if (
      atividadeSelecionadaAindaExiste
    ) {
      selecionarAtividade(
        atividadeSelecionadaId
      );

      return;
    }

    selecionarAtividade(
      resultado[0].id
    );
  }

  function aplicarFiltros() {
    const campoBusca =
      obterCampoBusca();

    const filtroDificuldade =
      obterFiltroDificuldade();

    const filtroClima =
      obterFiltroClima();

    const busca =
      normalizarTexto(
        campoBusca?.value ?? ""
      );

    const dificuldade =
      filtroDificuldade?.value ??
      "";

    const clima =
      filtroClima?.value ??
      "";

    const resultado =
      atividades.filter(
        (atividade) =>
          atividadeCombinaComBusca(
            atividade,
            busca
          ) &&
          atividadeCombinaComDificuldade(
            atividade,
            dificuldade
          ) &&
          atividadeCombinaComClima(
            atividade,
            clima
          )
      );

    renderResultado(resultado);
  }

  /* =======================================================
     INICIALIZAÇÃO
     ======================================================= */

  function adicionarEventosFiltros() {
    const campoBusca =
      obterCampoBusca();

    const filtroDificuldade =
      obterFiltroDificuldade();

    const filtroClima =
      obterFiltroClima();

    campoBusca?.addEventListener(
      "input",
      aplicarFiltros
    );

    filtroDificuldade?.addEventListener(
      "change",
      aplicarFiltros
    );

    filtroClima?.addEventListener(
      "change",
      aplicarFiltros
    );
  }

  async function iniciar() {
    const lista = obterLista();
    const painel = obterPainel();

    if (!lista) {
      console.warn(
        `A lista do catálogo "${prefixo}" não foi encontrada.`
      );

      return;
    }

    try {
      atividades =
        await listarAtividades(tipo);

      if (
        !Array.isArray(atividades)
      ) {
        atividades = [];
      }

      adicionarEventosFiltros();

      if (!atividades.length) {
        lista.innerHTML = `
          <div class="catalogo-vazio">
            <i class="fa-solid ${escaparHtml(
              icone
            )}"></i>

            <p>
              Nenhum ${escaparHtml(
                nomeSingular
              )} cadastrado.
            </p>
          </div>
        `;

        if (painel) {
          painel.innerHTML =
            renderPlaceholder(
              `Nenhum ${nomeSingular} disponível no momento.`
            );
        }

        return;
      }

      lista.innerHTML =
        atividades
          .map(renderItem)
          .join("");

      adicionarEventosItens();

      selecionarAtividade(
        atividades[0].id
      );
    } catch (erro) {
      console.error(
        `Erro ao carregar ${nomePlural}:`,
        erro
      );

      lista.innerHTML = `
        <div class="catalogo-vazio">
          <i class="fa-solid fa-triangle-exclamation"></i>

          <p>
            Não foi possível carregar
            ${escaparHtml(nomePlural)}.
          </p>
        </div>
      `;

      if (painel) {
        painel.innerHTML =
          renderPlaceholder(
            `Não foi possível carregar os detalhes de ${nomePlural}.`
          );
      }
    }
  }

  /* =======================================================
     RENDERIZAÇÃO DOS FILTROS
     ======================================================= */

  function renderFiltroDificuldade() {
    if (
      !mostrarFiltroDificuldade
    ) {
      return "";
    }

    return `
      <label>
        <span>Dificuldade</span>

        <select
          id="filtro-dificuldade-${prefixo}"
        >
          <option value="">
            Todas
          </option>

          <option value="facil">
            Fácil
          </option>

          <option value="media">
            Média
          </option>

          <option value="dificil">
            Difícil
          </option>
        </select>
      </label>
    `;
  }

  function renderFiltroClima() {
    if (!mostrarFiltroClima) {
      return "";
    }

    return `
      <label>
        <span>Clima</span>

        <select
          id="filtro-clima-${prefixo}"
        >
          <option value="">
            Todos
          </option>

          <option value="1">
            Verão
          </option>

          <option value="2">
            Primavera / Outono
          </option>

          <option value="3">
            Inverno
          </option>
        </select>
      </label>
    `;
  }

  function obterClasseFiltros() {
    const quantidadeFiltros =
      1 +
      Number(
        mostrarFiltroDificuldade
      ) +
      Number(
        mostrarFiltroClima
      );

    return quantidadeFiltros === 1
      ? "catalogo-filtros catalogo-filtros-unico"
      : "catalogo-filtros";
  }

  /* =======================================================
     RENDERIZAÇÃO DA PÁGINA
     ======================================================= */

  function render() {
    return `
      <div
        class="
          layout-pagina
          pagina-catalogo
          catalogo-${prefixo}
        "
        data-catalogo="${escaparHtml(
          prefixo
        )}"
      >
        <header class="catalogo-cabecalho">
          <h1>
            <i
              class="fa-solid ${escaparHtml(
                icone
              )}"
            ></i>

            ${escaparHtml(titulo)}
          </h1>

          <p>
            ${escaparHtml(descricao)}
          </p>
        </header>

        <section class="${obterClasseFiltros()}">
          <label class="catalogo-campo-busca">
            <span>Pesquisar</span>

            <div>
              <i class="fa-solid fa-magnifying-glass"></i>

              <input
                id="busca-${prefixo}"
                type="search"
                placeholder="Nome ou código"
                autocomplete="off"
              >
            </div>
          </label>

          ${renderFiltroDificuldade()}

          ${renderFiltroClima()}
        </section>

        <main class="catalogo-conteudo">
          <section
            id="lista-${prefixo}"
            class="catalogo-lista"
            aria-label="Lista de ${escaparHtml(
              nomePlural
            )}"
          >
            <div class="catalogo-vazio">
              <i class="fa-solid fa-spinner fa-spin"></i>

              <p>
                Carregando
                ${escaparHtml(nomePlural)}...
              </p>
            </div>
          </section>

          <aside
            id="painel-detalhes-${prefixo}"
            class="catalogo-painel"
          >
            ${renderPlaceholder()}
          </aside>
        </main>
      </div>
    `;
  }

  return {
    render,
    iniciar,
    selecionarAtividade,
    aplicarFiltros
  };
}

let mapaExpedicao = null;
let controleRotaExpedicao = null;

function destruirMapaExpedicao() {
  if (mapaExpedicao) {
    mapaExpedicao.remove();
    mapaExpedicao = null;
  }

  controleRotaExpedicao = null;
}

function normalizarCoordenada(valor) {
  if (Array.isArray(valor) && valor.length >= 2) {
    const latitude = Number(valor[0]);
    const longitude = Number(valor[1]);

    if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
      return [latitude, longitude];
    }
  }

  if (valor && typeof valor === "object") {
    const latitude = Number(valor.lat ?? valor.latitude);
    const longitude = Number(valor.lng ?? valor.longitude);

    if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
      return [latitude, longitude];
    }
  }

  if (typeof valor === "string" && valor.includes(",")) {
    const [lat, lng] = valor.split(",").map((parte) => Number(parte.trim()));

    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      return [lat, lng];
    }
  }

  return null;
}

function renderAltimetriaRapel(atividade) {
  const altura = formatarAltura(atividade);

  return `
    <section class="rapel-altimetria">
      <header class="rapel-altimetria-cabecalho">
        <h3>
          <i class="fa-solid fa-mountain"></i>
          Representação do paredão
        </h3>

        <span>${escaparHtml(altura)}</span>
      </header>

      <div class="rapel-altimetria-grafico">
        <div class="rapel-montanha"></div>

        <div class="rapel-medida">
          <div class="rapel-medida-chave"></div>
          <span class="rapel-medida-valor">${escaparHtml(altura)}</span>
        </div>
      </div>

      <div class="rapel-altimetria-legenda">
        <span>Base</span>
        <span>Topo do paredão</span>
      </div>
    </section>
  `;
}

function renderMapaExpedicao(atividade) {
  return `
    <section class="expedicao-mapa">
      <header class="expedicao-mapa-cabecalho">
        <h3>
          <i class="fa-solid fa-map-location-dot"></i>
          Percurso da expedição
        </h3>

        <span>${escaparHtml(formatarDistancia(atividade))}</span>
      </header>

      <div id="mapa-expedicao" class="expedicao-mapa-area">
        <div class="expedicao-mapa-indisponivel">
          <i class="fa-solid fa-spinner fa-spin"></i>
          <p>Carregando mapa...</p>
        </div>
      </div>
    </section>
  `;
}

function iniciarMapaExpedicao(atividade) {
  destruirMapaExpedicao();

  const elemento = document.querySelector("#mapa-expedicao");

  if (!elemento) {
    return;
  }

  const origem = normalizarCoordenada(
    atividade.origem ?? atividade.coordenadas_origem
  );
  const destino = normalizarCoordenada(
    atividade.destino ?? atividade.coordenadas_destino
  );

  if (!origem || !destino) {
    elemento.innerHTML = `
      <div class="expedicao-mapa-indisponivel">
        <i class="fa-solid fa-location-dot"></i>
        <p>Origem ou destino não cadastrado.</p>
      </div>
    `;
    return;
  }

  elemento.innerHTML = "";
  mapaExpedicao = L.map(elemento, {
    zoomControl: true,
    scrollWheelZoom: false
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
  }).addTo(mapaExpedicao);

  if (L.Routing?.control) {
    controleRotaExpedicao = L.Routing.control({
      waypoints: [
        L.latLng(origem[0], origem[1]),
        L.latLng(destino[0], destino[1])
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      createMarker(indice, waypoint) {
        const rotulo = indice === 0 ? "Origem" : obterValor(atividade.nome, "Destino");
        return L.marker(waypoint.latLng).bindPopup(escaparHtml(rotulo));
      }
    }).addTo(mapaExpedicao);

    controleRotaExpedicao.on("routingerror", () => {
      elemento.insertAdjacentHTML(
        "beforeend",
        '<div class="expedicao-erro-rota">Não foi possível calcular a rota.</div>'
      );
    });
  } else {
    const pontos = [L.latLng(...origem), L.latLng(...destino)];
    L.polyline(pontos).addTo(mapaExpedicao);
    L.marker(pontos[0]).addTo(mapaExpedicao).bindPopup("Origem");
    L.marker(pontos[1]).addTo(mapaExpedicao).bindPopup(escaparHtml(obterValor(atividade.nome, "Destino")));
    mapaExpedicao.fitBounds(L.latLngBounds(pontos), { padding: [28, 28] });
  }

  window.setTimeout(() => mapaExpedicao?.invalidateSize(), 0);
}

function abrirCalendario(atividade) {
  sessionStorage.setItem("atividadeCalendario", JSON.stringify(atividade));
  window.location.hash = "#/calendario";
}

function abrirDetalhes(tipo, atividade) {
  sessionStorage.setItem("atividadeSelecionada", JSON.stringify(atividade));

  window.dispatchEvent(
    new CustomEvent("catalogo:detalhes", {
      detail: { tipo, atividade }
    })
  );
}

const catalogos = {
  trilha: criarCatalogo({
    tipo: "trilha",
    prefixo: "trilha",
    titulo: "Catálogo de Trilhas",
    descricao: "Explore, pesquise e consulte as trilhas disponíveis.",
    icone: "fa-person-hiking",
    nomeSingular: "trilha",
    nomePlural: "trilhas",
    camposDetalhes: [
      "distancia",
      "nivel",
      "dificuldade",
      "temperatura",
      "clima",
      "local",
      "capacidade",
      "descricao"
    ],
    mostrarFiltroClima: true,
    aoClicarCalendario: abrirCalendario,
    aoClicarDetalhes: (atividade) => abrirDetalhes("trilha", atividade)
  }),

  rapel: criarCatalogo({
    tipo: "rapel",
    prefixo: "rapel",
    titulo: "Catálogo de Rapéis",
    descricao: "Explore, pesquise e consulte os rapéis disponíveis.",
    icone: "fa-person-falling",
    nomeSingular: "rapel",
    nomePlural: "rapéis",
    camposDetalhes: [
      "altura",
      "nivel",
      "temperatura",
      "clima",
      "local",
      "capacidade",
      "equipamentos",
      "descricao"
    ],
    mostrarDificuldade: false,
    mostrarFiltroDificuldade: false,
    mostrarFiltroClima: true,
    criarResumoItem(atividade) {
      const altura = formatarAltura(atividade);
      const nivel = atividade.nivel;
      return valorValidoCatalogo(nivel) ? `${altura} · nível ${nivel}` : altura;
    },
    renderExtra: renderAltimetriaRapel,
    aoClicarCalendario: abrirCalendario,
    aoClicarDetalhes: (atividade) => abrirDetalhes("rapel", atividade)
  }),

  expedicao: criarCatalogo({
    tipo: "trip",
    prefixo: "expedicao",
    titulo: "Catálogo de Expedições",
    descricao: "Explore, pesquise e consulte as expedições disponíveis.",
    icone: "fa-compass",
    nomeSingular: "expedição",
    nomePlural: "expedições",
    camposDetalhes: [
      "distancia",
      "nivel",
      "dificuldade",
      "temperatura",
      "clima",
      "local",
      "capacidade",
      "descricao"
    ],
    mostrarFiltroClima: true,
    renderExtra: renderMapaExpedicao,
    depoisDeRenderizarDetalhes: iniciarMapaExpedicao,
    aoClicarCalendario: abrirCalendario,
    aoClicarDetalhes: (atividade) => abrirDetalhes("expedicao", atividade)
  })
};

function valorValidoCatalogo(valor) {
  return valor !== null && valor !== undefined && valor !== "";
}

function normalizarTipoCatalogo(tipo) {
  const chave = normalizarTexto(tipo);

  if (chave === "trilhas") return "trilha";
  if (chave === "rapeis") return "rapel";
  if (chave === "expedicoes") return "expedicao";

  return chave;
}

function obterCatalogo(tipo) {
  const chave = normalizarTipoCatalogo(tipo);
  const catalogo = catalogos[chave];

  if (!catalogo) {
    throw new Error(`Catálogo inválido: ${tipo}`);
  }

  return catalogo;
}

export function renderCatalogo(tipo) {
  return obterCatalogo(tipo).render();
}

export function iniciarCatalogo(tipo) {
  if (normalizarTipoCatalogo(tipo) !== "expedicao") {
    destruirMapaExpedicao();
  }

  return obterCatalogo(tipo).iniciar();
}

export function finalizarCatalogo() {
  destruirMapaExpedicao();
}
