/* =========================================================
   MODAL DE ATIVIDADES
========================================================= */

let modal = null;
let formulario = null;

let atividadeAtual = null;

let onSalvar = null;


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

export function inicializarModalAtividades() {

    if (document.getElementById("modal-atividade")) {
        modal = document.getElementById("modal-atividade");
        formulario = document.getElementById("formulario-atividade");
        return;
    }

    const elemento = document.createElement("div");

    elemento.id = "modal-atividade";

    elemento.className = "dashboard-modal-overlay";

    elemento.innerHTML = `

        <div
            class="dashboard-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-atividade-titulo"
        >

            <div class="dashboard-modal-cabecalho">

                <div>

                    <span class="dashboard-eyebrow">
                        CADASTRO
                    </span>

                    <h2 id="modal-atividade-titulo">
                        Nova atividade
                    </h2>

                </div>

                <button
                    type="button"
                    class="dashboard-modal-fechar"
                    id="botao-fechar-modal-atividade"
                    aria-label="Fechar"
                >

                    <i class="fa-solid fa-xmark"></i>

                </button>

            </div>


            <form
                id="formulario-atividade"
                class="dashboard-formulario"
            >

                <div class="dashboard-formulario-grid">


                    <!-- TIPO -->

                    <div class="dashboard-campo">

                        <label for="atividade-tipo">
                            Tipo
                        </label>

                        <select
                            id="atividade-tipo"
                            name="tipo"
                        >

                            <option value="">
                                Selecione
                            </option>

                            <option value="trilha">
                                Trilha
                            </option>

                            <option value="rapel">
                                Rapel
                            </option>

                            <option value="trip">
                                Trip
                            </option>

                        </select>

                    </div>


                    <!-- NOME -->

                    <div class="dashboard-campo dashboard-campo-grande">

                        <label for="atividade-nome">
                            Nome
                        </label>

                        <input
                            type="text"
                            id="atividade-nome"
                            name="nome"
                            placeholder="Nome da atividade"
                            required
                        >

                    </div>


                    <!-- CIDADE -->

                    <div class="dashboard-campo">

                        <label for="atividade-cidade">
                            Cidade
                        </label>

                        <input
                            type="text"
                            id="atividade-cidade"
                            name="cidade"
                            placeholder="Ex.: Santa Maria"
                        >

                    </div>


                    <!-- ESTADO -->

                    <div class="dashboard-campo">

                        <label for="atividade-estado">
                            Estado
                        </label>

                        <input
                            type="text"
                            id="atividade-estado"
                            name="estado"
                            placeholder="Ex.: RS"
                            maxlength="2"
                        >

                    </div>


                    <!-- ORIGEM -->

                    <div class="dashboard-campo">

                        <label for="atividade-origem">
                            Origem
                        </label>

                        <input
                            type="text"
                            id="atividade-origem"
                            name="origem"
                            placeholder="Latitude, Longitude"
                        >

                    </div>


                    <!-- DESTINO -->

                    <div class="dashboard-campo">

                        <label for="atividade-destino">
                            Destino
                        </label>

                        <input
                            type="text"
                            id="atividade-destino"
                            name="destino"
                            placeholder="Latitude, Longitude"
                        >

                    </div>


                    <!-- DIFICULDADE -->

                    <div class="dashboard-campo">

                        <label for="atividade-dificuldade">
                            Dificuldade
                        </label>

                        <select
                            id="atividade-dificuldade"
                            name="dificuldade"
                        >

                            <option value="">
                                Selecione
                            </option>

                            <option value="facil">
                                Fácil
                            </option>

                            <option value="medio">
                                Médio
                            </option>

                            <option value="dificil">
                                Difícil
                            </option>

                            <option value="muito-dificil">
                                Muito difícil
                            </option>

                        </select>

                    </div>


                    <!-- QUILOMETRAGEM -->

                    <div class="dashboard-campo">

                        <label for="atividade-quilometragem">
                            Quilometragem
                        </label>

                        <input
                            type="number"
                            id="atividade-quilometragem"
                            name="quilometragem"
                            step="0.01"
                            min="0"
                            placeholder="Ex.: 8.5"
                        >

                    </div>


                    <!-- NÍVEL -->

                    <div class="dashboard-campo">

                        <label for="atividade-nivel">
                            Nível
                        </label>

                        <input
                            type="number"
                            id="atividade-nivel"
                            name="nivel"
                            step="1"
                            min="0"
                            placeholder="Nível"
                        >

                    </div>


                    <!-- ALTURA -->

                    <div class="dashboard-campo">

                        <label for="atividade-altura">
                            Altura
                        </label>

                        <input
                            type="number"
                            id="atividade-altura"
                            name="altura"
                            step="0.01"
                            min="0"
                            placeholder="Ex.: 120"
                        >

                    </div>


                    <!-- CAPACIDADE -->

                    <div class="dashboard-campo">

                        <label for="atividade-capacidade">
                            Capacidade
                        </label>

                        <input
                            type="number"
                            id="atividade-capacidade"
                            name="capacidade"
                            step="1"
                            min="0"
                            placeholder="Número de pessoas"
                        >

                    </div>


                    <!-- TEMPERATURA -->

                    <div class="dashboard-campo">

                        <label for="atividade-temperatura">
                            Temperatura
                        </label>

                        <input
                            type="text"
                            id="atividade-temperatura"
                            name="temperatura"
                            placeholder="Ex.: 18°C"
                        >

                    </div>


                    <!-- IMAGEM -->

                    <div class="dashboard-campo dashboard-campo-grande">

                        <label for="atividade-imagem">
                            Imagem
                        </label>

                        <input
                            type="text"
                            id="atividade-imagem"
                            name="imagem"
                            placeholder="URL da imagem"
                        >

                    </div>


                    <!-- DESCRIÇÃO -->

                    <div class="dashboard-campo dashboard-campo-full">

                        <label for="atividade-descricao">
                            Descrição
                        </label>

                        <textarea
                            id="atividade-descricao"
                            name="descricao"
                            rows="5"
                            placeholder="Descrição da atividade..."
                        ></textarea>

                    </div>

                </div>


                <!-- RODAPÉ -->

                <div class="dashboard-modal-rodape">

                    <button
                        type="button"
                        id="botao-cancelar-modal-atividade"
                        class="dashboard-botao-secundario"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        id="botao-salvar-atividade"
                        class="dashboard-botao-principal"
                    >

                        <i class="fa-solid fa-floppy-disk"></i>

                        Salvar atividade

                    </button>

                </div>

            </form>

        </div>

    `;

    document.body.appendChild(elemento);

    modal = document.getElementById(
        "modal-atividade"
    );

    formulario = document.getElementById(
        "formulario-atividade"
    );

    configurarEventos();

}


