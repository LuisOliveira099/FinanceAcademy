
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