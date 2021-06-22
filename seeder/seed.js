// const mongoose = require('mongoose');
// const db = require('../models');


// mongoose.connect('mongodb://localhost/workout', {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// });



// db.transaction.deleteMany({})
//   .then(() => db.transaction.collection.insertMany(transacionSeed))
//   .then((data) => {
//     console.log(data.result.n + ' records inserted!');
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });