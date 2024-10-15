const responsavelService = require('../services/responsavel')

const postResponsavel = async (req, res, next) => {
    await responsavelService.postResponsavel(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getResponsavel = async (req, res, next) => {
    await responsavelService.getResponsavel()
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}

const getResponsavelfindId = async (req, res, next) => {
    await responsavelService.getResponsavelfindId(req.params)
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}
const deleteResponsavel = async(req,res,next) => {
    await responsavelService.deleteResponsavel(req.params)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err)) 
}

const patchResponsavel = async(req,res,next)=>{
    let params = req.body
    params.id = req.params.id
    await responsavelService.patchResponsavel(params)
    .then(ret => res.status(201).send(ret))
    .catch(err => res.status(500).send(err))
}

module.exports.postResponsavel = postResponsavel
module.exports.getResponsavel = getResponsavel
module.exports.deleteResponsavel = deleteResponsavel
module.exports.patchResponsavel = patchResponsavel
module.exports.getResponsavelfindId = getResponsavelfindId
