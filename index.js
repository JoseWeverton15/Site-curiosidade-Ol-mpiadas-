const fs = require('fs');

// Lendo o conteúdo do arquivo CSV
const data = fs.readFileSync('atletas.csv', 'utf8');

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

const lerArquivoCSV = (caminho) => {
    return new Promise((resolve, reject) => {
        fs.readFile(caminho, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

/* 
        As const nome = async ()... abaixo têm a mesma estrutura 
            Utilizam o async para realizar operações assíncrona
            try{...} onde será realizada a codificação
            await esperar pela execução da operação assíncrona(leitura do arquivo)
            depois é definida uma função que irá realizar a filtragem
            (data) receberá os arquivos lidos para filtragem
            catch (err) para caso aconteça um erro a operação é impedida de ser realizada


        */
        
            const buscarTotalMedalhasOuro = async () => {
                try {
                    const data = await lerArquivoCSV('./atletas.csv')
                    const totalMedalhasOuro = filtrarMedalhasOuro(data)
                    console.log('Total de medalhas de ouro:', totalMedalhasOuro);
                } catch (err) {
                    console.error('Erro ao buscar o total de medalhas de ouro:', err)
                }
            }
    
            const buscarTotalMulheres = async () =>{
                try {
                    const data = await lerArquivoCSV('./atletas.csv')
                    const totalMulheres = filtrarMulheres(data)
                    console.log('Total de mulheres:', totalMulheres);
                } catch (err) {
                    console.error('Erro ao buscar o total de mulheres:', err)
                }
            }
    
            const buscaPessoasMaisAlta = async () =>{
                try {
                    const data = await lerArquivoCSV('./atletas.csv')
                    const MaisAlta = filtrarAltura(data)
                    console.log('Pessoa mais alta:', MaisAlta);
                } catch (err){
                    console.error('Erro ao buscar pessoa mais alta:', err)
                }
            }
    
           const buscaMedalhasBrasil = async () =>{
                try {
                    const data = await lerArquivoCSV('./atletas.csv');
                    const MedalhasBrasil = filtrarMedalhasBrasil(data);
                    console.log('Total de medalhas dos atletas brasileiros:', MedalhasBrasil);
                } catch (err){
                    console.error('Erro ao buscar medalhas do Brasil:', err)
                }
            }
            const buscaAnoMaisAtletas = async () => {
                try {
                    const data = await lerArquivoCSV('./atletas.csv')
                    const atletasPorAno = contarAtletasPorAno(data); 
                    const MaisAtletas = filtrarMaisAtletas(atletasPorAno);
                    console.log('Ano com mais atletas', MaisAtletas);
                } catch (err){
                    console.error('Erro ao buscar ano com mais atletas:', err)
                }
            }
    
    /*
    const filtrarMedalhasOuro
        data.split é utilizado para transformar os dados em um array de linhas. slice(1) remove a primeira linha, pois somente é o nome dado a cada coluna do arquivo
        totalMedalhasOuro utilizado para armazenar o total de medlahas de ouro
            .map cria um nova lista só que cada linha acaba sendo separada por vírgula .split(',')
            [linha.split(',').length - 1] obter a couna das medalhas
            replace(/"/g, '') remover " do dados .trim() remover espaços ao redos das palavras
            .filter filtra só para ter os elemntos contendo Gold
            .length para calcular o tamanho do array
    */
            const filtrarMedalhasOuro = (data) => {
                const linhas = data.split('\n').slice(1)
                const totalMedalhasOuro = linhas
                    .map(linha => linha.split(',')[linha.split(',').length - 1].replace(/"/g, '').trim())
                    .filter(medalha => medalha === 'Gold')
                    .length;
                return totalMedalhasOuro
            }
    /*
    const filtrarMulheres
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
                const linhas = data.split('\n').slice(1)
                const mulheresUnicas = linhas
                    .map(linha => linha.split(',').map(coluna => coluna.replace(/"/g, '').trim()))
                    .filter(([, , genero]) => genero === 'F')
                    .reduce((mulheres, [id]) => {
                        mulheres.add(id);
                        return mulheres;
                    }, new Set());
    
                const totalMulheres = mulheresUnicas.size 

                return totalMulheres
            }
    
    /* 
    const filtarAltura
        data.split é utilizado para transformar os dados em um array de linhas. slice(1) remove a primeira linha, pois somente é o nome dado a cada coluna do arquivo
     
        .map cria um nova lista só que cada linha acaba sendo separada por vírgula .split(',')
            [,nome, , ,altura] para ser exibida o segundo elemento(nome) e a altura do arquivo atletas.csv
            replace(/"/g, '') remover " do dados .trim() remover espaços ao redos das palavras
            o parseInt utilizei para transformar a altura em número, para caso tivesse algo que não fosse número na coluna colocar 0
        
        com o uso do reduce descubro a pessoa mais alta, comparando a altura da pessoa mais alta atual(maisAlta.altura) com a altura da pessoa seguinte
        se a altura da pessoa seguinte for maior que a altura da pessoa mais alta, atualiza maisAlta para ser a pessoa atual. No final, pessoaMaisAlta conterá o objeto representando a pessoa mais alta
    */
            const filtrarAltura = (data) =>{
                // Split data into lines
                const linhas = data.split('\n').slice(1); 
                const alturas = linhas.map(linha => {
                    const [, nome, , , altura] = linha.split(',').map(coluna => coluna.replace(/"/g, '').trim());
                    return { nome, altura: parseInt(altura) || 0 };
                })
    
                
                const pessoaMaisAlta = alturas.reduce((maisAlta, atual) => maisAlta.altura > atual.altura ? maisAlta : atual, { altura: 0 })
                return pessoaMaisAlta
            }
    /* 
    const filtrarMedalhasBrasil - todos os atletas que já ganharam medalhas
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
                const linhas = data.split('\n').slice(1) 
                const totalMedalhasBrasil = linhas
                    .map(linha => {
                        const colunas = linha.split(',')
                        if (colunas.length >= 15) { 
                            const team = colunas[6].replace(/"/g, '').trim(); 
                            const medalha = colunas[14].replace(/"/g, '').trim(); 
                            return { team, medalha }
                        }
                        return null; 
                    })
                    .filter(data => data && data.team === 'Brazil' && (data.medalha === 'Gold' || data.medalha === 'Silver' || data.medalha === 'Bronze')) 
                    .length
                
                return totalMedalhasBrasil
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
                const linhas = data.split('\n').slice(1); 
                return linhas.reduce((acc, linha) => {
                    const [, , , , , , , , , , season, , , ,] = linha.split(',').map(coluna => coluna.replace(/"/g, '').trim());
                    return season === 'Summer' ? { ...acc, [linha.split(',')[9]]: (acc[linha.split(',')[9]] || 0) + 1 } : acc
                }, {})
            }
    /*
    const filtrarMaisAtletas para encontrar o maior número de atletas
        Object.keys(atletasPorAno) retorna os anos com contagem de atletas
        maxAno acumula o ano com maior numero de atletas
        ano valor sendo analisado do ano
        atletasPorAno[ano] > atletasPorAno[maxAno] ? ano : maxAno funçãos emelhante a filtragem da altura
    */
            const filtrarMaisAtletas = (atletasPorAno) => {
                const AnoMaisAtletas = Object.keys(atletasPorAno).reduce((maxAno, ano) => atletasPorAno[ano] > atletasPorAno[maxAno] ? ano : maxAno, Object.keys(atletasPorAno)[0])
                return AnoMaisAtletas
                    }


// Chamar as funções para exibir os resultados
buscarTotalMedalhasOuro();
buscarTotalMulheres();
buscaPessoasMaisAlta();
buscaMedalhasBrasil();
buscaAnoMaisAtletas();

