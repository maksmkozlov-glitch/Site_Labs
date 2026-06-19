const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

module.exports = (programController) => {
    router.get('/', auth, programController.getAll);
    router.post('/', auth, programController.create);
    router.delete('/:id', auth, programController.delete);
    return router;
};