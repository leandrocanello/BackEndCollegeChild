const turmaController = require('../controllers/turma');
const verify = require('../controllers/verifyJWT')
const authorize = require('../controllers/authorize')

module.exports = (app) => {
    app.post('/turma', turmaController.postturma)
    app.get('/turma', verify.verify, authorize.authorize(['professor', 'aluno']), turmaController.getturma)
    app.get('/turma/professor', verify.verify, authorize.authorize(['professor', 'aluno']), turmaController.getturmajoinprofessor)
    app.get('/turma/:id', verify.verify, authorize.authorize(['professor', 'aluno']), turmaController.getturmafindId)
    app.get('/turma/aluno/:idaluno', verify.verify, turmaController.getturmafindalunoId)
    //app.get('/turma/a', verify.verify, authorize.authorize(['professor', 'aluno']), turmaController.getturma) 
    app.delete('/turma/:id', verify.verify, authorize.authorize(['professor']), turmaController.deleteturma)
    app.patch('/turma/:id', verify.verify, authorize.authorize(['professor']), turmaController.patchturma)
}   