import trilha1 from "../../assets/trilha1.jpg";
import trilha2 from "../../assets/trilha2.jpg";
import trilha3 from "../../assets/trilha3.jpg";

const albuns = [
    {
        id:1,
        titulo:"Trilha da Cascata",
        data:"20/07/2026",
        imagem:trilha1,
        link:"https://drive.google.com/..."
    },
    {
        id:2,
        titulo:"Rapel do Cânion",
        data:"27/07/2026",
        imagem:trilha2,
        link:"https://drive.google.com/..."
    },
    {
        id:3,
        titulo:"Trip Serra",
        data:"03/08/2026",
        imagem:trilha3,
        link:"https://drive.google.com/..."
    }
];

export function renderGaleria() {

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

                ${albuns.map(album => `

                    <a
                        class="galeria-card"
                        href="${album.link}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >

                        <img
                            src="${album.imagem}"
                            alt="${album.titulo}"
                        >

                        <div class="galeria-card-conteudo">

                            <h2>${album.titulo}</h2>

                            <span>${album.data}</span>

                            <div class="galeria-card-botao">
                                Abrir álbum
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </div>

                        </div>

                    </a>

                `).join("")}

            </div>

        </section>
    `;
}