let basket = JSON.parse(localStorage.getItem("data")) || [];
let pay = document.getElementById('pay');
let form = document.getElementById('myForm');

//This function calculate the total number of items
let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}

calculation();
 
//This funcion generete the total bill
let generateTotalBill = () => {
    let amount = basket.map((x)=>{
        let {item,id} = x;
        let search = shopItemsData.find((y)=>y.id === id) || [];
        return item * search.price;
    }).reduce((x,y)=>x+y,0);
    label.innerHTML = `
    <h2>Total Bill:${amount}€</h2>
    `
};

generateTotalBill();

//This funcion reset the cart
let resetCart=()=>{
    basket = [];
    generateTotalBill();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket)); 
};

//Here add a function to the button pay for reset the cart if the form is correctly completed
pay.addEventListener('click', function () {
    if (form.checkValidity()) {
        resetCart();
    } else {
        alert('Please complete the form correctly');
    }
});
