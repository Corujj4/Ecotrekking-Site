import { renderNavbar } from "../components/navbar/navbar.js";
import { renderCalendarioView } from "../components/calendario/calendarioUsu.js";

export function renderCalendarioADMIN() {
    return `
        ${renderNavbar()}
        ${renderCalendarioView()}
    `;
}