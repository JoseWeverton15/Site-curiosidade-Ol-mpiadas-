const fs = require('fs').promises; // Utilizando a versão promissificada do módulo fs
const csv = require('fast-csv'); // Importando o pacote fast-csv

const lerArquivoJson = async (caminhoArquivo) => {
  try {
    const data = await fs.readFile(caminhoArquivo, 'utf8');
    
    return new Promise((resolve, reject) => {
      const objetoJson = [];
      csv.parseString(data, { headers: true })
        .on('error', error => reject(error))
        .on('data', row => objetoJson.push(row))
        .on('end', () => resolve(objetoJson));
    });
  } catch (err) {
    throw err; // Pode tratar ou propagar o erro conforme necessário
  }
};

// Exemplo de uso com async/await
const caminhoArquivo = 'continentes.csv';

(async () => {
  try {
    const resultado = await lerArquivoJson(caminhoArquivo);
    console.log('Dados lidos:', resultado);

    // Agora você pode manipular 'resultado' em outras funções ou parte do código
    outraFuncaoQueManipulaJson(resultado);
  } catch (err) {
    console.error('Erro ao ler o arquivo:', err);
  }
})();

// Função que manipula o objeto JSON
const outraFuncaoQueManipulaJson = (jsonObject) => {
  // Faça o que quiser com o objeto JSON aqui
  console.log('Manipulando o objeto JSON:', jsonObject);
};
