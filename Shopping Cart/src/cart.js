let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');
let basket = JSON.parse(localStorage.getItem("data")) || [];

//This function calculate the total number of items
let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}

calculation();

//This function generete the cart items
let generateCartItems = () => {
    if (basket.length!=0){
        return (shoppingCart.innerHTML = basket.map((x)=>{
            let {id,item}=x;
            let search = shopItemsData.find((y)=>y.id === id) || [];
            let {img,name,price} = search;
            return `
            <div class="cartItem">
               <img width="100" height="100" src=${img} alt="" />
               <div class="details">
                    <div class="title-price-x">
                        <h3 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">${price}€</p>
                        </h3>
                        <i onclick="removeItem(${id})" class="bi bi-x-octagon"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-circle"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-circle"></i>
                    </div>
                    <div class="card-buttons"></div>
                    <h3>${item*price}€</h3>
               </div>
            </div>
            `;
        }).join(""));
    } else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href= "index.html">
            <button class="HomeButton">back to home</button>
        </a>
        `;
    }
};

generateCartItems();

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
    generateCartItems();
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
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

//This function take an item's id and update the items number
let update =(id)=>{
    let search = basket.find((x)=> x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

//This function remeve the all number of an item
let removeItem =(id)=>{
    let selectedItem = id;
    basket = basket.filter((x)=>x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket)); 
};

//This funcion clear the cart
let clearCart=()=>{
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket)); 
};

//This funcion generete the total amount
let totalAmount =()=>{
    if (basket.length!=0){
        let amount = basket.map((x)=>{
            let {item,id} = x;
            let search = shopItemsData.find((y)=>y.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=>x+y,0);
        label.innerHTML = `
        <h2>Total Bill:${amount}€</h2>
        <a href="form.html">
             <button class="checkout">Checkout</button>
        </a>
        <button onclick="clearCart()" class="clear">Clear Cart</button>
        `;
    } else return
};

totalAmount();