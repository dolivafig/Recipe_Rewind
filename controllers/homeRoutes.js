const router = require('express').Router();
const { Recipe } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({});

    const recipes = recipeData.map((project) => project.get({ plain: true }));

    const breakfastRecipes = await Recipe.findAll({
      where: { category: 'Breakfast' },
      limit: 3,
    });

    const lunchRecipes = await Recipe.findAll({
      where: { category: 'Lunch' },
      limit: 3,
    });

    const dinnerRecipes = await Recipe.findAll({
      where: { category: 'Dinner' },
      limit: 3,
    });

    const categories = {
      breakfast: breakfastRecipes,
      lunch: lunchRecipes,
      dinner: dinnerRecipes,
    };

    res.render('homepage', {
      recipes,
      logged_in: req.session.logged_in,
      categories,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


// Define the GET route for /create-account
router.get('/create-account', (req, res) => {
  // Render the create-account view using handlebars
  res.render('create-account');
});

module.exports = router;
