const notaController = require('../controllers/nota')
const verify = require('../controllers/verifyJWT')
const authorize = require('../controllers/authorize')

module.exports = (app) => {
    app.post('/nota', notaController.postnota)
    app.get('/nota', verify.verify, authorize.authorize(['professor']), notaController.getnota)
    app.get('/nota/:id', verify.verify, authorize.authorize(['professor', 'aluno', 'responsavel']), notaController.getnotafindId)
    app.get('/nota/aluno/:idaluno', verify.verify, authorize.authorize(['professor', 'aluno', 'responsavel']), notaController.getnotafindAluno)
    app.post('/nota/notaSemestre', verify.verify, authorize.authorize(['professor', 'responsavel']), notaController.getNotasemestre)
    app.get('/aluno_gamificacao/:idaluno', verify.verify, authorize.authorize(['aluno']), notaController.getAlunoGamificacao);
    app.delete('/nota/:id', notaController.deletenota)
    app.patch('/nota/:id', notaController.patchnota)
}   