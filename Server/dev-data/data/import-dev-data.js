const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./../../models/productModel');
const Review = require('./../../models/reviewModel');
const Category = require('./../../models/categoryModel');

dotenv.config({path: './config.env'});

const database = process.env.DATABASE_LOCAL;

mongoose.connect(database)
.then((connection) => {
    console.log('Database connected!');
});

//#region  Tablets
// const product1 = new Product({
//     name: "Apple iPad 2018 32GB - WiFi Only",
//     price: 200,
//     category: '6563eded264bc5e56b3e415e',
//     summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
//     description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
//     imageCover: '1',
//     images: ['1', '2', '3', '4'],
//     specifications: {
//         "Model": "Galaxy A32 5G",
//         "Back-Facing Camera":"48 MP",
//         "Colour":"Black",
//         "Contained Battery Type":"7",
//         "Front-Facing Camera":"13 MP",
//         "Screen Size":"7 inches",
//     },
// });
// const product2 = new Product({
//     name: "Apple iPad 2018 32GB - WiFi Only",
//     price: 200,
//     category: '6563eded264bc5e56b3e415e',
//     summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
//     description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
//     imageCover: '2',
//     images: ['2', '3', '4'],
//     specifications: {
//         "Model": "Galaxy A32 5G",
//         "Back-Facing Camera":"48 MP",
//         "Colour":"Black",
//         "Contained Battery Type":"7",
//         "Front-Facing Camera":"18 MP",
//         "Screen Size":"7 inches",
//     },
// });
// const product3 = new Product({
//     name: "Apple iPad 2018 32GB - WiFi Only",
//     price: 200,
//     category: '6563eded264bc5e56b3e415e',
//     summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
//     description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
//     imageCover: '3',
//     images: ['3', '2', '3', '4'],
//     specifications: {
//         "Model": "Galaxy A32 5G",
//         "Back-Facing Camera":"46 MP",
//         "Colour":"Black",
//         "Contained Battery Type":"7",
//         "Front-Facing Camera":"18 MP",
//         "Screen Size":"7 inches",
//     },
// });
// const product4 = new Product({
//     name: "Apple iPad 2018 32GB - WiFi Only",
//     price: 200,
//     category: '6563eded264bc5e56b3e415e',
//     summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
//     description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
//     imageCover: '4',
//     images: ['4', '2', '3', '4'],
//     specifications: {
//         "Model": "Galaxy A32 5G",
//         "Back-Facing Camera":"46 MP",
//         "Colour":"Black",
//         "Contained Battery Type":"7",
//         "Front-Facing Camera":"13 MP",
//         "Screen Size":"10 inches",
//     },
// });
// const product5 = new Product({
//     name: "Apple iPad 2018 32GB - WiFi Only",
//     price: 200,
//     category: '6563eded264bc5e56b3e415e',
//     summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
//     description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
//     imageCover: '5',
//     images: ['5', '2', '3', '4'],
//     specifications: {
//         "Model": "Galaxy A32 5G",
//         "Back-Facing Camera":"46 MP",
//         "Colour":"Black",
//         "Contained Battery Type":"7",
//         "Front-Facing Camera":"13 MP",
//         "Screen Size":"10 inches",
//     },
// });
// const product6 = new Product({
//     name: "Apple iPad 2018 32GB - WiFi Only",
//     price: 200,
//     category: '6563eded264bc5e56b3e415e',
//     summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
//     description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
//     imageCover: '6',
//     images: ['6', '2', '3', '4'],
//     specifications: {
//         "Model": "Galaxy A32 5G",
//         "Back-Facing Camera":"48 MP",
//         "Colour":"Black",
//         "Contained Battery Type":"7",
//         "Front-Facing Camera":"13 MP",
//         "Screen Size":"10 inches",
//     },
// });
// const product7 = new Product({
//     name: "Apple iPad 2018 32GB - WiFi Only",
//     price: 200,
//     category: '6563eded264bc5e56b3e415e',
//     summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
//     description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
//     imageCover: '7',
//     images: ['7', '2', '3', '4'],
//     specifications: {
//         "Model": "Galaxy A32 5G",
//         "Back-Facing Camera":"48 MP",
//         "Colour":"Black",
//         "Contained Battery Type":"7",
//         "Front-Facing Camera":"18 MP",
//         "Screen Size":"10 inches",
//     },
// });
// const product8 = new Product({
//     name: "Apple iPad 2018 32GB - WiFi Only",
//     price: 200,
//     category: '6563eded264bc5e56b3e415e',
//     summary: "Refurbished, Mint Condition – may have minor scuffs or scratches. This Apple iPhone 12 Pro 128GB is a refurbished, fully tested alternative to buying brand new. This device has gone through a multi-point inspection to ensure that it is fully functional. This device comes packaged in a 'The Mobile Base' branded box, along with a USB cable and wall USB adapter.",
//     description: "Experience outstanding performance with the unlocked Samsung Galaxy A32 smartphone. Its 5G speed allows you to download, stream, or browse smoothly and quickly. The 6.5 Infinity-V display with HD+ resolution showcases everything clearly with vivid details. Plus, the 5-lens camera lets you capture everything beautifully.  Transform your experience Immerse yourself in the expansive 6.5” HD+ Infinity-V display Get 64GB of built-in storage plus an expandable memory up to 1TB (memory cards sold separately) 8 x 2.0GHz CPU and 4GB of RAM offer great processing performance for smooth multitaskingPro-grade cameras Capture the beauty in the everyday with 4 lenses in the back plus a flattering front-facing camera",
//     imageCover: '8',
//     images: ['8', '2', '3', '4'],
//     specifications: {
//         "Model": "Galaxy A32 5G",
//         "Back-Facing Camera":"48 MP",
//         "Colour":"Black",
//         "Contained Battery Type":"7",
//         "Front-Facing Camera":"13 MP",
//         "Screen Size":"12 inches",
//     },
// });

// const review1 = new Review({
//     header: "Great product!",
//     text: "I love this product!",
//     product: product1._id,
// });
// const review2 = new Review({
//     header: "Would definitely buy again",
//     text: "For a refurbished item this unit is very good. I bought two for my granddaughters. Paid $14.48 each as compared to the price of new ones. Children are both 4 years old, so if they break them no harm no foul.",
//     product: product1._id,
// });
// const review3 = new Review({
//     header: "Great phone for the price",
//     text: "Not much bigger than my last phone, but way faster! Good price as I got it on sale. Has great features I'm still learning. Some really nice accessories too. Overall very pleased with his purchase Thx Noter!",
//     product: product1._id,
// });
// const review4 = new Review({
//     header: "Easy phones",
//     text: "The Noter package arrived quickly and was as ordered. The four handset phone system works well in our home. Good sound. Ergonomic. We have had good success with similar Panasonic phones in the past and are hopeful that these will be equally good.",
//     product: product1._id,
// });
//#endregion Tablets

//#region Laptops

const product9 = new Product({
    name: "ACEMAGIC Laptop 16GB DDR4 512GB SSD, Quad-Core Intel N95 Processor(Up to 3.4GHz), Windows 11 Ordinateur Portable, 15.6 inch FHD Laptop",
    price: 649,
    category: '657e0d29c1cb6b530d5a1203',
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
        "Graphics card frequency": "1.2GHz",
        "Graphics card type": "Integrated",
        "Display Resolution": "1920 x 1080 Pixels",
        "Average Battery Life (in hours)": "8 Hours",
        "Processor Brand": "Intel",
        "Number of Processors": "4",
        "Processor frequency": "3.4 GHz",
        "Item model number": "AX15",
        "Hardware Platform": "PC",
        "Memory Type": "DDR4",

    },
});

const product10 = new Product({
    name: "Lenovo Slim 3 Chromebook, 14″ FHD IPS Touchscreen Laptop, MediaTek Kompanio 520 Processor, 4GB RAM, 64GB eMMC, HD Webcam, Stereo Speakers, WiFi 6, Chrome OS, Abyss Blue, 32GB Hotface USB Card",
    price: 379,
    category: '657e0d29c1cb6b530d5a1203',
    description: "【14 FHD Touchscreen Display】Embark on a visual journey where vibrant colors and high resolution come to life at your fingertips. The captivating clarity and brilliance will surely enhance your work and entertainment endeavors.【MediaTek Kompanio 520 Processor】 Experience a perfect balance of performance and efficiency with a powerful processor, delivering smooth multitasking, reliable performance, and impressive power savings, making it an excellent choice for everyday computing tasks.【4 GB RAM LPDDR4X】Plenty of high bandwidth to run multiple programs simultaneously without any slowdowns.【64 GB eMMC】Massive storage space for your files, applications, and multimedia content, providing fast and reliable data access.【MediaTek Integrated Graphics】Enjoy solid image quality that brings your everyday content to life with vibrant colors and sharp details.【720p HD Camera】Provides high quality video calls, virtual meetings and online interactions.【Anti-Glare Screen】Ensures comfortable viewing, enhancing your visual experience to the fullest.【Chrome OS】Embrace natural controls that empower you to think, express and create in an efficient way, all within an ultra-secure environment.【Wi-Fi 6】Experience blazing-fast speed, reduced latency, and uninterrupted performance for seamless online gaming.【Ports and Accessories】1x USB-C 3.2 Gen 1, 1x USB-A 3.2 Gen 1, 1x MicroSD card slot, 1x Headphone/mic combo, 1x Kensington lock slot. Bluetooth 5.1. Bonus 32GB Hotface USB Card.",
    imageCover: "PcuRJziGlu9iFORp",
    images: ["PcuRJziGlu9iFORp", "kruCDOeMz0bxCfDa", "qgeOcLwCZG6l4Oe7", "7VEhvo4SCnFJh5zi"],
    specifications: {
        "Standing screen display size": "14 Inches",
        "Display Resolution": "1920 x 1080",
        "Max screen resolution": "1920 x 1080 Pixels",
        "Processor": "2.05 GHz mediatek_mt8183",
        "RAM": "4 GB",
        "Hard Drive": "64 GB",
        "Graphics coprocessor": "MediaTek Integrated Graphics",
        "Card description": "Integrated",
        "Wireless Standard": "802.11ax",
        "Brand": "Lenovo",
        "Item model number": "Lenovo Slim 3",
        "Hardware Platform": "PC",
        "Operating System": "Chrome OS",
        "Parcel Dimensions": "45.7 x 28.5 x 9.2 cm; 2 Kilograms",
        "Colour": "Blue",
        "Processor Brand": "MediaTek",
        "Number of Processors": "8",
        "Memory Type": "DDR4",
        "Hard Disk Interface": "Solid State"
    },
});

