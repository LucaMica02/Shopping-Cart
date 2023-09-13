let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

//This function generate the shop
let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let {id,name,price,desc,img} = x
        let search = basket.find((x)=>x.id===id) || [];
        return `
        <div class="item">
            <img width="220" height="220" src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price">
                    <h2>${price}€</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-circle"></i>
                        <div id=${id} class="quantity">
                        ${search.item === undefined ? 0 : search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-circle"></i>
                    </div>
                </div>
            </div>
        </div>`;
    }).join(""));
}

generateShop();

//This function increment the item
let increment =(id)=>{
    let selectedItem = id;
    let search = basket.find((x)=>x.id === selectedItem.id);

    if (search === undefined) {
    basket.push({
        id: selectedItem.id,
        item: 1,
    });
    } else {
        search.item += 1;
    }

    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

//This function decrement the item
let decrement =(id)=>{
    let selectedItem = id;
    let search = basket.find((x)=>x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x)=>x.item!=0);
    localStorage.setItem("data", JSON.stringify(basket));
};

//This function take an item's id and update the items number
let update =(id)=>{
    let search = basket.find((x)=> x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

//This function calculate the total number of items
let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}

calculation();