const db = require('../config/pg')

// SQL para inserir uma nova nota
const sql = `
    insert into nota (semestre, tipodeavaliacao, nota, idaluno, idmateria)
    values($1, $2, $3, $4, $5)
`;

// SQL para buscar o XP e nível do aluno
const sqlGamificacao = `
    select nivel, xp from aluno_gamificacao where idaluno = $1
`;

// SQL para atualizar o XP e nível do aluno
const sqlUpdateGamificacao = `
    update aluno_gamificacao set xp = $1, nivel = $2 where idaluno = $3
`;

const sqlInsertGamificacao = `
  INSERT INTO aluno_gamificacao (idaluno, xp, nivel)
  VALUES ($1, 0, 1)
  RETURNING xp, nivel
`;

const postnota = async (params) => {
    const { semestre, tipodeavaliacao, nota, idaluno, idmateria } = params;

    await db.query(sql, [semestre, tipodeavaliacao, nota, idaluno, idmateria]);

    let xpGanho = 0;
    if (nota >= 10) xpGanho = 1000;
    else if (nota >= 9) xpGanho = 900;
    else if (nota >= 8) xpGanho = 800;
    else if (nota >= 7) xpGanho = 700;

    const result = await db.query(sqlGamificacao, [idaluno]);
    if (result.rows.length === 0) {
        const insertResult = await db.query(sqlInsertGamificacao, [idaluno]);
        xpAtual = insertResult.rows[0].xp;
        nivelAtual = insertResult.rows[0].nivel;
      } else {
        xpAtual = result.rows[0].xp;
        nivelAtual = result.rows[0].nivel;
      }

    xpAtual += xpGanho;

    while (xpAtual >= 2000) {
        nivelAtual += 1;
        xpAtual -= 2000;
    }

    await db.query(sqlUpdateGamificacao, [xpAtual, nivelAtual, idaluno]);
};

const sqlGetAlunoGamificacao = `select nivel, xp from aluno_gamificacao where idaluno = $1`;

const getAlunoGamificacao = async (idaluno) => {
    return await db.query(sqlGetAlunoGamificacao, [idaluno]);
};

const sqlGetAluno = `SELECT * from nota where idaluno = $1`;

const getnotafindAluno = async (idaluno) => {
    return await db.query(sqlGetAluno, [idaluno]);
};

const getnota = async () => {
    return await db.query(sql_get, [])
}

const sql_getId = `select nota.idnota, nota.semestre, nota.tipodeavaliacao, nota.nota, nota.idaluno, nota.idmateria
from nota join aluno on nota.idaluno = aluno.idaluno join responsavel on aluno.idresponsavel = responsavel.idresponsavel
where responsavel.idresponsavel = $1`

const getnotafindId = async (params) => {
    const {id} = params
    return await db.query(sql_getId, [id])
}

const sql_getNotasemestre = `SELECT * from nota where nota.semestre = $2 and idaluno = $3 and idmateria = $1`

const getNotasemestre = async (params) => {
    const {idmateria, semestre, idaluno} = params
    return await db.query(sql_getNotasemestre, [idmateria, semestre, idaluno])
}

const sql_delete = 
        `delete from nota where nota.idnota = $1`

const deletenota = async(params)=>{
    const {id} = params 
    await db.query(sql_delete,[id])
}

const sql_patch = 
        `update nota
        set `
const patchnota = async(params)=>{
    let field =  ''
    let binds = []
    binds.push(params.id)
    let countParams = 0
    if(params.semestre){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field +=  `semestre = $${countParams}`
        binds.push(params.semestre)
    }
    if(params.tipodeavaliacao){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field +=  `tipodeavaliacao = $${countParams}`
        binds.push(params.tipodeavaliacao)
    }
    if(params.nota){
        if(countParams <= 1)
            countParams = 2;
        else
            countParams += 1
        field +=  `nota = $${countParams}`
        binds.push(params.nota)
    }
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
        field +=  `idmateria = $${countParams}`
        binds.push(params.idmateria)
    }

    let sql = sql_patch + field + ` where idnota = $1`
    console.log(sql)
    console.log(binds)
    return await db.query(sql, binds)
}

module.exports.postnota = postnota
module.exports.getnota = getnota
module.exports.getnotafindId = getnotafindId
module.exports.deletenota = deletenota
module.exports.patchnota = patchnota
module.exports.getNotasemestre = getNotasemestre
module.exports.getAlunoGamificacao = getAlunoGamificacao;
module.exports.getnotafindAluno = getnotafindAluno;
