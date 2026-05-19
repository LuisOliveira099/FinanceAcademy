/* dados investimento*/
async function carregarInvestimentos() {

    /* buscar dados no JSON Server */
    const resposta = await fetch("http://localhost:3000/investimentos");
    const investimentos = await resposta.json();

    /* imprimir título e descrição */
    var divOutput = document.getElementById("output");
    divOutput.innerHTML = `
    <h1 class="titulo px-4 pt-4 mb-2">
        <i class="fa-solid fa-chart-column"></i>
        ${investimentos.titulo}
    </h1>

    <h4 class="mx-4">
        ${investimentos.descrição}
    </h4>
`;

    /* imprimir lista de vantagens */
    var lista = "";
    for (let i = 0; i < investimentos.vantagens.length; i++) {
        lista += `<li>${investimentos.vantagens[i]}</li>`;
    }

    divOutput.innerHTML += `
    <h2 class="m-4"><i class="fa-solid fa-bolt"></i> Vantagens</h2>
    <ul>${lista}</ul>
`;

    /* título dos cards */
    divOutput.innerHTML += `<h2 class="m-4 text-center">Principais Investimentos</h2>`;

    /* imprimir cards */
    let cards = `<div class="row row-cols-1 row-cols-md-2 g-4 justify-content-center">`;

    for (let i = 0; i < investimentos.tiposInvestimento.length; i++) {
        cards += `
        <div class="col d-flex justify-content-center">
            <div class="card m-2 w-100">
                <div class="card-body">
                    <h5 class="card-title"><i class="fa-solid fa-chart-line"></i> ${investimentos.tiposInvestimento[i].nome}</h5>
                    <p class="card-text text-bg-success p-3">${investimentos.tiposInvestimento[i].classificação}</p>
                    <p class="card-text">${investimentos.tiposInvestimento[i].descrição}</p>
                </div>
            </div>
        </div>
        `;
    }

    cards += `</div>`;
    divOutput.innerHTML += cards;

    /* imprimir dica */
    divOutput.innerHTML += `
    <h4 class="dica"><i class="fa-solid fa-lightbulb"></i> ${investimentos.dica}</h4>
`;
}


/* dados planejamento */
async function carregarPlanejamentos() {

    /* buscar dados no JSON Server */
    const resposta = await fetch("http://localhost:3000/planejamentos");
    const planejamentos = await resposta.json();

    /* imprimir título e descrição */
    var divOutput = document.getElementById("output");
    divOutput.innerHTML = `
    <h1 class="titulo px-4 pt-4 mb-2">
        <i class="fa-solid fa-folder-open"></i>
        ${planejamentos.titulo}
    </h1>

    <h4 class="mx-4">
        ${planejamentos.descricao}
    </h4>
`;

    /* imprimir lista de vantagens */
    var lista = "";
    for (let i = 0; i < planejamentos.vantagens.length; i++) {
        lista += `<li>${planejamentos.vantagens[i]}</li>`;
    }

    divOutput.innerHTML += `
    <h2 class="m-4"><i class="fa-solid fa-bolt"></i> Vantagens</h2>
    <ul>${lista}</ul>
`;

    /* título dos cards */
    divOutput.innerHTML += `
    <h2 class="m-4 text-center">Métodos Para Planejar o Uso da Renda</h2>
`;

    /* imprimir cards */
    let cards = `<div class="row row-cols-1 row-cols-md-2 g-4 justify-content-center">`;

    for (let i = 0; i < planejamentos.tiposMetodo.length; i++) {
        cards += `
        <div class="col d-flex justify-content-center">
            <div class="card m-2 w-100">
                <div class="card-body">
                    <h5 class="card-title"><i class="fa-solid fa-rotate"></i> ${planejamentos.tiposMetodo[i].nome}</h5>
                    <p class="card-text">${planejamentos.tiposMetodo[i].descrição}</p>
                </div>
            </div>
        </div>
        `;
    }

    cards += `</div>`;
    divOutput.innerHTML += cards;

    /* imprimir dica */
    divOutput.innerHTML += `
    <h4 class="dica"><i class="fa-solid fa-lightbulb"></i> ${planejamentos.dica}</h4>
`;
}