const product11 = new Product({
    name: "Acer TravelMate P449 G3 Laptop, 14\" Business Laptop, Intel Core i5-6200, 20GB RAM 512GB SSD, Backlit Keyboard, Fingerprint, Windows 10 Pro",
    price: 489,
    category: '657e0d29c1cb6b530d5a1203',
    description: `Acer TravelMate P449 G3 Laptop, with Intel Core i5-6200 processor, 1.60 GHz up to 3.40 GHz. Smoothly and quickly view and edit large spreadsheets, presentations, and videos with a powerful processor【Memory and Storage】20GB DDR4 RAM and 512GB SSD, strong storage space to meet your daily needs【Display】14-inch HD display, the resolution makes crisp and sharp【Operating System】Windows 10 Pro 64 Bit, Multi-language supports English/Spanish/French, for regular office work, web browsing, watching videos, and playing games`,
    imageCover: "FR8HX2hNtb83QM46",
    images: ["FR8HX2hNtb83QM46", "gyygIkyqulWpPifh", "ZiS8WNYElV8GwAaA", "zxZ4KSappcXr9yOi"],
    specifications: {
        "Standing screen display size": "14 Inches",
        "Display Resolution": "1366 x 768",
        "Max screen resolution": "1366 x 768 Pixels",
        "Processor": "2.4 GHz core_i5_6200u",
        "RAM": "8 GB",
        "Hard Drive": "512 GB",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Average Battery Life (in hours)": "10 Hours",
        "Brand": "Acer",
        "Series": "Acer TravelMate P449-G3",
        "Item model number": "TravelMate P449-G3",
        "Operating System": "Windows 10 Pro",
        "Parcel Dimensions": "39.1 x 30.8 x 7.1 cm; 2.6 Kilograms",
        "Processor Brand": "Intel",
        "Number of Processors": "1",
        "Optical Storage Device Type": "No"
    },
});

const product12 = new Product({
    name: `Acer Chromebook 315, 15.6" HD Widescreen, Intel Celeron N4020, 4GB LPDDR4, 64GB eMMC, Chrome OS, CB315-3H-C0UU`,
    price: 319,
    category: '657e0d29c1cb6b530d5a1203',
    description: `Intel Celeron N4020 Dual-Core Processor (Up to 2.8GHz) 15.6" HD Widescreen ComfyView LED-backlit Display. Touchscreen: No 4GB of Onboard LPDDR4 Memory and 64GB eMMC.If your laptop keeps shutting down often, try blowing air into the side vent to get rid of dust Intel Wireless-AC 9560 802.11ac Gigabit WiFi with 2x2 MU-MIMO Technology which can deliver up to 1.73Gbps throughput when using 160Mhz channels (Dual-Band 2.4GHz and 5GHz) 2 - USB Type-C ports USB 3.1 Gen 1 (up to 5 Gbps) DisplayPort over USB Type-C & USB Charging and 2 - USB 3.2 Gen 1 ports`,
    imageCover: "cXMSjRSh6HfGMhdA",
    images: ["cXMSjRSh6HfGMhdA", "hC1iIwIbDfWHwoaF", "Vd7Cxrriw4maqduq", "7isjZwmsOL0ObXQe"],
    specifications: {
        "Standing screen display size": "15.6 Inches",
        "Display Resolution": "1366 x 768",
        "Max screen resolution": "1366 x 768 Pixels",
        "Processor": "1.1 GHz celeron_n4020",
        "RAM": "4 GB",
        "Hard Drive": "64 GB",
        "Graphics coprocessor": "Intel UHD Graphics 600",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Wireless Standard": "Bluetooth, 801.11ac",
        "Average Battery Life (in hours)": "12.5 Hours",
        "Brand": "Acer",
        "Series": "Chromebook CB315-3H",
        "Item model number": "CB315-3H-C0UU",
        "Hardware Platform": "PC",
        "Operating System": "Chrome OS",
        "Product Dimensions": "2.03 x 36.65 x 25.04 cm; 1.2 Kilograms",
        "Item dimensions L x W x H": "20 x 367 x 250 millimeters",
        "Colour": "Silver",
        "Processor Brand": "Intel",
        "Number of Processors": "2",
        "Memory Type": "SDRAM",
        "Flash memory size": "64 GB",
        "Voltage": "24 Volts",
        "Batteries": "1 Lithium Ion batteries required. (included)"
    },
});

const product13 = new Product({
    name: `OTVOC Laptop 15.6 inch Windows 11, VocBook 15, Intel Celeron N5100, 16GB RAM, 512GB PCIE NvMe SSD, 4TB Expansion, 15.6" FHD IPS, 2.0MP, 2.4G+5G WiFi, Bluetooth 5.0, Type-C, HDMI, RJ45, HDD, Silver`,
    price: 499,
    category: '657e0d29c1cb6b530d5a1203',
    description: `Intel 11th-Gen Quad core processor: With intel Celeron JasperLake N5100, quad core 10nm processor, burst frequency 2.8GHz, cache reaches to 4MB, intel UHD 600 Graphics, CPU performance increased by 35%, GPU performance increased by 78% compared with Gemini Lake. This 15.6 inch laptop computer is also equipped with Windows 11, Whether you’re at home, school, or work, get all the performance you need with the chipset, maintaining order and keeping your apps running consistently and smoothly. 16GB RAM+512GB PCIe-based SSD: This 15.6 inch notebook is built in amazing 16GB RAM, with 2933MHz frequency, delivers enough power to see you through your workday. Work, play, or relax, do it all with powerful productivity, with 512GB PCIe-based SSD, greatly improved wrting and reading speed, you can also expand storage up to 2TB by HDD, expand storage up to 4TB by SSD, Micro SD card support up to 512GB. offers sufficient room to store your files and data. 15.6 inch FHD IPS screen: This computer PC is equipped with 15.6" FHD IPS wide viewing screen, 1920x1080 resolution, brightness up to 400nits, images are more detailed, vivid and sharp no matter indoor or outdoor, it can display more contents to improve your working efficiency, The Full HD IPS display keeps images and videos stunning while the narrow border offers-up more viewable space. To protect user’s eyes from harmful blue light. Fan design and Long lasting battery: This windows laptop adopts 7.6V 8500mah battery, equals to 3.8V 17000mah, average running time is 8-10 hours, no worry about charging matter during your business trip. this laptop's type C port also can support charging, meanwhile this laptop has a fan inside to control the temperature so that to ensure a fast and stable performance. Rich ports to meet your various needs: This laptop computer is equipped with sufficient ports to meet your needs, 2xUSB 3.0, 1xUSB 2.0, 1xType C, 1xHDMI port, 1xRJ45, 1xMicro SD card slot, 1x headphone jack, 1xDC jack, various ports to meet your different needs in daily life, if you want more ports, you can also expand by Type C port( we do not provide Type C hub).`,
    imageCover: "ptBKR7hdBnJFUnSq",
    images: ["ptBKR7hdBnJFUnSq", "oju0RWrhqcgajB03", "rA8N2pUEGSjgcjNz", "FW8cS8XBu0J0mLw3"],
    specifications: {
        "Standing screen display size": "15.6 Inches",
        "Display Resolution": "1920 x 1080",
        "Max screen resolution": "1920 x 1080 Pixels",
        "Processor": "2.8 GHz celeron_n",
        "RAM": "16 GB",
        "Memory Speed": "1.1 GHz",
        "Hard Drive": "512 GB",
        "Graphics coprocessor": "Intel UHD Graphics",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Graphics Memory Size": "16 GB",
        "Wireless Standard": "Bluetooth, 802.11a/b/g/n/ac",
        "Average Battery Life (in hours)": "8 Hours",
        "Brand": "OTVOC",
        "Series": "VocBook 15",
        "Item model number": "N1",
        "Hardware Platform": "PC",
        "Operating System": "Windows 11",
        "Product Dimensions": "35.96 x 24 x 2.3 cm; 1.65 Kilograms",
        "Item dimensions L x W x H": "36 x 24 x 2.3 Centimetres",
        "Colour": "Silver",
        "Rear Webcam Resolution": "2 MP",
        "Processor Brand": "Intel",
        "Number of Processors": "4",
        "Memory Type": "DDR4",
        "Flash memory size": "512 GB",
        "Optical Storage Device Type": "DVD",
        "Voltage": "12 Volts",
        "Batteries": "2 Lithium Polymer batteries required. (included)"
    },
});

const product14 = new Product({
    name: "ASUS Laptop L510 Ultra Thin Laptop, 15.6” HD Display, Intel Celeron N4020 Processor, 4GB RAM, 64GB Storage, Windows 11 Home in S Mode, 1 Year Microsoft 365 Included, Star Black, L510MA-DS09-CA",
    price: 299,
    category: '657e0d29c1cb6b530d5a1203',
    description: `Efficient Intel Celeron N4020 Processor 1.1GHz (4M Cache, up to 2.8 GHz). 15.6” HD (1366x768) Display. 64GB eMMC Flash Storage and 4GB DDR4 RAM | Windows 11 Home in S mode. Microsoft 365 Personal 1-year included* (*Activation required with 6-months of Windows activation date.) Slim and Portable: 0.7inch thin and weighs only 3.5lbs (battery included) | USB 2.0 Type-A, USB 3.2 Gen 1 Type-A, USB 3.2 Gen 1 Type-C, HDMI (*USB Transfer speed may vary. Learn more at ASUS website). Windows 11 Home in S mode is a 100% app based version of Windows where applications are verified and tested for quality on the Microsoft store. If you want to install an app that isn't available in the Microsoft Store, you'll need to switch out of S mode for free, which is easy and fast.`,
    imageCover: "gbrP2deG8lfMAV4o",
    images: ["gbrP2deG8lfMAV4o", "HoTd95yFWRESFhBG", "Pn4YuV0seltogQVM", "mwjn3jFjCJsBBmBL"],
    specifications: {
        "Standing screen display size": "15.6 Inches",
        "Display Resolution": "1366 x 768",
        "Max screen resolution": "1366 x 768 Pixels",
        "Processor": "1.1 GHz none",
        "RAM": "64 GB",
        "Hard Drive": "64 GB",
        "Graphics coprocessor": "Intel UHD Graphics 600",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Graphics Memory Size": "4 GB",
        "Wireless Standard": "Bluetooth, 802.11ac",
        "Brand": "ASUS",
        "Series": "ASUS Laptop L510 Ultra Thin Laptop",
        "Item model number": "L510MA-DS09-CA",
        "Operating System": "Windows 11 Home in S Mode + Microsoft 365 Personal 1-year included.* (*Activation required with 6-months of Windows activation date.)",
        "Product Dimensions": "23.62 x 36.07 x 1.78 cm; 1.59 Kilograms",
        "Item dimensions L x W x H": "23.6 x 36.1 x 1.8 Centimetres",
        "Colour": "Star Black",
        "Processor Brand": "Intel",
        "Number of Processors": "2",
        "Flash memory size": "64 GB",
        "Voltage": "3.7 Volts",
        "Batteries": "1 Lithium Ion batteries required. (included)"
    },
});

