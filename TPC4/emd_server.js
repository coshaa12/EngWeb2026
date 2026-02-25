var http = require('http')
var axios = require('axios')

var templates = require('./templates_emd.js')           
var static = require('./static_emd.js')                 

var emdServer = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else {
        switch(req.method){
            case "GET": 
                // a) Rota '/' ou '/emd'
                if((req.url == '/') || req.url == '/emd'){
                    axios.get("http://localhost:3000/emd?_sort=dataEMD")
                    .then(resp => {
                        var emds = resp.data
                        

                        var htmlGerado = templates.emdListPage(emds, d)
                        
                        
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.write(htmlGerado)
                        res.end()
                    })
                    .catch(erro => {
                        if (!res.headersSent) {
                            res.writeHead(501, {'Content-Type' : 'text/html;charset=utf-8'})
                        }
                        res.write('<p>Não foi possível obter a lista de EMDs</p>')
                        res.write('<p><b>O VERDADEIRO ERRO É:</b> ' + erro + '</p>')
                        res.end()
                    })
                }
                // b) Rota '/emd/:id'
                else if(/\/emd\/[0-9a-z]+$/i.test(req.url)){
                    var idEMD = req.url.split("/")[2]
                                    
                    axios.get("http://localhost:3000/emd?_id=" + idEMD)
                    .then(resp => {
                        var emd = resp.data[0] 
                        
                        
                        var htmlGerado = templates.emdPage(emd, d)
                        
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.write(htmlGerado)
                        res.end()
                    })
                    .catch(erro => {
                        if (!res.headersSent) { 
                            res.writeHead(505, {'Content-Type' : 'text/html;charset=utf-8'})
                        }
                        res.write('<p>Não foi possível obter o registo do EMD</p>')
                        res.write('<p><b>O VERDADEIRO ERRO É:</b> ' + erro + '</p>')
                        res.end()
                    })
                }
                else {
                    res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write('<p>Página não encontrada: ' + req.url + '</p>')
                    res.end()
                }
                break;
                
            default: 
                res.writeHead(501, {'Content-Type' : 'text/html;charset=utf-8'})
                res.write('<p>Método não suportado: ' + req.method + '</p>')
                res.end()
                break;
        }
    }
})

emdServer.listen(7777, ()=>{
    console.log("Servidor de EMD à escuta na porta 7777...")
})