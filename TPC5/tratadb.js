const fs = require('fs');

// 1. Ler o dataset que enviaste
let rawdata = fs.readFileSync('cinema.json');
let data = JSON.parse(rawdata);

// 2. Como o teu JSON começa com { "filmes": [...] }, acedemos à lista assim:
let filmes = data.filmes;

// 3. Adicionar o ID a cada filme (f1, f2, f3, etc.)
filmes.forEach((f, index) => {
    f.id = "f" + (index + 1);
});

// 4. Criar a estrutura final para o json-server
let db = {
    filmes: filmes
};

// 5. Guardar num novo ficheiro (db.json)
fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log("Ficheiro db.json criado com sucesso com IDs incluídos!");