const product15 = new Product({
    name: "ASUS VivoBook 15 X515 Thin and Light Laptop, 15.6” HD Display,Intel Pentium,4GB RAM,128GB SSD,Windows 11 Home in S Mode + 1 Year Microsoft 365 Personal, X515MA-AH09-CA",
    price: 418,
    category: '657e0d29c1cb6b530d5a1203',
    description: `15.6 inch HD NanoEdge bezel display with stunning 83% screen-to-body ratio. Powerful Intel Pentium Silver N5030 Processor 1.1GHz (4M Cache, up to 3.1 GHz, 4 cores) and Intel UHD Graphics 605.VGA Camera. 4GB DDR4 SO-DIMM RAM and 128GB M.2 NVMe PCIe 3.0 SSD and Windows 11 Home in S Mode + Microsoft 365 Personal 1-year included.* (*Activation required with 6-months of Windows activation date.) Lightning-fast Wi-Fi 5 (802.11ac) keeps you connected through any congestion or interference | Ergonomic keyboard along with a fingerprint sensor. Comprehensive connections including USB 3.2 Gen 1 Type-A; USB 3.2 Gen 1 Type-C; USB 2.0 Type-A, and HDMI 1.4`,
    imageCover: "xjbQmy3cngs0gytc",
    images: ["xjbQmy3cngs0gytc", "4TXjpQ84pAI7lV8g", "yIikDxKJZAyortlM", "Zda0WQeYds86FvBn"],
    specifications: {
        "Standing screen display size": "15.6 Inches",
        "Display Resolution": "1366 x 768",
        "Max screen resolution": "1366 x 768 Pixels",
        "Processor": "1.1 GHz none",
        "RAM": "4 GB",
        "Hard Drive": "128 GB",
        "Graphics coprocessor": "Intel UHD Graphics 605",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Graphics Memory Size": "4 GB",
        "Wireless Standard": "Bluetooth, 802.11ac",
        "Brand": "ASUS",
        "Series": "ASUS VivoBook 15 X515 Thin and Light Laptop",
        "Item model number": "X515MA-AH09-CA",
        "Operating System": "Windows 11 Home",
        "Product Dimensions": "23.37 x 36.07 x 2.03 cm; 1.8 Kilograms",
        "Item dimensions L x W x H": "23.4 x 36.1 x 2 Centimetres",
        "Colour": "Silver",
        "Processor Brand": "Intel",
        "Number of Processors": "4",
        "Flash memory size": "128 GB",
        "Voltage": "240 Volts",
        "Batteries": "1 Lithium Ion batteries required. (included)"
    },
})

const product16 = new Product({
    name: "ASUS TUF F15 Gaming Laptop, 15.6” 144Hz FHD Display, Intel Core i5-11400H Processor, GeForce RTX 2050, 8GB DDR4 RAM, 512GB PCIe SSD Gen 3, Wi-Fi 6, Windows 11, FX506HF-AS51-CA",
    price: 897,
    category: '657e0d29c1cb6b530d5a1203',
    description: `SUPERCHARGED RTX GRAPHICS - Gameplay graphics are silky smooth with the NVIDIA GeForce RTX 2050 4GB GDDR6 at 55W with Dynamic Boost. READY FOR ANYTHING - Use your gaming laptop to stream and multitask with ease thanks to an Intel Core i5-11400H with 12M Cache, up to 4.5 GHz, 6 cores and 8GB of blisteringly fast 3200MHz DDR4 RAM on Windows 11. SWIFT VISUALS – Stay one step ahead of the competition thanks to its 144Hz 15.6” Full HD (1920 x 1080) IPS Type Display. AMPLE STORAGE FOR ALL YOUR GAMES - Store all your game library, and load them fast on your 512GB PCIe NVMe M.2 SSD to take advantage of the full RTX gaming experience. MILITARY GRADE TOUGHNESS - Durable MIL-STD-810H military standard lives in the TUF line as the devices are tested against drops, vibration, humidity and extreme temperatures to ensure reliability. CONNECT TO EVERYTHING - 1x RJ45 LAN port, 3x USB 3.2 Gen 1 Type-A, 1x USB Type C with Thunderbolt 4 and DisplayPort support. XBOX GAME PASS ULTIMATE – This device comes with Game Pass Ultimate 3 month. Experience a huge variety of PC games from every genre, and with new games added all the time, there’s something for everyone to play.`,
    imageCover: "X0oFa3IDzq2DYDse",
    images: ["X0oFa3IDzq2DYDse", "EUBkeOFxiOieoSOk", "NUZKohloPJmSHHTz", "bzMdGqT45jc5AZq1"],
    specifications: {
        "Standing screen display size": "15.6 Inches",
        "Display Resolution": "1920 x 1080",
        "Max screen resolution": "1920 x 1080 Pixels",
        "Processor": "2.7 GHz apple_ci5",
        "RAM": "8 GB",
        "Hard Drive": "512 GB",
        "Graphics coprocessor": "NVIDIA® GeForce RTX™ 2050 4GB GDDR6",
        "Chipset brand": "NVIDIA",
        "Card description": "Dedicated",
        "Graphics Memory Size": "4 GB",
        "Wireless Standard": "Bluetooth, 802.11ax",
        "Brand": "ASUS",
        "Series": "ASUS TUF Gaming F15 Gaming Laptop",
        "Item model number": "FX506HF-AS51-CA",
        "Hardware Platform": "PC",
        "Operating System": "Windows 11 Home",
        "Parcel Dimensions": "42.7 x 31 x 10.4 cm; 3.56 Kilograms",
        "Colour": "Graphite Black",
        "Processor Brand": "Intel",
        "Number of Processors": "6",
        "Memory Type": "DDR4",
        "Hard Disk Interface": "Solid State",
        "Voltage": "240 Volts",
        "Batteries": "1 Lithium Ion batteries required. (included)"
    },
});

const product17 = new Product({
    name: `HP 15 inch Laptop, HD Display, Intel Processor N100, 4 GB RAM, 128 GB UFS, Intel UHD Graphics, Windows 11 Home in S Mode, 15-fd0000ca (2023)`,
    price: 366,
    category: '657e0d29c1cb6b530d5a1203',
    description: `POWER TO DO WHAT MATTERS MOST - The reliable processing power of an Intel processor, plus ample storage, powerful graphics and design with recycled materials, give you the power and capacity to do more. BE SEEN. BE HEARD - Chat with ease knowing you have HD resolution with a camera you can close when not in use, keeping you safe online, with dual array digital microphones and advanced noise reduction software to help you get every point across. YOUR ALL-DAY, ALL-THE-TIME DEVICE - The reliable processing of an Intel processor, long-lasting battery life and HP Fast Charge help you stay in the zone longer. YOUR DIGITAL VIEW - Open up the digital world with great image quality for your movies, shows, photos and more, with the high-definition detail of 1 million pixels. GET THINGS DONE - 4 GB RAM helps you accomplish everyday computing tasks so you can stay in your flow. ON-THE-GO STORAGE - 128 GB Universal Flash Storage is ideal for ultra-compact PCs needing an energy-efficient but high- performance internal storage solution. GO ANYWHERE - See what's new on your favorite streaming apps with a strong Wi-Fi 6 connection and take your shows to-go in this lightweight laptop. CONNECT WITH THE CREW - HP True Vision HD camera helps you stay in touch, while the physical privacy shutter and microphone mute key keep your IRL conversations offline. SHARE WITH YOUR PHONE - Wirelessly send and receive photos, videos and documents from any Android or iOS phone, and view texts on your PC with HP QuickDrop. MADE WITH THE PLANET IN MIND - The HP 15 inch Laptop contains sustainable, post-consumer recycled plastics, and ocean- bound plastic`,
    imageCover: "5X0jaRwi1pMBvlCY",
    images: ["5X0jaRwi1pMBvlCY", "IYjqXql32KuQZxii", "RuIfIWpwWUvctzRm", "pDMaS3Ca3llD13Hm"],
    specifications: {
        "Standing screen display size": "15.6 Inches",
        "Display Resolution": "1366 x 768",
        "Max screen resolution": "1366 x 768 Pixels",
        "Processor": "3.4 GHz none",
        "RAM": "4 GB",
        "Hard Drive": "128 GB",
        "Graphics coprocessor": "Intel UHD Graphics",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Graphics Memory Size": "4 GB",
        "Wireless Standard": "802.11ac",
        "Brand": "HP",
        "Series": "HP 15.6 inch Laptop PC 15-fd0000ca",
        "Item model number": "15-fd0000ca",
        "Hardware Platform": "PC",
        "Operating System": "Windows 11 Home",
        "Parcel Dimensions": "48.7 x 30.5 x 7 cm; 2.28 Kilograms",
        "Colour": "Jet Black",
        "Processor Brand": "Intel",
        "Number_of_Processors": "4",
        "Memory Type": "DDR4",
        "Hard Disk Interface": "eSATA",
        "Optical Storage Device Type": "No",
        "Voltage": "5 Volts",
        "Batteries": "1 Lithium Ion batteries required. (included)"
    },
});

const product18 = new Product({
    name: `Dell Chromebook 3180 11.6" 16GB Laptop Black`,
    price: 399,
    category: '657e0d29c1cb6b530d5a1203',
    description: `Intel Celeron N3060 Processor (2M Cache, up to 2.48 GHz) 4GB 1600MHz DDR3L Memory 16GB eMMC drive 11.6" HDF Non-Touch LCD (1366 x 768)`,
    imageCover: "luGqi0TKacWxvPi3",
    images: ["luGqi0TKacWxvPi3", "N09oJZf2KEKd0t93", "KVAI8tB4l2z2cbEy", "jgNhfhGwzeFlO05w"],
    specifications: {
        "Standing screen display size": "11.6 Inches",
        "Display Resolution": "1366 x 768",
        "Max screen resolution": "1366 x 768 Pixels",
        "Processor": "1.6 GHz 8032",
        "RAM": "2 GB",
        "Graphics coprocessor": "Intel HD Graphics 400",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Graphics Memory Size": "2 GB",
        "Wireless Standard": "802.11n, 802.11b, 802.11g",
        "Average Battery Life (in hours)": "10 Hours",
        "Brand": "Dell",
        "Series": "Dell Chromebook 11 3180 D44PV",
        "Manufacturer reference": "D44PV-cr",
        "Operating System": "Chrome OS",
        "Product Dimensions": "42.67 x 27.94 x 7.37 cm; 1.89 Kilograms",
        "Item dimensions L x W x H": "42.7 x 27.9 x 7.4 Centimetres",
        "Colour": "Black",
        "Processor Brand": "Intel",
        "Number_of_Processors": "2",
        "Memory Type": "Unknown",
        "Flash memory size": "16 GB",
        "Hard Disk Interface": "Unknown",
        "Voltage": "5 Volts"
    }
});

