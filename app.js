const sequelize = require('./config/database');
const User = require('./models/User');
const Post = require('./models/Post');

sequelize.sync({ force: false })
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Database sync error:', err));