const db = require('../config/pg');
const jwt = require('../config/jwt');
const cript = require('../config/cript');

const sql_get = `
  SELECT userr.iduser,
         userr.username,
         userr.salt,
         userr.password,
         userr.role
    FROM userr
   WHERE username = $1
`;

const login = async (params) => {
    const { user, pass } = params;
    const result = await db.query(sql_get, [user]);
    if (!result.rows.length) {
        throw new Error("USUÁRIO NÃO EXISTE!");
    } else {
        const salt = result.rows[0].salt;
        const password = result.rows[0].password;
        const hashedNewPass = cript.hashPassword(pass, salt);
        if (hashedNewPass == password) {
            let perfilAcesso = result.rows[0].role;
            let idusuario = result.rows[0].iduser; // Atualizado para usar role
            let token = jwt.sign({ perfilAcesso });
            return {
                status: 'Logado com sucesso!!!',
                user: result.rows[0].username,
                role: perfilAcesso,
                idusuario: idusuario,
                token: token
            };
        } else {
            throw { status: 400, type: 'WARN', message: 'Senha inválida!', detail: '' };
        }
    }
};

module.exports.login = login;
