require('dotenv').config();
const express = require('express');
const http = require('http');
const bluebird = require('bluebird');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');



const app = express();

(async () => {
  app.use(cors());
  app.use(bodyParser.json({limit: '100mb'}));
  app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
  app.use(
      '/images',
      express.static(path.join(__dirname, 'uploads')),
  );

  console.log(__dirname);
 
  app.use('/', routes);
  try {
    mongoose.Promise = bluebird;
    await mongoose.connect('mongodb://localhost:27017/arkenea', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully Connected to the Mongodb.');
    await http.createServer(app).listen(8080, '0.0.0.0');
    console.log('Express server listening on port 8080');
  } catch (err) {
    console.log(err);
  }
})();