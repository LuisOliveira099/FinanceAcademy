//HEADER
function toggleView(viewName) {
  const homeView = document.getElementById("view_home");
  const dashView = document.getElementById("view_dashboard");

  if (viewName === "dashboard") {
    homeView.style.display = "none";
    dashView.style.display = "block";
  } else {
    homeView.style.display = "block";
    dashView.style.display = "none";
  }
}

/**
 * Controla a transição dinâmica de classes de tema no elemento body
 */
function setTheme(themeName) {
  // Remove classes anteriores para evitar conflitos de estilo
  document.body.classList.remove("dark-theme", "light-theme");

  // Aplica a nova classe selecionada pelo usuário
  document.body.classList.add(themeName + "-theme");
}

// Inicializador de eventos da página
document.addEventListener("DOMContentLoaded", () => {
  // Mapeia o clique no perfil da Home (aceita o ID novo ou o ID antigo)
  const profileBtn =
    document.getElementById("btn_meu_perfil") ||
    document.getElementById("btn_configuracoes");

  if (profileBtn) {
    profileBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleView("dashboard");
    });
  }

  // Gerencia a submissão dos dados de e-mail e senha inseridos na barra lateral
  const saveBtn = document.getElementById("dash_save_data");
  if (saveBtn) {
    saveBtn.onclick = () => {
      const email = document.getElementById("dash_input_email").value;
      const pass = document.getElementById("dash_input_password").value;

      if (!email || !pass) {
        alert(
          "Por favor, preencha o e-mail e a senha na barra lateral antes de atualizar.",
        );
      } else {
        alert("Dados de perfil updated com sucesso diretamente no painel!");

        // Limpa os campos após a confirmação
        document.getElementById("dash_input_email").value = "";
        document.getElementById("dash_input_password").value = "";
      }
    };
  }
});
//Fim do HEADER

//FORMULÁRIO
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("perguntas");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nivel = form.nivel.value;
    const faixa = form.faixa.value;
    const checkboxes = form.objetivos;
    const objetivos = [];

    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i];
      if (checkbox.checked) {
        let valorObj = checkbox.value;

        if (valorObj == "planejamento") {
          valorObj = "planejamentos";
        }
        objetivos.push(valorObj);
      }
    }

    const salario = document.getElementById("salario").value;
    const comentario = document.getElementById("comentario").value;

    const dadosUsuario = {
      nivel: nivel,
      faixa: faixa,
      objetivos: objetivos,
      salario: salario,
      comentario: comentario,
    };
    try {
      const response = await fetch("http://localhost:3000/respostasForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosUsuario),
      });

      if (response.ok) {
        console.log("JSON enviado:", dadosUsuario);

        fetch("http://localhost:3000/db")
          .then((resposta) => resposta.json())
          .then((bancoCompleto) => {
            const container = document.getElementById("resultadoFormulario");
            container.innerHTML = "";

            objetivos.forEach((chave) => {
              const dadosDaCategoria = bancoCompleto[chave];

              if (dadosDaCategoria) {
                const chavesDoBloco = Object.keys(dadosDaCategoria);
                const tableKey = chavesDoBloco.find((key) =>
                  Array.isArray(dadosDaCategoria[key]),
                );
                const listaDeItens = dadosDaCategoria[tableKey] || [];

                let htmlItens = "";

                listaDeItens.forEach((item) => {
                  htmlItens += `
                    <div class="col-md-6 mb-3">
                      <div class="card h-100 p-3 bg-white border">
                        <h5 class="fw-bold text-dark">${item.nome}</h5>
                        <p class="text-muted small m-0">${item.descricao || item.descrição}</p>
                      </div>
                    </div>
                  `;
                });

                container.innerHTML += `
                  <div class="card p-4 mb-4 bg-light text-dark shadow-sm" style="border-radius: 12px;">
                    <h2 class="text-primary font-monospace">${dadosDaCategoria.titulo}</h2>
                    <p class="lead">${dadosDaCategoria.descricao || dadosDaCategoria.descrição}</p>
                    
                    <div class="alert alert-warning small">
                      <strong>💡 Dica:</strong> ${dadosDaCategoria.dica}
                    </div>

                    <h4 class="mt-4 mb-3 fw-bold">Opções sugeridas:</h4>
                    
                    <div class="row">
                      ${htmlItens}
                    </div>
                  </div>
                `;
              }

              console.log(`Dados para a categoria ${chave}:`, dadosDaCategoria);
            });
          });

        const modal = bootstrap.Modal.getInstance(
          document.getElementById("formModal"),
        );
        modal.hide();
        alert("Formulário enviado com sucesso!");
      } else {
        alert("Erro ao enviar formulário!");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Falha na conexão com o servidor.");
    }
  });
});
//fim do formulário

//CATEGORIAS
//Fim das categorias

//Simulacao de Investimento
const API_URL = "http://localhost:3000/simulacoes";
const TAXA_CDI_MENSAL = 0.83;

function ValorInvalido(campo) {
  campo.classList.add("is-invalid");
}

window.onload = function () {
  carregarHistorico();
  atualizarLabels();
};

