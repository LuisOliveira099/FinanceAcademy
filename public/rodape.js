

const modal = document.getElementById("modal");
const btnAjuda = document.getElementById("btnAjuda");
const fechar = document.getElementById("fechar");

const instagram = document.getElementById("instagram");
const facebook = document.getElementById("facebook");
const linkedin = document.getElementById("linkedin");

const formAjuda = document.getElementById("formAjuda");



btnAjuda.addEventListener("click", () => {
    modal.style.display = "flex";
});



fechar.addEventListener("click", () => {
    modal.style.display = "none";
});



instagram.addEventListener("click", () => {
    window.open("https://instagram.com", "_blank");
});

facebook.addEventListener("click", () => {
    window.open("https://facebook.com", "_blank");
});

linkedin.addEventListener("click", () => {
    window.open("https://linkedin.com", "_blank");
});



formAjuda.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const mensagem = document.getElementById("mensagem").value;

    const dados = {
        nome: nome,
        mensagem: mensagem,
        data: new Date()
    };

    try{

        const resposta = await fetch("http://localhost:3000/ajudas", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)
        });

        if(resposta.ok){

            alert("Solicitação enviada com sucesso!");

            

            window.location.href =
            `mailto:suporte@empresa.com?subject=Pedido de Ajuda&body=
            Nome: ${nome}%0D%0A
            Mensagem: ${mensagem}`;

            formAjuda.reset();

            modal.style.display = "none";
        }

    }catch(erro){

        console.log("Erro:", erro);

        alert("Erro ao enviar solicitação.");
    }

});