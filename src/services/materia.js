const db = require('../config/pg')

const sql = 
    `insert into materia (nomemateria)
                 values($1)`

const postmateria = async (params) => {
    const {nomemateria} = params
    await db.query(sql, [nomemateria])
}

const sql_get = `select * from materia`

const getmateria = async () => {
    return await db.query(sql_get, [])
}

const sql_getId = `select * from materia where idmateria = $1`

const getmateriafindId = async (params) => {
    const {id} = params
    return await db.query(sql_getId, [id])
}

const sql_getIdaluno = `SELECT materia.idmateria, materia.nomemateria from aluno join alunomateria on alunomateria.idaluno = aluno.idaluno
join materia on materia.idmateria = alunomateria.idmateria where aluno.idaluno = $1`

const getmateriafindIdaluno = async (params) => {
    const {idaluno} = params
    return await db.query(sql_getIdaluno, [idaluno])
}

const sql_delete = 
        `delete from materia where materia.idmateria = $1`

const deletemateria = async(params)=>{
    const {id} = params 
    await db.query(sql_delete,[id])
}

const sql_patch = 
        `update materia
        set `
const patchmateria = async(params)=>{
    let field =  ''
    let binds = []
    binds.push(params.id)
    let countParams = 0
    if(params.nomemateria){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field +=  `nomemateria = $${countParams}`
        binds.push(params.nomemateria)
    }
    if(params.idaluno){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field += (field?',':'') +`idaluno = $${countParams}`
        binds.push(params.idaluno)
    }

    let sql = sql_patch + field + ` where idmateria = $1`
    console.log(sql)
    console.log(binds)
    return await db.query(sql, binds)
}

module.exports.postmateria = postmateria
module.exports.getmateria = getmateria
module.exports.deletemateria = deletemateria
module.exports.patchmateria = patchmateria
module.exports.getmateriafindId = getmateriafindId
module.exports.getmateriafindIdaluno = getmateriafindIdaluno
