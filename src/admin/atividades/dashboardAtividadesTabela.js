/* ===========================================================
   Dashboard - Tabela de Atividades
=========================================================== */

let containerTabela = null;
let listaAtual = [];

export function inicializarTabela(containerId) {

    containerTabela = document.getElementById(containerId);

    if (!containerTabela) {
        console.error(
            "Container da tabela não encontrado."
        );
    }

}

export function atualizarTabela(lista = []) {

    listaAtual = [...lista];

    renderizar();

}

export function mostrarLoading() {

    if (!containerTabela) return;

    containerTabela.innerHTML = `

        <div class="dashboard-loading">

            <i class="fa-solid fa-spinner fa-spin"></i>

            <span>Carregando atividades...</span>

        </div>

    `;

}

export function mostrarErro(texto = "Erro ao carregar atividades.") {

    if (!containerTabela) return;

    containerTabela.innerHTML = `

        <div class="dashboard-vazio">

            <i class="fa-solid fa-circle-exclamation"></i>

            <h3>Oops...</h3>

            <p>${texto}</p>

        </div>

    `;

}

export function mostrarVazio() {

    if (!containerTabela) return;

    containerTabela.innerHTML = `

        <div class="dashboard-vazio">

            <i class="fa-solid fa-mountain"></i>

            <h3>Nenhuma atividade cadastrada</h3>

            <p>

                Clique em
                <strong>Nova atividade</strong>
                para cadastrar a primeira.

            </p>

        </div>

    `;

}

function renderizar() {

    if (!containerTabela) return;

    if (!listaAtual.length) {

        mostrarVazio();

        return;

    }

    containerTabela.innerHTML = `

        


        <div class="dashboard-tabela-wrapper">

            <table class="dashboard-tabela">

                <thead>

                    <tr>

                        <th>Tipo</th>

                        <th>Nome</th>

                        <th>Estado</th>

                        <th>Cidade</th>

                        <th>Dificuldade</th>

                        <th>KM</th>

                        <th>Capacidade</th>

                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

                    ${listaAtual
                        .map(criarLinha)
                        .join("")}

                </tbody>

            </table>

        </div>

    `;

    registrarEventos();

}
/* ===========================================================
   EVENTOS
=========================================================== */

let onNovo = null;
let onEditar = null;
let onExcluir = null;

export function setOnNovo(callback) {
    onNovo = callback;
}

export function setOnEditar(callback) {
    onEditar = callback;
}

export function setOnExcluir(callback) {
    onExcluir = callback;
}

function registrarEventos() {

    /* ==========================
       BOTÃO NOVA ATIVIDADE
    ========================== */

    const btnNovo = document.getElementById(
        "dashboard-btn-nova-atividade"
    );

    if (btnNovo) {

        btnNovo.addEventListener("click", () => {

            if (typeof onNovo === "function") {
                onNovo();
            }

        });

    }


    /* ==========================
       BOTÕES EDITAR
    ========================== */

    document
        .querySelectorAll(".dashboard-btn-editar")
        .forEach((botao) => {

            botao.addEventListener("click", () => {

                // NÃO converter para Number
                const id = botao.dataset.id;

                if (typeof onEditar === "function") {
                    onEditar(id);
                }

            });

        });


    /* ==========================
       BOTÕES EXCLUIR
    ========================== */

    document
        .querySelectorAll(".dashboard-btn-excluir")
        .forEach((botao) => {

            botao.addEventListener("click", () => {

                // NÃO converter para Number
                const id = botao.dataset.id;

                if (typeof onExcluir === "function") {
                    onExcluir(id);
                }

            });

        });

}
/* ===========================================================
   LINHAS
=========================================================== */

function criarLinha(atividade) {

    return `

        <tr>

            <td>
                <strong>${atividade.tipo ?? "-"}</strong>
            </td>

            <td>
                ${atividade.nome ?? "-"}
            </td>

            <td>
                ${atividade.estado ?? "-"}
            </td>

            <td>
                ${atividade.cidade ?? "-"}
            </td>

            <td>
                ${atividade.dificuldade ?? "-"}
            </td>

            <td>
                ${atividade.quilometragem ?? "-"} km
            </td>

            <td>
                ${atividade.capacidade ?? "-"} pessoas
            </td>

            <td>

                <div class="dashboard-acoes">

                    <button
                        class="dashboard-btn-editar"
                        data-id="${atividade.id}"
                        title="Editar"
                    >
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                        class="dashboard-btn-excluir"
                        data-id="${atividade.id}"
                        title="Excluir"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </td>

        </tr>

    `;

}