const express = require("express");
const mongoose = require("mongoose");
 const logger = require("morgan")
 const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

// Concise output colored by response status for development use.
app.use(logger("dev"));

app.use(express.json());
app.use.apply(compression());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout', 
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
