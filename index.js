 /* 
        As const nome = async ()... abaixo têm a mesma estrutura 
            Utilizam o async para realizar operações assíncrona
            try{...} onde será realizada a codificação
            fetch(...) é utilizada para fazer uma requisição HTTP no arquivo atletas.csv
            await esperar pela execução da operação assíncrona
            response. onde ficará a resposta da requisição
            .text obter o conteúdo do arquivo CSV como texto

            Todas as funções async tem uma terceira constante que chama uma função para fazer a filtram e outra que será utilizada para atualizar a interface da página

        */
        
            const buscarTotalMedalhasOuro = async () => {
                try {
                    const response = await fetch('atletas.csv')
                    const data = await response.text()
                    const totalMedalhasOuro = filtrarMedalhasOuro(data)
                    atualizarTotalMedalhasOuro(totalMedalhasOuro)
                } catch (err) {
                    console.error('Erro ao buscar o total de medalhas de ouro:', err)
                }
            }
    
            const buscarTotalMulheres = async () =>{
                try {
                    const response = await fetch('atletas.csv')
                    const data = await response.text()
                    const totalMulheres = filtrarMulheres(data)
                    atualizarTotalMulheres(totalMulheres)
                } catch (err) {
                    console.error('Erro ao buscar o total de mulheres:', err)
                }
            }
    
            const buscaPessoasMaisAlta = async () =>{
                try {
                    const response = await fetch('atletas.csv')
                    const data = await response.text()
                    const MaisAlta = filtrarAltura(data)
                    atualizarAltura(MaisAlta)
                } catch (err){
                    console.error('Erro ao buscar pessoa mais alta:', err)
                }
            }
    
           const buscaMedalhasBrasil = async () =>{
                try {
                    const response = await fetch('atletas.csv');
                    const data = await response.text();
                    const MedalhasBrasil = filtrarMedalhasBrasil(data);
                    atualizarBrasil(MedalhasBrasil);
                } catch (err){
                    console.error('Erro ao buscar medalhas do Brasil:', err)
                }
            }
            const buscaAnoMaisAtletas = async () => {
                try {
                    const response = await fetch('atletas.csv');
                    const data = await response.text();
                    const atletasPorAno = contarAtletasPorAno(data); 
                    const MaisAtletas = filtrarMaisAtletas(atletasPorAno);
                    atualizarMaisAtletas(MaisAtletas)
                } catch (err){
                    console.error('Erro ao buscar ano com mais atletas:', err)
                }
            }
            
    
            /*
            As const atualizar... tem a mesma estrutura
                A função recebe um parâmetro
                document.getElementById(ID') acessar o elemento HTML com a ID especificada
                .textContent é utilizado para exibir uma string na página
                {...} aqui vai o valor resultante da operação
            */
    
            const atualizarTotalMedalhasOuro = (totalMedalhasOuro) => {
                document.getElementById('totalOuro').textContent = `O total de medalhas de ouro que já foram distribuídas ao longo de todas Olímpiadas é: ${totalMedalhasOuro}               `;
            }
            const atualizarTotalMulheres = (totalMulheres) =>{
                document.getElementById('totalMulheres').textContent = `O total de mulheres que ja estiveram nos Jogos Olímpicos é: ${totalMulheres}`;
            }
            const atualizarAltura = (pessoaMaisAlta) =>{
                document.getElementById('MaisAlta').textContent = `A pessoa mais alta da história das Olimpíadas foi o jogador de Basquete Chinês: ${pessoaMaisAlta.nome}, com altura de ${pessoaMaisAlta.altura} cm.`;
            }
            const atualizarBrasil = (totalMedalhasBrasil) => {
                document.getElementById('BrasilMedalhas').textContent = `Os atletas do Brasil já ganharam ao longo de todas Olimpíadas ${totalMedalhasBrasil} medalhas`;
            }
            const atualizarMaisAtletas = (AnoMaisAtletas) => {
                document.getElementById('MaisAtletas').textContent = `O ano de ${AnoMaisAtletas} foi o que teve mais atletas (Olimpíadas de Sydney)`;
            }
            document.getElementById('Usuario').textContent = `Aqui você decide...`
    
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
    
                console.log(totalMulheres)
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

 /*
    A funções aqui atribuídas serão executas quando a página carregar
*/
        window.onload = () => {
            buscarTotalMedalhasOuro()
            buscarTotalMulheres()
            buscaPessoasMaisAlta()
            buscaMedalhasBrasil()
            buscaAnoMaisAtletas()
            
        };