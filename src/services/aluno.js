const db = require('../config/pg')

const sql = 
    `insert into aluno (nome, sobrenome, periodo, observacao, user_id, idturma, idresponsavel)
                 values($1, $2, $3, $4, $5, $6, $7)`

    const postAluno = async (params) => {
    const {nome, sobrenome, periodo, observacao, userid, idturma, idresponsavel} = params
    await db.query(sql, [nome, sobrenome, periodo, observacao, userid, idturma, idresponsavel])
}

const sql_get = `select * from aluno`

const getAluno = async () => {
    return await db.query(sql_get, [])
}

const sql_getId = `select * from aluno where idaluno = $1`

const getAlunofindId = async (params) => {
    const {idaluno} = params
    return await db.query(sql_getId, [idaluno])
}

const sql_getResponsavelId = `select * from aluno where idresponsavel = $1`

const getAlunosPorResponsavel = async (params) => {
    const {idresponsavel} = params
    return await db.query(sql_getResponsavelId, [idresponsavel])
}

const sql_getProfessorId = `SELECT aluno.idaluno, aluno.nome, aluno.sobrenome, aluno.periodo, aluno.observacao, aluno.user_id, aluno.idturma, aluno.idresponsavel
from aluno join turma on turma.idturma = aluno.idturma where idprofessor = $1`

const getAlunosPorProfessor = async (params) => {
    const {professor} = params
    return await db.query(sql_getProfessorId, [professor])
}

const sql_delete = 
        `delete from aluno where aluno.idaluno = $1`

const deletealuno = async(params)=>{
    const {id} = params 
    await db.query(sql_delete,[id])
}

const sql_put =
        `update aluno
            set nome = $2,
                sobrenome = $3,
                periodo = $4,
                observacao = $5
            where idaluno = $1
        `
const putaluno = async(params)=>{
    const {nome,sobrenome,periodo,observacao} = params 
    await db.query(sql_put,[nome,sobrenome,periodo,observacao])
}  

const sql_patch = 
        `update aluno
        set `
const patchaluno = async(params)=>{
    let field =  ''
    let binds = []
    binds.push(params.id)
    let countParams = 0
    if(params.nome){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field +=  `nome = $${countParams}`
        binds.push(params.nome)
    }
    if(params.sobrenome){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field += (field?',':'') +`sobrenome = $${countParams}`
        binds.push(params.sobrenome)
    }
    if(params.periodo){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field += (field?',':'') +`periodo = $${countParams}`
        binds.push(params.periodo)
    }
    if(params.observacao){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field += (field?',':'') +`observacao = $${countParams}`
        binds.push(params.observacao)
    }

    let sql = sql_patch + field + ` where idaluno = $1`
    console.log(sql)
    console.log(binds)
    return await db.query(sql, binds)
}

module.exports.postAluno = postAluno
module.exports.getAluno = getAluno
module.exports.deletealuno = deletealuno
module.exports.putaluno = putaluno
module.exports.patchaluno = patchaluno
module.exports.getAlunofindId = getAlunofindId
module.exports.getAlunosPorResponsavel = getAlunosPorResponsavel
module.exports.getAlunosPorProfessor = getAlunosPorProfessor
