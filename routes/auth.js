const router = require('express').Router();
const userController = require('../controllers/userController');
const { registerValidation, loginValidation } = require('../validators');
const { isPublic, isPrivate } = require('../middlewares/checkAuth');

router.get('/get-login', isPublic, (req, res) => {
  res.render('login', {
    pageTitle: 'Login',
  });
});

router.get('/get-signup', isPublic, (req, res) => {
  res.render('signup', {
    pageTitle: 'Sign Up',
  });
});

router.post('/signup', isPublic, registerValidation, userController.signup);
router.post('/login', isPublic, loginValidation, userController.login);
router.get('/logout', isPrivate, userController.logout);

module.exports = router;
