const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.sjbhwih.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Nodetuts';
mongoose.connect(dbURI)
.then(result => app.listen(3000))
.catch(error => console.log(error));

// register view engine
app.set('view engine', 'ejs');


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));
app.use((request, response, next) => {
    response.locals.path = request.path;
    next();
});

// routes
app.get('/', (request, response) =>{
    response.redirect('/blogs');
});

app.get('/about', (request, response) =>{
    //response.send('<p>about page</p>');
    response.render('about', {title: 'About'});
});

//blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((request, response) => {
    response.status(404).render('404', {title: '404'});
});

