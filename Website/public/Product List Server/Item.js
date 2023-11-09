export class Item{
    get itemPattern(){return `
    <div class="item">
        <!-- onclick="location.href='https://stackoverflow.com/'" -->
            <a href="https://stackoverflow.com/" class="itemLink"><div class="item-image-holder"><img src = "./../Images/img1.jpg" id="itemImage" width="150px" height="173"></img></div></a>
            <div class="item-data-holder">
                <div class="nameContainer"><a href="https://stackoverflow.com/" class="itemLink"><span class= "itemName">Apple iPad 2018 32GB - WiFi Only</span></a></div>

                <div class="itemPrice">200$</div>
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
        this.setLink("https://coolors.co/");
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
    setLink(url){
        const links = this.element.querySelectorAll('.itemLink');
        for(let i = 0; i < links.length; i++){
            links[i].href = url;
        }
    }
}