var express = require('express');
var axios = require('axios');
var app = express();

// Configurar o pug
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// Servir eventuais ficheiros estáticos
app.use(express.static('public'));

var data = new Date().toISOString().substring(0, 16);

// a) GET / ou /filmes
app.get('/', (req, res) => {
    res.redirect('/filmes');
});

app.get('/filmes', (req, res) => {
    axios.get("http://localhost:3000/filmes")
        .then(resp => {
            res.render('filmes', { list: resp.data, d: data });
        })
        .catch(err => res.render('error', { error: err, message: "Erro ao recuperar os filmes" }));
});

// b) GET /filmes/:id (toda a info do filme)
app.get('/filmes/:id', (req, res) => {
    axios.get(`http://localhost:3000/filmes/${req.params.id}`)
        .then(resp => {
            res.render('filme', { filme: resp.data, d: data });
        })
        .catch(err => res.render('error', { error: err, message: "Erro ao recuperar o filme" }));
});

// c) GET /atores (tabela ator | #filmes)
app.get('/atores', (req, res) => {
    axios.get("http://localhost:3000/filmes")
        .then(resp => {
            let filmes = resp.data;
            let atoresDict = {};
            
            filmes.forEach(f => {
                if(f.cast) {
                    f.cast.forEach(a => {
                        if(!atoresDict[a]) atoresDict[a] = 0;
                        atoresDict[a]++;
                    });
                }
            });

            let atoresList = Object.keys(atoresDict).map(k => ({ nome: k, numFilmes: atoresDict[k] }));
            atoresList.sort((a, b) => a.nome.localeCompare(b.nome));

            res.render('atores', { list: atoresList, d: data });
        })
        .catch(err => res.render('error', { error: err, message: "Erro ao recuperar atores" }));
});

// d) GET /atores/:id (Página do ator com lista dos seus filmes)
app.get('/atores/:id', (req, res) => {
    let atorNome = req.params.id;
    axios.get("http://localhost:3000/filmes")
        .then(resp => {
            let filmes = resp.data;
            let filmesDoAtor = filmes.filter(f => f.cast && f.cast.includes(atorNome));
            res.render('ator', { ator: atorNome, list: filmesDoAtor, d: data });
        })
        .catch(err => res.render('error', { error: err, message: "Erro ao recuperar o ator" }));
});

// e) EXTRA: GET /generos
app.get('/generos', (req, res) => {
    axios.get("http://localhost:3000/filmes")
        .then(resp => {
            let filmes = resp.data;
            let generosDict = {};
            
            filmes.forEach(f => {
                if(f.genres) {
                    f.genres.forEach(g => {
                        if(!generosDict[g]) generosDict[g] = 0;
                        generosDict[g]++;
                    });
                }
            });

            let generosList = Object.keys(generosDict).map(k => ({ nome: k, numFilmes: generosDict[k] }));
            generosList.sort((a, b) => a.nome.localeCompare(b.nome));

            res.render('generos', { list: generosList, d: data });
        })
        .catch(err => res.render('error', { error: err, message: "Erro ao recuperar géneros" }));
});

// e) EXTRA: GET /generos/:id
app.get('/generos/:id', (req, res) => {
    let generoNome = req.params.id;
    axios.get("http://localhost:3000/filmes")
        .then(resp => {
            let filmes = resp.data;
            let filmesDoGenero = filmes.filter(f => f.genres && f.genres.includes(generoNome));
            res.render('genero', { genero: generoNome, list: filmesDoGenero, d: data });
        })
        .catch(err => res.render('error', { error: err, message: "Erro ao recuperar o género" }));
});

// Inicia Servidor
app.listen(7777, () => {
    console.log("Servidor Express à escuta na porta 7777...");
});