const product19 = new Product({
    name: `MSI Creator M16 B13VF-608CA 16" 16x10 144Hz FHD+ Content Creation Laptop, Intel Core i7-13620H, RTX 4060, 32GB DDR5, 1TB NVMe SSD, Black, Windows 11`,
    price: 1999,
    category: '657e0d29c1cb6b530d5a1203',
    description: `Brilliant Performance: The 13th Gen. Intel Core i7 processor is here. With improved hybrid core architecture, 6 Performance-cores and 4 Efficient-cores, for better multitasking works and running demanding games. Vibrant Display: The 16" FHD plus 144Hz 100% DCI-P3 offers vibrant colors with fast response time, whether you are designing your next project or gaming. Supercharged Graphics: The MSI Creator M16 is powered by a NVIDIA GeForce RTX 4060, breezes through today's most demanding creative workflow tasks. Crafted To Be Portable: Packed with an immense amount of power in a lightweight chassis, so you can work on the go. Creators Rejoice: MSI’s exclusive Cooler Boost 5 Technology ensures optimal thermal dissipation.`,
    imageCover: "Y3e4H5E4e2VxoN2v",
    images: ["Y3e4H5E4e2VxoN2v", "NHR8feuQs00KuG4A", "jVhREEgSTDefGaJ6", "tkiMb4TzFxYUSjpf"],
    specifications: {
        "Standing screen display size": "16 Inches",
        "Display Resolution": "1920 x 1200",
        "Max screen resolution": "1900x1200 Pixels",
        "Processor": "2.4 GHz core_i7",
        "RAM": "32 GB",
        "Memory Speed": "3200 GHz",
        "Hard Drive": "1 TB",
        "Graphics coprocessor": "NVIDIA GeForce RTX 4060",
        "Chipset brand": "NVIDIA",
        "Card description": "Dedicated",
        "Graphics Memory Size": "8 GB",
        "Wireless Standard": "802.11ax",
        "Average Battery Life (in hours)": "10 Hours",
        "Brand": "MSI",
        "Series": "Creator M16",
        "Item model number": "Creator M16 B13VF-608CA",
        "Hardware Platform": "PC",
        "Operating System": "Windows 11 Home",
        "Parcel Dimensions": "49 x 31.4 x 9 cm; 2.26 Kilograms",
        "Colour": "Black",
        "Processor Brand": "Intel",
        "Number_of_Processors": "1",
        "Memory Type": "DDR5",
        "Hard Disk Interface": "PCIE x 4",
        "Voltage": "230 Volts",
        "Batteries": "1 Lithium Ion batteries required. (included)"
    }
});

const product20 = new Product({
    name: `ASUS ExpertBook B1 B1402CBA-C71P-CA Business Laptop, 14" FHD 16:9, Intel Core i7-1255U Processor, 16GB DDR4 RAM, 512GB PCIe SSD, WiFi 6E, Windows 11 Pro, Black,`,
    price: 955,
    category: '657e0d29c1cb6b530d5a1203',
    description: `ASUS ExpertBook B1 is tailored for business,Primed to perform, with a 12th Gen Intel Core processor and Intel Intel UHD Graphics, delivering the powerful performance whatever you need to do, ASUS ExpertBook B1 is primed and ready. ASUS ExpertBook B1 is the business laptop that equips you for even the most intensive work and ensures quick access to the content you need. ASUS offers a comprehensive range of wireless connectivity solutions. WiFi 6E (802.11ax) is the latest and fastest WiFi standard, Fingerprint Sensor, Web Cam shield, TPM 2.0, MIL-STD 810H US military standard, AI Noise-Canceling effectively filters out unwanted ambient noise. Connectivity is especially important in a business laptop to handle all workloads. 1x USB 2.0 Type-A; 1x USB 3.2 Gen 1 Type-A; 1x USB 3.2 Gen 1 Type-C support power delivery; 1x USB 3.2 Gen 2 Type-C support display / power delivery; 1x HDMI 1.4; 1x 3.5mm Combo Audio Jack; 1x RJ45 Gigabit Ethernet. Military-grade toughness and build quality Life on the road is tough, so ASUS ExpertBook B1 is designed to both meet and surpass exacting industry thresholds — including the ultra-demanding MIL-STD 810H US military standard.`,
    imageCover: "iz4SEtDRq9bwV75p",
    images: ["iz4SEtDRq9bwV75p", "TczOUBX6ahCnCCw3", "0bGQyazDbKlGCyXC", "E379CAf4AuEwSf77"],
    specifications: {
        "Standing screen display size": "14 Inches",
        "Display Resolution": "1920 x 1080",
        "Max screen resolution": "1920 x 1080 Pixels",
        "Processor": "1.7 GHz apple_ci7",
        "RAM": "16 GB",
        "Memory Speed": "3200 GHz",
        "Graphics coprocessor": "Intel UHD Graphics",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Wireless Standard": "Bluetooth, 802.11ax",
        "Average Battery Life (in hours)": "8 Hours",
        "Brand": "ASUS",
        "Series": "Asus B1 Expertbook",
        "Item model number": "B1402CBA-C71P-CA",
        "Operating System": "Windows 11 Pro",
        "Parcel Dimensions": "44.4 x 29.1 x 6.6 cm; 2.42 Kilograms",
        "Colour": "Black",
        "Processor Brand": "Intel",
        "Number_of_Processors": "1",
        "Memory Type": "DDR4",
        "Voltage": "24 Volts",
        "Batteries": "1 Lithium Ion batteries required. (included)"
    }
});

const product21 = new Product({
    name: "ASUS Vivobook 15 Laptop, 15.6” FHD (1920 x 1080) Display, Intel Core i7-1355U CPU, Intel Iris Xᵉ Graphics, 16GB RAM, 1TB SSD, Windows 11 Home, Quiet Blue, X1504VA-AS71-CA",
    price: 1099,
    category: '657e0d29c1cb6b530d5a1203',
    description: `15.6inch FHD (1920 x 1080) display with ultra-slim NanoEdge bezels. Latest Intel Core i7-1355U Processor 1.7 GHz (12MB Cache, up to 5.0 GHz, 10 cores, 12 Threads) and Intel Iris X Graphics. Fast storage and memory featuring 1TB M.2 NVMe PCIe 3.0 SSD and 8GB DDR4 on board + 8GB DDR4 SO-DIMM RAM, Windows 11 Home. Extensive connectivity with USB 3.2 Gen 1 Type C, USB 3.2 Gen 1 Type A, USB 2.0 Type A, HDMI 1.4, Wi-Fi 6E(802.11ax) (Dual band) 2*2 + Bluetooth 5 (*USB transfer speed may vary). US MIL-STD 810H military-grade standard. Sleek and lightweight at only 3.75 lbs and 0.7 inches thick. ErgoSense chiclet keyboard with Num-Key. ASUS AI Noise-Canceling Technology employs machine learning to isolate unwanted noise from human speech, which ensures the best communications experience`,
    imageCover: "Z2qgIJr3oo3AQ9gP",
    images: ["Z2qgIJr3oo3AQ9gP", "EEapuECdt15QidHM", "FcnQlvTi80s9IEdt", "W4d43jrLSG2BfM6h"],
    specifications: {
        "Standing screen display size": "15.6 Inches",
        "Display Resolution": "1920 x 1080",
        "Max screen resolution": "1920 x 1080 Pixels",
        "Processor": "1.7 GHz apple_ci7",
        "RAM": "16 GB",
        "Hard Drive": "1 TB",
        "Graphics coprocessor": "Intel Iris Xe Graphics",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Wireless Standard": "Bluetooth, 802.11ax",
        "Average Battery Life (in hours)": "42 Watt Hours",
        "Brand": "ASUS",
        "Series": "ASUS Vivobook 15 Laptop",
        "Item model number": "X1504VA-AS71-CA",
        "Hardware Platform": "PC",
        "Operating System": "Windows 11 Home",
        "Parcel Dimensions": "48.29 x 28.7 x 6.6 cm; 1.7 Kilograms",
        "Colour": "Quiet Blue",
        "Processor Brand": "Intel",
        "Number_of_Processors": "10",
        "Memory Type": "DDR4",
        "Hard Disk Interface": "Solid State",
        "Batteries": "1 Lithium Ion batteries required. (included)"
    }
});

const product22 = new Product({
    name: `Lenovo ThinkPad T490 14.0" FHD (1920x1080) 250 nits IPS Anti-Glare Display - Intel Core i5-8265U Processor, 16GB RAM, 512GB PCIe-NVMe SSD, Windows 10 Pro 64-bit`,
    price: 899,
    description: `Intel Core i5-8265U Quad-core 1.60GHz (Up to 3.90GHz) Processor. 16GB DDR4 2400MHz RAM (8GB soldered + 8GB DIMM), 512GB PCIe-NVMe SSD. 14" FHD (1920x1080, 250 nits) IPS anti-glare Display. Intel UHD Graphics 620, Windows 10 Pro 64-bit. RAM & Hard Drive Upgrades | View Product Description for complete details and specifications`,
    category: '657e0d29c1cb6b530d5a1203',
    imageCover: "2ltAUFujfx3FLgU3",
    images: ["2ltAUFujfx3FLgU3", "FYSkmExxNFblj3JA", "LIotZWRSyUVmv3vA", "4wP0xjcBdDqJijB4"],
    specifications: {
        "Standing screen display size": "35.56 Centimeters",
        "Display Resolution": "1920 x 1080",
        "Max screen resolution": "1920 x 1080 Pixels",
        "Processor": "1.6 GHz core_i5",
        "RAM": "16 GB",
        "Memory Speed": "3.9 GHz",
        "Hard Drive": "512 GB",
        "Graphics coprocessor": "Intel UHD Graphics 620",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Graphics Memory Size": "16 GB",
        "Wireless Standard": "802.11ac",
        "Brand": "Lenovo",
        "Series": "ThinkPad",
        "Item model number": "Lenovo ThinkPad T490",
        "Hardware Platform": "PC",
        "Operating System": "Windows 10",
        "Product Dimensions": "32.89 x 22.71 x 1.78 cm; 1.52 Kilograms",
        "Item dimensions L x W x H": "32.9 x 22.7 x 1.8 Centimetres",
        "Colour": "Black",
        "Processor Brand": "Intel",
        "Number_of_Processors": "1",
        "Memory Type": "DDR4",
        "Flash memory size": "512 GB",
        "Hard Disk Interface": "Solid State",
        "Batteries": "1 Lithium Ion batteries required. (included)"
    },
})

const product23 = new Product({
    name: `Apple 2022 MacBook Air Laptop with M2 chip: 13.6-inch Liquid Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera. Works with iPhone and iPad; Midnight; English`,
    price: 1449,
    category: '657e0d29c1cb6b530d5a1203',
    description: `STRIKINGLY THIN DESIGN — The redesigned MacBook Air is more portable than ever and weighs just 2.7 pounds. It’s the incredibly capable laptop that lets you work, play or create just about anything — anywhere. SUPERCHARGED BY M2 — Get more done faster with a next-generation 8-core CPU, up to 10-core GPU and up to 24GB of unified memory. UP TO 18 HOURS OF BATTERY LIFE — Go all day and into the night, thanks to the power-efficient performance of the Apple M2 chip. BIG, BEAUTIFUL DISPLAY — The 13.6-inch Liquid Retina display features over 500 nits of brightness, P3 wide color and support for 1 billion colors for vibrant images and incredible detail. ADVANCED CAMERA AND AUDIO — Look sharp and sound great with a 1080p FaceTime HD camera, three-mic array and four-speaker sound system with Spatial Audio. VERSATILE CONNECTIVITY – MacBook Air features a MagSafe charging port, two Thunderbolt ports and a headphone jack. EASY TO USE – Your Mac feels familiar from the moment you turn it on and works seamlessly with all your Apple devices.`,
    imageCover: "UKuHK6fn56bcwZib",
    images: ["UKuHK6fn56bcwZib", "7RR9eFXOkrrWS2aY", "CgJKRlh85mdPpxF1", "IwlA9rdILLnKZzf5"],
    specifications: {
        "Display": "13.6-inch (diagonal) LED-backlit display with IPS technology, 2560-by-1664 native resolution at 224 pixels per inch with support for 1 billion colors, 500 nits brightness, Wide color (P3), True Tone technology",
        "Processor": "System on Chip (SoC), Apple M2 chip, 8-core CPU with 4 performance cores and 4 efficiency cores, 8-core GPU, 16-core Neural Engine, 100GB/s memory bandwidth",
        "Video Support/Camera": "8-core GPU, Hardware-accelerated H.264, HEVC, ProRes and ProRes RAW, Video decode engine, Video encode engine, ProRes encode and decode engine",
        "Charging and Expansion": "MagSafe 3 charging port, 3.5 mm headphone jack, Two Thunderbolt / USB 4 ports with support for: Charging, DisplayPort, Thunderbolt 3 (up to 40Gb/s), USB 4 (up to 40Gb/s), USB 3.1 Gen 2 (up to 10Gb/s)",
        "Graphics and Video Support": "8-core GPU, Hardware-accelerated H.264, HEVC, ProRes and ProRes RAW, Video decode engine, Video encode engine, ProRes encode and decode engine",
        "Wireless": "802.11ax Wi-Fi 6 (802.11a/b/g/n/ac compatible), Bluetooth 5.0"
    }
});

