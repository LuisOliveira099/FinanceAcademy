//HEADER

function toggleView(viewName) {
    const homeView = document.getElementById('view_home');
    const dashView = document.getElementById('view_dashboard');

    if (viewName === 'dashboard') {
        homeView.style.display = 'none';
        dashView.style.display = 'block';
    } else {
        homeView.style.display = 'block';
        dashView.style.display = 'none';
    }
}

/**
 * Controla a transição dinâmica de classes de tema no elemento body
 */
function setTheme(themeName) {
    // Remove classes anteriores para evitar conflitos de estilo
    document.body.classList.remove('light-theme', 'dark-theme');
    
    // Aplica a nova classe selecionada pelo usuário
    document.body.classList.add(themeName + "-theme");
}

// Inicializador de eventos da página
document.addEventListener("DOMContentLoaded", () => {
    
    // Mapeia o clique no perfil da Home (aceita o ID novo ou o ID antigo)
    const profileBtn = document.getElementById("btn_meu_perfil") || document.getElementById("btn_configuracoes");
    
    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleView('dashboard');
        });
    }

    // Gerencia a submissão dos dados de e-mail e senha inseridos na barra lateral
    const saveBtn = document.getElementById('dash_save_data');
    if (saveBtn) {
        saveBtn.onclick = () => {
            const email = document.getElementById('dash_input_email').value;
            const pass = document.getElementById('dash_input_password').value;
            
            if (!email || !pass) {
                alert("Por favor, preencha o e-mail e a senha na barra lateral antes de atualizar.");
            } else {
                alert("Dados de perfil atualizados com sucesso diretamente no painel!");
                
                // Limpa os campos após a confirmação
                document.getElementById('dash_input_email').value = '';
                document.getElementById('dash_input_password').value = '';
            }
        };
    }
});
//Fim do HEADERE

//FORMULÁRIO
document.addEventListener("DOMContentLoaded", function() {
const form = document.getElementById("perguntas");

form.addEventListener("submit", async function(event){event.preventDefault(); 

const nivel = form.nivel.value;
const faixa = form.faixa.value;
const checkboxes = form.objetivos;
const objetivos = [];

for (let i = 0; i < checkboxes.length; i++) {
const checkbox = checkboxes[i];
if (checkbox.checked) {
    objetivos.push(checkbox.value);
  }
}
const salario = document.getElementById("salario").value;
const comentario = document.getElementById("comentario").value;

const dadosUsuario = {
      nivel: nivel,
      faixa: faixa,
      objetivos: objetivos,
      salario: salario,
      comentario: comentario
    };
    try{
const response = await fetch("http://localhost:3000/respostasForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosUsuario)
      });

      if (response.ok) {
        console.log("JSON enviado:", dadosUsuario);

        const modal = bootstrap.Modal.getInstance(document.getElementById("formModal"));
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
const API_URL = 'http://localhost:3000/simulacoes';

function ValorInvalido(campo) {
    campo.classList.add("is-invalid");
}

window.onload = function() {
    carregarHistorico();
};

function simular() {
    let aporte = parseFloat(document.getElementById('Aporte').value.replace(',', '.'));
    let juros = parseFloat(document.getElementById('Juros').value.replace(',', '.'));
    let tempo = parseInt(document.getElementById('Tempo').value);
    let result = 0;
    let valido = true;

    if (isNaN(aporte) || aporte < 0) {
        valido = false;
        ValorInvalido(document.getElementById("Aporte"));
    } else {
        document.getElementById("Aporte").classList.remove("is-invalid");
    }

    if (isNaN(juros) || juros < 0) {
        valido = false;
        ValorInvalido(document.getElementById("Juros"));
    } else {
        document.getElementById("Juros").classList.remove("is-invalid");
    }

    //Limite da simulação em no máximo 12 meses. 
    if (isNaN(tempo) || tempo < 1 || tempo > 12) {
        valido = false;
        ValorInvalido(document.getElementById("Tempo"));
    } else {
        document.getElementById("Tempo").classList.remove("is-invalid");
    }

    if (valido) {
        result = aporte * (1 + juros / 100) ** tempo;
        document.getElementById("Montante").value = "R$ " + result.toFixed(2);

        const novaSimulacao = {
            aporte: aporte,
            juros: juros,
            tempo: tempo,
            total: result
        };

        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaSimulacao)
        })
        .then(resposta => {
            if (!resposta.ok) throw new Error('Erro ao salvar no servidor');
            return resposta.json();
        })
        .then(() => {
            carregarHistorico(); // Atualiza a tabela dinamicamente buscando da API
        })
        .catch(erro => console.error("Erro na comunicação com a API:", erro));
    }
}

function carregarHistorico() {
    fetch(API_URL)
        .then(resposta => resposta.json())
        .then(dados => {
            let tabela = document.getElementById("corpoTabela");
            tabela.innerHTML = ""; // Limpa a tabela para remontar

            dados.forEach(item => {
                let novaLinha = document.createElement("tr");
                novaLinha.innerHTML = `
                    <td>R$ ${parseFloat(item.aporte).toFixed(2)}</td>
                    <td>${item.juros}%</td>
                    <td>${item.tempo} meses</td>
                    <td><strong>R$ ${parseFloat(item.total).toFixed(2)}</strong></td>
                `;
                tabela.prepend(novaLinha); // Exibe no topo a simulação mais recente
            });
        })
        .catch(erro => console.error("Erro ao carregar histórico:", erro));
}

function limparCampos() {
    document.getElementById('Aporte').value = '';
    document.getElementById('Juros').value = '';
    document.getElementById('Tempo').value = '';
    document.getElementById('Montante').value = '';
    document.getElementById('Aporte').classList.remove('is-invalid');
    document.getElementById('Juros').classList.remove('is-invalid');
    document.getElementById('Tempo').classList.remove('is-invalid');
}

// APAGAR DADOS DO SERVIDOR
function limparHistorico() {
    if (confirm("Tem certeza que deseja apagar todo o histórico de simulações?")) {
        fetch(API_URL)
            .then(resposta => resposta.json())
            .then(dados => {

                let deletarPromessas = dados.map(item => 
                    fetch(`${API_URL}/${item.id}`, { method: 'DELETE' })
                );
                
                Promise.all(deletarPromessas).then(() => {
                    document.getElementById("corpoTabela").innerHTML = "";
                });
            })
            .catch(erro => console.error("Erro ao limpar histórico no servidor:", erro));
    }
}

// TRATAR EVENTO ONSUBMIT DO FORMULÁRIO
function tratarEnvio(evento) {
    evento.preventDefault(); 
    simular(); 
}
//Fim de simulações