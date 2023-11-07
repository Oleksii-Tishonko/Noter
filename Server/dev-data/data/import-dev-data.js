const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./../../models/productModel');

dotenv.config({path: './config.env'});

const database = process.env.DATABASE_LOCAL;

mongoose.connect(database)
.then((connection) => {
    console.log('Database connected!');
});

const product1 = new Product({
    name: "Product1",
    price: 150,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '1',
});

const products = [product1];

const importData = async () => {
    try{
        await product1.save();
        await Product.create(products);
        console.log('Data successfully loaded.');
    } catch (err) {
        console.log(err);
     } finally {
        process.exit();
    }
}

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('All data deleted!');
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

if(process.argv[2] === '--import'){
    importData();
}
if(process.argv[2] === '--delete'){
    deleteData();
}
console.log(process.argv);
