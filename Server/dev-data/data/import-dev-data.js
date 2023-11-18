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
    description: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
    imageCover: '1',
    images: ['1, 2, 3, 4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"48 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"13 MP",
    },
});
const product2 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '2',
    images: ['2, 3, 4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"48 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"13 MP",
    },
});
const product3 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '3',
    images: ['3, 2, 3, 4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"48 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"13 MP",
    },
});
const product4 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '4',
    images: ['4, 2, 3, 4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"48 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"13 MP",
    },
});
const product5 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '5',
    images: ['5, 2, 3, 4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"48 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"13 MP",
    },
});
const product6 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '6',
    images: ['6, 2, 3, 4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"48 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"13 MP",
    },
});
const product7 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '7',
    images: ['7, 2, 3, 4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"48 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"13 MP",
    },
});
const product8 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    summary: "summary for a poduct..",
    description: "the longest description for the product in the whole word.",
    imageCover: '8',
    images: ['8, 2, 3, 4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"48 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"13 MP",
    },
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
