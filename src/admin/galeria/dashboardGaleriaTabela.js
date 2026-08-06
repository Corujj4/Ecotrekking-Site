/* ===========================================================
   Dashboard - Tabela de Galerias
=========================================================== */

let containerTabela = null;
let listaAtual = [];


/* ===========================================================
   INICIALIZAÇÃO
=========================================================== */

export function inicializarTabela(containerId) {

    containerTabela =
        document.getElementById(containerId);

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


/* ===========================================================
   ESTADOS
=========================================================== */

export function mostrarLoading() {

    if (!containerTabela) return;

    containerTabela.innerHTML = `

        <div class="dashboard-loading">

            <i class="fa-solid fa-spinner fa-spin"></i>

            <span>Carregando galerias...</span>

        </div>

    `;

}


export function mostrarErro(
    texto = "Erro ao carregar galerias."
) {

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

            <i class="fa-regular fa-images"></i>

            <h3>Nenhuma galeria cadastrada</h3>

            <p>

                Clique em
                <strong>Nova galeria</strong>
                para cadastrar a primeira.

            </p>

        </div>

    `;

}


/* ===========================================================
   RENDER
=========================================================== */

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

                        <th>Nome</th>

                        <th>Data</th>

                        <th>Imagem</th>

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
   CALLBACKS
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


/* ===========================================================
   EVENTOS
=========================================================== */

function registrarEventos() {

    const btnNovo =
        document.getElementById(
            "dashboard-btn-nova-galeria"
        );

    if (btnNovo) {

        btnNovo.addEventListener(
            "click",
            () => {

                if (typeof onNovo === "function") {

                    onNovo();

                }

            }
        );

    }


    document
        .querySelectorAll(
            ".dashboard-btn-editar"
        )
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {

                    if (
                        typeof onEditar ===
                        "function"
                    ) {

                        onEditar(
                            botao.dataset.id
                        );

                    }

                }
            );

        });


    document
        .querySelectorAll(
            ".dashboard-btn-excluir"
        )
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {

                    if (
                        typeof onExcluir ===
                        "function"
                    ) {

                        onExcluir(
                            botao.dataset.id
                        );

                    }

                }
            );

        });

}


/* ===========================================================
   LINHAS
=========================================================== */

function criarLinha(galeria) {

    return `

        <tr>

            <td>

                <strong>

                    ${galeria.nome}

                </strong>

            </td>

            <td>

                ${new Date(
                    galeria.data
                ).toLocaleDateString(
                    "pt-BR"
                )}

            </td>

            <td>

                <img

                    src="${galeria.imagem}"

                    alt="${galeria.nome}"

                    style="
                        width:70px;
                        height:45px;
                        object-fit:cover;
                        border-radius:6px;
                    "

                >

            </td>

            <td>

                <div class="dashboard-acoes">

                    <button

                        class="dashboard-btn-editar"

                        data-id="${galeria.id}"

                        title="Editar"

                    >

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button

                        class="dashboard-btn-excluir"

                        data-id="${galeria.id}"

                        title="Excluir"

                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        </tr>

    `;

}