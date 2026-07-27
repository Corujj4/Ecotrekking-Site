import { renderNavbar } from "../components/navbar/navbar.js";
import { renderCalendarioView } from "../components/calendario/calendarioView.js";
import {criarCalendario} from "../components/calendario/calendario.js";
import {configurarEventos} from "../services/eventos.js";

export function renderCalendarioADMIN() {
    return `
        ${renderNavbar()}
        ${renderCalendarioView()}
    `;
}
export function iniciarPaginaCalendarioADMIN() {
  criarCalendario();
  configurarEventos();
}