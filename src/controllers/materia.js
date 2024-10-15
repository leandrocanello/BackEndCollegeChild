const materiaService = require('../services/materia')

const postmateria = async (req, res, next) => {
    await materiaService.postmateria(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getmateria = async (req, res, next) => {
    await materiaService.getmateria()
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const getmateriafindId = async (req, res, next) => {
    await materiaService.getmateriafindId(req.params)
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const getmateriafindIdaluno = async (req, res, next) => {
    await materiaService.getmateriafindIdaluno(req.params)
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}
const deletemateria = async(req,res,next) => {
    await materiaService.deletemateria(req.params)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err)) 
}

const patchmateria = async(req,res,next)=>{
    let params = req.body
    params.id = req.params.id
    await materiaService.patchmateria(params)
    .then(ret => res.status(201).send(ret))
    .catch(err => res.status(500).send(err))
}

module.exports.postmateria = postmateria
module.exports.getmateria = getmateria
module.exports.deletemateria = deletemateria
module.exports.patchmateria = patchmateria
module.exports.getmateriafindId = getmateriafindId
module.exports.getmateriafindIdaluno = getmateriafindIdaluno
