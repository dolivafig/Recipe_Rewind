const sequelize = require('../config/connection');

const { User } = require('../models');
const { Recipe } = require('../models');

const userData = require('./userData.json');
const recipeData = require('./recipes.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: false });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Recipe.bulkCreate(recipeData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

// FOLLOWING WAS USED TO EXPORT THE seedDatabase () to seed the JAWSDB on the server.

// module.exports = {
//   seedDatabase: async () => {
//     await sequelize.sync({ force: false });
  
//     await User.bulkCreate(userData, {
//       individualHooks: true,
//       returning: true,
//     });
  
//     await Recipe.bulkCreate(recipeData, {
//       individualHooks: true,
//       returning: true,
//     });
//   }};