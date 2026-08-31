/**
 * Mostra um alerta na tela
 * @param {string} mensagem - Mensagem do alerta
 * @param {string} tipo - Tipo: 'success', 'danger', 'warning', 'info'
 * @param {number} duracao - Duração em ms (0 = não desaparece)
 */
export function mostrarAlerta(mensagem, tipo = 'info', duracao = 5000) {
  const container = document.getElementById('alertContainer');
  const alerta = document.createElement('div');
  
  const tiposBootstrap = {
    'success': 'alert-success',
    'danger': 'alert-danger',
    'warning': 'alert-warning',
    'info': 'alert-info'
  };

  alerta.className = `alert ${tiposBootstrap[tipo] || tiposBootstrap['info']} alert-dismissible fade show`;
  alerta.setAttribute('role', 'alert');
  alerta.innerHTML = `
    ${mensagem}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  container.appendChild(alerta);

  if (duracao > 0) {
    setTimeout(() => {
      alerta.remove();
    }, duracao);
  }
}

export function limparAlertas() {
  const container = document.getElementById('alertContainer');
  container.innerHTML = '';
}

/**
 * Preenche os campos de endereço com dados do CEP
 * @param {Object} endereco - Objeto com dados do endereço
 */
export function preencherEndereco(endereco) {
  document.getElementById('endereco').value = endereco.endereco;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.cidade;
  document.getElementById('estado').value = endereco.estado;
}

export function limparEndereco() {
  document.getElementById('endereco').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
}

export function limparFormulario() {
  document.getElementById('form').reset();
  limparEndereco();
}

export function mostrarCarregamentoCEP() {
  document.getElementById('ceLoading').style.display = 'flex';
}

export function esconderCarregamentoCEP() {
  document.getElementById('ceLoading').style.display = 'none';
}

/**
 * Mostra informações do CEP
 * @param {Object} info - Informações do CEP
 */
export function mostrarInfoCEP(info) {
  const cepInfo = document.getElementById('cepInfo');
  cepInfo.innerHTML = `
    <strong>CEP encontrado com sucesso!</strong><br>
    Endereço: ${info.endereco}<br>
    Bairro: ${info.bairro}<br>
    Cidade: ${info.cidade} - ${info.estado}
  `;
  cepInfo.style.display = 'block';
}

export function esconderInfoCEP() {
  const cepInfo = document.getElementById('cepInfo');
  cepInfo.style.display = 'none';
  cepInfo.innerHTML = '';
}

/**
 * Renderiza a tabela de entregas
 * @param {Array} entregas - Array de entregas
 */
export function renderizarTabela(entregas) {
  const tabelaContainer = document.getElementById('tabelaContainer');
  const tabelaBody = document.getElementById('tabelaBody');
  const mensagemVazia = document.getElementById('mensagemVazia');

  if (entregas.length === 0) {
    tabelaContainer.style.display = 'none';
    mensagemVazia.style.display = 'block';
    return;
  }

  tabelaContainer.style.display = 'block';
  mensagemVazia.style.display = 'none';
  tabelaBody.innerHTML = '';

  entregas.forEach(entrega => {
    const linha = criarLinhaTabela(entrega);
    tabelaBody.appendChild(linha);
  });
}

/**
 * Cria uma linha de tabela para uma entrega
 * @param {Object} entrega - Dados da entrega
 * @returns {HTMLTableRowElement} Linha da tabela
 */
function criarLinhaTabela(entrega) {
  const linha = document.createElement('tr');
  
  const dataFormatada = new Date(entrega.data).toLocaleDateString('pt-BR');
  
  const classBadge = {
    'Alta': 'badge-alta',
    'Média': 'badge-media',
    'Baixa': 'badge-baixa'
  }[entrega.prioridade] || 'badge-info';

  linha.innerHTML = `
    <td><strong>${entrega.nome}</strong></td>
    <td>${entrega.material}</td>
    <td>${entrega.quantidade}</td>
    <td>${entrega.endereco}, ${entrega.bairro}</td>
    <td>${dataFormatada}</td>
    <td><span class="badge ${classBadge}">${entrega.prioridade}</span></td>
    <td>
      <button class="btn btn-sm btn-danger" onclick="window.confirmarExclusao('${entrega.id}')" title="Excluir">
        Excluir
      </button>
    </td>
  `;

  return linha;
}

/**
 * Mostra o modal de confirmação de exclusão
 * @param {string} id - ID da entrega a excluir
 * @param {Function} callback - Função a executar na confirmação
 */
export function mostrarModalConfirmacao(id, callback) {
  const modal = new bootstrap.Modal(document.getElementById('modalConfirmacao'));
  const btnConfirmar = document.getElementById('btnConfirmarExclusao');
  
  // Remove listeners anteriores
  const novoBtn = btnConfirmar.cloneNode(true);
  btnConfirmar.parentNode.replaceChild(novoBtn, btnConfirmar);

  // Adiciona novo listener
  document.getElementById('btnConfirmarExclusao').addEventListener('click', () => {
    callback(id);
    modal.hide();
  });

  modal.show();
}

/**
 * Atualiza a tabela removendo uma linha
 * @param {string} id - ID da entrega removida
 */
export function removerLinhaTabela(id) {
  const linhas = document.querySelectorAll('tbody tr');
  linhas.forEach(linha => {
    if (linha.getAttribute('data-id') === id) {
      linha.remove();
    }
  });
}

/**
 * Mostra os detalhes de uma entrega em um alerta
 * @param {Object} entrega - Dados da entrega
 */
export function mostrarDetalhes(entrega) {
  const dataFormatada = new Date(entrega.data).toLocaleDateString('pt-BR');
  
  const detalhes = `
    <strong>Detalhes da Entrega</strong><br>
    <br>
    <strong>Fornecedor:</strong> ${entrega.nome}<br>
    <strong>Material:</strong> ${entrega.material}<br>
    <strong>Quantidade:</strong> ${entrega.quantidade}<br>
    <strong>Nota Fiscal:</strong> ${entrega.notaFiscal}<br>
    <strong>CEP:</strong> ${entrega.cep}<br>
    <strong>Endereço:</strong> ${entrega.endereco}<br>
    <strong>Bairro:</strong> ${entrega.bairro}<br>
    <strong>Cidade:</strong> ${entrega.cidade} - ${entrega.estado}<br>
    <strong>Data Prevista:</strong> ${dataFormatada}<br>
    <strong>Prioridade:</strong> ${entrega.prioridade}<br>
    <strong>Observações:</strong> ${entrega.obs || 'Nenhuma'}<br>
  `;

  alert(detalhes);
}

/**
 * Habilita um campo do formulário
 * @param {string} id - ID do campo
 */
export function habilitarCampo(id) {
  document.getElementById(id).removeAttribute('readonly');
  document.getElementById(id).removeAttribute('disabled');
}

/**
 * Desabilita um campo do formulário
 * @param {string} id - ID do campo
 */
export function desabilitarCampo(id) {
  document.getElementById(id).setAttribute('readonly', true);
}

/**
 * Obtém os valores do formulário
 * @returns {Object} Objeto com os valores do formulário
 */
export function obterValoresFormulario() {
  return {
    nome: document.getElementById('nome').value,
    material: document.getElementById('material').value,
    quantidade: document.getElementById('quantidade').value,
    notaFiscal: document.getElementById('notaFiscal').value,
    cep: document.getElementById('cep').value,
    endereco: document.getElementById('endereco').value,
    bairro: document.getElementById('bairro').value,
    cidade: document.getElementById('cidade').value,
    estado: document.getElementById('estado').value,
    data: document.getElementById('data').value,
    prioridade: document.getElementById('prioridade').value,
    obs: document.getElementById('obs').value
  };
}

/**
 * Preenchea o formulário com valores
 * @param {Object} valores - Objeto com os valores
 */
export function preencherFormulario(valores) {
  Object.keys(valores).forEach(chave => {
    const elemento = document.getElementById(chave);
    if (elemento) {
      elemento.value = valores[chave];
    }
  });
}

/**
 * Valida se o formulário foi preenchido corretamente
 * @returns {boolean|string} True se válido, string com erro caso contrário
 */
export function validarFormulario() {
  const valores = obterValoresFormulario();

  if (!valores.nome.trim()) return 'Nome do fornecedor é obrigatório';
  if (!valores.material.trim()) return 'Material é obrigatório';
  if (!valores.quantidade || valores.quantidade <= 0) return 'Quantidade deve ser maior que 0';
  if (!valores.notaFiscal.trim()) return 'Nota Fiscal é obrigatória';
  if (!valores.cep.trim()) return 'CEP é obrigatório';
  if (!valores.endereco.trim()) return 'Endereço é obrigatório (consulte o CEP)';
  if (!valores.cidade.trim()) return 'Cidade é obrigatória (consulte o CEP)';
  if (!valores.data) return 'Data prevista é obrigatória';
  if (!valores.prioridade) return 'Prioridade é obrigatória';

  return true;
}
