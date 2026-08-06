import {
    listarGalerias,
    buscarGaleria,
    criarGaleria,
    atualizarGaleria,
    excluirGaleria
} from "../../services/galeriaService.js";

import {
    inicializarTabela,
    atualizarTabela,
    mostrarLoading,
    mostrarErro,
    setOnNovo,
    setOnEditar,
    setOnExcluir
} from "./dashboardGaleriaTabela.js";

import {
    inicializarModalGaleria,
    abrirModalNovaGaleria,
    abrirModalEditarGaleria,
    fecharModal,
    setOnSalvarModal
} from "./dashboardGaleriaModal.js";

let carregado = false;


/* =========================================================
   INICIAR
========================================================= */

export async function iniciarCrudGaleria() {
 
    if (!carregado) {

        inicializarTabela(
            "dashboard-lista-galerias"
        );

        inicializarModalGaleria();

        setOnNovo(
            abrirModalNovaGaleria
        );

        setOnEditar(
            editarGaleria
        );

        setOnExcluir(
            removerGaleria
        );

        setOnSalvarModal(
            salvarGaleria
        );

        const botao =
            document.getElementById(
                "botao-adicionar-galeria"
            );

        if (botao) {

            botao.addEventListener(
                "click",
                abrirModalNovaGaleria
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
            await listarGalerias();

        atualizarTabela(
            lista
        );

    } catch (erro) {

        console.error(erro);

        mostrarErro(
            "Não foi possível carregar as galerias."
        );

    }

}


/* =========================================================
   EDITAR
========================================================= */

async function editarGaleria(id) {

    try {

        const galeria =
            await buscarGaleria(id);

        abrirModalEditarGaleria(
            galeria
        );

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao carregar galeria."
        );

    }

}


/* =========================================================
   SALVAR
========================================================= */

async function salvarGaleria(
    galeria,
    id
) {

    const botao =
        document.getElementById(
            "botao-salvar-galeria"
        );

    try {

        botao.disabled = true;

        botao.innerHTML = `

            <i class="fa-solid fa-spinner fa-spin"></i>

            Salvando...

        `;

        if (
            id !== null &&
            id !== undefined
        ) {

            await atualizarGaleria(
                id,
                galeria
            );

        } else {

            await criarGaleria(
                galeria
            );

        }

        await carregarTabela();

        fecharModal();

    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível salvar."
        );

    } finally {

        botao.disabled = false;

        botao.innerHTML = `

            <i class="fa-solid fa-floppy-disk"></i>

            Salvar galeria

        `;

    }

}


/* =========================================================
   EXCLUIR
========================================================= */

async function removerGaleria(id) {

    if (
        !confirm(
            "Deseja excluir esta galeria?"
        )
    ) {
        return;
    }

    try {

        await excluirGaleria(id);

        await carregarTabela();

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao excluir."
        );

    }

}