class Cadastro {
  constructor() {
    this.id = 1;
    this.arrayAlunos = [];
    this.editId = null;
    document.getElementById("form").addEventListener("submit", (e) => {
      e.preventDefault();
      this.salvar();
    });
  }

  salvar() {
    const aluno = this.lerDados();
    if (this.validarCampos(aluno)) {
      if (this.editId == null) {
        this.adicionar(aluno);
      } else {
        this.atualizar(this.editId, aluno);
      }
      this.listaTabela();
      this.cancelar();
    }
  }

  lerDados() {
    return {
      id: this.id,
      nome: document.getElementById("name").value.trim(),
      sobrenome: document.getElementById("last_name").value.trim(),
      nascimento: document.getElementById("birthdate").value,
      email: document.getElementById("email").value.trim(),
    };
  }

  validarCampos(aluno) {
    let valid = true;
    const showError = (id, message) => {
      const box = document.getElementById(id).closest(".input-box");
      box.querySelector(".error").innerText = message;
      box.classList.add("invalid");
      valid = false;
    };

    const clearError = (id) => {
      const box = document.getElementById(id).closest(".input-box");
      box.querySelector(".error").innerText = "";
      box.classList.remove("invalid");
    };

    if (!aluno.nome || aluno.nome.length < 2)
      showError("name", "Nome inválido");
    if (!aluno.sobrenome || aluno.sobrenome.length < 2)
      showError("last_name", "Sobrenome inválido");
    if (!aluno.nascimento) showError("birthdate", "Data obrigatória");
    if (!aluno.email.includes("@")) showError("email", "Email inválido");

    return valid;
  }

  adicionar(aluno) {
    aluno.nomeCompleto = aluno.nome + " " + aluno.sobrenome;
    this.arrayAlunos.push(aluno);
    this.id++;
  }

  atualizar(id, aluno) {
    for (let i = 0; i < this.arrayAlunos.length; i++) {
      if (this.arrayAlunos[i].id == id) {
        aluno.nomeCompleto = aluno.nome + " " + aluno.sobrenome;
        this.arrayAlunos[i] = { ...aluno };
      }
    }
  }

  listaTabela() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    for (let aluno of this.arrayAlunos) {
      let tr = tbody.insertRow();
      tr.insertCell().innerText = aluno.id;
      tr.insertCell().innerText = aluno.nomeCompleto;
      tr.insertCell().innerText = aluno.nascimento;
      tr.insertCell().innerText = aluno.email;
      let tdAcoes = tr.insertCell();
      tdAcoes.classList.add("center");

      let btnEdit = document.createElement("button");
      let imgEdit = document.createElement("img");
      imgEdit.src = "img/edit.png";
      imgEdit.alt = "Editar";
      imgEdit.width = 16;
      imgEdit.height = 16;
      btnEdit.appendChild(imgEdit);
      btnEdit.onclick = () => this.prepararEdicao(aluno);

      let btnDel = document.createElement("button");
      let imgDel = document.createElement("img");
      imgDel.src = "img/delete.png";
      imgDel.alt = "Excluir";
      imgDel.width = 16;
      imgDel.height = 16;
      btnDel.appendChild(imgDel);
      btnDel.onclick = () => this.deletar(aluno.id);

      tdAcoes.appendChild(btnEdit);
      tdAcoes.appendChild(btnDel);
    }
  }

  prepararEdicao(aluno) {
    this.editId = aluno.id;
    document.getElementById("name").value = aluno.nome;
    document.getElementById("last_name").value = aluno.sobrenome;
    document.getElementById("birthdate").value = aluno.nascimento;
    document.getElementById("email").value = aluno.email;
    document.getElementById("btnSalvar").innerText = "Atualizar";
  }

  cancelar() {
    document.getElementById("form").reset();
    document.getElementById("btnSalvar").innerText = "Salvar";
    this.editId = null;
  }

  deletar(id) {
    this.arrayAlunos = this.arrayAlunos.filter((aluno) => aluno.id !== id);
    this.listaTabela();
  }
}

const cadastro = new Cadastro();