/* =========================================================
   EVENTOS
========================================================= */

function configurarEventos() {

    const botaoFechar =
        document.getElementById(
            "botao-fechar-modal-atividade"
        );

    const botaoCancelar =
        document.getElementById(
            "botao-cancelar-modal-atividade"
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

            if (
                evento.target === modal
            ) {

                fecharModal();

            }

        }
    );


    formulario.addEventListener(
        "submit",
        async (evento) => {

            evento.preventDefault();

            if (typeof onSalvar === "function") {

                const atividade =
                    obterDadosFormulario();

                await onSalvar(
                    atividade,
                    atividadeAtual?.id ?? null
                );

            }

        }
    );

}


/* =========================================================
   ABRIR — NOVA
========================================================= */

export function abrirModalNovaAtividade() {

    atividadeAtual = null;

    limparFormulario();

    alterarTitulo(
        "Nova atividade"
    );

    mostrarModal();

}


/* =========================================================
   ABRIR — EDITAR
========================================================= */

export function abrirModalEditarAtividade(
    atividade
) {

    atividadeAtual = atividade;

    preencherFormulario(
        atividade
    );

    alterarTitulo(
        "Editar atividade"
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

        tipo:
            dados.get("tipo"),

        nome:
            dados.get("nome"),

        cidade:
            dados.get("cidade"),

        estado:
            dados.get("estado"),

        origem:
            dados.get("origem"),

        destino:
            dados.get("destino"),

        descricao:
            dados.get("descricao"),

        dificuldade:
            dados.get("dificuldade"),

        quilometragem:
            dados.get("quilometragem"),

        nivel:
            dados.get("nivel"),

        altura:
            dados.get("altura"),

        capacidade:
            dados.get("capacidade"),

        temperatura:
            dados.get("temperatura"),

        imagem:
            dados.get("imagem")

    };

}


/* =========================================================
   PREENCHER
========================================================= */

function preencherFormulario(
    atividade
) {

    formulario.elements.tipo.value =
        atividade.tipo ?? "";

    formulario.elements.nome.value =
        atividade.nome ?? "";

    formulario.elements.cidade.value =
        atividade.cidade ?? "";

    formulario.elements.estado.value =
        atividade.estado ?? "";

    formulario.elements.origem.value =
        converterCoordenadaParaTexto(
            atividade.origem
        );

    formulario.elements.destino.value =
        converterCoordenadaParaTexto(
            atividade.destino
        );

    formulario.elements.descricao.value =
        atividade.descricao ?? "";

    formulario.elements.dificuldade.value =
        atividade.dificuldade ?? "";

    formulario.elements.quilometragem.value =
        atividade.quilometragem ?? "";

    formulario.elements.nivel.value =
        atividade.nivel ?? "";

    formulario.elements.altura.value =
        atividade.altura ?? "";

    formulario.elements.capacidade.value =
        atividade.capacidade ?? "";

    formulario.elements.temperatura.value =
        atividade.temperatura ?? "";

    formulario.elements.imagem.value =
        atividade.imagem ?? "";

}


/* =========================================================
   LIMPAR
========================================================= */

function limparFormulario() {

    formulario.reset();

}


/* =========================================================
   COORDENADAS
========================================================= */

function converterCoordenadaParaTexto(
    coordenada
) {

    if (
        !Array.isArray(coordenada) ||
        coordenada.length < 2
    ) {

        return "";

    }

    return `${coordenada[0]}, ${coordenada[1]}`;

}


/* =========================================================
   CONTROLE VISUAL
========================================================= */

function alterarTitulo(
    titulo
) {

    const elemento =
        document.getElementById(
            "modal-atividade-titulo"
        );

    if (elemento) {

        elemento.textContent =
            titulo;

    }

}


function mostrarModal() {

    if (!modal) return;

    modal.classList.add(
        "ativo"
    );

    document.body.classList.add(
        "modal-aberto"
    );

}


export function fecharModal() {

    if (!modal) return;

    modal.classList.remove(
        "ativo"
    );

    document.body.classList.remove(
        "modal-aberto"
    );

}


/* =========================================================
   CALLBACK DO CRUD
========================================================= */

export function setOnSalvarModal(
    callback
) {

    onSalvar = callback;

}