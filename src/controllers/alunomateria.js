const alunomateriaService = require('../services/alunomateria')

const postalunomateria = async (req, res, next) => {
    await alunomateriaService.postalunomateria(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getalunomateria = async (req, res, next) => {
    await alunomateriaService.getalunomateria()
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const buscausuariologado = async (req, res, next) => {
    await alunomateriaService.buscausuariologado(req.params)
    .then(ret => res.status(201).send(ret.rows))
    .catch(err => res.status(500).send(err))
}


const getalunomateriafindId = async (req, res, next) => {
    await alunomateriaService.getalunomateriafindId(req.params)
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}
const deletealunomateria = async(req,res,next) => {
    await alunomateriaService.deletealunomateria(req.params)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err)) 
}

const patchalunomateria = async(req,res,next)=>{
    let params = req.body
    params.id = req.params.id
    await alunomateriaService.patchalunomateria(params)
    .then(ret => res.status(201).send(ret))
    .catch(err => res.status(500).send(err))
}

module.exports.postalunomateria = postalunomateria
module.exports.getalunomateria = getalunomateria
module.exports.deletealunomateria = deletealunomateria
module.exports.patchalunomateria = patchalunomateria
module.exports.getalunomateriafindId = getalunomateriafindId
module.exports.buscausuariologado = buscausuariologado
