const db = require('../config/pg')

const sql = 
    `insert into professor (nome, user_id)
                 values($1, $2)`

const postProfessor = async (params) => {
    const {nome, user_id} = params
    await db.query(sql, [nome, user_id])
}

const sql_get = `select * from professor`

const getProfessor = async () => {
    return await db.query(sql_get, [])
}

const sql_getId = `select * from professor where idprofessor = $1`

const getProfessorfindId = async (params) => {
    const {id} = params
    return await db.query(sql_getId, [id])
}

const sql_delete = 
        `delete from professor where professor.idprofessor = $1`

const deleteprofessor = async(params)=>{
    const {id} = params 
    await db.query(sql_delete,[id])
}

const sql_patch = 
        `update professor
        set `
const patchprofessor = async(params)=>{
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

    let sql = sql_patch + field + ` where idprofessor = $1`
    console.log(sql)
    console.log(binds)
    return await db.query(sql, binds)
}

module.exports.postProfessor = postProfessor
module.exports.getProfessor = getProfessor
module.exports.getProfessorfindId = getProfessorfindId
module.exports.deleteprofessor = deleteprofessor
module.exports.patchprofessor = patchprofessor
