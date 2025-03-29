let alunos = [];

function buttonCadastrar() {
    const name = document.getElementById("nome").value;
    const idade = parseInt(document.getElementById("idade").value);
    const curso = document.getElementById("cursos").value;
    const notaFinal = parseFloat(document.getElementById("notaFinal").value);

    alunos.push({name, idade, curso, notaFinal});
    atualizarTabela();
}

function atualizarTabela(){
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

        celulaNome.textContent = aluno.name;
        celulaIdade.textContent = aluno.idade;
        celulaCurso.textContent = aluno.curso;
        celulaNotaFinal.textContent = aluno.notaFinal;
        celulaAcao.innerHTML = `
            <button onclick="editarAluno(${i})">Editar</button>
            <button onclick="excluirAluno(${i})">Excluir</button>
        `
    }
}

function editarAluno(index) {
    if (index >= alunos.length) {
        throw "indice invalido";
    }
    const name = document.getElementById("nome").value;
    const idade = parseInt(document.getElementById("idade").value);
    const curso = document.getElementById("cursos").value;
    const notaFinal = parseFloat(document.getElementById("notaFinal").value);

    alunos[index] = {name, idade, curso, notaFinal};
    atualizarTabela();
}

function excluirAluno(index){
    if (index >= alunos.length) {
        throw "indice invalido";
    }
    alunos.splice(index, 1);
    atualizarTabela();
}