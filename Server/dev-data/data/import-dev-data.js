const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./../../models/productModel');
const Review = require('./../../models/reviewModel');

dotenv.config({path: './config.env'});

const database = process.env.DATABASE_LOCAL;

mongoose.connect(database)
.then((connection) => {
    console.log('Database connected!');
});

//#region  Tablets
const product1 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    category: '6563eded264bc5e56b3e415e',
    summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
    description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
    imageCover: '1',
    images: ['1', '2', '3', '4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"48 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"13 MP",
        "Screen Size":"7 inches",
    },
});
const product2 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    category: '6563eded264bc5e56b3e415e',
    summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
    description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
    imageCover: '2',
    images: ['2', '3', '4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"48 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"18 MP",
        "Screen Size":"7 inches",
    },
});
const product3 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    category: '6563eded264bc5e56b3e415e',
    summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
    description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
    imageCover: '3',
    images: ['3', '2', '3', '4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"46 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"18 MP",
        "Screen Size":"7 inches",
    },
});
const product4 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    category: '6563eded264bc5e56b3e415e',
    summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
    description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
    imageCover: '4',
    images: ['4', '2', '3', '4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"46 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"13 MP",
        "Screen Size":"10 inches",
    },
});
const product5 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    category: '6563eded264bc5e56b3e415e',
    summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
    description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
    imageCover: '5',
    images: ['5', '2', '3', '4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"46 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"13 MP",
        "Screen Size":"10 inches",
    },
});
const product6 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    category: '6563eded264bc5e56b3e415e',
    summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
    description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
    imageCover: '6',
    images: ['6', '2', '3', '4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"48 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"13 MP",
        "Screen Size":"10 inches",
    },
});
const product7 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    category: '6563eded264bc5e56b3e415e',
    summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
    description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
    imageCover: '7',
    images: ['7', '2', '3', '4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"48 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"18 MP",
        "Screen Size":"10 inches",
    },
});
const product8 = new Product({
    name: "Apple iPad 2018 32GB - WiFi Only",
    price: 200,
    category: '6563eded264bc5e56b3e415e',
    summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
    description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
    imageCover: '8',
    images: ['8', '2', '3', '4'],
    specifications: {
        "Model": "Galaxy A32 5G",
        "Back-Facing Camera":"48 MP",
        "Colour":"Black",
        "Contained Battery Type":"7",
        "Front-Facing Camera":"13 MP",
        "Screen Size":"12 inches",
    },
});

const review1 = new Review({
    header: "Great product!",
    text: "I love this product!",
    product: product1._id,
});
const review2 = new Review({
    header: "Would definitely buy again",
    text: "For a refurbished item this unit is very good. I bought two for my granddaughters. Paid $14.48 each as compared to the price of new ones. Children are both 4 years old, so if they break them no harm no foul.",
    product: product1._id,
});
const review3 = new Review({
    header: "Great phone for the price",
    text: "Not much bigger than my last phone, but way faster! Good price as I got it on sale. Has great features I'm still learning. Some really nice accessories too. Overall very pleased with his purchase Thx Noter!",
    product: product1._id,
});
const review4 = new Review({
    header: "Easy phones",
    text: "The Noter package arrived quickly and was as ordered. The four handset phone system works well in our home. Good sound. Ergonomic. We have had good success with similar Panasonic phones in the past and are hopeful that these will be equally good.",
    product: product1._id,
});
//#endregion Tablets

//#region Laptops

const product9 = new Product({
    name: "ACEMAGIC Laptop 16GB DDR4 512GB SSD, Quad-Core Intel N95 Processor(Up to 3.4GHz), Windows 11 Ordinateur Portable, 15.6 inch FHD Laptop",
    price: 649,
    category: '6563eded264bc5e56b3e415f',
    description: "ACEMAGIC AX15 Windows 11 laptop is powered by a faster Intel 12th generation Alder Lake N95 Quad-Core processor (Frequency 1.7GHz-3.4GHz). The performance of N95 (Intel 7) is 30% higher than N5095 (10nm). Besides, it will also release the performance of the 12th generation small core more thoroughly than N100 (15W vs 6W). Built-in 16GB RAM and 512GB SSD large capacity, fast response to your daily tasks.【1920×1080 Bright View】 The 15.6 inch laptop features an innovative thin-bezel IPS display that provides more usable onscreen space for immersive Full HD viewing while giving you a laptop with a more compact footprint. Equipped with a flat hinge that can unfold the laptop to 180° and a wide-angle webcam centered above the screen frame, allowing you to expand more usage scenarios.",
    imageCover: '8lzN4L2DRd5Nh1xM',
    images: ['8lzN4L2DRd5Nh1xM', 'zV0d1QRYzV5Ij7Ez', 'BlIBbs8yKCdO51ho', 'dBEbksMf6sfhUWzN'],
    specifications: {
        "Brand": "ACEMAGIC",
        "Model": "AX15",
        "Screen size": "15.6 Inches",
        "Colour": "Gray",
        "Hard disk size": "512 GB",
        "CPU model": "Intel Mobile CPU",
        "RAM size": "16 GB",
        "Operating system": "Windows 11",
        "Graphics card":  "Intel UHD Graphics",
        "Graphics card frequency": "1200MHz",
        "Graphics card type": "Integrated",
    },
});

//#endregion Laptops

const reviews = [review1, review2, review3, review4];

const products = [product1, product2, product3, product4, product5, product6, product7, product8, product9];

const importData = async () => {
    try{
      await Product.create(products);
      await Review.create(reviews);
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
    await Review.deleteMany();
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
