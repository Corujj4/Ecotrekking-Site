import { renderNavbar } from "../components/navbar/navbar.js";

import {
  renderCalendarioUsu,
  iniciarCalendarioUsu,
} from "../components/calendario/calendarioUsu.js";
import { renderFooter } from "../components/home/footer.js";


export function renderCalendario() {
  return `
    ${renderNavbar()}
    ${renderCalendarioUsu()}
    ${renderFooter()}
  `;
}

export function iniciarPaginaCalendario() {
  iniciarCalendarioUsu();
}