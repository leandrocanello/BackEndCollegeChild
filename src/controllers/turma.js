const turmaService = require('../services/turma')

const postturma = async (req, res, next) => {
    await turmaService.postturma(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getturma = async (req, res, next) => {
    await turmaService.getturma()
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const getturmafindId = async (req, res, next) => {
    await turmaService.getturmafindId(req.params)
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const getturmafindalunoId = async (req, res, next) => {
    await turmaService.getturmafindalunoId(req.params)
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const getturmajoinprofessor = async (req, res, next) => {
    await turmaService.getturmajoinprofessor()
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}
const deleteturma = async(req,res,next) => {
    await turmaService.deleteturma(req.params)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err)) 
}

const patchturma = async(req,res,next)=>{
    let params = req.body
    params.id = req.params.id
    await turmaService.patchturma(params)
    .then(ret => res.status(201).send(ret))
    .catch(err => res.status(500).send(err))
}

module.exports.postturma = postturma
module.exports.getturma = getturma
module.exports.deleteturma = deleteturma
module.exports.patchturma = patchturma
module.exports.getturmafindId = getturmafindId
module.exports.getturmafindalunoId = getturmafindalunoId
module.exports.getturmajoinprofessor = getturmajoinprofessor
