const db = require('../config/pg')

const sql = 
    `insert into alunomateria (idaluno, idmateria)
                 values($1, $2)`

const postalunomateria = async (params) => {
    const {idaluno, idmateria} = params
    await db.query(sql, [idaluno, idmateria])
}

const sql_get = `select * from alunomateria`

const getalunomateria = async () => {
    return await db.query(sql_get, [])
}

const sql_getId = `select * from alunomateria where idalunomateria = $1`

const getalunomateriafindId = async (params) => {
    const {id} = params
    return await db.query(sql_getId, [id])
}

const buscausuariologado = async (params) => {
    let profile = null;
    const {id, role} = params

if (role === 'professor') {
  profile = await db.query('SELECT * FROM professor WHERE user_id = $1', [id]);
} else if (role === 'aluno') {
  profile = await db.query('SELECT * FROM aluno WHERE user_id = $1', [id]);
} else if (role === 'responsavel') {
  profile = await db.query('SELECT * FROM responsavel WHERE user_id = $1', [id]);
}
    return profile;
}

const sql_delete = 
        `delete from alunomateria where alunomateria.idalunomateria = $1`

const deletealunomateria = async(params)=>{
    const {id} = params 
    await db.query(sql_delete,[id])
}

const sql_patch = 
        `update alunomateria
        set `
const patchalunomateria = async(params)=>{
    let field =  ''
    let binds = []
    binds.push(params.id)
    let countParams = 0
    if(params.idaluno){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field +=  `idaluno = $${countParams}`
        binds.push(params.idaluno)
    }
    if(params.idmateria){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field += (field?',':'') +`idmateria = $${countParams}`
        binds.push(params.idmateria)
    }
    let sql = sql_patch + field + ` where idalunomateria = $1`
    console.log(sql)
    console.log(binds)
    return await db.query(sql, binds)
}

module.exports.postalunomateria = postalunomateria
module.exports.getalunomateria = getalunomateria
module.exports.deletealunomateria = deletealunomateria
module.exports.patchalunomateria = patchalunomateria
module.exports.getalunomateriafindId = getalunomateriafindId
module.exports.buscausuariologado = buscausuariologado
