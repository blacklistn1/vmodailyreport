const express = require('express');
const app = express();
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogs');

const port = 8000;
const dbURI = 'mongodb+srv://vuongndv:Bigom.vengeance9567@nodedemo.q0uwv.mongodb.net/tuts1?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('Connect to db. Listening to requests on port ' + port + ' ...');
    app.listen(port);
  })
  .catch(err => console.log(err));

//View engines
app.set('view engine', 'ejs');

//Different middlewares and static files for the requests

app.use(express.static('public'));
//For fetching PUT requests
app.use(express.json());
//For post requests
app.use(express.urlencoded({ extended: true }));
//Different routers for different APIs
app.use('/blogs', blogRouter);


app.get('/', (req, res) => {
  let streamers = [{
      name: 'Gawr Gura',
      branch: 'en'
    },
    {
      name: 'Tsunomaki Watame',
      branch: 'jp'
    },
    {
      name: 'Hoshinova Moona',
      branch: 'id'
    }
  ];
  res.render('index', {
    user: 'Ninomae Inanis',
    streamers
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

//404 page
//app.use is used for every other requests that doesn't go through any routes
app.use((req, res) => {
  res.status(404).render('404');
})
