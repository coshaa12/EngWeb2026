import json, os, shutil

def open_json(filename):
    with open(filename, encoding="utf-8") as f:
        data = json.load(f)
    return data

def mk_dir(relative_path):
    if not os.path.exists(relative_path):
        os.mkdir(relative_path)
    else:
        shutil.rmtree(relative_path)
        os.mkdir(relative_path)

def new_file(filename, content):
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
        

# ---------- Tratamento dados -------

data = open_json("dataset_reparacoes.json")
list_reparacao = data["reparacoes"]

intervencoes_globais = {}
viaturas_globais = {}

for i, rep in enumerate(list_reparacao):
    rep["id_temp"] = i

    viatura_ident = f"{rep["viatura"]["marca"]} - {rep["viatura"]["modelo"]}"
    if viatura_ident not in viaturas_globais:
        viaturas_globais[viatura_ident] = {
            "marca" : rep["viatura"]["marca"],
            "modelo" : rep["viatura"]["modelo"],
            "lista_reparacoes" : []
        }
    viaturas_globais[viatura_ident]["lista_reparacoes"].append(rep)
    
    for interve in rep["intervencoes"]:
        codigo = interve["codigo"]
        if codigo not in intervencoes_globais:
            intervencoes_globais[codigo] = {
                "codigo" : codigo,
                "nome" : interve["nome"],
                "descricao" : interve["descricao"],
                "lista_reparacoes" : []
            }
        intervencoes_globais[codigo]["lista_reparacoes"].append(rep)

mk_dir("output")
    
# ----------- Pagina Inicial ---- 

index = f'''
<!DOCTYPE html>
<html>
    <head>
        <title>Consulta de Dados da Oficina</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Gestão de Oficina Automóvel</h1>
        <h3>Dados Consultáveis:</h3>
        <ul>
            <li><a href="lista_reparacoes.html">Listagem Global das Reparações</a></li>
            <li><a href="lista_intervencoes.html">Listagem por Tipo de Intervenção</a></li>
            <li><a href="lista_viaturas.html">Listagem das marcas e modelos dos carros intervencionados</a></li>
        </ul>
    </body>
</html>
'''
new_file("./output/index.html", index)


# ------------ Pagina Listagem ----------
list_reparacao.sort(key=lambda x: x["nome"])
tabela_reparacao = ""

for rep in list_reparacao:
    tabela_reparacao += f"""
    <tr>
        <td>{rep['data']}</td>
        <td>{rep['nif']}</td>
        <td>{rep['nome']}</td>
        <td>{rep['viatura']['marca']}</td>
        <td>{rep['viatura']['modelo']}</td>
        <td>{rep['nr_intervencoes']}</td>
        <td><a href="reparacao_{rep["id_temp"]}.html">Ver Detalhes</a></td>
    </tr> 
"""
html_list_rep = f"""
<html>
    <head><title>Listagem Global das Reparações</title><meta charset="utf-8"/></head>
    <body>
        <h2>Listagem das Reparações</h2>
        <table border="1">
            <tr>
                <th>Data</th>
                <th>NIF</th>
                <th>Cliente</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Nr Interv.</th>
                <th>Link</th>
            </tr>
            {tabela_reparacao}
        </table>
        <p><a href="index.html">Voltar ao Início</a></p>
    </body>
</html>
"""
new_file("./output/lista_reparacoes.html", html_list_rep)


# --------- Pagina Tipos Interv -----
keys_interv = list(intervencoes_globais.keys())
keys_interv.sort()

tabela_interv = ""
for cod in keys_interv:
    dados_interv = intervencoes_globais[cod]
    tabela_interv += f"""
    <tr>
        <td>{dados_interv["codigo"]}</td>
        <td><a href="intervencao_{dados_interv["codigo"]}.html">{dados_interv["nome"]}</a></td>
        <td>{dados_interv["descricao"]}</td>
    </tr>
    
"""

html_list_interv = f'''
<html>
    <head><title>Listagem por Tipo de Intervenção</title><meta charset="utf-8"/></head>
    <body>
        <h2>Tipos de Intervenção</h2>
        <table border="1">
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Descrição</th>
            </tr>
            {tabela_interv}
        </table>
        <p><a href="index.html">Voltar ao Início</a></p>
    </body>
</html>
'''
new_file("./output/lista_intervencoes.html", html_list_interv)

# --------- Pagina Marca-Modelo -----
    