const product24 = new Product({
    name: `Acer Aspire 3, 15.6" FHD Laptop, AMD Ryzen 3 7320U, Radeon™ Graphics, 8GB RAM, 128G SSD, Windows 11 Home in S Mode`,
    price: 496,
    category: '657e0d29c1cb6b530d5a1203',
    description: `AMD Ryzen 3 7320U Quad-Core Processor (Up to 4.1GHz). 15.6" Full HD Acer ComfyView Widescreen LED-backlit IPS Display. 8GB LPDDR5 Onboard Memory and 128GB NVMe SSD. 8GB LPDDR5 Onboard Memory and 128GB NVMe SSD. 1 - USB Type-C Port USB 3.2 Gen 2 (up to 10 Gbps) DisplayPort over USB Type-C & USB Charging, 2 - USB 3.2 Gen 1 Ports and 1 - HDMI 2.1 Port with HDCP support`,
    imageCover: "g0ISyiZMgJAItRxy",
    images: ["g0ISyiZMgJAItRxy", "47TmtJuV6GzZ9RB8", "WogsSyLOKyF2S1Da", "wp4klYGS3WNeQyTD"],
    specifications: {
        "Standing screen display size": "15.6 Inches",
        "Display Resolution": "1920 x 1080",
        "Max screen resolution": "1920 x 1080 Pixels",
        "Processor": "2.4 GHz amd_r_series",
        "RAM": "8 GB",
        "Memory Speed": "3200 MHz",
        "Hard Drive": "128 GB",
        "Graphics coprocessor": "AMD RadeonTM Graphics",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Wireless Standard": "Bluetooth, 802.11ax",
        "Average Battery Life (in hours)": "11 Hours",
        "Brand": "Acer",
        "Series": "A315-24P-R7VH",
        "Item model number": "NX.KJBAA.001",
        "Hardware Platform": "PC",
        "Operating System": "Windows 11 S",
        "Product Dimensions": "36.3 x 1.88 x 23.75 cm; 1.78 Kilograms",
        "Item dimensions L x W x H": "36.3 x 1.9 x 23.7 Centimetres",
        "Colour": "Silver",
        "Processor Brand": "AMD",
        "Number of Processors": "4",
        "Memory Type": "DDR5",
        "Flash memory size": "128 GB",
        "Hard Disk Interface": "Solid State",
        "Optical Storage Device Type": "No",
        "Power Source": "AC & Battery",
        "Voltage": "240 Volts",
        "Batteries": "1 Lithium Ion batteries required. (included)"
    },
});

const product25 = new Product({
    name: `ASUS TUF A17 17.3" 144Hz FHD Gaming Laptop, AMD Ryzen 5 4600H, NVIDIA GeForce GTX 1650, 64GB RAM, 4TB PCIe SSD, RGB Backlit Keyboard, Windows 11, Bonfire Black, 32GB Hotface USB Card`,
    price: 1749,
    category: '657e0d29c1cb6b530d5a1203',
    description: `【Upgraded】Seal is opened for upgrade only.【17.3" FHD 144Hz IPS Display】The 17.3'' FHD (1920 x 1080) 144Hz display features adaptive sync to minimize screen tearing while playing your favorite games. Let the stunning visuals accelerate your victory!【AMD Ryzen 5 4600H Processor】Leverage the powerful 6-core 12-thread processing performance and a 3GHz basic processing speed of AMD Ryzen 5 4600H processor to handle heavy games and multitasking with ease!【64GB DDR4 RAM】Plenty of high-bandwidth RAM to smoothly run your games as well as multiple programs. 【4TB PCIe SSD】Accelerate load times across a massive collection with an 4TB PCIe SSD. Major gaming, multiple servers and backups are breezes.【RGB Backlit Keyboard】Arm yourself with a desktop-style keyboard optimized for gaming. Uniform RGB backlighting lets you express your own unique style.【NVIDIA GeForce GTX 1650 Graphics】Paired up with a GeForce GTX 1650 GPU, it can pump out reliably high frame rates in a wide range of popular games.【Windows 11 Home included】‎39.90 x 2.6 x 26.9 cm, 2.6kg. Ports: 2x USB 3.2 Type-A,1x USB 2.0 Type-A, 1x USB 3.2 Gen 2 Type-C with DisplayPort 1.4, 1x HDMI 2.0b, 1x 3.5mm Audio Jack, 1x RJ45, 1x Power In, 1x Kensington Lock; 802.11ac (2x2) Wi-Fi + Bluetooth, Bonfire Black. Bonus 32GB Hotface USB Card.`,
    imageCover: "sYbLx2LO3HbfEVgS",
    images: ["sYbLx2LO3HbfEVgS", "4kiqHT9pnd3HxIPv", "NrOpCk0Uzk0Ydaac", "dynyJlmY0XuR3V4Q"],
    specifications: {
        "Standing screen display size": "17.3 Inches",
        "Display Resolution": "1920 x 1080",
        "Max screen resolution": "1920 x 1080 Pixels",
        "Processor": "3 GHz ryzen_5_4600h",
        "RAM": "64 GB",
        "Hard Drive": "4 TB",
        "Graphics coprocessor": "NVIDIA GeForce GTX 1650",
        "Chipset brand": "NVIDIA",
        "Card description": "Dedicated",
        "Graphics Memory Size": "64 GB",
        "Wireless Standard": "802.11ac",
        "Brand": "ASUS",
        "Series": "TUF",
        "Item model number": "ASUS TUF",
        "Hardware Platform": "PC",
        "Operating System": "Windows 11 Home",
        "Parcel Dimensions": "49.29 x 41.2 x 10.4 cm; 3.99 Kilograms",
        "Colour": "Black",
        "Processor Brand": "AMD",
        "Number of Processors": "6",
        "Memory Type": "DDR4",
        "Hard Disk Interface": "Solid State"
    }
});

const product26 = new Product({
    name: `HP 15.6" HD Touchscreen Laptop, Intel Core i3-1215U Processor, 32GB DDR4, 2TB PCIe SSD, Intel HD Graphics, WiFi, 720p HD Camera, Win 11, Natural Silver, 32GB Hotface USB Card`,
    price: 999,
    category: '657e0d29c1cb6b530d5a1203',
    description: `【Upgraded】Seal is opened for upgrade only .【15.6" Touch-Screen HD Display】15.6-inch diagonal, HD (1366 x 768), touch, micro-edge, BrightView, With virtually no bezel encircling the display, an ultra-wide viewing experience provides for seamless multi-monitor set-ups.【11th Gen Intel Core i3-1215U Processor】Brings the perfect combination of features to make you unstoppable. Get things done fast with high performance, instant responsiveness and best-in-class connectivity.【32GB DDR4 RAM】Plenty of high-bandwidth RAM to smoothly run your games as well as multiple programs. 【2TB PCIe SSD】Save files fast and store more data. With massive amounts of storage and advanced communication power, great for major gaming, multiple servers, backups, and more.【Intel UHD Graphics】with shared video memory provide everyday image quality for Internet use, basic photo editing and casual gaming.【 Windows 11 included】35.84x 24.21x 1.80 cm, 1.7kg . Ports:Comprehensive connections including 2x USB 3.0 Type A Ports 1x USB 3.0 Type C Ports, 1x Headphone, 1x HDMI, 1x Media Card Reader,. Wireless-AC + Bluetooth, Natural Silver. Bonus 32GB Hotface USB Card.`,
    imageCover: "8ZWZfqwGDs3XNNz0",
    images: ["8ZWZfqwGDs3XNNz0", "HPjp4iDo2PzDpvdy", "fGW099oyD7MDoMTl", "AOyTzXuEwC7ODzJt"],
    specifications: {
        "Standing screen display size": "15.6 Inches",
        "Display Resolution": "1366 x 768",
        "Max screen resolution": "1366 x 768 Pixels",
        "Processor": "1.2 GHz core_i3",
        "RAM": "32 GB",
        "Hard Drive": "2 TB",
        "Graphics coprocessor": "Intel HD Graphics",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Wireless Standard": "802.11ax",
        "Average Battery Life (in hours)": "9 Hours",
        "Brand": "HP",
        "Item model number": "HP",
        "Hardware Platform": "PC",
        "Operating System": "Windows 11",
        "Parcel Dimensions": "48.4 x 30.9 x 7.1 cm; 1.7 Kilograms",
        "Colour": "Silver",
        "Processor Brand": "Intel",
        "Number of Processors": "6",
        "Memory Type": "DDR4",
        "Hard Disk Interface": "Solid State",
        "Voltage": "5 Volts"
    }
});

const product27 = new Product({
    name: `Dell Latitude 5400 14'' Business Laptop Computer, Intel 8th Gen i7-8665 Quad Core, 16GB DDR4 RAM, 512GB SSD, Webcam, Wi-Fi, Bluetooth, Windows 10 Pro`,
    price: 579,
    category: '657e0d29c1cb6b530d5a1203',
    description: `【Processor】Intel 8th Gen i7-8665, 1.9GHz up to 4.8GHz【14inch HD Display】1366x768 resolution for stunning clear visuals【Memory & Storage】16GB DDR4 RAM, 512GB SSD, fast boot up and speedy data transfer, perfect for regular office work, web browsing, watching videos【Operating System】Windows 10 Pro 64-Bit Multi-Language Supports English/French/Spanish【After-sales guarantee】This Product is professionally inspected and tested to look and work like new. The refurbishing process includes functionality testing, basic cleaning, inspection, and repackaging. The product ships with all relevant accessories, and a minimum 90-day warranty`,
    imageCover: "5WBuEf8mIvbR0qI6",
    images: ["5WBuEf8mIvbR0qI6", "fNSByoEjwT6LYeoB", "q1xEtU7o7on6BstQ", "0brAQVDn6ISVrIrq"],
    specifications: {
        "Standing screen display size": "14 Inches",
        "Display Resolution": "1366 x 768",
        "Max screen resolution": "1366 x 768 Pixels",
        "Processor": "1.9 GHz apple_ci7",
        "RAM": "16 GB",
        "Hard Drive": "512 GB",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Graphics Memory Size": "2 GB",
        "Wireless Standard": "Bluetooth",
        "Average Battery Life (in hours)": "7 Hours",
        "Brand": "Dell",
        "Series": "Dell Latitude 5400",
        "Item model number": "Latitude 5400",
        "Operating System": "Windows 10 Pro",
        "Product Dimensions": "35.56 x 22.1 x 2.54 cm; 2.02 Kilograms",
        "Item dimensions L x W x H": "35.6 x 22.1 x 2.5 Centimetres",
        "Processor Brand": "Intel",
        "Number of Processors": "1",
        "Optical Storage Device Type": "No"
    }
});

