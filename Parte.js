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

const a = () => {
    lerCSV('atletas.csv', (error, dados) => {
        if (error) {
            console.error('Erro ao ler o arquivo CSV:', error);
        } else {
            const dadosFiltrados = filtrar(dados, 'Gold');
            soma = somatorio(dadosFiltrados);
            document.getElementById("resultado").innerText = "Total de medalhas de ouro: " + soma; // Atualiza o conteúdo do elemento com o resultado
        }
    });
};

a(); // Chama a função a ao carregar a página
document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const csvData = event.target.result;
        processData(csvData);
    };

    reader.readAsText(file);
}

function processData(csvData) {
    const lines = csvData.split('\n');
    const goldMedals = lines.filter(line => line.includes('Gold')).length;
    document.getElementById('resultado').innerText = "Total de medalhas de ouro: " + goldMedals;
}
