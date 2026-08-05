import {renderCatalogo,iniciarCatalogo} from "../components/catalogo/catalogoView.js";
import { renderFooter } from "../components/home/footer.js";
import { renderNavbar } from "../components/navbar/navbar.js";

export function renderRapel() {
  return `
    ${renderNavbar()}
    ${renderCatalogo("rapel")}
    ${renderFooter()}
  `;
}

export function iniciarPaginaRapel() {
  iniciarCatalogo("rapel");
}
