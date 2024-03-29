const fs = require('fs');
const csv = require('csv-parser');

const filtrar = (dados, filtro) => {
    return dados.filter((x) => x.Medal === filtro);
};

const somatorio = (lista) => lista.length;

const lerCSV = (caminhoArquivo, callback) => {
    const dados = [];
    fs.createReadStream(caminhoArquivo)
        .pipe(csv())
        .on('data', (linha) => {
            dados.push(linha);
        })
        .on('end', () => {
            callback(null, dados);
        })
        .on('error', (error) => {
            callback(error, null);
        });
};

// Função principal para processar o CSV e exibir o resultado na página HTML
const exibirTotalMedalhasOuro = () => {
    lerCSV('atletas.csv', (error, dados) => {
        if (error) {
            console.error('Erro ao ler o arquivo CSV:', error);
        } else {
            const dadosFiltrados = filtrar(dados, 'Gold');
            const totalMedalhasOuro = somatorio(dadosFiltrados);
            console.log("Total de medalhas de ouro:", totalMedalhasOuro); // Verifica se o total de medalhas está correto
            document.getElementById('resultado').textContent = "Total de medalhas de ouro: " + totalMedalhasOuro;
        }
    });
};

// Chamando a função principal para iniciar o processo
exibirTotalMedalhasOuro();
