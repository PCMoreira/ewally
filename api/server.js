require('dotenv').config();
const express = require('express');
const v1 = require('./routes/versions/v1');

const port = process.env.PORT || 3000;
const app = express();


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); 
  next();
});

// Create a server side router
v1(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = {
    app
};
