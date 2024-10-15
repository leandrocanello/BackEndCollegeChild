const frequenciaService = require('../services/frequencia')

const postfrequencia = async (req, res, next) => {
    await frequenciaService.postfrequencia(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getfrequencia = async (req, res, next) => {
    await frequenciaService.getfrequencia()
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const getfrequenciafindId = async (req, res, next) => {
    await frequenciaService.getfrequenciafindId(req.params)
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const getfrequenciafindIdresponsavel = async (req, res, next) => {
    await frequenciaService.getfrequenciafindIdresponsavel(req.params)
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}
const deletefrequencia = async(req,res,next) => {
    await frequenciaService.deletefrequencia(req.params)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err)) 
}

const patchfrequencia = async(req,res,next)=>{
    let params = req.body
    params.id = req.params.id
    await frequenciaService.patchfrequencia(params)
    .then(ret => res.status(201).send(ret))
    .catch(err => res.status(500).send(err))
}

module.exports.postfrequencia = postfrequencia
module.exports.getfrequencia = getfrequencia
module.exports.deletefrequencia = deletefrequencia
module.exports.patchfrequencia = patchfrequencia
module.exports.getfrequenciafindId = getfrequenciafindId
module.exports.getfrequenciafindIdresponsavel = getfrequenciafindIdresponsavel

