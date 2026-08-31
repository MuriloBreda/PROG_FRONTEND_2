const API_CEP = 'https://viacep.com.br/ws';
const API_FERIADOS = 'https://brasilapi.com.br/api/feriados/v1';

/**
 * Consulta um CEP na API ViaCEP
 * @param {string} cep - CEP sem formatação
 * @returns {Promise<Object>} Dados do endereço
 */
export async function consultarCEP(cep) {
  try {
    const cepLimpo = cep.replace(/\D/g, '');
    
    // Valida se tem 8 dígitos
    if (cepLimpo.length !== 8) {
      throw new Error('CEP deve conter 8 dígitos');
    }

    const response = await fetch(`${API_CEP}/${cepLimpo}/json`);
    
    if (!response.ok) {
      throw new Error('Erro ao consultar CEP');
    }

    const dados = await response.json();

    if (dados.erro) {
      throw new Error('CEP não encontrado');
    }

    return {
      endereco: dados.logradouro || '',
      bairro: dados.bairro || '',
      cidade: dados.localidade || '',
      estado: dados.uf || '',
      sucesso: true
    };
  } catch (erro) {
    console.error('Erro ao consultar CEP:', erro);
    return {
      sucesso: false,
      erro: erro.message || 'Erro ao consultar CEP'
    };
  }
}

/**
 * Verifica se uma data é feriado nacional
 * @param {string} data - Data no formato YYYY-MM-DD
 * @returns {Promise<Object>} Informações sobre o feriado
 */
export async function verificarFeriado(data) {
  try {
    const ano = data.split('-')[0];

    const response = await fetch(`${API_FERIADOS}/${ano}`);
    
    if (!response.ok) {
      throw new Error('Erro ao consultar feriados');
    }

    const feriados = await response.json();

    const feriado = feriados.find(f => f.date === data);

    if (feriado) {
      return {
        ehFeriado: true,
        nome: feriado.name,
        sucesso: true
      };
    }

    return {
      ehFeriado: false,
      sucesso: true
    };
  } catch (erro) {
    console.error('Erro ao verificar feriado:', erro);
    return {
      ehFeriado: false,
      sucesso: false,
      erro: erro.message || 'Erro ao consultar feriados'
    };
  }
}

/**
 * Formata um CEP para o padrão XXXXX-XXX
 * @param {string} cep - CEP sem formatação
 * @returns {string} CEP formatado
 */

export function formatarCEP(cep) {
  const cepLimpo = cep.replace(/\D/g, '');
  return cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2');
}