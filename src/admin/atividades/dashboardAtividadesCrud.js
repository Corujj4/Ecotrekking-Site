import {
    listarAtividades,
    buscarAtividade,
    criarAtividade,
    atualizarAtividade,
    excluirAtividade
} from "../../services/atividadesService.js";

import {
    inicializarTabela,
    atualizarTabela,
    mostrarLoading,
    mostrarErro,
    setOnNovo,
    setOnEditar,
    setOnExcluir
} from "./dashboardAtividadesTabela.js";

import {
    inicializarModalAtividades,
    abrirModalNovaAtividade,
    abrirModalEditarAtividade,
    setOnSalvarModal
} from "./dashboardAtividadesModal.js";


let carregado = false;


/* =========================================================
   INICIAR
========================================================= */

export async function iniciarCrudAtividades() {

    if (!carregado) {

        inicializarTabela(
            "dashboard-lista-atividades"
        );

        inicializarModalAtividades();

        setOnNovo(
            abrirModalNovaAtividade
        );

        setOnEditar(
            editarAtividade
        );

        setOnExcluir(
            removerAtividade
        );

        setOnSalvarModal(
            salvarAtividade
        );
         const botaoCadastrar =
        document.getElementById(
            "botao-cadastrar-atividade"
        );

    if (botaoCadastrar) {

        botaoCadastrar.addEventListener(
            "click",
            abrirModalNovaAtividade
        );

    }

        carregado = true;

    }

    await carregarTabela();

}


/* =========================================================
   LISTAR
========================================================= */

async function carregarTabela() {

    try {

        mostrarLoading();

        const lista =
            await listarAtividades();

        atualizarTabela(
            lista
        );

    } catch (erro) {

        console.error(
            "Erro ao carregar atividades:",
            erro
        );

        mostrarErro(
            "Não foi possível carregar as atividades."
        );

    }

}


/* =========================================================
   NOVA / EDITAR
========================================================= */

async function editarAtividade(
    id
) {

    try {

        const atividade =
            await buscarAtividade(id);

        abrirModalEditarAtividade(
            atividade
        );

    } catch (erro) {

        console.error(
            "Erro ao buscar atividade:",
            erro
        );

        alert(
            "Não foi possível carregar a atividade."
        );

    }

}


/* =========================================================
   SALVAR
========================================================= */

async function salvarAtividade(
    atividade,
    id
) {

    const botao =
        document.getElementById(
            "botao-salvar-atividade"
        );

    try {

        if (botao) {

            botao.disabled = true;

            botao.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Salvando...
            `;

        }


        if (id !== null && id !== undefined) {

            await atualizarAtividade(
                id,
                atividade
            );

        } else {

            await criarAtividade(
                atividade
            );

        }


        await carregarTabela();

        fecharModalDepoisSalvar();

    } catch (erro) {

        console.error(
            "Erro ao salvar atividade:",
            erro
        );

        alert(
            "Não foi possível salvar a atividade."
        );

    } finally {

        if (botao) {

            botao.disabled = false;

            botao.innerHTML = `
                <i class="fa-solid fa-floppy-disk"></i>
                Salvar atividade
            `;

        }

    }

}


/* =========================================================
   EXCLUIR
========================================================= */

async function removerAtividade(
    id
) {

    const confirmar =
        confirm(
            "Deseja realmente excluir esta atividade?"
        );

    if (!confirmar) return;

    try {

        await excluirAtividade(
            id
        );

        await carregarTabela();

    } catch (erro) {

        console.error(
            "Erro ao excluir atividade:",
            erro
        );

        alert(
            "Não foi possível excluir a atividade."
        );

    }

}


/* =========================================================
   FECHAR APÓS SALVAR
========================================================= */

function fecharModalDepoisSalvar() {

    const evento =
        new CustomEvent(
            "atividade-salva"
        );

    document.dispatchEvent(
        evento
    );

}