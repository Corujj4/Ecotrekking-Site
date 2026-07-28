import { supabase } from "./supabaseClient.js";

function converterEventoBanco(evento) {
  return {
    id: evento.id,
    titulo: evento.titulo,
    descricao: evento.descricao ?? "",
    tipo: evento.tipo,
    data: evento.data_evento,
    local: evento.local ?? "",

    numeroTrilha:
      evento.numero_trilha !== null
        ? String(evento.numero_trilha)
        : "",

    quilometragem:
      evento.quilometragem !== null
        ? String(evento.quilometragem)
        : "",

    horarioInicio: evento.horario_inicio
      ? evento.horario_inicio.slice(0, 5)
      : "",

    horarioFim: evento.horario_fim
      ? evento.horario_fim.slice(0, 5)
      : "",

    status: evento.status,
  };
}

function converterEventoParaBanco(evento) {
  return {
    titulo: evento.titulo,
    descricao: evento.descricao || null,
    tipo: evento.tipo || "trilha",
    data_evento: evento.data,
    local: evento.local || null,

    numero_trilha:
      evento.numeroTrilha !== ""
        ? Number(evento.numeroTrilha)
        : null,

    quilometragem:
      evento.quilometragem !== ""
        ? Number(evento.quilometragem)
        : null,

    horario_inicio: evento.horarioInicio || null,
    horario_fim: evento.horarioFim || null,
    status: evento.status || "lancado",
  };
}

export async function listarEventos() {
  const { data, error } = await supabase
    .from("eventos")
    .select("*")
    .order("data_evento", {
      ascending: true,
    })
    .order("horario_inicio", {
      ascending: true,
      nullsFirst: false,
    });

  if (error) {
    console.error("Erro ao carregar eventos:", error);
    throw new Error("Não foi possível carregar os eventos.");
  }

  return data.map(converterEventoBanco);
}

export async function criarEvento(evento) {
  const eventoBanco = converterEventoParaBanco(evento);

  const { data, error } = await supabase
    .from("eventos")
    .insert(eventoBanco)
    .select()
    .single();

  if (error) {
    console.error("Erro ao cadastrar evento:", error);
    throw new Error("Não foi possível cadastrar o evento.");
  }

  return converterEventoBanco(data);
}

export async function atualizarEvento(eventoId, evento) {
  const eventoBanco = converterEventoParaBanco(evento);

  const { data, error } = await supabase
    .from("eventos")
    .update(eventoBanco)
    .eq("id", eventoId)
    .select()
    .single();

  if (error) {
    console.error("Erro ao atualizar evento:", error);
    throw new Error("Não foi possível atualizar o evento.");
  }

  return converterEventoBanco(data);
}

export async function excluirEventoBanco(eventoId) {
  const { error } = await supabase
    .from("eventos")
    .delete()
    .eq("id", eventoId);

  if (error) {
    console.error("Erro ao excluir evento:", error);
    throw new Error("Não foi possível excluir o evento.");
  }
}