const { Router } = require('express');
const router = Router();
const userController = require('./userController');


router.get('/api/usuarios', userController.getUsers);
router.get('/api/usuarios/:id', userController.getIdUsers);
router.post('/api/usuarios', userController.postUser);
router.put('/api/usuarios/:id', userController.updateUser);
router.delete('/api/usuarios/:id', userController.deleteUser);


module.exports = router;