const alunoController = require('../controllers/aluno');
const verify = require('../controllers/verifyJWT')
const authorize = require('../controllers/authorize')

module.exports = (app) => {
    app.post('/aluno', alunoController.postAluno)
    app.get('/aluno', verify.verify, authorize.authorize(['professor', 'responsavel']), alunoController.getAluno)
    app.get('/aluno/:id', verify.verify, authorize.authorize(['professor']), alunoController.getAlunofindId)
    app.get('/aluno/responsavel/:idresponsavel', verify.verify, authorize.authorize(['responsavel', 'professor']), alunoController.getAlunosPorResponsavel);
    app.get('/aluno/professor/:professor', verify.verify, authorize.authorize(['responsavel', 'professor']), alunoController.getAlunosPorProfessor);
    app.delete('/aluno/:id', alunoController.deletealuno)   
    app.put('/aluno/:id', alunoController.putaluno)
    app.patch('/aluno/:id', alunoController.patchaluno)
}   