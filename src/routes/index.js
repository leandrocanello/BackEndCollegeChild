const usuario = require('./usuario');
const login = require('./login');
const professor = require('./professor');
const responsavel = require('./responsavel');
const aluno = require('./aluno');
const turma = require('./turma');
const materia = require('./materia');
const nota = require('./nota');
const alunomateria = require('./alunomateria')
const frequencia = require('./frequencia');  

module.exports = (app) => {
    usuario(app)
    login(app)
    professor(app)
    responsavel(app)
    aluno(app)
    turma(app)
    materia(app)
    nota(app)
    alunomateria(app)
    frequencia(app)
}