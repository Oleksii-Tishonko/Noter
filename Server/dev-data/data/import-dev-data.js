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
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '1',
});
const product2 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '2',
});
const product3 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '3',
});
const product4 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '4',
});
const product5 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '5',
});
const product6 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '6',
});
const product7 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '7',
});
const product8 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '8',
});

const products = [product1, product2, product3, product4, product5, product6, product7, product8];

const importData = async () => {
    try{
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
