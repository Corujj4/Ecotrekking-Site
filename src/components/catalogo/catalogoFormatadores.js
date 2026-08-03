/* =========================================================
   Helpers de formatação usados pelo catálogo (trilhas, rapel,
   expedições). Extraídos de catalogoView.js pra deixar aquele
   arquivo mais enxuto — só a fábrica criarCatalogo() ficou lá.
========================================================= */

export function normalizarTexto(texto) {
  return String(texto ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function obterValor(valor, textoPadrao = "Não informado") {
  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {
    return textoPadrao;
  }

  return valor;
}

export function obterDistancia(atividade) {
  return (
    atividade.distancia ??
    atividade.quilometragem ??
    null
  );
}

export function formatarDistancia(atividade) {
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

export function formatarNivel(atividade) {
  const nivel = obterValor(
    atividade.nivel,
    "Não informado"
  );

  if (nivel === "Não informado") {
    return nivel;
  }

  return `${nivel}/10`;
}

export function formatarCapacidade(atividade) {
  const capacidade = obterValor(
    atividade.capacidade,
    "Não informada"
  );

  if (capacidade === "Não informada") {
    return capacidade;
  }

  return `${capacidade} pessoas`;
}

export function formatarAltura(atividade) {
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

export function obterNomeClima(clima) {
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

export function obterLocal(atividade) {
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

export function obterClasseDificuldade(dificuldade) {
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

export function resolverCampo(campo) {
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
