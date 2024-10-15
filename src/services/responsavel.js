const db = require('../config/pg')
const responsavel = require('../routes/responsavel')

const sql = 
    `insert into responsavel (nome, celular, user_id)
                 values($1, $2, $3)`

const postResponsavel = async (params) => {
    const {nome, celular, userid} = params
    await db.query(sql, [nome, celular, userid])
}

const sql_get = `select * from responsavel`

const getResponsavel = async () => {
    return await db.query(sql_get, [])
}

const sql_getId = `select * from responsavel where idresponsavel = $1`

const getResponsavelfindId = async (params) => {
    const {id} = params
    return await db.query(sql_getId, [id])
}

const sql_getNotasemestre = `SELECT * from nota where nota.semestre = $2 and idaluno = $3 and idmateria = $1`

const getNotasemestre = async (params) => {
    const {idmateria, semestre, idaluno} = params
    return await db.query(sql_getId, [idmateria, semestre, idaluno])
}

const sql_delete = 
        `delete from responsavel where responsavel.idresponsavel = $1`

const deleteResponsavel = async(params)=>{
    const {id} = params 
    await db.query(sql_delete,[id])
}

const sql_patch = 
        `update responsavel
        set `
const patchResponsavel = async(params)=>{
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
    if(params.celular){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field += (field?',':'') +`celular = $${countParams}`
        binds.push(params.celular)
    }
    if(params.idaluno){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field += (field?',':'') +`idaluno = $${countParams}`
        binds.push(params.idaluno)
    }

    let sql = sql_patch + field + ` where idresponsavel = $1`
    console.log(sql)
    console.log(binds)
    return await db.query(sql, binds)
}

module.exports.postResponsavel = postResponsavel
module.exports.getResponsavel = getResponsavel
module.exports.deleteResponsavel = deleteResponsavel
module.exports.patchResponsavel = patchResponsavel
module.exports.getResponsavelfindId = getResponsavelfindId
module.exports.getNotasemestre = getNotasemestre
