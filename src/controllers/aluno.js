const alunoService = require('../services/aluno')

const postAluno = async (req, res, next) => {
    await alunoService.postAluno(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getAluno = async (req, res, next) => {
    await alunoService.getAluno()
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const getAlunofindId = async (req, res, next) => {
    await alunoService.getAlunofindId(req.params)
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const getAlunosPorResponsavel = async (req, res, next) => {
    await alunoService.getAlunosPorResponsavel(req.params)
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const getAlunosPorProfessor = async (req, res, next) => {
    await alunoService.getAlunosPorProfessor(req.params)
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const deletealuno = async(req,res,next) => {
    await alunoService.deletealuno(req.params)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err)) 
}

const putaluno = async(req,res,next)=>{
    let params = req.body
    params.id = req.params.id
    await alunoService.putaluno(params)
    .then(ret => res.status(201).send(ret))
    .catch(err => res.status(500).send(err))
}

const patchaluno = async(req,res,next)=>{
    let params = req.body
    params.id = req.params.id
    await alunoService.patchaluno(params)
    .then(ret => res.status(201).send(ret))
    .catch(err => res.status(500).send(err))
}

module.exports.postAluno = postAluno
module.exports.getAluno = getAluno
module.exports.deletealuno = deletealuno
module.exports.putaluno = putaluno
module.exports.patchaluno = patchaluno
module.exports.getAlunofindId = getAlunofindId
module.exports.getAlunosPorResponsavel = getAlunosPorResponsavel
module.exports.getAlunosPorProfessor = getAlunosPorProfessor