keys_viaturas = list(viaturas_globais.keys())
keys_viaturas.sort()

tabela_viat = ""
for chave in keys_viaturas:
    dados_viat = viaturas_globais[chave]
    nome_ficheiro = f"viatura_{dados_viat["marca"]}_{dados_viat["modelo"]}".replace(" ", "_")
    
    tabela_viat += f'''
    <tr>
        <td>{dados_viat["marca"]}</td>
        <td>{dados_viat["modelo"]}</td>
        <td>{len(dados_viat["lista_reparacoes"])}</td>
        <td><a href="{nome_ficheiro}.html">Ver Carros</a></td>
    </tr>
    '''

html_list_viat = f'''
<html>
    <head><title>Listagem das marcas e modelos dos carros intervencionados</title><meta charset="utf-8"/></head>
    <body>
        <h2>Marcas e Modelos Intervencionados</h2>
        <table border="1">
            <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Qtd. Carros</th>
                <th>Link</th>
            </tr>
            {tabela_viat}
        </table>
        <p><a href="index.html">Voltar ao Início</a></p>
    </body>
</html>
'''
new_file("./output/lista_viaturas.html", html_list_viat)

# ---------- pagina reparacao ----- 

for rep in list_reparacao:
    lista_interv_html = ""
    for interv in rep["intervencoes"]:
        lista_interv_html += f"<li>{interv["codigo"]}: {interv["nome"]} - {interv["descricao"]}</li>"

    html_rep = f"""
    <html>
        <head><title>Reparação {rep["nif"]}</title><meta charset="utf-8"/></head>
        <body>
            <h1>Detalhe da Reparação</h1>
            <p>Cliente: {rep["nome"]} (NIF: {rep["nif"]})</p>
            <p>Data: {rep["data"]}</p>
            <p>Viatura:{rep["viatura"]["marca"]} {rep["viatura"]["modelo"]} ({rep["viatura"]["matricula"]})</p>
            <hr/>
            <h3>Intervenções Realizadas ({rep['nr_intervencoes']})</h3>
            <ul>
                {lista_interv_html}
            </ul>
            <address>[ <a href="lista_reparacoes.html">Voltar à lista</a> ]</address>
        </body>
    </html>
    """
    new_file(f"./output/reparacao_{rep['id_temp']}.html", html_rep)

# --- pagina ind interv ---
for codigo in intervencoes_globais:
    dados_interv = intervencoes_globais[codigo]
    
    links_reps = ""
    for rep in dados_interv["lista_reparacoes"]:
        links_reps += f"<li><a href='reparacao_{rep['id_temp']}.html'>{rep['data']} - {rep['nome']} ({rep['viatura']['matricula']})</a></li>"

    html_int_pag = f'''
    <html>
        <head><title>{dados_interv['nome']}</title><meta charset="utf-8"/></head>
        <body>
            <h1>{dados_interv['nome']} ({dados_interv['codigo']})</h1>
            <p><b>Descrição:</b> {dados_interv['descricao']}</p>
            <hr/>
            <h3>Reparações onde foi realizada:</h3>
            <ul>
                {links_reps}
            </ul>
            <address>[ <a href="lista_intervencoes.html">Voltar à lista</a> ]</address>
        </body>
    </html>
    '''
    new_file(f"./output/intervencao_{codigo}.html", html_int_pag)

# --- pagina indiv veiculo ---
for chave in viaturas_globais:
    dados_viat = viaturas_globais[chave]
    nome_ficheiro = f"viatura_{dados_viat['marca']}_{dados_viat['modelo']}".replace(" ", "_")

    links_reps = ""
    for rep in dados_viat["lista_reparacoes"]:
        links_reps += f"<li><a href='reparacao_{rep['id_temp']}.html'>{rep['data']} - {rep['nome']} ({rep['viatura']['matricula']})</a></li>"

    html_viat_pag = f'''
    <html>
        <head><title>{dados_viat['marca']} {dados_viat['modelo']}</title><meta charset="utf-8"/></head>
        <body>
            <h1>{dados_viat['marca']} {dados_viat['modelo']}</h1>
            <h3>Histórico de Reparações para este modelo:</h3>
            <ul>
                {links_reps}
            </ul>
            <address>[ <a href="lista_viaturas.html">Voltar à lista</a> ]</address>
        </body>
    </html>
    '''
    new_file(f"./output/{nome_ficheiro}.html", html_viat_pag)