let alunos = [];

document.addEventListener("DOMContentLoaded", ()=> {
    const buttonCadastrar = (aluno)=> {
        alunos.push(aluno);
        atualizarTabela(alunos);
    }

    const atualizarTabela = (alunos) =>{
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
        atualizarMedia();
        atualizarMediaIdade();
        atualizarAlunosPorCurso();
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
        atualizarTabela(alunos);
    }

    const excluirAluno = (index) =>{
        if (index >= alunos.length) {
            throw "indice invalido";
        }
        alunos.splice(index, 1);
        atualizarTabela(alunos);
    }

    const listarAlunosAprovados = ()=> {
        atualizarTabela(alunos.filter(aluno => aluno.isAprovado()));
    }

    const atualizarMedia = ()=> {
        const mediaNotas = alunos.reduce((acc, aluno) => acc + aluno.notaFinal, 0) / alunos.length;
        document.getElementById("mediaNotas").textContent = `Média das notas: ${mediaNotas}`;
    }

    const atualizarMediaIdade = () => {
        const mediaIdade = alunos.reduce((acc, aluno) => acc + aluno.idade, 0) / alunos.length;
        document.getElementById("mediaIdade").textContent = `Média das idades: ${mediaIdade}`;
    }

    const alunosOrdemAlfabetica = () => {
        const ordemAlfabetica = alunos.slice().sort((aluno1, aluno2) => {
            if (aluno1.nome > aluno2.nome) {
                return -1;
            }
            if (aluno1.nome < aluno2.nome) {
                return 1;
            }
            return 0;
        });
        atualizarTabela(ordemAlfabetica);
    }

    const alunosPorCurso = () => {
        const cursos = {};
        alunos.forEach(aluno => {
            if (cursos[aluno.curso]) {
                cursos[aluno.curso]++;
            } else {
                cursos[aluno.curso] = 1;
            }
        });
        return cursos;
    }

    const atualizarAlunosPorCurso = () => {
        const alunos = alunosPorCurso();
        const cursosTable = document.getElementById("cursosTableBody");
        cursosTable.innerHTML = "";
        Object.entries(alunos).forEach(([curso, quantidade]) => {
            const linha = cursosTable.insertRow();
            const celulaCurso = linha.insertCell(0);
            const celulaQuantidade = linha.insertCell(1);

            celulaCurso.textContent = curso;
            celulaQuantidade.textContent = quantidade;
        });
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

    const listarAlunosAprovadosButton = document.getElementById("listarAlunosAprovados");
    listarAlunosAprovadosButton.addEventListener("click", ()=> {
        listarAlunosAprovados();
    });

    const listarTodosAlunos = document.getElementById("listarTodosAlunos");
    listarTodosAlunos.addEventListener("click", ()=> {
        atualizarTabela(alunos);
    });

    const listarAlunosOrdemAlfabetica = document.getElementById("ordemAlfabetica");
    listarAlunosOrdemAlfabetica.addEventListener("click", () => {
        alunosOrdemAlfabetica();
    });
});