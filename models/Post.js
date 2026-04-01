const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Post = sequelize.define('Post', {
  title:   { type: DataTypes.STRING, allowNull: false },
  slug:    { type: DataTypes.STRING, unique: true, allowNull: false },
  subject: { type: DataTypes.TEXT, allowNull: false },
});

// Relationship
User.hasMany(Post, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Post;