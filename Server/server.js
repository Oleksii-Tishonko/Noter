const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  //shutting down
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');


const database = process.env.DATABASE_LOCAL;

mongoose.connect(database,{
    
})
.then((connection) => {
    console.log('Database connected!');
})

const port = process.env.PORT || 3050;
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

process.on('unhandledRejction', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');

  //finish requests
  server.close(() => {
    //shutting down
    process.exit(1);
  })
})