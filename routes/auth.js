const router = require('express').Router();
const userController = require('../controllers/userController');
const { registerValidation } = require('../validators');

router.get('/login', (req, res) => {
    res.render('login', {
        pageTitle: 'Login',
    });
});

router.get('signup', (req, res) => {
    res.render('register', {
        pageTitle: 'Sign Up',
    });
});

router.post('/signup', registerValidation, userController.signup);
router.post('/login', userController.login);

router.get('/logout', userController.logout);

module.exports = router;
