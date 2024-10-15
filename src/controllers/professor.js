const professorService = require('../services/professor')

const postProfessor = async (req, res, next) => {
    await professorService.postProfessor(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getProfessor = async (req, res, next) => {
    await professorService.getProfessor()
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const getProfessorfindId = async (req, res, next) => {
    await professorService.getProfessorfindId(req.params)
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const deleteprofessor = async(req,res,next) => {
    await professorService.deleteprofessor(req.params)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err)) 
}

const patchprofessor = async(req,res,next)=>{
    let params = req.body
    params.id = req.params.id
    await professorService.patchprofessor(params)
    .then(ret => res.status(201).send(ret))
    .catch(err => res.status(500).send(err))
}

module.exports.postProfessor = postProfessor
module.exports.getProfessor = getProfessor
module.exports.getProfessorfindId = getProfessorfindId
module.exports.deleteprofessor = deleteprofessor
module.exports.patchprofessor = patchprofessor
