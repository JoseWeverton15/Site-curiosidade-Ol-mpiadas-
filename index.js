const fs = require('fs');

const nomeArquivo = 'atletas.csv';

/*Aqui eu leio o arquivo com o uso do new Promise((resolve, reject)) com o objetivo de que seja retornado um objeto resolvido ou rejeitado:

fs.readFile(nomeArquivo, 'utf8', (err, data)
    fs. para ler o arquivo (nomeArquivo = 'atletas.csv')
    readFile é uma função assíncrona, recebe três valores
        o nome do arquivo
        'utf8' codificação em texto
        (err, data) retorno da função, err se der erro e data que é o conteudo lido do arquivo
    if (err) {reject(err)return;}
        se der erro é chamado a função reject para que o código não seja executado
    resolve(data)
    se não tiver erro, o dados do arquivo são passados como argumento
Para que eu possa utilizar .then e .catch

*/ 
const lerArquivoCSV = (nomeArquivo) => {
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

/*
função filtrarMedalhasOuro
    data.split é utilizado para transformar os dados em um array de linhas. slice(1) remove a primeira linha, pois somente é o nome dado a cada coluna do arquivo
    totalMedalhasOuro utilizado para armazenar o total de medlahas de ouro
        .map cria um nova lista só que cada linha acaba sendo separada por vírgula .split(',')
        [linha.split(',').length - 1] obter a couna das medalhas
        replace(/"/g, '') remover " do dados .trim() remover espaços ao redos das palavras
        .filter filtra só para ter os elemntos contendo Gold
        .length para calcular o tamanho do array
*/ 

const filtrarMedalhasOuro = (data) => {
    const linhas = data.split('\n').slice(1);
    const totalMedalhasOuro = linhas
        .map(linha => linha.split(',')[linha.split(',').length - 1].replace(/"/g, '').trim())
        .filter(medalha => medalha === 'Gold')
        .length;
    return totalMedalhasOuro;
}
/*
função filtrarMulheres
    data.split é utilizado para transformar os dados em um array de linhas. slice(1) remove a primeira linha, pois somente é o nome dado a cada coluna do arquivo
    new Set() para armazenar uma unica mulheres, evitar repetições
    linhas.forEach para iterar todas as linhas do dado

    .map cria um nova lista só que cada linha acaba sendo separada por vírgula .split(',')
        [id, ,genero] para ser exibida o primeiro elemento e o genero do arquivo atletas.csv
        [linha.split(',').length - 1] obter a couna das medalhas
        replace(/"/g, '') remover " do dados .trim() remover espaços ao redos das palavras
        if (genero=='F') se o genero for F é adicioanr o id ao conjunto mulheres únicas por meio de .add(id)

    .size pra saber o tamanho de ids únicos
*/

const filtrarMulheres = (data) => {
    const linhas = data.split('\n').slice(1); 

    const mulheresUnicas = new Set(); 
    linhas.forEach(linha => {
        const [id, , genero] = linha.split(',').map(coluna => coluna.replace(/"/g, '').trim());
        if (genero === 'F') {
            mulheresUnicas.add(id); 
        }
    });

    const totalMulheres = mulheresUnicas.size;

    console.log(totalMulheres);
    return totalMulheres;
}

/* 
função filtarAltura
    data.split é utilizado para transformar os dados em um array de linhas. slice(1) remove a primeira linha, pois somente é o nome dado a cada coluna do arquivo
 
    .map cria um nova lista só que cada linha acaba sendo separada por vírgula .split(',')
        [,nome, , ,altura] para ser exibida o segundo elemento(nome) e a altura do arquivo atletas.csv
        replace(/"/g, '') remover " do dados .trim() remover espaços ao redos das palavras
        o parseInt utilizei para transformar a altura em número, para caso tivesse algo que não fosse número na coluna colocar 0
    
    com o uso do reduce descubro a pessoa mais alta, comparando a altura da pessoa mais alta atual(maisAlta.altura) com a altura da pessoa seguinte
    se a altura da pessoa seguinte for maior que a altura da pessoa mais alta, atualiza maisAlta para ser a pessoa atual. No final, pessoaMaisAlta conterá o objeto representando a pessoa mais alta
*/
const filtrarAltura = (data) =>{
    const linhas = data.split('\n').slice(1); 

    const alturas = linhas.map(linha => {
        const [, nome, , , altura] = linha.split(',').map(coluna => coluna.replace(/"/g, '').trim());
        return { nome, altura: parseInt(altura) || 0 }; 
    });

    const pessoaMaisAlta = alturas.reduce((maisAlta, atual) => maisAlta.altura > atual.altura ? maisAlta : atual, { altura: 0 });

    return pessoaMaisAlta;
}
/* 
função filtrarMedalhasBrasil - todos os atletas que já ganharam medalhas
    data.split é utilizado para transformar os dados em um array de linhas. slice(1) remove a primeira linha, pois somente é o nome dado a cada coluna do arquivo
    .map cria um nova lista só que cada linha acaba sendo separada por vírgula .split(',')
        colunas.length >= 15 verifica se possu 15 colunas, evitando assim erros de indexação
        colunas[6] - acessar o nome do país e substituir " por '' e o uso do .trim
        e com isso retorna o pais e a medalha
        caso não tiver coluna suficiente retorn null
        .filter
            filtra para retornar somente os atletas do Brasil com qualquer tipo de medalha ganha
        
    .length tamanho desse array
    retornando o total de medalahs ganhas pelos atletas do Brasil
*/

const filtrarMedalhasBrasil = (data) => {
    const linhas = data.split('\n').slice(1);
    const totalMedalhasBrasil = linhas
        .map(linha => {
            const colunas = linha.split(',');
            if (colunas.length >= 15) { 
                const team = colunas[6].replace(/"/g, '').trim();  
                const medalha = colunas[14].replace(/"/g, '').trim(); 
                return { team, medalha };
            }
            return null; 
        })
        .filter(data => data && data.team === 'Brazil' && (data.medalha === 'Gold' || data.medalha === 'Silver' || data.medalha === 'Bronze')) 
        .length;
    
    return totalMedalhasBrasil;
}
/*
const contarAtletarPorAno - conta quanto atletas por cada ano de olimpiada
    data.split é utilizado para transformar os dados em um array de linhas. slice(1) remove a primeira linha, pois somente é o nome dado a cada coluna do arquivo
    .map cria um nova lista só que cada linha acaba sendo separada por vírgula .split(',')
    .reduce filtar para um único valor
        o acc serve comp um acumado para cada ano
        [...,season] acessar a coluna de ou Summer ou Winter, cada tipo de Olimpíadas
        .replace substituir " por ' e usar .trim
        return season = 'Summer' verificar se a temporada é Summer, jogos de Verão que é a que eu quero utilizar
        
*/

const contarAtletasPorAno = (data) => {
    const linhas = data.split('\n').slice(1); // Ignorar o cabeçalho
    return linhas.reduce((acc, linha) => {
        const [, , , , , , , , , , season, , , ,] = linha.split(',').map(coluna => coluna.replace(/"/g, '').trim());
        return season === 'Summer' ? { ...acc, [linha.split(',')[9]]: (acc[linha.split(',')[9]] || 0) + 1 } : acc;
    }, {});
}

/*
função encontrarAnoComMaisAtletar para encontrar o maior número de atletas
    Object.keys(atletasPorAno) retorna os anos com contagem de atletas
    maxAno acumula o ano com maior numero de atletas
    ano valor sendo analisado do ano
    atletasPorAno[ano] > atletasPorAno[maxAno] ? ano : maxAno funçãos emelhante a filtragem da altura
*/
const encontrarAnoComMaisAtletas = (atletasPorAno) => {
    const AnoMaisAtletas = Object.keys(atletasPorAno).reduce((maxAno, ano) => atletasPorAno[ano] > atletasPorAno[maxAno] ? ano : maxAno, Object.keys(atletasPorAno)[0]);
    return AnoMaisAtletas
}

/*
após a leitura do arquivo
    .then utilizado apra chamar contarAtletasporano retonrnado um objeto, depois esse objeto é passado para encontrarAnoComMaisAtletas, depois esse objeto é mandado para a função escreverResultadoCSV para escrever em um arquivo CSV

    .catch caso algo algum erro
*/
lerArquivoCSV(nomeArquivo)
    .then(contarAtletasPorAno)
    .then(encontrarAnoComMaisAtletas)
    .catch(err => {
        console.error('Erro ao processar atletas por ano:', err);
    })

/*
após a leitura do arquivo
    .then utilizado apra chamar filtrarMedalhasBrasil retonrnado um objeto, depois esse objeto é passado para totalMedalhasBrasil com o total de medalhas ganhas, depois esse objeto é mandado para a função escreverResultadoCSV para escreve em um arquivo CSV

    .catch caso algo algum erro
*/
lerArquivoCSV(nomeArquivo)
    .then(filtrarMedalhasBrasil)
    .catch(err => {
        console.error('Erro ao processar medalhas do Brasil:', err);
    })

/*
após a leitura do arquivo
    .then utilizado apra chamar filtrarAltura retonrnado um objeto, depois esse objeto é passado para pessoaMaisAlta no qual é exibido a pessoa mais alta e sua altura, depois esse objeto é mandado para a função escreverResultadoCSV para escreve em um arquivo CSV

    .catch caso algo algum erro
*/
lerArquivoCSV(nomeArquivo)
    .then(filtrarAltura)
    .catch(err => {
        console.error('Erro ao encontrar pessoa mais alta:', err);
    });

/*
após a leitura do arquivo
    .then utilizado apra chamar filtrarMedalhasOuro retonrnado um objeto, depois esse objeto é passado para totalMedalhasOuro com o total de medalhas ganhas, depois esse objeto é mandado para a função escreverResultadoCSV para escreve em um arquivo CSV

    .catch caso algo algum erro
*/

lerArquivoCSV(nomeArquivo)
    .then(filtrarMedalhasOuro)
    .catch(err => {
        console.error('Erro ao processar medalhas de ouro:', err);
    });

    /*
após a leitura do arquivo
    .then utilizado apra chamar filtrarMulheres retonrnado um objeto, depois esse objeto é passado para totalMulheres com o total de medalhas ganhas, depois esse objeto é mandado para a função escreverResultadoCSV para escreve em um arquivo CSV

    .catch caso algo algum erro
*/
lerArquivoCSV(nomeArquivo)
    .then(filtrarMulheres)
    .catch(err => {
        console.error('Erro ao processar mulheres:', err);
    });
