const usuarioService = require('../services/usuario')

const postUser = async (req, res, next) => {
    await usuarioService.postUser(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getUser = async (req, res, next) => {
    await usuarioService.getUser()
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const getUserfindId = async (req, res, next) => {
    await usuarioService.getUserfindId(req.params)
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const deleteUser = async(req,res,next) => {
    await usuarioService.deleteUser(req.params)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err)) 
}

const patchUser = async(req,res,next)=>{
    let params = req.body
    params.id = req.params.id
    await usuarioService.patchUser(params)
    .then(ret => res.status(201).send(ret))
    .catch(err => res.status(500).send(err))
}

module.exports.postUser = postUser
module.exports.getUser = getUser
module.exports.deleteUser = deleteUser
module.exports.patchUser = patchUser
module.exports.getUserfindId = getUserfindId