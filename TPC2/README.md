# TPC1: Análise de Dataset de Reparações Automóveis

**Data:** 11/02/2026

**UC:** Engenharia Web (2025/26) | 3Ano 2Semestre

## Autor

* **ID:** A107381
* **Nome:** Gonçalo Queirós Costa
* **Foto:**

  ![Fotografia](fotografiaGitHub.jpeg)

## Resumo
Para este trabalho desenvolvi um servidor em Node.js (`tpc2.py`) que consome dados de uma API local e gera páginas web dinâmicas. 

O processo funciona em duas partes: primeiro, utilizamos o (`json-server`) para simular uma API REST a partir do ficheiro (`dataset_reparacoes.json`) 
O script responde a três rotas diferentes, processando os dados e ordenando-os alfabeticamente antes de gerar o HTML:
/reparacoes - Tabela com a lista geral de todas as reparações.
/intervencoes - Tabela com os diferentes tipos de intervenções, sem repetições e com a contagem de vezes que foram realizadas.
/viaturas - Tabela com os modelos de carros reparados, agrupados por marca/modelo e com a respetiva contagem.

## Lista de Resultados
* [tpc2.js](tpc2.js): O servidor aplicacional Node.js.
* [dataset_reparacoes.json](dataset_reparacoes.json): O dataset servido pelo json-server.

