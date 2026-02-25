var http = require('http')
var axios = require('axios')
var { parse } = require('querystring')
var templates = require('./templates_emd.js')           
var static = require('./static_emd.js')                 

var emdServer = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    var urlParts = req.url.split('?')
    var query = parse(urlParts[1] || '')
    var path = urlParts[0]

    if(static.staticResource(req)) {
        static.serveStaticResource(req, res)
    } else {
        switch(req.method) {
            case "GET":
                // 1. Listagem com Ordenação
                if(path == '/' || path == '/emd') {
                    axios.get("http://localhost:3000/emd")
                        .then(resp => {
                            let dados = resp.data;
                            
                            // Ordenamos os dados aqui no Node
                            if(query.sort == 'dataEMD') {
                                dados.sort((a, b) => (a.dataEMD < b.dataEMD) ? 1 : -1);
                            } else if(query.sort == 'nome') {
                                dados.sort((a, b) => (a.nome.primeiro > b.nome.primeiro) ? 1 : -1);
                            }
                            
                            res.end(templates.emdListPage(dados, d));
                        })
                        .catch(err => res.end(templates.errorPage(err.message, d)));
                }
                // 2. Estatísticas
                else if(path == '/emd/stats') {
                    axios.get("http://localhost:3000/emd")
                        .then(resp => {
                            let counts = { género: {}, modalidade: {}, clube: {}, resultado: {}, federado: {} };
                            
                            resp.data.forEach(e => {
                                counts.género[e.género] = (counts.género[e.género] || 0) + 1;
                                counts.modalidade[e.modalidade] = (counts.modalidade[e.modalidade] || 0) + 1;
                                counts.clube[e.clube] = (counts.clube[e.clube] || 0) + 1;
                                counts.resultado[e.resultado ? 'Apto' : 'Não Apto'] = (counts.resultado[e.resultado ? 'Apto' : 'Não Apto'] || 0) + 1;
                                counts.federado[e.federado ? 'Sim' : 'Não'] = (counts.federado[e.federado ? 'Sim' : 'Não'] || 0) + 1;
                            });

                            let orderedStats = {};
                            for (let category in counts) {
                                orderedStats[category] = Object.entries(counts[category])
                                    .sort((a, b) => b[1] - a[1]); 
                            }

                            res.end(templates.statsPage(orderedStats, d));
                        })
                        .catch(err => res.end(templates.errorPage(err.message, d)));
                }
                // 3. Formulário Novo
                else if(path == '/emd/registo') {
                    res.end(templates.emdFormPage(d));
                }
                // 4. Formulário Edição
                else if(path.startsWith('/emd/editar/')) {
                    let id = path.split('/')[3];
                    axios.get(`http://localhost:3000/emd/${id}`)
                        .then(resp => res.end(templates.emdFormPage(d, resp.data)))
                        .catch(err => res.end(templates.errorPage("Erro ao carregar edição: " + err.message, d)));
                }
                // 5. Apagar
                else if(path.startsWith('/emd/apagar/')) {
                    let id = path.split('/')[3];
                    axios.delete(`http://localhost:3000/emd/${id}`)
                        .then(() => {
                            res.writeHead(302, { 'Location': '/' });
                            res.end();
                        })
                        .catch(err => res.end(templates.errorPage("Erro ao apagar: " + err.message, d)));
                }
                // 6. Ver Detalhes
                else if(/\/emd\/[0-9a-z]+$/i.test(path)) {
                    let id = path.split('/')[2];
                    axios.get(`http://localhost:3000/emd/${id}`)
                        .then(resp => res.end(templates.emdPage(resp.data, d)))
                        .catch(err => res.end(templates.errorPage("Erro ao ver detalhes: " + err.message, d)));
                }
                break;

            case "POST":
                
                if(path == '/emd' || /\/emd\/[0-9a-z]+$/i.test(path)) {
                    let body = '';
                    
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });
                    
                    req.on('end', () => {
                        let dadosFormulario = parse(body);
                        
                        // Organizar o objeto para ficar igual ao JSON
                        let registoPronto = {
                            nome: {
                                primeiro: dadosFormulario['nome.primeiro'],
                                último: dadosFormulario['nome.último']
                            },
                            idade: dadosFormulario.idade,
                            género: dadosFormulario.género,
                            morada: dadosFormulario.morada,
                            modalidade: dadosFormulario.modalidade,
                            clube: dadosFormulario.clube,
                            dataEMD: dadosFormulario.dataEMD,
                            // O checkbox devolve "on" se estiver picado
                            resultado: (dadosFormulario.resultado === 'on')
                        };

                        if (path == '/emd') {
                            // 1. Inserir Novo
                            axios.post("http://localhost:3000/emd", registoPronto)
                                .then(() => {
                                    res.writeHead(302, { 'Location': '/' });
                                    res.end();
                                })
                                .catch(err => res.end(templates.errorPage("Erro ao criar: " + err.message, d)));
                        } else {
                            // 2. Atualizar Existente
                            let id = path.split('/')[2];
                            axios.put(`http://localhost:3000/emd/${id}`, registoPronto)
                                .then(() => {
                                    res.writeHead(302, { 'Location': '/' });
                                    res.end();
                                })
                                .catch(err => res.end(templates.errorPage("Erro ao atualizar: " + err.message, d)));
                        }
                    });
                }
                break;
        }
    }
});

emdServer.listen(7777, () => console.log("Servidor na porta 7777..."));