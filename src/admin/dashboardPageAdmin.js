import { renderNavbar } from "../components/navbar/navbar.js";
import { renderDashboard ,iniciarDashboard } from "./dashboard.js";
export function renderDashboardView() {
  return `
    ${renderNavbar()}
    ${renderDashboard()}
    ${iniciarDashboard()}`;
  
}