const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Blog = require('./blog');

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    comment: {
        type: Sequelize.STRING,
    }
});


module.exports = Comment;