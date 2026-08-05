let menuAtual = "calendario";

export function renderDashboard() {
  return `
    <main class="dashboard-admin pagina-calendario">

      <!-- =====================================================
           SIDEBAR
      ====================================================== -->

      <aside class="dashboard-sidebar">

        <div class="dashboard-sidebar-titulo">
          <span>PAINEL ADMINISTRATIVO</span>
        </div>

        <nav class="dashboard-menu">

          <button
            type="button"
            class="dashboard-menu-item ativo"
            data-menu="calendario"
          >
            <i class="fa-solid fa-calendar-days"></i>
            <span>Calendário</span>
          </button>

          <button
            type="button"
            class="dashboard-menu-item"
            data-menu="atividades"
          >
            <i class="fa-solid fa-mountain"></i>
            <span>Atividades</span>
          </button>

          <button
            type="button"
            class="dashboard-menu-item"
            data-menu="galeria"
          >
            <i class="fa-regular fa-image"></i>
            <span>Galeria</span>
          </button>

          <button
            type="button"
            class="dashboard-menu-item"
            data-menu="usuarios"
          >
            <i class="fa-solid fa-users"></i>
            <span>Usuários</span>
          </button>

        </nav>

      </aside>


      <!-- =====================================================
           ÁREA CENTRAL
      ====================================================== -->

      <section class="dashboard-conteudo">

        <!-- ===================================================
             CALENDÁRIO
        ==================================================== -->

        <section
          class="dashboard-menu-conteudo ativo"
          data-conteudo="calendario"
        >

          <header class="dashboard-cabecalho">

            <div>
              <span class="dashboard-eyebrow">
                PAINEL ADMINISTRATIVO
              </span>

              <h1>Calendário</h1>

              <p>
                Gerencie a programação dos eventos.
              </p>
            </div>

            <div class="dashboard-acoes">
              <button
                type="button"
                id="botao-novo-evento"
                class="dashboard-botao-principal"
              >
                <i class="fa-solid fa-plus"></i>
                Adicionar evento
              </button>

              <button
                type="button"
                id="botao-atualizar-clima"
                class="dashboard-botao-secundario"
              >
                <i class="fa-solid fa-cloud-sun"></i>
                Atualizar clima
              </button>
            </div>

          </header>


          <!-- PREVISÃO -->

          <section
            id="painel-previsao-dia"
            class="painel-previsao-dia"
          ></section>


          <!-- CALENDÁRIO -->

          <section class="dashboard-painel">

            <div class="dashboard-painel-cabecalho">

              <div>
                <h2>Agenda</h2>

                <p>
                  Clique em um dia para visualizar os eventos.
                </p>
              </div>

              <div class="controle-mes-principal">

                <button
                  id="botao-mes-anterior"
                  class="botao-navegacao"
                  type="button"
                  aria-label="Mês anterior"
                >
                  ←
                </button>

                <h2 id="titulo-mes"></h2>

                <button
                  id="botao-proximo-mes"
                  class="botao-navegacao"
                  type="button"
                  aria-label="Próximo mês"
                >
                  →
                </button>

              </div>

            </div>


            <div
              class="dias-semana"
              aria-hidden="true"
            >
              <span>Dom</span>
              <span>Seg</span>
              <span>Ter</span>
              <span>Qua</span>
              <span>Qui</span>
              <span>Sex</span>
              <span>Sáb</span>
            </div>


            <section
              id="calendario"
              class="calendario"
              aria-label="Calendário mensal de eventos"
            ></section>

          </section>


          <!-- PAINEL DO EVENTO -->

          <aside
            id="painel-evento"
            class="dashboard-evento-painel"
          >

            <div class="dashboard-evento-vazio">

              <div class="dashboard-evento-icone">
                <i class="fa-solid fa-calendar-check"></i>
              </div>

              <span>
                CENTRAL DE EVENTOS
              </span>

              <h2>Detalhes do evento</h2>

              <p>
                Selecione um dia no calendário para
                visualizar os eventos programados.
              </p>

              <button
                type="button"
                id="botao-novo-evento-painel"
                class="dashboard-botao-secundario"
              >
                <i class="fa-solid fa-plus"></i>
                Criar evento
              </button>

            </div>

          </aside>

        </section>


        <!-- ===================================================
             ATIVIDADES
        ==================================================== -->

        <section
          class="dashboard-menu-conteudo"
          data-conteudo="atividades"
        >

          <header class="dashboard-cabecalho">

            <div>
              <span class="dashboard-eyebrow">
                CADASTRO
              </span>

              <h1>Atividades</h1>

              <p>
                Gerencie trilhas, rapéis e expedições cadastradas.
              </p>
            </div>

            <button
              type="button"
              class="dashboard-botao-principal"
              id="botao-cadastrar-atividade"
            >
              <i class="fa-solid fa-plus"></i>
              Cadastrar atividade
            </button>

          </header>


          <section class="dashboard-painel">

            <div class="dashboard-painel-cabecalho">

              <div>
                <h2>Atividades cadastradas</h2>

                <p>
                  Gerencie as atividades disponíveis para os eventos.
                </p>
              </div>

            </div>


            <div
              id="dashboard-lista-atividades"
              class="dashboard-lista"
            >

              <div class="dashboard-vazio">
                <i class="fa-solid fa-mountain"></i>

                <h3>Nenhuma atividade carregada</h3>

                <p>
                  A listagem será integrada ao banco de dados.
                </p>
              </div>

            </div>

          </section>

        </section>


        <!-- ===================================================
             GALERIA
        ==================================================== -->

        <section
          class="dashboard-menu-conteudo"
          data-conteudo="galeria"
        >

          <header class="dashboard-cabecalho">

            <div>
              <span class="dashboard-eyebrow">
                MÍDIA
              </span>

              <h1>Galeria</h1>

              <p>
                Gerencie os álbuns e links das galerias.
              </p>
            </div>

            <button
              type="button"
              class="dashboard-botao-principal"
              id="botao-adicionar-galeria"
            >
              <i class="fa-solid fa-plus"></i>
              Adicionar galeria
            </button>

          </header>


          <section class="dashboard-painel">

            <div class="dashboard-painel-cabecalho">

              <div>
                <h2>Galerias cadastradas</h2>

                <p>
                  Os links poderão apontar diretamente para pastas do Google Drive.
                </p>
              </div>

            </div>


            <div
              id="dashboard-lista-galerias"
              class="dashboard-lista"
            >

              <div class="dashboard-vazio">
                <i class="fa-regular fa-images"></i>

                <h3>Nenhuma galeria cadastrada</h3>

                <p>
                  Aqui ficarão os álbuns e links das pastas do Drive.
                </p>
              </div>

            </div>

          </section>

        </section>


        <!-- ===================================================
             USUÁRIOS
        ==================================================== -->

        <section
          class="dashboard-menu-conteudo"
          data-conteudo="usuarios"
        >

          <header class="dashboard-cabecalho">

            <div>
              <span class="dashboard-eyebrow">
                ACESSO
              </span>

              <h1>Usuários</h1>

              <p>
                Gerencie os usuários autorizados da área administrativa.
              </p>
            </div>

            <button
              type="button"
              class="dashboard-botao-principal"
              id="botao-adicionar-usuario"
            >
              <i class="fa-solid fa-user-plus"></i>
              Adicionar usuário
            </button>

          </header>


          <section class="dashboard-painel">

            <div class="dashboard-painel-cabecalho">

              <div>
                <h2>Usuários administrativos</h2>

                <p>
                  Controle quem possui acesso ao painel.
                </p>
              </div>

            </div>


            <div
              id="dashboard-lista-usuarios"
              class="dashboard-lista"
            >

              <div class="dashboard-vazio">
                <i class="fa-solid fa-users"></i>

                <h3>Nenhum usuário carregado</h3>

                <p>
                  O gerenciamento será integrado ao Supabase Auth.
                </p>
              </div>

            </div>

          </section>

        </section>

      </section>

    </main>
  `;
}


/* =========================================================
   INICIAR DASHBOARD
========================================================= */

export function iniciarDashboard() {

  const botoesMenu = document.querySelectorAll(
    ".dashboard-menu-item"
  );

  const conteudos = document.querySelectorAll(
    ".dashboard-menu-conteudo"
  );

  if (!botoesMenu.length || !conteudos.length) {
    return;
  }

  botoesMenu.forEach((botao) => {

    botao.addEventListener("click", () => {

      const menu = botao.dataset.menu;

      menuAtual = menu;


      /* MENU */

      botoesMenu.forEach((item) => {
        item.classList.toggle(
          "ativo",
          item === botao
        );
      });


      /* CONTEÚDO */

      conteudos.forEach((conteudo) => {

        conteudo.classList.toggle(
          "ativo",
          conteudo.dataset.conteudo === menu
        );

      });

    });

  });

}