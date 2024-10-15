const db = require('../config/pg')

const sql = 
    `insert into frequencia (diaaula, presenca, idaluno)
                 values($1, $2, $3)`

const postfrequencia = async (params) => {
    const {diaaula, presenca, idaluno} = params
    await db.query(sql, [diaaula, presenca, idaluno])
}

const sql_get = `select * from frequencia`

const getfrequencia = async () => {
    return await db.query(sql_get, [])
}

const sql_getId = `select * from frequencia where idaluno = $1`

const getfrequenciafindId = async (params) => {
    const {id} = params
    return await db.query(sql_getId, [id])
}

const sql_getIdresponsavel = `SELECT frequencia.idfrequencia ,frequencia.diaaula,frequencia.presenca,frequencia.idaluno from frequencia join aluno on aluno.idaluno = frequencia.idaluno
join responsavel on aluno.idresponsavel = responsavel.idresponsavel where responsavel.idresponsavel = $1`

const getfrequenciafindIdresponsavel = async (params) => {
    const {id} = params
    return await db.query(sql_getIdresponsavel, [id])
}

const sql_delete = 
        `delete from frequencia where frequencia.idfrequencia = $1`

const deletefrequencia = async(params)=>{
    const {id} = params 
    await db.query(sql_delete,[id])
}

const sql_patch = 
        `update frequencia
        set `
const patchfrequencia = async(params)=>{
    let field =  ''
    let binds = []
    binds.push(params.id)
    let countParams = 0
    if(params.diaaula){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field +=  `diaaula = $${countParams}`
        binds.push(params.diaaula)
    }
    if(params.presenca){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field += (field?',':'') +`presenca = $${countParams}`
        binds.push(params.presenca)
    }
    if(params.idaluno){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field += (field?',':'') +`idaluno = $${countParams}`
        binds.push(params.idaluno)
    }

    let sql = sql_patch + field + ` where idfrequencia = $1`
    console.log(sql)
    console.log(binds)
    return await db.query(sql, binds)
}

module.exports.postfrequencia = postfrequencia
module.exports.getfrequencia = getfrequencia
module.exports.deletefrequencia = deletefrequencia
module.exports.patchfrequencia = patchfrequencia
module.exports.getfrequenciafindId = getfrequenciafindId
module.exports.getfrequenciafindIdresponsavel = getfrequenciafindIdresponsavel
