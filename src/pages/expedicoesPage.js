import {renderCatalogo,iniciarCatalogo} from "../components/catalogo/catalogoView.js";
import { renderFooter } from "../components/home/footer.js";
import { renderNavbar } from "../components/navbar/navbar.js";

export function renderExpedicoes() {
  return `
    ${renderNavbar()}
    ${renderCatalogo("expedicao")}
    ${renderFooter()}
  `
}

export function iniciarPaginaExpedicoes() {
  iniciarCatalogo("expedicao");
}
