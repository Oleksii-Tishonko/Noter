const dotenv = require('dotenv');
const mongoose = require('mongoose');

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