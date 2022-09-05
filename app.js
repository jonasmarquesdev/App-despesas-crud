class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }

  // valida cada atributo do objeto despesa se algum for undefined irá retornar false
  validarDados() {
    for (let i in this) {
      if (this[i] == undefined || this[i] == "" || this[i] == null) {
        return false;
      }
    }
    return true;
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem("id");

    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem("id"); //recuperando um dado dentro de localStorage
    return parseInt(proximoId) + 1;
  }

  gravar(d) {
    let id = this.getProximoId();

    localStorage.setItem(id, JSON.stringify(d)); //inserindo um dano dentro de localStorage

    localStorage.setItem("id", id);
  }

  recuperarTodosRegistros() {
    //array de despesas
    let despesas = Array();

    let id = localStorage.getItem("id");

    // recuperar todas as despesas cadastradas em localStorage
    for (let i = 1; i <= id; i++) {
      // recuperar a despesa
      let despesa = JSON.parse(localStorage.getItem(id));

      // Verifica existe a possibilidade de haver índices que foram pulados/removidos
      // se true pular os índices null
      if (despesa === null) {
        continue;
      }

      despesas.push(despesa);
    }

    return despesas;
  }
}

let bd = new Bd();

function cadastrarDespesa() {
  let ano = document.getElementById("ano");
  let mes = document.getElementById("mes");
  let dia = document.getElementById("dia");
  let tipo = document.getElementById("tipo");
  let descricao = document.getElementById("descricao");
  let valor = document.getElementById("valor");

  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  );

  if (despesa.validarDados()) {
    bd.gravar(despesa);
    document.getElementById("modal_titulo").innerHTML =
      "Registro inserido com sucesso";
    document.getElementById("modal_titulo_div").className =
      "modal-header text-success";
    document.getElementById("modal_conteudo").innerHTML =
      "Despesa foi cadastrada com sucesso!";
    document.getElementById("modal_btn").innerHTML = "Voltar";
    document.getElementById("modal_btn").className = "btn btn-success";

    //dialog de sucesso
    console.log("Dados válidos");
    $("#modalRegistraDespesa").modal("show");
  } else {
    document.getElementById("modal_titulo").innerHTML =
      "Erro na inclusão do registro";
    document.getElementById("modal_titulo_div").className =
      "modal-header text-danger";
    document.getElementById("modal_conteudo").innerHTML =
      "Erro na gravação, verifique se todos os campos foram preenchidos corretamente.";
    document.getElementById("modal_btn").innerHTML = "Voltar e corrigir";
    document.getElementById("modal_btn").className = "btn btn-danger";

    //dialog de erro
    console.log("Dados Inválidos");
    $("#modalRegistraDespesa").modal("show");
  }
}

function carregaListaDespesas() {
  let despesas = Array();

  bd.recuperarTodosRegistros();

  console.log(despesas);
}
