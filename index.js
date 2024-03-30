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
        .filter(medalha => medalha === 'Gold')
        .length;
    return totalMedalhasOuro;
}
function filtrarMulheres(data) {
    const linhas = data.split('\n').slice(1); // Ignorar o cabeçalho

    const mulheresUnicas = new Set(); // Usando um Set para armazenar IDs únicos de mulheres

    linhas.forEach(linha => {
        const [id, , genero] = linha.split(',').map(coluna => coluna.replace(/"/g, '').trim());
        if (genero === 'F') {
            mulheresUnicas.add(id); // Adicionar apenas IDs de mulheres ao conjunto
        }
    });

    const totalMulheres = mulheresUnicas.size; // Tamanho do Set dá o número de IDs únicos

    console.log(totalMulheres);
    return totalMulheres;
}

function escreverResultadoCSV(total, nomeArquivo) {
    return new Promise((resolve, reject) => {
        fs.writeFile(nomeArquivo, total.toString(), 'utf8', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}
function filtrarAltura(data) {
    const linhas = data.split('\n').slice(1); // Ignorar o cabeçalho

    // Mapear as alturas para um array
    const alturas = linhas.map(linha => {
        const [, nome, , , altura] = linha.split(',').map(coluna => coluna.replace(/"/g, '').trim());
        return { nome, altura: parseInt(altura) || 0 }; // Converter altura para número e tratar NaN como 0
    });

    // Encontrar pessoa mais alta
    const pessoaMaisAlta = alturas.reduce((maisAlta, atual) => maisAlta.altura > atual.altura ? maisAlta : atual, { altura: 0 });

    return pessoaMaisAlta;
}
function filtrarMedalhasBrasil(data) {
    const linhas = data.split('\n').slice(1); // Ignorar o cabeçalho
    const totalMedalhasBrasil = linhas
        .map(linha => {
            const colunas = linha.split(',');
            if (colunas.length >= 15) { // Verificar se há colunas suficientes
                const team = colunas[6].replace(/"/g, '').trim(); // Obter o código do país (NOC)
                const medalha = colunas[14].replace(/"/g, '').trim(); // Obter o tipo de medalha
                return { team, medalha };
            }
            return null; // Retornar null para linhas com colunas insuficientes
        })
        .filter(data => data && data.team === 'Brazil' && (data.medalha === 'Gold' || data.medalha === 'Silver' || data.medalha === 'Bronze')) // Filtrar apenas medalhas para o Brasil
        .length;
    
    return totalMedalhasBrasil;
}
const contarAtletasPorAno = (data) => {
    const linhas = data.split('\n').slice(1); // Ignorar o cabeçalho
    return linhas.reduce((acc, linha) => {
        const [, , , , , , , , , , season, , , ,] = linha.split(',').map(coluna => coluna.replace(/"/g, '').trim());
        return season === 'Summer' ? { ...acc, [linha.split(',')[9]]: (acc[linha.split(',')[9]] || 0) + 1 } : acc;
    }, {});
};
const encontrarAnoComMaisAtletas = (atletasPorAno) => {
    const AnoMaisAtletas = Object.keys(atletasPorAno).reduce((maxAno, ano) => atletasPorAno[ano] > atletasPorAno[maxAno] ? ano : maxAno, Object.keys(atletasPorAno)[0]);
    return AnoMaisAtletas
};

lerArquivoCSV(nomeArquivo)
    .then(contarAtletasPorAno)
    .then(encontrarAnoComMaisAtletas)
    .then(resultado => escreverResultadoCSV(resultado, 'ano_mais_atletas_verao.csv'))
    .catch(err => {
        console.error('Erro ao processar atletas por ano:', err);
    });


lerArquivoCSV(nomeArquivo)
    .then(filtrarMedalhasBrasil)
    .then(totalMedalhasBrasil => {
        console.log('Total de medalhas do Brasil (ouro, prata e bronze):', totalMedalhasBrasil);
        return escreverResultadoCSV(totalMedalhasBrasil, 'total_medalhas_brasil.csv');
    })
    .then(() => {
        console.log('Resultado das medalhas do Brasil salvo em total_medalhas_brasil.csv');
    })
    .catch(err => {
        console.error('Erro ao processar medalhas do Brasil:', err);
    });

lerArquivoCSV(nomeArquivo)
    .then(filtrarAltura)
    .then(pessoaMaisAlta => {
        console.log('Pessoa mais alta:', pessoaMaisAlta.nome, '- Altura:', pessoaMaisAlta.altura);
        return escreverResultadoCSV(pessoaMaisAlta, 'pessoa_Alta.csv');
    })
    .then(() => {
        console.log('Resultado da pessoa mais alta salvo em pessoa_Alta.csv');
    })
    .catch(err => {
        console.error('Erro ao encontrar pessoa mais alta:', err);
    });

lerArquivoCSV(nomeArquivo)
    .then(filtrarMedalhasOuro)
    .then(totalMedalhasOuro => escreverResultadoCSV(totalMedalhasOuro, 'total_medalhas_ouro.csv'))
    .then(() => {
        console.log('Resultado de medalhas de ouro salvo em total_medalhas_ouro.csv');
    })
    .catch(err => {
        console.error('Erro ao processar medalhas de ouro:', err);
    });

lerArquivoCSV(nomeArquivo)
    .then(filtrarMulheres)
    .then(totalMulheres => escreverResultadoCSV(totalMulheres, 'total_mulheres.csv'))
    .then(() => {
        console.log('Resultado de mulheres salvo em total_mulheres.csv');
    })
    .catch(err => {
        console.error('Erro ao processar mulheres:', err);
    });
