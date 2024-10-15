const usuarioController = require('../controllers/usuario');
const verify = require('../controllers/verifyJWT')
const authorize = require('../controllers/authorize')

module.exports = (app) => {
    app.post('/usuario', usuarioController.postUser)
    app.get('/usuario', verify.verify, authorize.authorize(['professor']), usuarioController.getUser)
    app.get('/usuario/:id', verify.verify, authorize.authorize(['professor']), usuarioController.getUserfindId)
    app.delete('/usuario/:id', verify.verify, authorize.authorize(['professor']), usuarioController.deleteUser)
    app.patch('/usuario/:id', verify.verify, authorize.authorize(['professor', 'aluno', 'responsavel']), usuarioController.patchUser)
}       