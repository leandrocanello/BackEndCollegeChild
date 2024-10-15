const db = require('../config/pg')
const cript = require('../config/cript')

const sql = 
    `insert into turma (numeroturma, idprofessor)
                 values($1, $2)`

const postturma = async (params) => {
    const salt = cript.generateSalt()
    const {numeroturma, idprofessor} = params
    await db.query(sql, [numeroturma, idprofessor])
}

const sql_get = `SELECT * FROM turma
`

const getturma = async () => {
    return await db.query(sql_get, [])
}

const sql_getId = `select * from turma where idturma = $1`

const getturmafindId = async (params) => {
    const {id} = params
    return await db.query(sql_getId, [id])
}

const sql_getturmafindaluno = `SELECT turma.idturma, turma.numeroturma, turma.idprofessor from turma join aluno on turma.idturma = aluno.idturma where aluno.idaluno = $1`

const getturmafindalunoId = async (params) => {
    const {idaluno} = params
    console.log(sql_getturmafindaluno + " " [idaluno])
    return await db.query(sql_getturmafindaluno, [idaluno])
}

const sql_getturmaJoinprofessorId = `SELECT t.idturma, t.numeroturma, p.nome AS professor_nome
FROM turma t
JOIN professor p ON t.idprofessor = p.idprofessor
`
const getturmajoinprofessor = async () => {
    return await db.query(sql_getturmaJoinprofessorId, [])
}   

const sql_delete = 
        `delete from turma where turma.idturma = $1`

const deleteturma = async(params)=>{
    const {id} = params 
    await db.query(sql_delete,[id])
}

const sql_patch = 
        `update turma
        set `
const patchturma = async(params)=>{
    let field =  ''
    let binds = []
    const salt = cript.generateSalt()
    binds.push(params.id)
    let countParams = 0
    if(params.numeroturma){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field +=  `numeroturma = $${countParams}`
        binds.push(params.numeroturma)
    }
    if(params.idaluno){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field += (field?',':'') +`idaluno = $${countParams}`
        binds.push(params.idaluno)
    }
    if(params.idprofessor){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field += (field?',':'') +`idprofessor = $${countParams}`
        binds.push(params.idprofessor)
    }

    let sql = sql_patch + field + ` where idturma = $1`
    console.log(sql)
    console.log(binds)
    return await db.query(sql, binds)
}

module.exports.postturma = postturma
module.exports.getturma = getturma
module.exports.deleteturma = deleteturma
module.exports.patchturma = patchturma
module.exports.getturmafindId = getturmafindId
module.exports.getturmafindalunoId = getturmafindalunoId 
module.exports.getturmajoinprofessor = getturmajoinprofessor 