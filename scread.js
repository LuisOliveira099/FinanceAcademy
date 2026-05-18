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