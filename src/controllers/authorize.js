function authorize(roles = ['prof', 'aluno']) {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!roles.length || roles.includes(req.user.perfilAcesso)) {
            return next();
        } else {
            return res.status(403).json({ message: 'Usuario não autorizado' });
        }
    };
}

module.exports.authorize = authorize;
