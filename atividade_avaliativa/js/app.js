import { consultarCEP, verificarFeriado, formatarCEP } from './api.js';
import * as storage from './storage.js';
import * as dom from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
  inicializarAplicacao();
});

function inicializarAplicacao() {
  // Carrega entregas do localStorage
  const entregas = storage.obterEntregas();
  dom.renderizarTabela(entregas);

  // Registra event listeners
  registrarEventListeners();
}

function registrarEventListeners() {
  // Formulário
  const form = document.getElementById('form');
  form.addEventListener('submit', handleSubmitFormulario);

  // Botão consultar CEP
  const btnConsultarCep = document.getElementById('btnConsultarCep');
  btnConsultarCep.addEventListener('click', handleConsultarCEP);

  // Campo CEP (consulta ao perder foco)
  const campoCep = document.getElementById('cep');
  campoCep.addEventListener('blur', handleConsultarCEP);

  // Campo data (verifica feriado)
  const campoData = document.getElementById('data');
  campoData.addEventListener('change', handleVerificarFeriado);

  // Botão limpar tudo
  const btnLimparTodos = document.getElementById('btnLimparTodos');
  btnLimparTodos.addEventListener('click', handleLimparTodos);

  // Funções globais para os botões da tabela
  window.confirmarExclusao = handleConfirmarExclusao;
  window.verDetalhes = handleVerDetalhes;
  window.editarEntrega = handleEditarEntrega;
}

async function handleSubmitFormulario(event) {
  event.preventDefault();

  // Valida formulário
  const validacao = dom.validarFormulario();
  if (validacao !== true) {
    dom.mostrarAlerta(validacao, 'warning');
    return;
  }

  try {
    // Obtém valores do formulário
    const valores = dom.obterValoresFormulario();

    // Salva no localStorage
    const entrega = storage.salvarEntrega(valores);

    // Atualiza tabela
    const entregas = storage.obterEntregas();
    dom.renderizarTabela(entregas);

    // Limpa formulário e alerta de sucesso
    dom.limparFormulario();
    dom.esconderInfoCEP();
    dom.mostrarAlerta('✅ Entrega registrada com sucesso!', 'success', 3000);

  } catch (erro) {
    dom.mostrarAlerta('❌ Erro ao registrar entrega: ' + erro.message, 'danger');
  }
}

async function handleConsultarCEP(event) {
  event.preventDefault();

  const cep = document.getElementById('cep').value;

  // Valida se tem algo
  if (!cep.trim()) {
    dom.mostrarAlerta('⚠️ Digite um CEP', 'warning');
    dom.limparEndereco();
    dom.esconderInfoCEP();
    return;
  }

  try {
    dom.mostrarCarregamentoCEP();
    dom.esconderInfoCEP();

    // Consulta CEP
    const resultado = await consultarCEP(cep);

    if (!resultado.sucesso) {
      dom.mostrarAlerta('❌ ' + resultado.erro, 'danger', 4000);
      dom.limparEndereco();
      dom.esconderInfoCEP();
    } else {
      // Preenche campos
      dom.preencherEndereco(resultado);
      dom.mostrarInfoCEP(resultado);
      dom.mostrarAlerta('✅ CEP consultado com sucesso!', 'success', 2000);
    }

  } catch (erro) {
    dom.mostrarAlerta('❌ Erro ao consultar CEP: ' + erro.message, 'danger');
    dom.limparEndereco();
  } finally {
    dom.esconderCarregamentoCEP();
  }
}

async function handleVerificarFeriado(event) {
  const data = event.target.value;

  if (!data) return;

  try {
    const resultado = await verificarFeriado(data);

    if (resultado.ehFeriado) {
      dom.mostrarAlerta(
        `⚠️ ATENÇÃO: A data escolhida é um feriado nacional (${resultado.nome})`,
        'warning',
        5000
      );
    }
  } catch (erro) {
    console.error('Erro ao verificar feriado:', erro);
  }
}

function handleConfirmarExclusao(id) {
  dom.mostrarModalConfirmacao(id, (idEntrega) => {
    try {
      storage.removerEntrega(idEntrega);
      const entregas = storage.obterEntregas();
      dom.renderizarTabela(entregas);
      dom.mostrarAlerta('✅ Entrega removida com sucesso!', 'success', 2000);
    } catch (erro) {
      dom.mostrarAlerta('❌ Erro ao remover entrega', 'danger');
    }
  });
}

function handleVerDetalhes(id) {
  const entrega = storage.obterEntrega(id);
  if (entrega) {
    dom.mostrarDetalhes(entrega);
  } else {
    dom.mostrarAlerta('❌ Entrega não encontrada', 'danger');
  }
}

function handleEditarEntrega(id) {
  const entrega = storage.obterEntrega(id);
  if (!entrega) {
    dom.mostrarAlerta('❌ Entrega não encontrada', 'danger');
    return;
  }

  // Preenche formulário com dados da entrega
  dom.preencherFormulario(entrega);

  // Scroll para o formulário
  document.getElementById('form').scrollIntoView({ behavior: 'smooth' });

  dom.mostrarAlerta('Edite os dados e clique em "Registrar Entrega" para atualizar', 'info', 5000);
}

/**
 * Handle de limpeza de todas as entregas
 */
function handleLimparTodos() {
  if (!confirm('⚠️ Tem certeza que deseja excluir TODAS as entregas? Esta ação não pode ser desfeita!')) {
    return;
  }

  if (!confirm('🔴 CONFIRMAÇÃO FINAL: Deseja realmente excluir todos os registros?')) {
    return;
  }

  try {
    storage.limparTodasEntregas();
    dom.renderizarTabela([]);
    dom.mostrarAlerta('✅ Todas as entregas foram removidas!', 'info', 3000);
  } catch (erro) {
    dom.mostrarAlerta('❌ Erro ao limpar entregas', 'danger');
  }
}