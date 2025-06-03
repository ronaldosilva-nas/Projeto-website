// formulário de contato funcional
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');
    const statusMensagem = document.getElementById('statusMensagem');

    if (formulario && statusMensagem) {
        formulario.addEventListener('submit', async function(event) {
            event.preventDefault(); // Anular envio padrão

            const data = new FormData(formulario); // Obter os campos
            const action = event.target.action; // URL do Formspree

            statusMensagem.style.display = 'block'; // Mostra a div de status
            statusMensagem.textContent = 'Enviando sua mensagem...';
            statusMensagem.className = 'mensagem_status'; // Limpa classes anteriores

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json' 
                    }
                });

                if (response.ok) { 
                    statusMensagem.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
                    statusMensagem.classList.add('success');
                    formulario.reset(); 
                } else {
                    const errorData = await response.json(); 
                    let errorMessage = 'Ocorreu um erro ao enviar a mensagem.';
                    if (errorData && errorData.errors) {
                        errorMessage += ' Detalhes: ' + errorData.errors.map(e => e.message).join(', ');
                    }
                    statusMensagem.textContent = errorMessage;
                    statusMensagem.classList.add('error');
                }
            } catch (error) {
                // Erro de rede ou outro problema
                statusMensagem.textContent = 'Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente.';
                statusMensagem.classList.add('error');
                console.error('Erro de envio:', error);
            }
        });
    }
});

//botão voltar ao topo da página
const botaoTopo = document.getElementById("voltarTopo");

window.onscroll = function () {
  botaoTopo.style.display = window.scrollY > 300 ? "block" : "none";
};

botaoTopo.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};