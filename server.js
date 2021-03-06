const express = require("express");
const mongoose = require("mongoose");
 const logger = require("morgan")
 const compression = require("compression");


 const app = express();
const PORT = process.env.PORT || 3001;


// Concise output colored by response status for development use.
app.use(logger("dev"));


app.use(compression());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/budget', 
    {
       useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );
  

app.use(require('./routes/api.js'));
// app.use(require('./routes/routes.js'));


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
