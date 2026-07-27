import { renderNavbar } from "../components/navbar/navbar.js";
import { renderFooter } from "../components/home/footer.js";
import { renderGaleria } from "../components/galeria/galeria.js";

export function renderGaleriaPage() {
  return `
    ${renderNavbar()}

    <main class="layout-pagina pagina-galeria">
      ${renderGaleria()}
    </main>

    ${renderFooter()}
  `;
}