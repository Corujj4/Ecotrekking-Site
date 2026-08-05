import { renderHome } from "./pages/homePage.js";
import {renderCalendario,iniciarPaginaCalendario,} from "./pages/calendarioPage.js";
import { renderGaleriaPage } from "./pages/galeriaPage.js";
import {renderTrilhas,iniciarPaginaTrilhas,} from "./pages/trilhasPage.js";
import { criarCalendario } from "./components/calendario/calendario.js";
import { configurarClima } from "./services/clima.js";
import { configurarEventos } from "./services/eventos.js";
import { renderNavbar } from "./components/navbar/navbar.js";
import {renderRapel,iniciarPaginaRapel,} from "./pages/rapelPage.js";
import {renderExpedicoes,iniciarPaginaExpedicoes,} from "./pages/expedicoesPage.js";
import { renderDashboardView, } from "./admin/dashboardPageAdmin.js";
import { obterUsuarioAtual } from "./services/authService.js";
import {renderLoginAdmin, iniciarLoginAdmin,} from "./admin/loginPage.js";
import { iniciarDashboard } from "./admin/dashboard.js";

const rotas = {
  "/": renderHome,
  "/calendario": renderCalendario,
  "/dashboard": renderDashboardView,
  "/admin/login": renderLoginAdmin,
  "/trilhas": renderTrilhas,
  "/galeria": renderGaleriaPage,
  "/rapel": renderRapel,
  "/expedicoes": renderExpedicoes,
};



async function renderizarPagina() {
  const app = document.querySelector("#app");

  if (!app) {
    console.error('Elemento "#app" não encontrado.');
    return;
  }

  const rotaAtual =
    window.location.hash.slice(1) || "/";

  /*
   * ========================================================
   * PROTEÇÃO DA ÁREA ADMINISTRATIVA
   * ========================================================
   */

  if (rotaAtual === "/dashboard") {
  const usuario = await obterUsuarioAtual();

  if (!usuario) {
    window.location.hash = "#/admin/login";
    return;
  }
}
  

  /*
   * ========================================================
   * RENDERIZAÇÃO
   * ========================================================
   */

  const renderizar =
    rotas[rotaAtual] || renderHome;

  app.innerHTML = renderizar();


  /*
   * ========================================================
   * LOGIN ADMIN
   * ========================================================
   */

  if (rotaAtual === "/admin/login") {
    iniciarLoginAdmin();
  }


  /*
   * ========================================================
   * CALENDÁRIO ADMIN
   * ========================================================
   */

  if (rotaAtual === "/dashboard") {
  configurarClima();
  configurarEventos();
  criarCalendario();
  iniciarDashboard();
}


  /*
   * ========================================================
   * CALENDÁRIO PÚBLICO
   * ========================================================
   */

  if (rotaAtual === "/calendario") {
    iniciarPaginaCalendario();
  }


  /*
   * ========================================================
   * TRILHAS
   * ========================================================
   */

  if (rotaAtual === "/trilhas") {
    iniciarPaginaTrilhas();
  }


  /*
   * ========================================================
   * RAPEL
   * ========================================================
   */

  if (rotaAtual === "/rapel") {
    iniciarPaginaRapel();
  }


  /*
   * ========================================================
   * EXPEDIÇÕES
   * ========================================================
   */

  if (rotaAtual === "/expedicoes") {
    iniciarPaginaExpedicoes();
  }
}


export function iniciarRouter() {
  window.addEventListener(
    "hashchange",
    renderizarPagina
  );

  renderizarPagina();
}