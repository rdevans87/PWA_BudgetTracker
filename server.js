const express = require("express");
const mongoose = require("mongoose");
 const logger = require("morgan")

onst PORT = process.env.PORT || 3000;

const app = express();

// Concise output colored by response status for development use.
app.use(logger("dev"));


app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout', 
    {
       useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );
  