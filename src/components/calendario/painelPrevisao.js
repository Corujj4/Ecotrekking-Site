import { obterPrevisaoPorData } from "../../services/clima.js";
import { formatarData } from "../../utils/formatadores.js";

let painel;

export function esconderPainelPrevisao() {
   carregarPainel();
  painel.style.display = "none";
}

export function atualizarPainelPrevisao(data) {
   carregarPainel();
    painel.style.display = "block";
  const previsao = obterPrevisaoPorData(data);

  if (!previsao) {
    painel.innerHTML = `
      <p class="previsao-indisponivel">
        Previsão indisponível para este dia.
      </p>
    `;

    return;
  }

  const horas = previsao.horas ?? [];
  const dataFormatada = formatarData(data, { comAno: true });

  const horasSelecionadas = horas.filter((hora) => {
  const numeroHora = Number(
    hora.horario.slice(0, 2),
  );

  return numeroHora >= 7 && numeroHora <= 22;
});

  painel.innerHTML = `
    <div class="cabecalho-previsao-dia">
      <div>
        <span>${dataFormatada.diaSemana}</span>
        <h2>${dataFormatada.dataCompleta}</h2>
      </div>

      <p>
        Fonte: ${previsao.fonte}
      </p>
    </div>

    <div class="faixa-previsao-horaria">
      ${horasSelecionadas
        .map(
          (hora) => `
            <div class="previsao-hora">
              <strong>
                ${hora.horario.slice(0, 2)}h
              </strong>

              <span class="previsao-hora-temperatura">
                ${hora.temperatura}°
              </span>

              <span class="previsao-hora-chuva">
                🌧 ${hora.chanceChuva}%
              </span>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function carregarPainel() {
    painel = document.querySelector("#painel-previsao-dia");
}