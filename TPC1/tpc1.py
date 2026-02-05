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
    rp["id_temp"] = i

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









# --------- Pagina Inicial -----

