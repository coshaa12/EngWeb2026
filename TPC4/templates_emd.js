const pug = require('pug');

// Helper para compilar e renderizar os ficheiros da pasta "views_new"
function renderPug(fileName, data) {
    return pug.renderFile(`./views_new/${fileName}.pug`, data);
}

exports.emdListPage = (elist, d) => renderPug('index', { list: elist, date: d });
exports.emdPage = (e, d) => renderPug('emd', { emd: e, date: d });
exports.errorPage = (msg, d) => renderPug('error', { message: msg, date: d });