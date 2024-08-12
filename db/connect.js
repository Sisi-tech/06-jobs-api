const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
<<<<<<< HEAD
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
=======
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("Connected to the DB...");
  })
  .catch((err) => {
    console.error("Database connection Error: ", err);
>>>>>>> ef817e3 (assignment for week9 - Jobs-api-part1)
  })
}

module.exports = connectDB