const product28 = new Product({
    name: `HP 15.6" FHD Laptop Computer, 11th Gen Intel Core i5-1135G7(Beats i7-1165g7), 16GB DDR4 RAM, 256GB PCIe SSD, Intel Iris Xe Graphics, HD Webcam, Stereo Speakers, Windows 11, Silver, 32GB USB Card`,
    price: 749,
    category: '657e0d29c1cb6b530d5a1203',
    description: `【Upgraded】Seal is opened for upgrade only.【15.6" FHD Display】The captivating clarity and brilliance will surely enhance your work and entertainment endeavors.【11th Gen Intel Core i5-1135G7 Processor】(Beats i7-1065g7) Experience a perfect balance of performance and efficiency with a powerful processor, delivering smooth multitasking, reliable performance, and impressive power savings, making it an excellent choice for everyday computing tasks.【16GB DDR4 RAM】Elevate your projects with a high-speed RAM, ensuring faster data processing, seamless multitasking, and improved responsiveness that keeps you in the flow. 【256GB PCIe SSD】Delivers blazing boot-up speed and enhanced storage capabilities. Effortlessly access your extensive digital library with ease.【Standard Keyboard】Allows you to enjoy comfortable and accurate typing.【Intel Iris Xe Graphics】Enhance your business capabilities with a graphics solution that ensures smooth visuals and efficient processing, empowering you to achieve professional success with amplified productivity.【Windows 11 Home】Embrace natural controls that empower you to think, express and create in an efficient way, all within an ultra-secure environment. 【Dimensions & Weight】35.84x24.21x1.8cm, 1.75kg. 【Ports & Accessories】2x SuperSpeed USB-A, 1x SuperSpeed USB-C, 1x HDMI, 1x Audio Jack, 1x Media Card Reader, 1x RJ-45. Wireless-AC and Bluetooth, Silver. 32GB Hotface USB Card.`,
    imageCover: "DlszTeFHKvUusfBN",
    images: ["DlszTeFHKvUusfBN", "bi6fWavbIbofHjDF", "pspXVQApYMpzdxYt", "JZhtnBLBALaWrad7"],
    specifications: {
        "Standing screen display size": "15.6 Inches",
        "Display Resolution": "1920 x 1080",
        "Max screen resolution": "1920 x 1080 Pixels",
        "Processor": "2.4 GHz core_i5",
        "RAM": "16 GB",
        "Hard Drive": "256 GB",
        "Graphics coprocessor": "Intel Iris Xe Graphics",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Graphics Memory Size": "4 GB",
        "Wireless Standard": "802.11ac",
        "Brand": "HP",
        "Item model number": "HP Laptop",
        "Hardware Platform": "PC",
        "Operating System": "Windows 11 Home",
        "Parcel Dimensions": "35.84 x 24.21 x 1.8 cm; 3 Kilograms",
        "Colour": "Silver",
        "Processor Brand": "Intel",
        "Number of Processors": "4",
        "Memory Type": "DDR4",
        "Hard Disk Interface": "Solid State"
    },
});

const product29 = new Product({
    name: `Apple 2023 MacBook Pro Laptop M3 Pro chip with 11‑core CPU, 14‑core GPU: 14.2-inch Liquid Retina XDR Display, 18GB Unified Memory, 512GB SSD Storage. Works with iPhone/iPad; Space Black, English`,
    price: 2699,
    category: '657e0d29c1cb6b530d5a1203',
    description: `SUPERCHARGED BY M3 PRO OR M3 MAX—The Apple M3 Pro chip, with an up to 12-core CPU and up to 18-core GPU using hardware-accelerated ray tracing, delivers amazing performance for demanding workflows like manipulating gigapixel panoramas or compiling millions of lines of code. M3 Max, with an up to 16-core CPU and up to 40-core GPU, drives extreme performance for the most advanced workflows like rendering intricate 3D content or developing transformer models with billions of parameters. UP TO 18 HOURS OF BATTERY LIFE—Go all day thanks to the power-efficient design of Apple silicon. MacBook Pro delivers the same exceptional performance whether it’s running on battery or plugged in. RESPONSIVE UNIFIED MEMORY AND STORAGE—Up to 36GB (M3 Pro) or up to 128GB (M3 Max) of unified memory makes everything you do fast and fluid. Up to 4TB (M3 Pro) or up to 8TB (M3 Max) of superfast SSD storage launches apps and opens files in an instant. BRILLIANT PRO DISPLAY—The 14.2-inch Liquid Retina XDR display features Extreme Dynamic Range, 1000 nits of sustained brightness for stunning HDR content, up to 600 nits of brightness for SDR content, and pro reference modes for doing your best work on the go. FULLY COMPATIBLE—All your pro apps run lightning fast—including Adobe Creative Cloud, Apple Xcode, Microsoft 365, SideFX Houdini, MathWorks MATLAB, Medivis SurgicalAR, and many of your favorite iPhone and iPad apps. And with macOS, work and play on your Mac are even more powerful. Elevate your presence on video calls. Access information in all-new ways. And discover even more ways to personalize your Mac. ADVANCED CAMERA AND AUDIO—Look sharp and sound great with a 1080p FaceTime HD camera, a studio-quality three-mic array and a six-speaker sound system with Spatial Audio. CONNECT IT ALL—This MacBook Pro features a MagSafe charging port, three Thunderbolt 4 ports, an SDXC card slot, an HDMI port and a headphone jack. Enjoy fast wireless connectivity with Wi-Fi 6E and Bluetooth 5.3. And you can connect up to two external displays with M3 Pro, or up to four with M3 Max.`,
    imageCover: "bNtXwCOAnc0UpbnH",
    images: ["bNtXwCOAnc0UpbnH", "yOpA706lultBj3dw", "t2jalZyEHGsHWQVk", "GxRVQvhuRBbIBn8B"],
    specifications: {
        "Display": "14.2-inch (diagonal) Liquid Retina XDR display; 3024-by-1964 native resolution at 254 pixels per inch; 1,000,000:1 contrast ratio; XDR brightness: 1000 nits sustained full-screen; 1600 nits peak (HDR content only); SDR brightness: 600 nits; 1 billion colors; Wide color (P3); True Tone technology; ProMotion technology for adaptive refresh rates up to 120Hz.",
        "Processor": "Apple M3 Pro System on a Chip (SoC), 11-core CPU with 5 performance cores and 6 efficiency cores, 14-core GPU, 16-core Neural Engine, 150GB/s memory bandwidth",
        "Graphics and Video Support": "Apple M3 Pro System on Chip (SoC) with 14-core GPU, Hardware-accelerated H.264, HEVC, ProRes and ProRes RAW, Video decode engine, Video encode engine, ProRes encode and decode engine, AV1 decode",
        "Charging and Expansion": "SDXC card slot, HDMI port, 3.5 mm headphone jack, MagSafe 3 port, Three Thunderbolt 4 (USB-C) ports with support for: Charging, DisplayPort, Thunderbolt 4 (up to 40Gb/s), USB 4 (up to 40Gb/s)",
        "Wireless": "Wi-Fi 6E (802.11ax) Bluetooth 5.3",
        "In the Box": "14-inch MacBook Pro, 70W USB-C Power Adapter, USB-C to MagSafe 3 Cable (2 m)",
        "Height": "1.55 cm (0.6 inch)",
        "Width": "31.26 cm (12.31 inches)",
        "Depth": "22.12 cm (8.71 inches)",
        "Weight": "1.61 kg (3.54 pounds)"
    }
})

const product30 = new Product({
    name: `ASUS VivoBook 15X OLED Laptop, 15.6” OLED FHD Display, Intel Core i5-12500H CPU, 8GB RAM, 512GB SSD, Fingerprint Sensor, Windows 11 Home, X1503ZA-CB51-CB`,
    price: 799,
    category: '657e0d29c1cb6b530d5a1203',
    description: `ASUS Vivobook 15X OLED is protected by ASUS Antibacterial Guard – a surface treatment that keeps the bugs at bay. ASUS VivoBook 15X OLED laptop comes with 15.6 inch FHD (1920 x 1080) 600nits HDR OLED display with ultra-slim NanoEdge bezels. Latest Intel Core i5-12500H Processor 2.5 GHz (18M Cache, up to 4.5 GHz, 4P+8E cores). Fast storage and memory featuring 512GB M.2 NVMe PCIe 3.0 SSD and 8GB DDR4 on board RAM, Windows 11 Home. Extensive connectivity with USB 3.2 Gen 1 Type C, USB 3.2 Gen 1 Type A, USB 2.0 Type A, 3.5mm Combo Audio Jack, Wi-Fi 6 (802.11ax) and Bluetooth 5.0 (*USB transfer speed may vary)`,
    imageCover: "dNVJ64oqcfZChfH1",
    images: ["dNVJ64oqcfZChfH1", "1HVJqhkLU2cHI7wM", "F7YKoCAQPzTvrhXf", "QwIRZhzUajVU7oz3"],
    specifications: {
        "Standing screen display size": "15.6 Inches",
        "Display Resolution": "1920 x 1080",
        "Max screen resolution": "1920 x 1080 Pixels",
        "Processor": "2.5 GHz apple_ci5",
        "RAM": "8 GB",
        "Memory Speed": "3200 MHz",
        "Hard Drive": "512 GB",
        "Graphics coprocessor": "Intel® UHD 600 Graphics",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Wireless Standard": "Bluetooth, 802.11ax",
        "Average Battery Life (in hours)": "6 Hours",
        "Brand": "ASUS",
        "Series": "ASUS VivoBook 15X OLED Laptop",
        "Item model number": "X1503ZA-CB51-CB",
        "Hardware Platform": "PC",
        "Operating System": "Windows 11 Home",
        "Parcel Dimensions": "47.8 x 27.8 x 6.4 cm; 2.72 Kilograms",
        "Colour": "Indie Black",
        "Processor Brand": "Intel",
        "Number of Processors": "4",
        "Memory Type": "DDR4",
        "Hard Disk Interface": "Solid State",
        "Optical Storage Device Type": "No",
        "Batteries": "1 Lithium Ion batteries required. (included)"
    }
});

