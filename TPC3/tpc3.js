const axios = require('axios')
const http = require('http')

// ---------------- Template HTML (View) ------------

function pagina(titulo, corpo){
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8"/>
        <title>${titulo}</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        <style>
            .w3-bar { overflow: hidden; }
            a { text-decoration: none; }
        </style>
    </head>
    <body class="w3-light-grey">

        <div class="w3-container w3-teal">
            <h1>Escola de Música</h1>
        </div>
        
        <div class="w3-bar w3-white w3-border-bottom">
            <a href="/alunos" class="w3-bar-item w3-button w3-hover-teal">Alunos</a>
            <a href="/cursos" class="w3-bar-item w3-button w3-hover-teal">Cursos</a>
            <a href="/instrumentos" class="w3-bar-item w3-button w3-hover-teal">Instrumentos</a>
        </div>

        <div class="w3-container w3-margin-top">
            ${corpo}
        </div>
        
        <footer class="w3-container w3-teal w3-margin-top w3-padding">
            <p>TPC3 - Eng. Web 2026</p>
        </footer>

    </body>
    </html>
    `
}

// ---------------- Obtenção de Dados (Model) ------------

async function getAlunos(){
    const resp = await axios.get("http://localhost:3000/alunos")
    return resp.data
}

async function getCursos(){
    const resp = await axios.get("http://localhost:3000/cursos")
    return resp.data
}

async function getInstrumentos(){
    const resp = await axios.get("http://localhost:3000/instrumentos")
    return resp.data
}

// ---------------- Servidor (Controller) ------------

var myServer = http.createServer(async function(req, res){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(req.method == "GET"){
        
        // Rota: / (Redireciona para /alunos)
        if(req.url == "/"){
            res.writeHead(301, {'Location': '/alunos'})
            res.end()
        }

        // Rota: /alunos
        else if(req.url == "/alunos"){
            try {
                var alunos = await getAlunos()
                
                // ORDENAR ALUNOS POR NOME (Mantido)
                alunos.sort((a,b) => a.nome.localeCompare(b.nome))

                var linhas = alunos.map(a => 
                    `<tr>
                        <td>${a.id}</td>
                        <td>${a.nome}</td>
                        <td>${a.dataNasc}</td>
                        <td>${a.curso}</td>
                        <td>${a.anoCurso}</td>
                        <td>${a.instrumento}</td>
                    </tr>`
                ).join("")

                var corpo = `
                <div class="w3-card-4 w3-white">
                    <header class="w3-container w3-teal">
                        <h3>Lista de Alunos (${alunos.length})</h3>
                    </header>
                    <div class="w3-container w3-responsive">
                        <table class="w3-table-all w3-hoverable">
                            <thead>
                                <tr class="w3-light-grey">
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Data Nasc.</th>
                                    <th>Curso</th>
                                    <th>Ano</th>
                                    <th>Instrumento</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${linhas}
                            </tbody>
                        </table>
                    </div>
                </div>`

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(pagina("Alunos", corpo))
            } catch(e) {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(pagina("Erro", `<p>Erro ao obter alunos: ${e}</p>`))
            }
        }

        // Rota: /cursos
        else if(req.url == "/cursos"){
            try {
                var cursos = await getCursos()

                // ORDENAR CURSOS POR ID (Usando numeric: true para ordenar CB1, CB2... corretamente)
                cursos.sort((a,b) => a.id.localeCompare(b.id, undefined, {numeric: true}))

                var linhas = cursos.map(c => 
                    `<tr>
                        <td>${c.id}</td>
                        <td>${c.designacao}</td>
                        <td>${c.duracao}</td>
                        <td>${c.instrumento["#text"] || c.instrumento.id }</td> 
                    </tr>`
                ).join("")

                var corpo = `
                <div class="w3-card-4 w3-white">
                    <header class="w3-container w3-teal">
                        <h3>Lista de Cursos (${cursos.length})</h3>
                    </header>
                    <div class="w3-container">
                        <table class="w3-table-all w3-hoverable">
                            <thead>
                                <tr class="w3-light-grey">
                                    <th>ID</th>
                                    <th>Designação</th>
                                    <th>Duração (anos)</th>
                                    <th>Instrumento</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${linhas}
                            </tbody>
                        </table>
                    </div>
                </div>`

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(pagina("Cursos", corpo))
            } catch(e) {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(pagina("Erro", `<p>Erro ao obter cursos: ${e}</p>`))
            }
        }

        // Rota: /instrumentos
        else if(req.url == "/instrumentos"){
            try {
                var inst = await getInstrumentos()

                // ORDENAR INSTRUMENTOS POR ID (I1, I2, I10...)
                inst.sort((a,b) => a.id.localeCompare(b.id, undefined, {numeric: true}))

                var linhas = inst.map(i => 
                    `<tr>
                        <td>${i.id}</td>
                        <td>${i["#text"]}</td>
                    </tr>`
                ).join("")

                var corpo = `
                <div class="w3-card-4 w3-white">
                    <header class="w3-container w3-teal">
                        <h3>Lista de Instrumentos (${inst.length})</h3>
                    </header>
                    <div class="w3-container">
                        <table class="w3-table-all w3-hoverable">
                            <thead>
                                <tr class="w3-light-grey">
                                    <th>ID</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${linhas}
                            </tbody>
                        </table>
                    </div>
                </div>`

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(pagina("Instrumentos", corpo))
            } catch(e) {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(pagina("Erro", `<p>Erro ao obter instrumentos: ${e}</p>`))
            }
        }
        
        else {
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(pagina("404", "<p>Página não encontrada.</p>"))
        }
    } else {
        res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
        res.end(pagina("405", "<p>Método não permitido.</p>"))
    }
})

myServer.listen(4000)
console.log("Servidor à escuta na porta 4000...")