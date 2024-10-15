const professorController = require('../controllers/professor')
const verify = require('../controllers/verifyJWT')
const authorize = require('../controllers/authorize')

module.exports = (app) => {
    app.post('/professor', professorController.postProfessor)
    app.get('/professor', verify.verify, authorize.authorize(['professor', 'aluno']), professorController.getProfessor)
    app.get('/professor/:id', verify.verify, authorize.authorize(['professor']), professorController.getProfessorfindId)
    app.delete('/professor/:id', professorController.deleteprofessor)
    app.patch('/professor/:id', professorController.patchprofessor)
}   