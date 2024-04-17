const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const blogRoutes = require('./routes/blog');
const commentRoutes = require('./routes/comment');

app.use(cors());
// {
//     origin: 'http://127.0.0.1:5500'
// }
  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/blog', blogRoutes);
app.use('/comment', commentRoutes);

sequelize.sync().then((result) => {
    // console.log(result);
    app.listen(3000);
}).catch(err => console.log(err));

// {force:true}