const router = require('express').Router();
const { register, login, logout, visited, user } = require('./controller/user');

router.post('/register', register)
router.post('/login', login);
router.post('logout', logout);
router.get('/visited', visited);
router.get('/user', user);

module.exports = router;