const product31 = new Product({
    name: `Dell Chromebook 3120 11 inch Intel Celeron N2840 2.16 GHz 4Gb Ram 16GB Chrome OS`,
    price: 199,
    category: '657e0d29c1cb6b530d5a1203',
    description: `Item Package Dimension: 14.7637795125L x 10.3543306981W x 2.3228346433H inches. Item Package Weight - 3.9462744898 Pounds. Item Package Quantity - 1. Product Type - NOTEBOOK COMPUTER`,
    imageCover: "VhpuZxpqUqHTZdv0",
    images: ["VhpuZxpqUqHTZdv0", "HcjWFrXmZtoB3al6", "KBnx5t2mfWJe26Nw", "DX94E8QkjVUDpunS"],
    specifications: {
    "Standing screen display size": "11.6 Inches",
    "Display Resolution": "1366 x 768",
    "Max screen resolution": "1366 x 768 Pixels",
    "Processor": "2.16 GHz celeron_n2840",
    "RAM": "4 GB",
    "Hard Drive": "16 GB",
    "Graphics coprocessor": "Integrated Graphics",
    "Chipset brand": "Intel",
    "Card description": "Integrated",
    "Graphics Memory Size": "4 GB",
    "Brand": "Dell",
    "Series": "Chromebook",
    "Item model number": "Chromebook 3120",
    "Hardware Platform": "PC",
    "Operating System": "Chrome OS",
    "Parcel Dimensions": "37.4 x 26.3 x 5.7 cm; 1.79 Kilograms",
    "Processor Brand": "Intel",
    "Number of Processors": "2",
    "Memory Type": "DDR3",
    "Hard Disk Interface": "Solid State"
} 
});

const product32 = new Product({
    name: `Lenovo 2019 Thinkpad T470 14-inch IPS Full HD FHD (1920x1080) Business Laptop (Intel Core i5-6300U, 16GB DDR4 RAM, 256GB PCIe NVMe M.2 SSD) Thunderbolt, Type-C, HDMI, RJ-45, Windows 10 Pro`,
    price: 699,
    category: '657e0d29c1cb6b530d5a1203',
    description: `Item Package Dimension: 18.897637776L x 15.74803148W x 5.118110231H inches. Item Package Weight - 6.393405598 Pounds. Item Package Quantity - 1. Product Type - NOTEBOOK COMPUTER`,
    imageCover: "0Gce0WfxiuOZQgJK",
    images: ["0Gce0WfxiuOZQgJK", "QItv7Lr7oFZq4s58", "lUVIRuumzA3UVXu0", "wPHFbMYaKgLfGRSE"],
    specifications: {
        "Standing screen display size": "14 Inches",
        "Display Resolution": "1920 x 1080",
        "Max screen resolution": "1920 x 1080 Pixels",
        "Processor": "2.3 GHz core_i5",
        "RAM": "16 GB",
        "Memory Speed": "2400 MHz",
        "Hard Drive": "256 GB",
        "Graphics coprocessor": "No",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Graphics Memory Size": "16 GB",
        "Wireless Standard": "Bluetooth",
        "Average Battery Life (in hours)": "1 Hours",
        "Brand": "Lenovo",
        "Series": "ThinkPad T470 Business Laptop",
        "Item model number": "Thinkpad T470",
        "Hardware Platform": "PC",
        "Operating System": "Windows 10 Pro",
        "Product Dimensions": "76.2 x 76.2 x 15.24 cm; 2.27 Kilograms",
        "Item dimensions L x W x H": "76.2 x 76.2 x 15.2 Centimetres",
        "Colour": "Black",
        "Rear Webcam Resolution": "720 MP",
        "Processor Brand": "Intel",
        "Number of Processors": "1",
        "Memory Type": "DDR4",
        "Flash memory size": "256 GB",
        "Hard Disk Interface": "Serial ATA",
        "Hard drive rotational speed": "64 RPM",
        "Power Source": "AC & Battery",
        "Batteries": "1 Lithium Ion batteries required."
    }
});

const product33 = new Product({
    name: `Lenovo ThinkPad T470s Laptop Intel Core i5-6300U, 12GB RAM, 256GB SSD, 14-inch LCD HDMI Port Windows 10`,
    price: 549,
    category: '657e0d29c1cb6b530d5a1203',
    description: `Item Package Dimension: 19.68503935L x 14.960629906W x 3.543307083H inches. Item Package Weight - 4.7619848592 Pounds. Item Package Quantity - 1. Product Type - NOTEBOOK COMPUTER`,
    imageCover: "kvR8m3ae8VbhucuG",
    images: ["kvR8m3ae8VbhucuG", "Xma3hTXq4eYHKku9", "4skpVwcATnYY1thk", "2kBEF8YmImk07hQT"],
    specifications: {
        "Standing screen display size": "14 Inches",
        "Display Resolution": "1920 x 1080",
        "Max screen resolution": "1920 x 1080 Pixels",
        "Processor": "2.6 GHz core_i5",
        "RAM": "16 GB",
        "Memory Speed": "2133 MHz",
        "Hard Drive": "256 GB",
        "Graphics coprocessor": "Intel HD Graphics 520",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Graphics Memory Size": "12 GB",
        "Wireless Standard": "802.11ac",
        "Brand": "Lenovo",
        "Series": "ThinkPad",
        "Item model number": "T470",
        "Hardware Platform": "PC",
        "Operating System": "Windows 10",
        "Product Dimensions": "83.82 x 5.08 x 5.08 cm; 725.75 Grams",
        "Item dimensions L x W x H": "83.8 x 5.1 x 5.1 Centimetres",
        "Colour": "Black",
        "Rear Webcam Resolution": "720 MP",
        "Processor Brand": "Intel",
        "Number of Processors": "1",
        "Memory Type": "SODIMM",
        "Flash memory size": "256 GB",
        "Hard Disk Interface": "ATA-4",
        "Batteries": "2 Lithium Ion batteries required. (included)"
    }
});

const product34 = new Product({
    name: `Computer Lenovo V14 14'' FHD Laptop - AMD Athlon Gold 3150U, 4GB RAM, 128GB SSD, Windows 10 Pro - 82C6S03E00`,
    price: 249,
    category: '657e0d29c1cb6b530d5a1203',
    description: `AMD Athlon Gold 3150U processor (2 cores, 4 threads, 2.4 GHz base up to 3.3 GHz max, 192 KB L1 Cache, 1MB L2 Cache, 4MB L3 Cache). 14” Full HD (1920 x 1080), Anti-glare. 4GB DDR4 RAM, 128GB PCle NVMe SSD, Integrated AMD Radeon Graphics. Ports: 2 x USB 3.1 Gen 1, 1 x USB 2.0, 1 x HDMI, 1 x Headphone/Microphone Combo; Slot: 1 x Micro SD Card. Windows 10 Pro – Stereo Speakers, Wi-Fi 5, Bluetooth 5.0`,
    imageCover: "IdFkin2MiH9uZbU5",
    images: ["IdFkin2MiH9uZbU5", "xEkJwLwOWgPvkj3C", "9su7UNiifEauN0aN", "97kKOFqQGmXzoVdx"],
    specifications: {
        "Standing screen display size": "14 Inches",
        "Display Resolution": "1920 x 1080",
        "Max screen resolution": "1920 x 1080 Pixels",
        "Processor": "2.4 GHz athlon_3150u",
        "RAM": "4 GB",
        "Hard Drive": "128 GB",
        "Chipset brand": "AMD",
        "Card description": "Integrated",
        "Wireless Standard": "Bluetooth",
        "Brand": "Computer",
        "Series": "V14",
        "Operating System": "Windows 10 Pro",
        "Parcel Dimensions": "49 x 31.9 x 7 cm; 2.14 Kilograms",
        "Colour": "Gold",
        "Processor Brand": "AMD",
        "Number of Processors": "2",
        "Flash memory size": "128 GB",
        "Hard Disk Interface": "Serial ATA",
        "Optical Storage Device Type": "No"
    }
});

const product35 = new Product({
    name: `HP Laptop 14" HD Display - Intel Core i5-1135G7, Intel Iris Xe Graphics, 8GB RAM, 256GB SSD, Windows 11 Home - Camo Green`,
    price: 579,
    category: '657e0d29c1cb6b530d5a1203',
    description: `Intel Core i5-1135G7 processor (4 cores, 8 threads, 2.40 GHz base up to 4.20 GHz max, 8MB Cache). 14” Diagonal, HD (1366 x 768), Micro-edge, BrightView, 250 Nits. 8GB DDR4 SDRAM, 256GB PCle NVMe SSD, Intel Iris Xe Graphics. Ports: 2 x SuperSpeed USB Type-A 5 Gbps signaling rate, 1 x SuperSpeed USB Type-C 5Gbps signaling rate, 1 x HDMI 1.4b, 1 x Headphone/Microphone Combo Jack; Slot: 1 x Multi-Format SD Media Card Reader. OS: Windows 11 Home (or Windows 10 Home with upgrade option to Windows 11); 720p HD Camera, Dual Speakers, Wi-Fi, Bluetooth 4.2`,
    imageCover: "MZ6LfLtr7AoEUP6U",
    images: ["MZ6LfLtr7AoEUP6U", "3VbkAFZ6RLuHpiXl", "GeW2yXxptyu0uf45", "1P9W94zUy4OF915C"],
    specifications: {
        "Standing screen display size": "14 Inches",
        "Display Resolution": "1366 x 768",
        "Max screen resolution": "1366 x 768 Pixels",
        "Processor": "2.4 GHz core_i5",
        "RAM": "8 GB",
        "Hard Drive": "256 GB",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Graphics Memory Size": "8 GB",
        "Wireless Standard": "Bluetooth",
        "Average Battery Life (in hours)": "9 Hours",
        "Brand": "HP",
        "Series": "HP 14\" HD Laptop 14-dq2088wm",
        "Operating System": "Windows 10 Home",
        "Parcel Dimensions": "45 x 32 x 6.9 cm; 2.09 Kilograms",
        "Colour": "Green",
        "Processor Brand": "Intel",
        "Number of Processors": "4",
        "Flash memory size": "256 GB",
        "Optical Storage Device Type": "No"
    },
});

const product36 = new Product({
    name: `Apple 2020 MacBook Air Laptop: Apple M1 Chip, 13" Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Space Gray, English`,
    price: 1289,
    category: '657e0d29c1cb6b530d5a1203',
    description: `All-Day Battery Life : Go longer than ever with up to 18 hours of battery life. Powerful Performance : Take on everything from professional-quality editing to action-packed gaming with ease. The Apple M1 chip with an 8-core CPU delivers up to 3.5x faster performance than the previous generation while using way less power. Superfast Memory : 8GB of unified memory makes your entire system speedy and responsive. That way it can support tasks like memory-hogging multitab browsing and opening a huge graphic file quickly and easily. Stunning Display : With a 13.3â€ Retina display, images come alive with new levels of realism. Text is sharp and clear, and colors are more vibrant. Why Mac : Easy to learn. Easy to set up. Astoundingly powerful. Intuitive. Packed with apps to use right out of the box. Mac is designed to let you work, play, and create like never before. Simply Compatible : All your existing apps work, including Adobe Creative Cloud, Microsoft 365, and Google Drive. Plus you can use your favorite iPhone and iPad apps directly on macOS. Altogether you'll have access to the biggest collection of apps ever for Mac. All available on the App Store. Easy to Learn : If you already have an iPhone, MacBook Air feels familiar from the moment you turn it on. And it works perfectly with all your Apple devices. Use your iPad to extend the workspace of your Mac, answer texts and phone calls directly on your Mac, and more.`,
    imageCover: "3ZMZdG94DoBO80FA",
    images: ["3ZMZdG94DoBO80FA", "n4kgTk5KjHKeD7yF", "uIl5onRYKZNBBbk9", "oSSTIbMWLTeYtlcO"],
    specifications: {
        "Display": "13.3-inch (diagonal) LED-backlit display with IPS technology; 2560-by-1600 native resolution at 227 pixels per inch with support for millions of colours",
        "Processor": "System on a Chip (SoC) Apple M1 chip, 8-core CPU with 4 performance cores and 4 efficiency cores, Up to 8-core GPU, 16-core Neural Engine",
        "Graphics and Video Support": "Up to 8-core GPU",
        "Charging and Expansion": "Two Thunderbolt/USB 4 ports with support for: Charging, DisplayPort, Thunderbolt 3 (up to 40Gb/s), USB 3.1 Gen 2 (up to 10Gb/s)",
        "Wireless": "802.11ax Wi-Fi 6 wireless networking, IEEE 802.11a/b/g/n/ac compatible, Bluetooth 5.0 wireless technology",
        "In the Box": "MacBook Air, 30W USB-C, Power Adapter, USB-C Charge Cable (2 m)"
    },
});

