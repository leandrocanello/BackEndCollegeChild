const responsavelController = require('../controllers/responsavel');
const verify = require('../controllers/verifyJWT')
const authorize = require('../controllers/authorize')

module.exports = (app) => {
    app.post('/responsavel', responsavelController.postResponsavel)
    app.get('/responsavel', verify.verify, authorize.authorize(['professor']), responsavelController.getResponsavel)
    app.get('/responsavel/:id', verify.verify, authorize.authorize(['professor']), responsavelController.getResponsavelfindId)
    app.delete('/responsavel/:id', verify.verify, authorize.authorize(['professor']), responsavelController.deleteResponsavel)
    app.patch('/responsavel/:id', verify.verify, authorize.authorize(['professor']), responsavelController.patchResponsavel)
}   