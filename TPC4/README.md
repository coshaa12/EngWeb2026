# TPC4: Gestão de Exames Médicos Desportivos (EMD)

**Data:** 25/02/2026

**UC:** Engenharia Web (2025/26) | 3Ano 2Semestre

## Autor

* **ID:** A107381
* **Nome:** Gonçalo Queirós Costa
* **Foto:**

  ![Fotografia](fotografiaGitHub.jpeg)


## Resumo
Para este trabalho desenvolvi um servidor aplicacional em Node.js (`emd_server.js`) que permite gerir uma base de dados de **(EMD)**. A aplicação consome uma API local RESTful simulada através do `json-server` (a partir do ficheiro `emd.json`) utilizando o módulo `axios`.

A interface gráfica foi construída com páginas web dinâmicas geradas através do motor de templates **Pug**, utilizando a framework de CSS `w3.css` servida como ficheiro estático. 


* `GET /` ou `GET /emd`: Tabela com a lista de todos os exames. Permite ordenar os registos por Data (decrescente) ou por Nome (crescente).
* `GET /emd/:id`: Página com os detalhes completos de um exame específico.
* `GET /emd/registo` e `POST /emd`: Formulário para adicionar um novo registo e o respetivo processamento dos dados.
* `GET /emd/editar/:id` e `POST /emd/:id`: Formulário preenchido com os dados de um exame existente para edição e respetiva atualização.
* `GET /emd/apagar/:id`: Rota para eliminação de um registo da base de dados.
* `GET /emd/stats`: Página de estatísticas com tabelas que mostram a distribuição dos exames por género, modalidade, clube, resultado (Apto/Não Apto) e estatuto de federado, ordenadas por quantidade.



## Lista de Resultados
* [emd_server.js](emd_server.js): O servidor aplicacional Node.js principal.
* [emd.json](emd.json): O dataset dos exames médicos servido pelo json-server.
* [templates_emd.js](templates_emd.js): Módulo auxiliar responsável por renderizar os templates Pug.
* [static_emd.js](static_emd.js): Módulo auxiliar para o encaminhamento e resposta a ficheiros estáticos.
* [views_new/](views_new/): Diretoria que contém todos os templates Pug (`layout.pug`, `index.pug`, `emd.pug`, `form.pug`, `stats.pug`, `error.pug`).
* [public/](public/): Diretoria de ficheiros estáticos onde residem a folha de estilos `w3.css` e os ícones/imagens.