const product37 = new Product({
    name: `ASUS Chromebook CX1, 15.6" HD NanoEdge Display, Intel Celeron N4500 Processor, 128GB eMMC Storage, 8GB RAM, ChromeOS, Transparent Silver, CX1500CKA-AS01-CB`,
    price: 299,
    category: '657e0d29c1cb6b530d5a1203',
    description: `Powerful processing: powered by the intel celeron n4500 processor 11 ghz, the asus chromebook flip cx1 delivers performance and responsiveness to empower users with the ultimate device for productivity. High performance laptop: the asus chromebook flip cx1 comes equipped with 128gb emmc storage and 8gb lpddr4x ram, to store all of your valuable data, photos and learning materials. Sleek stylish design: the asus chromebook flip cx1 combines a 14 inch fhd 1920x1080 nanoedge display to maximize your focus and productivity while empowering you to do more on the go. Built to connect: the asus chromebook flip cx1 has full i/o support with a combo audio jack, usb 32 type-c (gen 1) ports, usb 32 type-a (gen 1) ports, and a micro sd card reader, providing seamless connectivity for expanding possibilities (usb transfer speed may vary learn more at asus website). Easy to use: chromebook runs on chromeos and has the google apps you can edit, download, and convert microsoft office files in google docs, sheets and slides. Easy to use: chromebooks come with built-in storage for offline access to your most important files and a 12-month google one trial that gives you additional storage across gmail, google drive and google photos this offer from google will expire by 1/31/2024 google features’ availability varies according to country please check with your local asus retailer for details`,
    imageCover: "oyi1wkpaIcs62Q7n",
    images: ["oyi1wkpaIcs62Q7n", "lwie6RjkRul7nIED", "ybcTLtGP91kK36eG", "g1fBSSpBkuDBUOYa"],
    specifications: {
        "Standing screen display size": "15.6 Inches",
        "Display Resolution": "1366 x 768",
        "Max screen resolution": "1366 x 768 Pixels",
        "Processor": "1.1 GHz celeron",
        "RAM": "8 GB",
        "Hard Drive": "128 GB",
        "Graphics coprocessor": "Intel UHD Graphics",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Graphics Memory Size": "4 GB",
        "Wireless Standard": "Bluetooth, 802.11ax",
        "Average Battery Life (in hours)": "11 Hours",
        "Brand": "ASUS",
        "Series": "ASUS Chromebook CX1",
        "Item model number": "CX1500CKA-AS01-CB",
        "Hardware Platform": "PC",
        "Operating System": "Chrome OS",
        "Parcel Dimensions": "51 x 30.2 x 7.5 cm; 2.74 Kilograms",
        "Colour": "Transparent Silver",
        "Processor Brand": "Intel",
        "Number of Processors": "2",
        "Memory Type": "DDR4",
        "Flash memory size": "128 GB",
        "Hard Disk Interface": "Solid State",
        "Voltage": "7.7 Volts",
        "Batteries": "1 Lithium Ion batteries required. (included)"
    }
});

const product38 = new Product({
    name: `Acer Chromebook 3, 14" Chromebook, MediaTek MT8183, Mali-G72 MP3, 4GB RAM, 64GB, Chrome Os Silver`,
    price: 296,
    category: '657e0d29c1cb6b530d5a1203',
    description: `MediaTek MT8183C Core Pilot Octa-Core ARM Cortex-A73/A53 Heterogeneous Multi-Processor (Up to 2.0GHz). 14.0" HD 1366 x 768 Widescreen ComfyView LED-backlit Display. 4GB of Onboard LPDDR4X Memory and 64GB eMMC. 802.11ac WiFi 5 featuring 2x2 MIMO technology (Dual-Band 2.4GHz and 5GHz). 1 - USB Type-C port USB 2.0 with DisplayPort over USB Type-C & USB Charging and 1 - USB 2.0 port`,
    imageCover: "wacKjx53X0CBQgIh",
    images: ["wacKjx53X0CBQgIh", "mf44YCk4hlQuGUXO", "VpLkmT5fPMbrgrbR", "w8ne2Fmovo8GaRnt"],
    specifications: {
        "Standing screen display size": "14 Inches",
        "Display Resolution": "1280 x 720",
        "Max screen resolution": "1280x720 Pixels",
        "Processor": "1.6 GHz mediatek_mt8183",
        "RAM": "4 GB",
        "Hard Drive": "64 GB",
        "Graphics coprocessor": "Mali G72 MP3",
        "Chipset brand": "Intel",
        "Card description": "Integrated",
        "Wireless Standard": "Bluetooth",
        "Average Battery Life (in hours)": "12 Hours",
        "Brand": "Acer",
        "Series": "CB314-2H-K3NE",
        "Item model number": "NX.AWFAA.003",
        "Hardware Platform": "PC",
        "Operating System": "Chrome OS",
        "Parcel Dimensions": "46.4 x 29.6 x 7.2 cm; 3.2 Kilograms",
        "Colour": "Silver",
        "Processor Brand": "MediaTek",
        "Number of Processors": "8",
        "Memory Type": "SDRAM",
        "Flash memory size": "64 GB",
        "Hard Disk Interface": "Solid State",
        "Voltage": "7.7 Volts",
        "Batteries": "1 Lithium Ion batteries required. (included)"
    }
});


//#endregion Laptops

const reviews = [];

const products = [product9, product10, product11, product12, product13, product14, product15, product16, product17, product18, product19, product20, product21, product22, product23, product24, product25, product26, product27, product28, product29, product30, product31, product32, product33, product34, product35, product36, product37, product38];

const category = new Category({
    name: 'Laptops',
    filters: [
        {
            name: 'Brand',
            variants: [
                'ACEMAGIC', 'Lenovo',
                'Acer', 'OTVOC',
                'ASUS', 'HP',
                'Dell'
            ]
        },
        {
            name: 'Colour',
            variants: [
                'Gray',
                'Blue',
                undefined,
                'Silver',
                'Star Black',
                'Graphite Black',
                'Jet Black',
                'Black'
            ]
        },
        {
            name: 'Display Resolution',
            variants: ['1920 x 1080 Pixels', '1920 x 1080', '1366 x 768']
        },
        {
            name: 'Average Battery Life (in hours)',
            variants: ['8 Hours', undefined, '10 Hours', '12.5 Hours']
        },
        { name: 'Processor Brand', variants: ['Intel', 'MediaTek'] },
        {
            name: 'Number of Processors',
            variants: ['4', '8', '1', '2', '6', undefined]
        },
        {
            name: 'Item model number',
            variants: [
                'AX15',
                'Lenovo Slim 3',
                'TravelMate P449-G3',
                'CB315-3H-C0UU',
                'N1',
                'L510MA-DS09-CA',
                'X515MA-AH09-CA',
                'FX506HF-AS51-CA',
                '15-fd0000ca',
                undefined
            ]
        },
        { name: 'Hardware Platform', variants: ['PC', undefined] },
        {
            name: 'Memory Type',
            variants: ['DDR4', undefined, 'SDRAM', 'Unknown']
        },
        {
            name: 'Standing screen display size',
            variants: [undefined, '14 Inches', '15.6 Inches', '11.6 Inches']
        },
        {
            name: 'Max screen resolution',
            variants: [
                undefined,
                '1920 x 1080 Pixels',
                '1366 x 768 Pixels',
                '1920x1080 Pixels'
            ]
        },
        {
            name: 'Processor',
            variants: [
                '2.05 GHz mediatek_mt8183',
                '2.4 GHz core_i5_6200u',
                '1.1 GHz celeron_n4020',
                '2.8 GHz celeron_n',
                '1.1 GHz none',
                '2.7 GHz apple_ci5',
                '3.4 GHz none',
                '1.6 GHz 8032'
            ]
        },
        {
            name: 'RAM',
            variants: ['2 GB', '4 GB', '8 GB', '16 GB', '64 GB']
        },
        {
            name: 'Hard Drive',
            variants: ['64 GB', '512 GB', '128 GB']
        },
        {
            name: 'Graphics coprocessor',
            variants: [
                'MediaTek Integrated Graphics',
                'Intel UHD Graphics 600',
                'Intel UHD Graphics',
                'Intel UHD Graphics 605',
                'NVIDIA® GeForce RTX™ 2050 4GB GDDR6',
                'Intel HD Graphics 400'
            ]
        },
        {
            name: 'Card description',
            variants: ['Integrated', 'Dedicated']
        },
        {
            name: 'Wireless Standard',
            variants: [
                undefined,
                '802.11ax',
                'Bluetooth, 801.11ac',
                'Bluetooth, 802.11a/b/g/n/ac',
                'Bluetooth, 802.11ac',
                'Bluetooth, 802.11ax',
                '802.11ac',
                '802.11n, 802.11b, 802.11g'
            ]
        },
        {
            name: 'Operating System',
            variants: [
                'Chrome OS',
                'Windows 10 Pro',
                'Windows 11',
                'Windows 11 Home'
            ]
        },
        {
            name: 'Hard Disk Interface',
            variants: ['Solid State', 'eSATA']
        },
        { name: 'Chipset brand', variants: ['Intel', 'NVIDIA'] },
        {
            name: 'Series',
            variants: [
                undefined,
                'Acer TravelMate P449-G3',
                'Chromebook CB315-3H',
                'VocBook 15',
                'ASUS Laptop L510 Ultra Thin Laptop',
                'ASUS VivoBook 15 X515 Thin and Light Laptop',
                'ASUS TUF Gaming F15 Gaming Laptop',
                'HP 15.6 inch Laptop PC 15-fd0000ca',
                'Dell Chromebook 11 3180 D44PV'
            ]
        },
        {
            name: 'Optical Storage Device Type',
            variants: ['No', 'DVD']
        },
        {
            name: 'Flash memory size',
            variants: ['16 GB', '64 GB', '128 GB', '512 GB']
        },
        {
            name: 'Batteries',
            variants: [
                undefined,
                '1 Lithium Ion batteries required. (included)',
                '2 Lithium Polymer batteries required. (included)'
            ]
        },
        {
            name: 'Graphics Memory Size',
            variants: ['2 GB', '4 GB', '16 GB']
        },
        { name: 'Number_of_Processors', variants: ['4', '2'] }
    ]
});

const importData = async () => {
    try{
       await Product.create(products);
       await Review.create(reviews);
       await Category.create(category);

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
