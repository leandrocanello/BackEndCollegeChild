const materiaController = require('../controllers/materia')
const verify = require('../controllers/verifyJWT')
const authorize = require('../controllers/authorize')

module.exports = (app) => {
    app.post('/materia', materiaController.postmateria)
    app.get('/materia', verify.verify, authorize.authorize(['professor', 'aluno', 'responsavel']), materiaController.getmateria)
    app.get('/materia/:id', verify.verify, authorize.authorize(['professor', 'aluno']), materiaController.getmateriafindId)
    app.get('/materia/aluno/:idaluno', verify.verify, materiaController.getmateriafindIdaluno)
    app.delete('/materia/:id', materiaController.deletemateria)
    app.patch('/materia/:id', materiaController.patchmateria)
}   