import {renderCatalogo,iniciarCatalogo} from "../components/catalogo/catalogoView.js";
import { renderFooter } from "../components/home/footer.js";
import { renderNavbar } from "../components/navbar/navbar.js";

export function renderTrilhas() {
  return `
    ${renderNavbar()}
    ${renderCatalogo("trilha")}
    ${renderFooter()}
  `;
}

export function iniciarPaginaTrilhas() {
  iniciarCatalogo("trilha");
}
