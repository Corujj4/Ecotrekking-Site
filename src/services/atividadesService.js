import { supabase } from "./supabaseClient.js";

/* =========================================================
   FUNÇÕES AUXILIARES
========================================================= */

function converterNumero(valor) {
  if (
    valor === null ||
    valor === undefined ||
    valor === "" ||
    valor === "#"
  ) {
    return null;
  }

  const numero = Number(
    String(valor).replace(",", ".")
  );

  return Number.isNaN(numero) ? null : numero;
}

function converterTexto(valor) {
  if (
    valor === null ||
    valor === undefined ||
    valor === "" ||
    valor === "#"
  ) {
    return null;
  }

  return String(valor).trim();
}

function converterAtividadeBanco(atividade) {
  return {
    id: atividade.id,

    tipo: converterTexto(atividade.tipo),
    nome: converterTexto(atividade.nome),

    cidade: converterTexto(atividade.cidade),
    estado: converterTexto(atividade.estado),

    origem: converterCoordenada(atividade.origem),
destino: converterCoordenada(atividade.destino),

    descricao: converterTexto(atividade.descricao),
    dificuldade: converterTexto(atividade.dificuldade),

    quilometragem: converterNumero(
      atividade.quilometragem
    ),

    nivel: converterNumero(
      atividade.nivel
    ),

    altura: converterNumero(
      atividade.altura
    ),

    capacidade: converterNumero(
      atividade.capacidade
    ),

    temperatura: converterTexto(
      atividade.temperatura
    ),

    imagem: converterTexto(
      atividade.imagem
    ),
  };
}

function converterAtividadeParaBanco(atividade) {
  return {
    tipo: converterTexto(atividade.tipo),

    nome: converterTexto(atividade.nome),

    cidade: converterTexto(atividade.cidade),
    estado: converterTexto(atividade.estado),

    origem: converterCoordenada(atividade.origem),
    destino: converterCoordenada(atividade.destino),

    descricao: converterTexto(atividade.descricao),
    dificuldade: converterTexto(atividade.dificuldade),

    quilometragem: converterNumero(
      atividade.quilometragem
    ),

    nivel: converterNumero(
      atividade.nivel
    ),

    altura: converterNumero(
      atividade.altura
    ),

    capacidade: converterNumero(
      atividade.capacidade
    ),

    temperatura: converterTexto(
      atividade.temperatura
    ),

    imagem: converterTexto(
      atividade.imagem
    ),
  };
}

function converterCoordenada(valor) {
  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {
    return null;
  }

  if (Array.isArray(valor) && valor.length >= 2) {
    const latitude = Number(valor[0]);
    const longitude = Number(valor[1]);

    if (
      Number.isFinite(latitude) &&
      Number.isFinite(longitude)
    ) {
      return [latitude, longitude];
    }
  }

  if (typeof valor === "string") {
    const partes = valor
      .split(",")
      .map((parte) => Number(parte.trim()));

    if (
      partes.length >= 2 &&
      Number.isFinite(partes[0]) &&
      Number.isFinite(partes[1])
    ) {
      return [partes[0], partes[1]];
    }
  }

  return null;
}


/* =========================================================
   CRIAR
========================================================= */

export async function criarAtividade(atividade) {
  const dadosBanco =
    converterAtividadeParaBanco(atividade);

  const { data, error } = await supabase
    .from("atividades")
    .insert(dadosBanco)
    .select()
    .single();

  if (error) {

    console.error(
        "ERRO COMPLETO SUPABASE:",
        error
    );

    console.error(
        "DADOS ENVIADOS:",
        dadosBanco
    );

    throw error;
}

  return converterAtividadeBanco(data);
}


/* =========================================================
   MOSTRAR / BUSCAR
========================================================= */

export async function listarAtividades(tipo = null) {
  let consulta = supabase
    .from("atividades")
    .select("*")
    .order("nome", {
      ascending: true
    });

  if (tipo) {
    consulta = consulta.eq("tipo", tipo);
  }

  const { data, error } = await consulta;

  if (error) {
    console.error(
      "Erro ao listar atividades:",
      error
    );

    throw error;
  }

  return (data ?? []).map(
    converterAtividadeBanco
  );
}

export async function buscarAtividade(id) {
  const { data, error } = await supabase
    .from("atividades")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(
      "Erro ao buscar atividade:",
      error
    );

    throw error;
  }

  return converterAtividadeBanco(data);
}


/* =========================================================
   EDITAR
========================================================= */

export async function atualizarAtividade(
  id,
  atividade
) {
  const dadosBanco =
    converterAtividadeParaBanco(atividade);

  const { data, error } = await supabase
    .from("atividades")
    .update(dadosBanco)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(
      "Erro ao atualizar atividade:",
      error
    );

    throw error;
  }

  return converterAtividadeBanco(data);
}


/* =========================================================
   EXCLUIR
========================================================= */

export async function excluirAtividade(id) {
  const { error } = await supabase
    .from("atividades")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(
      "Erro ao excluir atividade:",
      error
    );

    throw error;
  }
}