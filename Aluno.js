class Aluno{
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    isAprovado(){
        return this.notaFinal >= 7;
    }

    toString(){
        return `Aluno [nome=${this.nome}, idade${this.idade}, curso=${this.curso}, notaFinal=${this.notaFinal}]`;
    }
}