const router = require('express').Router();
const { User } = require('../../models');
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

  //   fs.readFile('../seeds/userData.json', 'utf8', (err, data) => {
  //     if (err) {
  //         console.error(err);
  //     } else {
  //         // Convert string into JSON object
  //         const parsedNotes = JSON.parse(data);

  //         // Add a new review
  //         parsedNotes.push(user);

  //         // Write updated reviews back to the file
  //         fs.writeFile(
  //             '../seeds/userData.json',
  //             JSON.stringify(parsedNotes, null, 4),
  //             (writeErr) =>
  //                 writeErr
  //                     ? console.error(writeErr)
  //                     : console.info('Successfully updated notes!')
  //         );
  //     }
  // });

}catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