/* dados aposentadoria */
async function carregarAposentadoria() {

    /* buscar dados no JSON Server */
    const resposta = await fetch("http://localhost:3000/aposentadoria");
    const aposentadoria = await resposta.json();

    /* imprimir título e descrição */
    var divOutput = document.getElementById("output");
    divOutput.innerHTML = `
    <h1 class="titulo px-4 pt-4 mb-2">
        <i class="fa-solid fa-piggy-bank"></i>
        ${aposentadoria.titulo}
    </h1>

    <h4 class="mx-4">
        ${aposentadoria.descricao}
    </h4>
`;

    /* imprimir lista de vantagens */
    var lista = "";
    for (let i = 0; i < aposentadoria.vantagens.length; i++) {
        lista += `<li>${aposentadoria.vantagens[i]}</li>`;
    }

    divOutput.innerHTML += `
    <h2 class="m-4"><i class="fa-solid fa-bolt"></i> Vantagens</h2>
    <ul>${lista}</ul>
`;

    /* título dos cards */
    divOutput.innerHTML += `
    <h2 class="m-4 text-center">Principais Formas de Construir a Aposentadoria</h2>
`;

    /* imprimir cards */
    let cards = `<div class="row row-cols-1 row-cols-md-2 g-4 justify-content-center">`;

    for (let i = 0; i < aposentadoria.tiposAposentadoria.length; i++) {
        cards += `
        <div class="col d-flex justify-content-center">
            <div class="card m-2 w-100">
                <div class="card-body">
                    <h5 class="card-title"><i class="fa-solid fa-wallet"></i> ${aposentadoria.tiposAposentadoria[i].nome}</h5>
                    <p class="card-text">${aposentadoria.tiposAposentadoria[i].descricao}</p>
                </div>
            </div>
        </div>
        `;
    }

    cards += `</div>`;
    divOutput.innerHTML += cards;

    /* imprimir dica */
    divOutput.innerHTML += `
    <h4 class="dica"><i class="fa-solid fa-lightbulb"></i> ${aposentadoria.dica}</h4>
`;
}


/* dados dívidas */
async function carregarDividas() {

    /* buscar dados no JSON Server */
    const resposta = await fetch("http://localhost:3000/dividas");
    const dividas = await resposta.json();

    /* imprimir título e descrição */
    var divOutput = document.getElementById("output");
    divOutput.innerHTML = `
    <h1 class="titulo px-4 pt-4 mb-2">
        <i class="fa-solid fa-money-bill-wave"></i>
        ${dividas.titulo}
    </h1>

    <h4 class="mx-4">
        ${dividas.descricao}
    </h4>
`;

    /* seção juros compostos */
    divOutput.innerHTML += `
    <h2 class="m-4">
        <i class="fa-solid fa-percent"></i>
        Você sabe o que é juros compostos ?
    </h2>

    <p class="mx-4">
        Os juros compostos ocorrem quando os juros são calculados não apenas sobre o valor inicial, mas também sobre os juros acumulados ao longo do tempo, ou seja, é gerado juros sobre juros. Nas dívidas, isso pode fazer o valor crescer rapidamente quando há atrasos no pagamento, principalmente em modalidades como cartão de crédito e cheque especial, fazendo com que o débito vire uma bola de neve.
    </p>
`;

    /* título dos cards */
    divOutput.innerHTML += `
    <h2 class="m-4 text-center">Principais Tipos de Dívidas</h2>
`;

    /* imprimir cards */
    let cards = `<div class="row row-cols-1 row-cols-md-2 g-4 justify-content-center">`;

    for (let i = 0; i < dividas.tiposDivida.length; i++) {
        cards += `
        <div class="col d-flex justify-content-center">
            <div class="card m-2 w-100">
                <div class="card-body">
                    <h5 class="card-title"><i class="fa-solid fa-file-invoice-dollar"></i> ${dividas.tiposDivida[i].nome}</h5>
                    <p class="card-text text-bg-danger p-3">${dividas.tiposDivida[i].classificacao}</p>
                    <p class="card-text">${dividas.tiposDivida[i].descricao}</p>
                </div>
            </div>
        </div>
        `;
    }

    cards += `</div>`;
    divOutput.innerHTML += cards;

    /* imprimir dica */
    divOutput.innerHTML += `
    <h4 class="dica"><i class="fa-solid fa-lightbulb"></i> ${dividas.dica}</h4>
`;
}