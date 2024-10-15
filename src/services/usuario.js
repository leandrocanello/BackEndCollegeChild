const db = require('../config/pg')
const cript = require('../config/cript')

const sql = 
    `INSERT INTO userr (username, salt, password, role)
     VALUES ($1, $2, $3, $4) RETURNING *`;

const postUser = async (params) => {
    const salt = cript.generateSalt();
    const { usuario, senha, role } = params;
    const hashedPass = cript.hashPassword(senha, salt);

    try {
        // Executa a query de inserção com a cláusula RETURNING *
        const result = await db.query(sql, [usuario, salt, hashedPass, role]);
        if (result.rows.length > 0) {
            return result.rows[0]; // Retorna a primeira linha inserida
        } else {
            throw new Error('Nenhuma linha foi retornada após a inserção.');
        }
    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
        throw error;
    }
};

const sql_get = `select * from userr`

const getUser = async () => {
    return await db.query(sql_get, [])
}

const sql_getId = `select * from userr where iduser = $1`

const getUserfindId = async (params) => {
    const {id} = params
    return await db.query(sql_getId, [id])
}

const sql_delete = 
        `delete from userr where userr.iduser = $1`

const deleteUser = async(params)=>{
    const {id} = params 
    await db.query(sql_delete,[id])
}

const sql_patch = 
        `update userr
        set `
const patchUser = async(params)=>{
    let field =  ''
    let binds = []
    const salt = cript.generateSalt()
    binds.push(params.id)
    let countParams = 0
    
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field += (field?',':'') + `salt = $${countParams}`
        binds.push(salt)
    
    if(params.username){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field += (field?',':'') + `username = $${countParams}`
        binds.push(params.username)
    }
    if(params.role){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field += (field?',':'') +`role = $${countParams}`
        binds.push(params.role)
    }
    if(params.password){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field += (field?',':'') +`password = $${countParams}`
        const hashedPass = cript.hashPassword(params.password, salt)
        binds.push(hashedPass)
    }

    let sql = sql_patch + field + ` where iduser = $1`
    console.log(sql)
    console.log(binds)
    return await db.query(sql, binds)
}

module.exports.postUser = postUser
module.exports.getUser = getUser
module.exports.deleteUser = deleteUser
module.exports.patchUser = patchUser
module.exports.getUserfindId = getUserfindId