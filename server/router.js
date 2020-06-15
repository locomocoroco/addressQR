const router = require('express').Router();
const { register, login, logout, visited, visit, userbyid, verifyBusiness } = require('./controller/users');
const jwtauth  = require('./middleware/auth');

router.post('/register', register)
router.post('/login', login);
router.post('/logout', jwtauth, logout);
router.post('/visit', jwtauth , visit);
router.get('/visited', jwtauth, visited);
router.get('/user', jwtauth, userbyid);
router.post('verify', jwtauth, verifyBusiness)

module.exports = router;