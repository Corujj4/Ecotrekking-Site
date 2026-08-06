import { supabase } from "./supabaseClient.js";

/* =========================================================
   AUXILIARES
========================================================= */

function texto(valor) {

    if (
        valor === null ||
        valor === undefined ||
        valor === ""
    ) {
        return null;
    }

    return String(valor).trim();

}

function converterGaleriaBanco(galeria) {

    return {

        id: galeria.id,

        nome: texto(galeria.nome),

        data: galeria.data,

        imagem: texto(galeria.imagem),

        link_drive: texto(
            galeria.link_drive
        )

    };

}

function converterGaleriaParaBanco(galeria) {

    return {

        nome: texto(galeria.nome),

        data: galeria.data,

        imagem: texto(galeria.imagem),

        link_drive: texto(
            galeria.link_drive
        )

    };

}

/* =========================================================
   LISTAR
========================================================= */

export async function listarGalerias() {

    const { data, error } =
        await supabase

            .from("galerias")

            .select("*")

            .order("data", {
                ascending: false
            });

    if (error) {

        console.error(
            "Erro ao listar galerias:",
            error
        );

        throw error;

    }

    return (data ?? []).map(
        converterGaleriaBanco
    );

}

/* =========================================================
   BUSCAR
========================================================= */

export async function buscarGaleria(id) {

    const { data, error } =
        await supabase

            .from("galerias")

            .select("*")

            .eq("id", id)

            .single();

    if (error) {

        console.error(
            "Erro ao buscar galeria:",
            error
        );

        throw error;

    }

    return converterGaleriaBanco(data);

}

/* =========================================================
   CRIAR
========================================================= */

export async function criarGaleria(galeria) {

    const dados =
        converterGaleriaParaBanco(
            galeria
        );

    const { data, error } =
        await supabase

            .from("galerias")

            .insert(dados)

            .select()

            .single();

    if (error) {

        console.error(
            "Erro ao criar galeria:",
            error
        );

        throw error;

    }

    return converterGaleriaBanco(data);

}

/* =========================================================
   EDITAR
========================================================= */

export async function atualizarGaleria(
    id,
    galeria
) {

    const dados =
        converterGaleriaParaBanco(
            galeria
        );

    const { data, error } =
        await supabase

            .from("galerias")

            .update(dados)

            .eq("id", id)

            .select()

            .single();

    if (error) {

        console.error(
            "Erro ao atualizar galeria:",
            error
        );

        throw error;

    }

    return converterGaleriaBanco(data);

}

/* =========================================================
   EXCLUIR
========================================================= */

export async function excluirGaleria(id) {

    const { error } =
        await supabase

            .from("galerias")

            .delete()

            .eq("id", id);

    if (error) {

        console.error(
            "Erro ao excluir galeria:",
            error
        );

        throw error;

    }

}