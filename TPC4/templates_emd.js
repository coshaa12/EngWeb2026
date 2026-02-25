const pug = require('pug');

function renderPug(fileName, data) {
    return pug.renderFile(`./views_new/${fileName}.pug`, data);
}

exports.emdListPage = (elist, d) => renderPug('index', { list: elist, date: d });
exports.emdPage = (e, d) => renderPug('emd', { emd: e, date: d });
exports.emdFormPage = (d, e = null) => renderPug('form', { emd: e, date: d });
exports.statsPage = (s, d) => renderPug('stats', { stats: s, date: d });
exports.errorPage = (msg, d) => renderPug('error', { message: msg, date: d });