/* =========================================================
   MODAL DE GALERIA
========================================================= */

let modal = null;
let formulario = null;

let galeriaAtual = null;

let onSalvar = null;


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

export function inicializarModalGaleria() {

    if (document.getElementById("modal-galeria")) {

        modal =
            document.getElementById(
                "modal-galeria"
            );

        formulario =
            document.getElementById(
                "formulario-galeria"
            );

        return;

    }

    const elemento =
        document.createElement("div");

    elemento.id = "modal-galeria";

    elemento.className =
        "dashboard-modal-overlay";

    elemento.innerHTML = `

        <div
            class="dashboard-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-galeria-titulo"
        >

            <div class="dashboard-modal-cabecalho">

                <div>

                    <span class="dashboard-eyebrow">

                        GALERIA

                    </span>

                    <h2 id="modal-galeria-titulo">

                        Nova galeria

                    </h2>

                </div>

                <button
                    type="button"
                    class="dashboard-modal-fechar"
                    id="botao-fechar-modal-galeria"
                >

                    <i class="fa-solid fa-xmark"></i>

                </button>

            </div>


            <form
                id="formulario-galeria"
                class="dashboard-formulario"
            >

                <div class="dashboard-formulario-grid">


                    <!-- NOME -->

                    <div class="dashboard-campo dashboard-campo-grande">

                        <label>

                            Nome

                        </label>

                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome da galeria"
                            required
                        >

                    </div>


                    <!-- DATA -->

                    <div class="dashboard-campo">

                        <label>

                            Data

                        </label>

                        <input
                            type="date"
                            name="data"
                            required
                        >

                    </div>


                    <!-- IMAGEM -->

                    <div class="dashboard-campo dashboard-campo-grande">

                        <label>

                            URL da imagem

                        </label>

                        <input
                            type="text"
                            name="imagem"
                            placeholder="https://..."
                        >

                    </div>


                    <!-- LINK DRIVE -->

                    <div class="dashboard-campo dashboard-campo-full">

                        <label>

                            Link Google Drive

                        </label>

                        <input
                            type="text"
                            name="link_drive"
                            placeholder="https://drive.google..."
                        >

                    </div>

                </div>


                <div class="dashboard-modal-rodape">

                    <button
                        type="button"
                        id="botao-cancelar-modal-galeria"
                        class="dashboard-botao-secundario"
                    >

                        Cancelar

                    </button>

                    <button
                        type="submit"
                        id="botao-salvar-galeria"
                        class="dashboard-botao-principal"
                    >

                        <i class="fa-solid fa-floppy-disk"></i>

                        Salvar galeria

                    </button>

                </div>

            </form>

        </div>

    `;

    document.body.appendChild(
        elemento
    );

    modal =
        document.getElementById(
            "modal-galeria"
        );

    formulario =
        document.getElementById(
            "formulario-galeria"
        );

    configurarEventos();

}
/* =========================================================
   EVENTOS
========================================================= */

function configurarEventos() {

    const botaoFechar =
        document.getElementById(
            "botao-fechar-modal-galeria"
        );

    const botaoCancelar =
        document.getElementById(
            "botao-cancelar-modal-galeria"
        );

    botaoFechar.addEventListener(
        "click",
        fecharModal
    );

    botaoCancelar.addEventListener(
        "click",
        fecharModal
    );

    modal.addEventListener(
        "click",
        (evento) => {

            if (evento.target === modal) {

                fecharModal();

            }

        }
    );

    formulario.addEventListener(
        "submit",
        async (evento) => {

            evento.preventDefault();

            if (
                typeof onSalvar === "function"
            ) {

                const galeria =
                    obterDadosFormulario();

                await onSalvar(
                    galeria,
                    galeriaAtual?.id ?? null
                );

            }

        }
    );

}


/* =========================================================
   NOVA GALERIA
========================================================= */

export function abrirModalNovaGaleria() {

    galeriaAtual = null;

    limparFormulario();

    alterarTitulo(
        "Nova galeria"
    );

    mostrarModal();

}


/* =========================================================
   EDITAR GALERIA
========================================================= */

export function abrirModalEditarGaleria(
    galeria
) {

    galeriaAtual = galeria;

    preencherFormulario(
        galeria
    );

    alterarTitulo(
        "Editar galeria"
    );

    mostrarModal();

}


/* =========================================================
   FORMULÁRIO
========================================================= */

function obterDadosFormulario() {

    const dados =
        new FormData(formulario);

    return {

        nome:
            dados.get("nome"),

        data:
            dados.get("data"),

        imagem:
            dados.get("imagem"),

        link_drive:
            dados.get("link_drive")

    };

}


function preencherFormulario(
    galeria
) {

    formulario.elements.nome.value =
        galeria.nome ?? "";

    formulario.elements.data.value =
        galeria.data ?? "";

    formulario.elements.imagem.value =
        galeria.imagem ?? "";

    formulario.elements.link_drive.value =
        galeria.link_drive ?? "";

}


function limparFormulario() {

    formulario.reset();

}


/* =========================================================
   CONTROLE VISUAL
========================================================= */

function alterarTitulo(
    titulo
) {

    document.getElementById(
        "modal-galeria-titulo"
    ).textContent = titulo;

}


function mostrarModal() {

    modal.classList.add("ativo");

    document.body.classList.add(
        "modal-aberto"
    );

}


export function fecharModal() {

    modal.classList.remove(
        "ativo"
    );

    document.body.classList.remove(
        "modal-aberto"
    );

}


/* =========================================================
   CALLBACK
========================================================= */

export function setOnSalvarModal(
    callback
) {

    onSalvar = callback;

}