import {
  renderExpedicoesView,
  iniciarExpedicoes
} from "../components/atividades/expedicoesView.js";
import { renderFooter } from "../components/home/footer.js";
import { renderNavbar } from "../components/navbar/navbar.js";

export function renderExpedicoes() {
  return `
    ${renderNavbar()}
    ${renderExpedicoesView()}
    ${renderFooter()}
  `;
}

export function iniciarPaginaExpedicoes() {
  iniciarExpedicoes();
}