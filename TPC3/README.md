# TPC3: A Escola de Música

**Data:** 18/02/2026

**UC:** Engenharia Web (2025/26) | 3Ano 2Semestre

## Autor

* **ID:** A107381
* **Nome:** Gonçalo Queirós Costa
* **Foto:**

  ![Fotografia](fotografiaGitHub.jpeg)


## Resumo
Para este trabalho desenvolvi um servidor em Node.js (`tpc3.js`) que consome dados de uma API local e gera páginas web dinâmicas para uma **Escola de Música**.

O processo funciona em duas partes: primeiro, utilizamos o `json-server` para simular uma API REST a partir do ficheiro `db.json`.
O script responde a três rotas principais, processando os dados recebidos e aplicando a ordenação específica antes de gerar o HTML:

* `/alunos`: Tabela com a lista completa de alunos (ID, Nome, Data de Nascimento, Curso, Ano, Instrumento), ordenados alfabeticamente por **Nome**.
* `/cursos`: Tabela com os cursos disponíveis e respetiva duração, ordenados por **ID**.
* `/instrumentos`: Tabela com a lista de instrumentos lecionados, ordenados por **ID**.

## Lista de Resultados
* [tpc3.js](tpc3.js): O servidor aplicacional Node.js.
* [db.json](db.json): O dataset da escola de música servido pelo json-server.