const CHAVE_ENTREGAS = 'entregas_industriais';

/**
 * Recupera todas as entregas armazenadas
 * @returns {Array} Array de entregas
 */
export function obterEntregas() {
  try {
    const dados = localStorage.getItem(CHAVE_ENTREGAS);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.error('Erro ao recuperar entregas:', erro);
    return [];
  }
}

/**
 * Salva uma nova entrega
 * @param {Object} entrega - Objeto da entrega
 * @returns {Object} Entrega com ID gerado
 */
export function salvarEntrega(entrega) {
  try {
    const entregas = obterEntregas();
    
    entrega.id = Date.now() + Math.random().toString(36).substr(2, 9);
    entrega.dataCadastro = new Date().toISOString();

    entregas.push(entrega);
    localStorage.setItem(CHAVE_ENTREGAS, JSON.stringify(entregas));

    return entrega;
  } catch (erro) {
    console.error('Erro ao salvar entrega:', erro);
    throw erro;
  }
}

/**
 * Atualiza uma entrega existente
 * @param {string} id - ID da entrega
 * @param {Object} dadosAtualizados - Dados a atualizar
 * @returns {Object|null} Entrega atualizada ou null
 */
export function atualizarEntrega(id, dadosAtualizados) {
  try {
    let entregas = obterEntregas();
    const indice = entregas.findIndex(e => e.id === id);

    if (indice === -1) {
      console.warn('Entrega não encontrada:', id);
      return null;
    }

    entregas[indice] = { ...entregas[indice], ...dadosAtualizados };
    localStorage.setItem(CHAVE_ENTREGAS, JSON.stringify(entregas));

    return entregas[indice];
  } catch (erro) {
    console.error('Erro ao atualizar entrega:', erro);
    throw erro;
  }
}

/**
 * Remove uma entrega específica
 * @param {string} id - ID da entrega
 * @returns {boolean} True se removido com sucesso
 */
export function removerEntrega(id) {
  try {
    let entregas = obterEntregas();
    entregas = entregas.filter(e => e.id !== id);
    localStorage.setItem(CHAVE_ENTREGAS, JSON.stringify(entregas));
    return true;
  } catch (erro) {
    console.error('Erro ao remover entrega:', erro);
    throw erro;
  }
}

/**
 * Remove todas as entregas
 * @returns {boolean} True se removido com sucesso
 */
export function limparTodasEntregas() {
  try {
    localStorage.removeItem(CHAVE_ENTREGAS);
    return true;
  } catch (erro) {
    console.error('Erro ao limpar entregas:', erro);
    throw erro;
  }
}

/**
 * Obtém uma entrega específica
 * @param {string} id - ID da entrega
 * @returns {Object|null} Entrega encontrada ou null
 */
export function obterEntrega(id) {
  const entregas = obterEntregas();
  return entregas.find(e => e.id === id) || null;
}

/**
 * Conta o total de entregas armazenadas
 * @returns {number} Total de entregas
 */
export function contarEntregas() {
  return obterEntregas().length;
}

/**
 * Exporta todas as entregas como JSON
 * @returns {string} JSON das entregas
 */
export function exportarDados() {
  return JSON.stringify(obterEntregas(), null, 2);
}

/**
 * Importa entregas de um JSON
 * @param {string} json - JSON com entregas
 * @returns {boolean} True se importado com sucesso
 */
export function importarDados(json) {
  try {
    const dados = JSON.parse(json);
    if (!Array.isArray(dados)) {
      throw new Error('Formato inválido');
    }
    localStorage.setItem(CHAVE_ENTREGAS, json);
    return true;
  } catch (erro) {
    console.error('Erro ao importar dados:', erro);
    throw erro;
  }
}
