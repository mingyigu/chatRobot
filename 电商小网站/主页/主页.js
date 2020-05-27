var count = 2;
function deletediv() {
    var x = document.getElementById("div1");
    var shoppingCar = document.getElementById("shoppingCar");
    x.parentNode.removeChild(x);
}

function appenddiv() {
    var divi =  document.createElement("div" + count); 
    var shoppingCar = document.getElementById("shoppingCar");
    shoppingCar.appendChild(divi);
    divi.style.width = "100px";
    divi.style.height = "100px";
    divi.style.backgroundColor = "#ffffcc";

}

function addTOShoppingCar() {
    var clickedNode = event.target;
    var id = clickedNode.parentNode.id;
    alert(id);
}

var x = document.getElementById("沙发");
//alert(x.getAttribute("price"));