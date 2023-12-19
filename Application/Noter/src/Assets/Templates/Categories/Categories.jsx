import './Categories.css';
import React from 'react';
import ElectronicsImage from './Images/Electronics.png';
import TablestsImage from './Images/Tablets.png';
import LaptopsImage from './Images/Laptops.jpg';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
     <div>
        <ul class="categoriesList">
           <li class="category">
              <img src={ElectronicsImage} />
              <a class="name">Computers and components</a>
           </li>
           <li class="category">
              <img src={ElectronicsImage} />
              <a class="name">Computers</a>
           </li>
           <Link to="/products" class="category">
              <img class="image" src={TablestsImage} />
              <a class="name">Tablets</a>
           </Link>
           <Link to="/products?category=657e0d29c1cb6b530d5a1203" class="category">
              <img src={LaptopsImage} />
              <a class="name">Laptops</a>
           </Link>
           <li class="category">
              <img src={ElectronicsImage} />
              <a class="name">Computers</a>
           </li>
           <li class="category">
              <img src={ElectronicsImage} />
              <a class="name">Computers</a>
           </li>
           <li class="category">
              <img src={ElectronicsImage} />
              <a class="name">Computers</a>
           </li>
           <li class="category">
              <img src={ElectronicsImage} />
              <a class="name">Computers</a>
           </li>
           <li class="category">
              <img src={ElectronicsImage} />
              <a class="name">Computers</a>
           </li>
           <li class="category">
              <img src={ElectronicsImage} />
              <a class="name">Computers</a>
           </li>
           <li class="category">
              <img src={ElectronicsImage} />
              <a class="name">Computers</a>
           </li>
           <li class="category">
              <img src={ElectronicsImage} />
              <a class="name">Computers</a>
           </li>
        </ul>
     </div>
  );
};

export default Categories;
