# TPC5: Aplicação Web de Cinema com Express

**Data:** 04/03/2026

**UC:** Engenharia Web (2025/26) | 3Ano 2Semestre

## Autor

* **ID:** A107381
* **Nome:** Gonçalo Queirós Costa
* **Foto:**

  ![Fotografia](fotografiaGitHub.jpeg)



## Objetivo
1. Colocar o `json-server` a servir o dataset `cinema.json` (após tratamento).
2. Criar uma aplicação web em **Node.js** usando a framework **Express** e o motor de templates **Pug**.
3. Implementar as seguintes rotas:
   - `GET /` ou `/filmes`: Lista de filmes com o número de géneros e tamanho do elenco.
   - `GET /filmes/:id`: Página individual com toda a informação do filme.
   - `GET /atores`: Tabela com a lista de atores e o número de filmes em que participaram.
   - `GET /atores/:id`: Página do ator com a lista de filmes em que participou.
   - `GET /generos` (Extra): Tabela de géneros e respetivo número de filmes.
   - `GET /generos/:id` (Extra): Página do género com os filmes associados.

## Resolução
1. Foi criado um script `tratadb.js` que lê o ficheiro original `cinema.json`, extrai a lista de filmes, adiciona um `id` único a cada registo e gera um ficheiro `db.json` compatível com o `json-server`.
2. A aplicação web foi desenvolvida no ficheiro `server.js` utilizando o **Express** para o roteamento, substituindo a necessidade de usar o módulo `http` nativo e processamentos manuais de URL.
3. Para o design e interface, utilizaram-se templates **Pug** integrados com a framework W3.CSS, mantendo uma navegação fluída entre filmes, atores e géneros.

## Como Executar
1. Instalar as dependências: `npm install`
2. Gerar a base de dados tratada: `node tratadb.js`
3. Iniciar o servidor de dados: `npm run json-server` (ou `json-server --watch db.json`)
4. Iniciar a aplicação web: `npm start` (ou `node server.js`)
5. Aceder a `http://localhost:7777`

## Lista de Resultados
* [server.js](server.js): O servidor aplicacional Node.js principal desenvolvido com a framework Express.
* [tratadb.js](tratadb.js): Script auxiliar responsável por ler o dataset original e gerar identificadores (`id`) para cada registo.
* [db.json](db.json): O dataset processado e pronto a ser servido pelo `json-server`.
* [cinema.json](cinema.json): O dataset original fornecido sem tratamento.
* [views/](views/): Diretoria que contém todos os templates Pug (`layout.pug`, `filmes.pug`, `filme.pug`, `atores.pug`, `ator.pug`, `generos.pug`, `genero.pug`, `error.pug`).
* [package.json](package.json): Ficheiro de configuração do projeto Node.js contendo as dependências e os scripts de execução.
* [public/](public/): Diretoria para servir ficheiros estáticos (como folhas de estilo locais ou imagens, se aplicável).