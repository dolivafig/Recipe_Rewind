const router = require('express').Router();
const { User } = require('../../models');
const { Recipe } = require('../../models');
const fs = require('fs');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {

    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/create-account', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    console.log(user)
    const data = fs.readFileSync('./seeds/userData.json', { encoding: 'utf8' });

    // Convert string into JSON object
    const parsedUsers = JSON.parse(data);
    parsedUsers.push(user);
    fs.writeFileSync('./seeds/userData.json', JSON.stringify(parsedUsers, null, 4));

    res.json(parsedUsers);
    return;

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/addrecipe', async (req, res) => {
  try {
    const { recipeName, ingredients, method, category } = req.body;
    const recipe = await Recipe.create({ recipeName, ingredients, method, category });
    console.log(recipe)
    const data = fs.readFileSync('./seeds/recipes.json', { encoding: 'utf8' });
    const parsedRecipes = JSON.parse(data);
    parsedRecipes.push(recipe);
    fs.writeFileSync('./seeds/recipes.json', JSON.stringify(parsedRecipes, null, 4));
    res.json(parsedRecipes);
    return;

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
