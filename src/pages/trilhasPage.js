import {
  renderTrilhasView,
  iniciarTrilhas
} from "../components/atividades/trilhasView.js";
import { renderFooter } from "../components/home/footer.js";
import { renderNavbar } from "../components/navbar/navbar.js";

export function renderTrilhas() {
  return `
    ${renderNavbar()}
    ${renderTrilhasView()}
    ${renderFooter()}
  `;
}

export function iniciarPaginaTrilhas() {
  iniciarTrilhas();
}