import {
  renderRapelView,
  iniciarRapel
} from "../components/atividades/rapelView.js";
import { renderFooter } from "../components/home/footer.js";
import { renderNavbar } from "../components/navbar/navbar.js";

export function renderRapel() {
  return `
    ${renderNavbar()}
    ${renderRapelView()}
    ${renderFooter()}
  `;
}

export function iniciarPaginaRapel() {
  iniciarRapel();
}