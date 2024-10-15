const alunomateriaController = require('../controllers/alunomateria')
const verify = require('../controllers/verifyJWT')
const authorize = require('../controllers/authorize')

module.exports = (app) => {
    app.post('/alunomateria', verify.verify, authorize.authorize(['professor']), alunomateriaController.postalunomateria)
    app.get('/alunomateria', verify.verify, authorize.authorize(['professor']), alunomateriaController.getalunomateria)
    app.get('/alunomateria/:id', verify.verify, authorize.authorize(['professor']), alunomateriaController.getalunomateriafindId)
    app.delete('/alunomateria/:id', alunomateriaController.deletealunomateria)
    app.patch('/alunomateria/:id', alunomateriaController.patchalunomateria)
    app.get('/buscausuariologado/:id/:role', verify.verify, alunomateriaController.buscausuariologado)   
}