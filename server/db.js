const mongoose = require('mongoose')

module.exports = async function () {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ajbmevb.mongodb.net/${process.env.DB_TITLE}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB successfully')
  } catch (e) {
    console.log('Connection error:', e)
    throw new Error(e)
  }
}
