const fs = require('fs');

const nomeArquivo = 'atletas.csv';

function lerArquivoCSV(nomeArquivo) {
    return new Promise((resolve, reject) => {
        fs.readFile(nomeArquivo, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

function filtrarMedalhasOuro(data) {
    const linhas = data.split('\n').slice(1); // Ignorar o cabeçalho
    const totalMedalhasOuro = linhas
        .map(linha => linha.split(',')[linha.split(',').length - 1].replace(/"/g, '').trim())
        .filter(Medal => Medal === 'Silver')
        .length;
    return totalMedalhasOuro;
}

function escreverResultadoCSV(totalMedalhasOuro) {
    const linhaCSV = `Total de Medalhas de Ouro\n${totalMedalhasOuro}`;
    return new Promise((resolve, reject) => {
        fs.writeFile('total_medalhas_ouro.csv', linhaCSV, 'utf8', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

lerArquivoCSV(nomeArquivo)
    .then(filtrarMedalhasOuro)
    .then(escreverResultadoCSV)
    .then(() => {
        console.log('Resultado salvo em total_medalhas_ouro.csv');
    })
    .catch(err => {
        console.error('Erro:', err);
    });
