const notaService = require('../services/nota')

const postnota = async (req, res, next) => {
    await notaService.postnota(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getnota = async (req, res, next) => {
    await notaService.getnota()
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const getnotafindId = async (req, res, next) => {
    await notaService.getnotafindId(req.params)
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const getAlunoGamificacao = async (req, res, next) => {
    const { idaluno } = req.params;
    await notaService.getAlunoGamificacao(idaluno)
        .then(ret => res.status(200).send(ret.rows[0]))
        .catch(err => res.status(500).send(err));
};

const getnotafindAluno = async (req, res, next) => {
    const { idaluno } = req.params;
    await notaService.getnotafindAluno(idaluno)
        .then(ret => res.status(200).send(ret.rows))
        .catch(err => res.status(500).send(err));
};
const getNotasemestre = async (req, res, next) => {
    await notaService.getNotasemestre(req.body)
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const deletenota = async(req,res,next) => {
    await notaService.deletenota(req.params)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err)) 
}

const patchnota = async(req,res,next)=>{
    let params = req.body
    params.id = req.params.id
    await notaService.patchnota(params)
    .then(ret => res.status(201).send(ret))
    .catch(err => res.status(500).send(err))
}

module.exports.postnota = postnota
module.exports.getnota = getnota
module.exports.getnotafindId = getnotafindId
module.exports.deletenota = deletenota
module.exports.patchnota = patchnota
module.exports.getNotasemestre = getNotasemestre
module.exports.getAlunoGamificacao = getAlunoGamificacao;
module.exports.getnotafindAluno = getnotafindAluno;