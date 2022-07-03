const router = require('express').Router();
const userController = require('../controllers/userController');
const reviewController = require('../controllers/ReviewController.js');

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


router.get('/get-create-review', reviewController.getCreateReview);

//For Watchlist
//app.get('/edit-watchlist', isPrivate, watchlistController.editWatchlist);
//app.get('/new-watchlist', isPrivate, watchlistController.newWatchlist);

module.exports = router;
