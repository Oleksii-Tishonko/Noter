const itemList = document.querySelector('.results-list');
import { Item } from './Item.js';

console.log('hi');
getDataFromServer(loadDataToPage);

function loadDataToPage(itemsData){
    for(let i = 0; i < itemsData.length; i++){
        let item = new Item(itemsData[i]);
        itemList.appendChild(item.element);
        
    }
}

async function getDataFromServer(callback){
    const url = "http://localhost:3050/api/v1/products"
    const responce = await fetch(url);
    const dataJson = await responce.json();
    const data = dataJson.data.products;
    
    console.log(data);
    callback(data);
}