function atualizarLabels() {
  const tipo = document.getElementById("TipoInvestimento").value;
  const labelJuros = document.getElementById("labelJuros");
  const inputJuros = document.getElementById("Juros");
  const helpJuros = document.getElementById("helpJuros");

  // Limpa o valor digitado anteriormente para o placeholder aparecer limpo
  inputJuros.value = ""; 

  if (tipo === "nominal") {
    labelJuros.innerText = "Taxa de Juros (% ao mês)";
    inputJuros.placeholder = "Ex: 0.50"; 
    helpJuros.innerText = "Simulação baseada no rendimento mensal padrão da Poupança.";
  } else if (tipo === "cdi") {
    labelJuros.innerText = "Rentabilidade (% do CDI)";
    inputJuros.placeholder = "Ex: 100"; 
    helpJuros.innerText = `Considerando o CDI atual em torno de ${TAXA_CDI_MENSAL}% ao mês. 100% do CDI reflete contas como Nubank e Banco Inter.`;
  } else if (tipo === "cdb") {
    labelJuros.innerText = "Taxa Equivalente Isenta (% ao ano)";
    inputJuros.placeholder = "Ex: 11.5";
    helpJuros.innerText = "A taxa anual oferecida para ativos de Renda Fixa. O sistema vai calcular o equivalente exato por mês.";
  }
}

function simular() {
  let aporte = parseFloat(
    document.getElementById("Aporte").value.replace(",", "."),
  );
  let juros = parseFloat(
    document.getElementById("Juros").value.replace(",", "."),
  );
  let tempo = parseInt(document.getElementById("Tempo").value);
  let tipo = document.getElementById("TipoInvestimento").value;
  let result = 0;
  let valido = true;

  if (isNaN(aporte) || aporte < 0) {
    valido = false;
    ValorInvalido(document.getElementById("Aporte"));
  } else {
    document.getElementById("Aporte").classList.remove("is-invalid"); // Remove a classe de erro se o valor for válido
  }

  if (isNaN(juros) || juros < 0) {
    valido = false;
    ValorInvalido(document.getElementById("Juros"));
  } else {
    document.getElementById("Juros").classList.remove("is-invalid");
  }

  if (isNaN(tempo) || tempo < 1 || tempo > 60) { // Tempo maximo de 5 anos para evitar simulações irreais
    valido = false;
    ValorInvalido(document.getElementById("Tempo"));
  } else {
    document.getElementById("Tempo").classList.remove("is-invalid");
  }

  if (valido) {
    let jurosMensalCalculado = 0;
    let nomeTipoAmigavel = "";

    // 1. Define o nome correto e faz o cálculo baseado no value em texto do HTML
    if (tipo === "nominal") {
      nomeTipoAmigavel = "POUPANÇA";
      jurosMensalCalculado = juros; // Usa a taxa mensal direta (ex: 0.5)
    } else if (tipo === "cdi") {
      nomeTipoAmigavel = "CDB / TESOURO (CDI)";
      jurosMensalCalculado = (juros / 100) * TAXA_CDI_MENSAL; // Se for 100% do CDI -> 0.83%
    } else if (tipo === "cdb") {
      nomeTipoAmigavel = "LCI / LCA (ANUAL)";
      let taxaAnualDecimal = juros / 100;
      jurosMensalCalculado = ((1 + taxaAnualDecimal) ** (1 / 12) - 1) * 100; // Converte taxa anual para mensal
    }

    // 2. Aplica a fórmula de juros compostos
    result = aporte * (1 + jurosMensalCalculado / 100) ** tempo;

    document.getElementById("Montante").value = "R$ " + result.toFixed(2);

    const novaSimulacao = {
      dataHora: new Date().toLocaleString("pt-BR"),
      aporte: aporte,
      juros: juros,
      tempo: tempo,
      tipo: nomeTipoAmigavel,
      total: result,
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaSimulacao),
    })
      .then((resposta) => {
        if (!resposta.ok) throw new Error("Erro ao salvar no servidor");
        return resposta.json();
      })
      .then(() => {
        carregarHistorico();
      })
      .catch((erro) => console.error("Erro na comunicação com a API:", erro));
  }
}

function carregarHistorico() {
  fetch(API_URL)
    .then((resposta) => {
      if (!resposta.ok) throw new Error("Erro ao buscar histórico");
      return resposta.json();
    })
    .then((dados) => {
      let tabela = document.getElementById("corpoTabela");
      tabela.innerHTML = "";

      dados.forEach((item) => {
        let novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
          <td><small class="text-muted">${item.dataHora || "---"}</small></td>
          <td>R$ ${parseFloat(item.aporte).toFixed(2)}</td>
          <td>${item.juros}% (${item.tipo || "NOMINAL"})</td>
          <td>${item.tempo} meses</td>
          <td><strong>R$ ${parseFloat(item.total).toFixed(2)}</strong></td>
        `;
        tabela.prepend(novaLinha);
      });
    })
    .catch((erro) => console.error("Erro ao carregar histórico:", erro));
}

function limparCampos() {
  document.getElementById("Aporte").value = "";
  document.getElementById("Juros").value = "";
  document.getElementById("Tempo").value = "";
  document.getElementById("Montante").value = "";
  document.getElementById("Aporte").classList.remove("is-invalid");
  document.getElementById("Juros").classList.remove("is-invalid");
  document.getElementById("Tempo").classList.remove("is-invalid");
}

function limparHistorico() {
  if (
    confirm("Tem certeza que deseja apagar todo o histórico de simulações?")
  ) {
    fetch(API_URL)
      .then((resposta) => resposta.json())
      .then((dados) => {
        let deletarPromessas = dados.map((item) =>
          fetch(`${API_URL}/${item.id}`, { method: "DELETE" }),
        );

        Promise.all(deletarPromessas).then(() => {
          document.getElementById("corpoTabela").innerHTML = "";
        });
      })
      .catch((erro) =>
        console.error("Erro ao limpar histórico no servidor:", erro),
      );
  }
}
//Fim de simulações