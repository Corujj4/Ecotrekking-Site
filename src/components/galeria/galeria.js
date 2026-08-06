import { listarGalerias } from "../../services/galeriaService.js";

let albuns = [];

/* =========================================================
   CARREGAR GALERIAS
========================================================= */

export async function carregarGalerias() {

    try {

        albuns = await listarGalerias();

        atualizarGaleria();

    } catch (erro) {

        console.error(
            "Erro ao carregar galerias:",
            erro
        );

    }

}

/* =========================================================
   ATUALIZA HTML
========================================================= */

function atualizarGaleria() {

    const grid = document.querySelector(".galeria-grid");

    if (!grid) return;

    grid.innerHTML = albuns.map(album => `

        <a
            class="galeria-card"
            href="${album.link_drive}"
            target="_blank"
            rel="noopener noreferrer"
        >

            <img
                src="${album.imagem}"
                alt="${album.nome}"
            >

            <div class="galeria-card-conteudo">

                <h2>${album.nome}</h2>

                <span>

                    ${new Date(album.data).toLocaleDateString("pt-BR")}

                </span>

                <div class="galeria-card-botao">

                    Abrir álbum

                    <i class="fa-solid fa-arrow-up-right-from-square"></i>

                </div>

            </div>

        </a>

    `).join("");

}

/* =========================================================
   RENDER
========================================================= */

export function renderGaleria() {

    setTimeout(carregarGalerias);

    return `

        <section class="galeria">

            <header class="galeria-cabecalho">

                <div class="galeria-cabecalho-titulo">

                    <i class="fa-solid fa-images"></i>

                    <h1>Galeria</h1>

                </div>

                <p>

                    Reviva nossas aventuras através dos álbuns das trilhas,
                    rapéis e trips realizadas pela equipe.

                </p>

            </header>

            <div class="galeria-grid">

                <div class="dashboard-loading">

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    <span>Carregando galerias...</span>

                </div>

            </div>

        </section>

    `;

}