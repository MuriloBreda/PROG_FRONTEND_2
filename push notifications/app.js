// Capturar Elementos do HTML
const btnAtivar = document.getElementById("btnAtivar");
const btnTestar = document.getElementById("btnTestar");
const mensagem = document.getElementById("mensagem");
let registroServiceWorker = null;

// Verificar se o navegador possui os recursos
function verificaSuporte() {
  // Verifica o suporte do navegador ao Service Worker
  if (!("serviceWorker" in navigator)) {
    mensagem.textContent = "Este navegador não suporta o Service Worker";
    return false;
  }
  // Verifica o suporte das notificações no navegador
  if (!("Notification" in window)) {
    mensagem.textContent = "Este navegador não suporta notificações";
  }

  return true;
}

// Registrar o arquivo service-worker,js
async function registrarServiceWorker() {
  try {
    registroServiceWorker = await navigator.serviceWorker.register(
      "./service-worker.js",
    );
    console.log(`Service Worker registrado: ${registroServiceWorker}`);
    return registrarServiceWorker;
  } catch (erro) {
    console.log(`Erro ao registrar SW ${erro}`);
    mensagem.textContent = "Não foi possível registar o SW";
    return null;
  }
}

// solicitar a autorização do usuario
async function solicitarPermissao() {
  const permissao = await Notification.requestPermission();

  if (permissao == "granted") {
    mensagem.textContent = "Notificações autorizadas";
    btnTestar.disabled = false;
    return true;
  }

  if (permissao == "denied") {
    mensagem.textContent = "Notificações bloqueadas";
    return false;
  }

  mensagem.textContent = "A autorização não foi concluída.";
  return false;
}

// exibir a notificação pelo service worker
async function mostrarNotificacao() {
  if (Notification.permission != "granted") {
    mensagem.textContent = "Primeiro autorize as notificações";
    return;
  }

  const registro =
    registroServiceWorker || (await navigator.serviceWorker.ready);

  // criar a notificação
  await registro.showNotification('Nova atividade publicada', {
    body: 'A atividade de JS está disponivel.',
    icon: 'icone.png',
    data: {
      url: "./index.html",
    },
  });
}

// Após a pessoa clicar no botao ATIVAR NOTIFICAÃO faz a pergunta se ela vai ´permitir as notificações
btnAtivar.addEventListener('click', async function(){
    if(!verificaSuporte()){
        return;
    }

    if(!registroServiceWorker){
        await registrarServiceWorker();
    }

    await solicitarPermissao();
});

btnTestar.addEventListener('click', mostrarNotificacao);

window.addEventListener("load", async function (){
    if(!verificaSuporte()){
        return;
    }

    await registrarServiceWorker();
})