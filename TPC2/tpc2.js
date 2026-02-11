const axios = require('axios');
const http = require('http');

http.createServer(function(req,res){
    
    if(req.url == "/intervencoes") {
        axios.get('http://localhost:3000/reparacoes')
        .then(resp => {
            html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Intervenções</title>
                </head>
                <body>
                    <h1>Tipos de Intervenção</h1>
                    <table border="1"> 
                        <tr> 
                            <th> Código </th>
                            <th> Nome </th>
                            <th> Descrição </th>
                            <th> Vezes </th>
                        </tr>
            `
            dados = resp.data;
            contagemIntervencoes = {};
            
            dados.forEach(r => {
                r.intervencoes.forEach(i => {
                    if(contagemIntervencoes[i.codigo]) {
                        contagemIntervencoes[i.codigo].vezes += 1;
                    } else {
                        contagemIntervencoes[i.codigo] = {
                            nome: i.nome,
                            descricao: i.descricao,
                            vezes: 1
                        };
                    }
                });
            });

            chaves = Object.keys(contagemIntervencoes).sort();
            chaves.forEach(codigo => {
                inter = contagemIntervencoes[codigo];
                html += `<tr>
                            <td>${codigo}</td>
                            <td>${inter.nome}</td>
                            <td>${inter.descricao}</td>
                            <td>${inter.vezes}</td>
                        </tr>
                `
            });
            html += `</table>
                </body>
            </html>`
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(html)
        })
        .catch(error => {
            res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
            res.end("<pre>" + JSON.stringify(error) + "</pre>")
        });   
    }
    
    else if(req.url == "/reparacoes") {
        axios.get('http://localhost:3000/reparacoes')
        .then(resp => {
            html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Reparações</title>
                </head>
                <body>
                    <h1>Lista de Reparações</h1>
                    <table border="1"> 
                        <tr> 
                            <th> Nome </th>
                            <th> NIF </th>
                            <th> Data </th>
                            <th> Viatura </th>
                            <th> Nr Intervenções </th>
                        </tr>
            `
            dados = resp.data;
            
            dados.sort((a,b) => (a.nome > b.nome) ? 1 : -1);

            dados.forEach(r => {
                html += `<tr>
                            <td>${r.nome}</td>
                            <td>${r.nif}</td>
                            <td>${r.data}</td>
                            <td>${r.viatura.marca} ${r.viatura.modelo}</td>
                            <td>${r.nr_intervencoes}</td>
                        </tr>
                `
            });
            html += `</table>
                </body>
            </html>`
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(html)
        })
        .catch(error => {
            res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
            res.end("<pre>" + JSON.stringify(error) + "</pre>")
        });   
    }
    
    else if(req.url == "/viaturas") {
        axios.get('http://localhost:3000/reparacoes')
        .then(resp => {
            html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Viaturas</title>
                </head>
                <body>
                    <h1>Modelos de Viaturas</h1>
                    <table border="1"> 
                        <tr> 
                            <th> Marca </th>
                            <th> Modelo </th>
                            <th> Vezes </th>
                        </tr>
            `
            dados = resp.data;
            contagemViaturas = {};
            
            dados.forEach(r => {
                id = r.viatura.marca + " " + r.viatura.modelo;
                if(contagemViaturas[id]) {
                    contagemViaturas[id].vezes += 1;
                } else {
                    contagemViaturas[id] = {
                        marca: r.viatura.marca,
                        modelo: r.viatura.modelo,
                        vezes: 1
                    };
                }
            });

            chaves = Object.keys(contagemViaturas).sort();
            chaves.forEach(id => {
                v = contagemViaturas[id];
                html += `<tr>
                            <td>${v.marca}</td>
                            <td>${v.modelo}</td>
                            <td>${v.vezes}</td>
                        </tr>
                `
            });
            html += `</table>
                </body>
            </html>`
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(html)
        })
        .catch(error => {
            res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
            res.end("<pre>" + JSON.stringify(error) + "</pre>")
        });   
    }
    else {
        res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
        res.end("<p>Pedido não suportado! Tente Novamente....</p>")
    }
}).listen(7777)