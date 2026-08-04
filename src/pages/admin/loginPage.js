import { fazerLogin } from "../../services/authService.js";
import { renderNavbar } from "../../components/navbar/navbar.js";
import { renderFooter } from "../../components/home/footer.js";

export function renderLoginAdmin() {
  return `
    ${renderNavbar()}

    <main class="pagina-login-admin">
      <section class="login-admin-container">

        <div class="login-admin-cabecalho">
          <i class="fa-solid fa-lock"></i>

          <h1>Área Administrativa</h1>

          <p>
            Entre com sua conta para acessar o painel administrativo.
          </p>
        </div>

        <form id="form-login-admin" class="login-admin-form">

          <label>
            <span>E-mail</span>

            <input
              id="login-admin-email"
              type="email"
              placeholder="seu@email.com"
              autocomplete="email"
              required
            />
          </label>

          <label>
            <span>Senha</span>

            <input
              id="login-admin-senha"
              type="password"
              placeholder="Sua senha"
              autocomplete="current-password"
              required
            />
          </label>

          <p
            id="login-admin-erro"
            class="login-admin-erro"
            hidden
          ></p>

          <button
            type="submit"
            id="botao-login-admin"
            class="botao-login-admin"
          >
            <i class="fa-solid fa-right-to-bracket"></i>
            Entrar
          </button>

        </form>

      </section>
    </main>

    ${renderFooter()}
  `;
}


/* =========================================================
   INICIAR LOGIN
========================================================= */

export function iniciarLoginAdmin() {
  const formulario =
    document.querySelector("#form-login-admin");

  if (!formulario) {
    return;
  }

  const campoEmail =
    document.querySelector("#login-admin-email");

  const campoSenha =
    document.querySelector("#login-admin-senha");

  const mensagemErro =
    document.querySelector("#login-admin-erro");

  const botao =
    document.querySelector("#botao-login-admin");

  formulario.addEventListener(
    "submit",
    async (evento) => {
      evento.preventDefault();

      mensagemErro.hidden = true;
      mensagemErro.textContent = "";

      botao.disabled = true;
      botao.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Entrando...
      `;

      try {
        await fazerLogin(
          campoEmail.value,
          campoSenha.value
        );

        window.location.hash = "#/dashboard";

      } catch (erro) {
        console.error(
          "Falha no login administrativo:",
          erro
        );

        mensagemErro.textContent =
          erro.message || "Não foi possível fazer login.";

        mensagemErro.hidden = false;

        botao.disabled = false;
        botao.innerHTML = `
          <i class="fa-solid fa-right-to-bracket"></i>
          Entrar
        `;
      }
    }
  );
}