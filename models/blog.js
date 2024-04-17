const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Comment = require('./comment');

const Blog = sequelize.define('blog', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: Sequelize.STRING,
    author: {
        type: Sequelize.STRING,
    },
    content: {
        type: Sequelize.TEXT,
    }
});

Blog.hasMany(Comment, {onDelete: 'CASCADE'});

module.exports = Blog;