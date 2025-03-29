let alunos = [];

document.addEventListener("DOMContentLoaded", ()=> {
    const buttonCadastrar = (aluno)=> {
        alunos.push(aluno);
        atualizarTabela();
    }

    const atualizarTabela = () =>{
        const tabela = document.getElementById("alunosTableBody");
        tabela.innerHTML = "";

        for (let i = 0; i < alunos.length; i++) {
            const aluno = alunos[i];
            const linha = tabela.insertRow(0);
            const celulaNome = linha.insertCell(0);
            const celulaIdade = linha.insertCell(1);
            const celulaCurso = linha.insertCell(2);
            const celulaNotaFinal = linha.insertCell(3);
            const celulaAcao = linha.insertCell(4);

            celulaNome.textContent = aluno.nome;
            celulaIdade.textContent = aluno.idade;
            celulaCurso.textContent = aluno.curso;
            celulaNotaFinal.textContent = aluno.notaFinal;
            celulaAcao.innerHTML = `
            <button class="editarButton" data-index="${i}">Editar</button>
            <button class="excluirButton" data-index="${i}">Excluir</button>
        `
        }
    }

    const editarAluno = (index)=> {
        if (index >= alunos.length) {
            throw "indice invalido";
        }
        const nome = document.getElementById("nome").value;
        const idade = parseInt(document.getElementById("idade").value);
        const curso = document.getElementById("cursos").value;
        const notaFinal = parseFloat(document.getElementById("notaFinal").value);

        alunos[index] = new Aluno(nome, idade, curso, notaFinal);
        atualizarTabela();
    }

    const excluirAluno = (index) =>{
        if (index >= alunos.length) {
            throw "indice invalido";
        }
        alunos.splice(index, 1);
        atualizarTabela();
    }

    const cadastrarButton = document.getElementById("cadastrarButton");
    cadastrarButton.addEventListener("click", function (){
        const nome = document.getElementById("nome").value;
        const idade = parseInt(document.getElementById("idade").value);
        const curso = document.getElementById("cursos").value;
        const notaFinal = parseFloat(document.getElementById("notaFinal").value);
        buttonCadastrar(new Aluno(nome, idade, curso, notaFinal));
        alert("Aluno cadastrado com sucesso");
    });

    const tabelaAlunos = document.getElementById("alunosTableBody");
    tabelaAlunos.addEventListener("click", (event)=> {
        const index = parseInt(event.target.dataset.index);
        if (event.target.classList.contains("editarButton")) {
            editarAluno(index);
            alert("Aluno editado com sucesso");
        }
        else if (event.target.classList.contains("excluirButton")) {
            excluirAluno(index);
            alert("Aluno excluido com sucesso");
        }
    });
})