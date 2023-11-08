export class Item{
    get itemPattern(){return `
    <div class="item">
        <div class="item-image-holder"><img src = "./../Images/img3.jpg" id="itemImage" width="130px" height="173"></img></div>
        <div class="item-data-holder">
            <div class= "itemName">Apple iPad 2018 32GB - WiFi Only</div>

            <div class="itemPrice">190$</div>
        </div>
    </div>`};
    element;
    set itemPattern(value){
        throw Error(`Trying to set a new value to the constant itemPattern, value: "${value}".`);
    };

    constructor(itemData){
        this.element = this.createItem();

        if(!itemData) return;
        this.setItemData(itemData);
    }

    setItemData(itemData){
        this.setName(itemData.name);
        this.setImage(`http://localhost:3050/api/v1/products/photo/${itemData.imageCover}`)
        //http://127.0.0.1:3050/api/v1/products/photo/1
    }
    createItem(){
        let el = document.createElement('div');
        el.innerHTML = this.itemPattern;
        return el;
    }
    setName(name){
        const itemName = this.element.querySelector('.itemName');
        itemName.textContent = name;
    }
    setImage(url){
        const image = this.element.querySelector('#itemImage');
        image.src = url;
    }
}