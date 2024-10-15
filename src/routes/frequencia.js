const frequenciaController = require('../controllers/frequencia')
const verify = require('../controllers/verifyJWT')
const authorize = require('../controllers/authorize')

module.exports = (app) => {
    app.post('/frequencia', frequenciaController.postfrequencia)
    app.get('/frequencia', verify.verify, authorize.authorize(['professor']), frequenciaController.getfrequencia)
    app.get('/frequencia/:id', verify.verify, authorize.authorize(['professor', 'aluno']), frequenciaController.getfrequenciafindId)
    app.get('/frequencia/responsavel/:id', verify.verify, authorize.authorize(['professor', 'responsavel']), frequenciaController.getfrequenciafindIdresponsavel) 
    app.delete('/frequencia/:id', frequenciaController.deletefrequencia)
    app.patch('/frequencia/:id', frequenciaController.patchfrequencia)
}   