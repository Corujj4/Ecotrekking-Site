import { supabase } from "./supabaseClient.js";

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
    String(valor).replace(",", "."),
  );

  return Number.isNaN(numero) ? null : numero;
}

function converterAtividadeBanco(atividade) {
  return {
    id: atividade.id,
    tipo: atividade.tipo,
    nome: atividade.nome,

    cidade:
      atividade.cidade === "#"
        ? null
        : atividade.cidade,

    estado:
      atividade.estado === "#"
        ? null
        : atividade.estado,

    local:
      atividade.local === "#"
        ? null
        : atividade.local,

    descricao:
      atividade.descricao === "#"
        ? null
        : atividade.descricao,

    dificuldade:
      atividade.dificuldade === "#"
        ? null
        : atividade.dificuldade,

    quilometragem: converterNumero(
      atividade.quilometragem,
    ),

    nivel: converterNumero(atividade.nivel),

    altura: converterNumero(atividade.altura),

    capacidade: converterNumero(
      atividade.capacidade,
    ),

    temperatura:
      atividade.temperatura === "#"
        ? null
        : atividade.temperatura,

    imagem:
      atividade.imagem === "#"
        ? null
        : atividade.imagem,

    mapa:
      atividade.mapa === "#"
        ? null
        : atividade.mapa,
  };
}

function converterAtividadeParaBanco(atividade) {
  return {
    tipo: atividade.tipo,
    nome: atividade.nome?.trim(),

    cidade: atividade.cidade?.trim() || null,
    estado: atividade.estado?.trim() || null,
    local: atividade.local?.trim() || null,

    descricao:
      atividade.descricao?.trim() || null,

    dificuldade:
      atividade.dificuldade?.trim() || null,

    distancia: converterNumero(atividade.quilometragem),
    
    quilometragem:
      converterNumero(atividade.quilometragem),

    nivel: converterNumero(atividade.nivel),

    altura: converterNumero(atividade.altura),

    capacidade:
      converterNumero(atividade.capacidade),

    temperatura:
      atividade.temperatura?.trim() || null,

    imagem: atividade.imagem?.trim() || null,
    mapa: atividade.mapa?.trim() || null,
  };
}

export async function listarAtividades(tipo = null) {
  let consulta = supabase
    .from("atividades")
    .select("*")
    .order("nome", { ascending: true });

  if (tipo) {
    consulta = consulta.eq("tipo", tipo);
  }

  const { data, error } = await consulta;

  if (error) {
    console.error(
      "Erro ao listar atividades:",
      error,
    );

    throw error;
  }

  return (data ?? []).map(
    converterAtividadeBanco,
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
      error,
    );

    throw error;
  }

  return converterAtividadeBanco(data);
}

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
      "Erro ao criar atividade:",
      error,
    );

    throw error;
  }

  return converterAtividadeBanco(data);
}

export async function atualizarAtividade(
  id,
  atividade,
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
      error,
    );

    throw error;
  }

  return converterAtividadeBanco(data);
}

export async function excluirAtividade(id) {
  const { error } = await supabase
    .from("atividades")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(
      "Erro ao excluir atividade:",
      error,
    );

    throw error;
  }
}