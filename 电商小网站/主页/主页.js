var count = 0; //购物车中的商品种类
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

//在购物车内创建id为“(物品)InShoppingCar的div元素”
function addTOShoppingCar() {
    
    
    var clickedNode = event.target;
    var id = clickedNode.parentNode.id;
    var newId = id + "InShoppingCar";
    var item = document.getElementById(newId);

    //若该物品已在购物车中
    if(item != null){
        item.setAttribute("num",+item.getAttribute("num") + 1);
        var num = document.getElementById(item.id + "Num");
        num.innerText = item.getAttribute("num");
        return;
    }
    count++;
    var account = document.getElementById("accountDiv");
    if(account){
        account.parentNode.removeChild(account);
    }
    

    //创建div
    var divInShoppingCar = document.createElement("div");
    divInShoppingCar.id = newId;
    var shoppingCar = document.getElementById("shoppingCar");
    shoppingCar.appendChild(divInShoppingCar);
    var item = document.getElementById(newId);
    item.className = "item";
    item.setAttribute("num",1);
    
    //给div添加商品图片和文字
    var imgAndWord = document.createElement("div");
    imgAndWord.className = "imgAndWord"
    item.appendChild(imgAndWord)
    var word = document.createElement("span");
    word.innerText = id;
    imgAndWord.appendChild(word);
    var img = document.createElement("img");
    img.src="../image/" + id + ".png"
    imgAndWord.appendChild(img);
    img.className = "imgInShoppingCar";
    
    //给商品添加单价
    var price = document.createElement("div");
    price.innerText = "单价：" +   document.getElementById(id).getAttribute("price")
    price.className = "priceInShoppingCar";
    item.appendChild(price);

    //给div添加商品数量，以及加减图标
    var itemNum = document.createElement("div");
    itemNum.className = "itemNum";
    item.appendChild(itemNum);

    var add = document.createElement("img");
    add.className = "addAndSub"
    add.src = "../image/加.png"
    itemNum.appendChild(add);
    add.style.cursor = "pointer";
    add.addEventListener("click",function() {
        var clickedNode = event.target;
        var item = clickedNode.parentNode.parentNode;
        item.setAttribute("num",+item.getAttribute("num") + 1);
        var num = document.getElementById(item.id + "Num");
        num.innerText = item.getAttribute("num");
    })

    var num = document.createElement("div");
    num.id = item.id + "Num";
    num.innerText = item.getAttribute("num");
    itemNum.appendChild(num);


    var sub = document.createElement("img");
    sub.className = "addAndSub"
    sub.src = "../image/减.png"
    itemNum.appendChild(sub);
    sub.style.cursor = "pointer";
    sub.addEventListener("click",function() {
        var clickedNode = event.target;
        var item = clickedNode.parentNode.parentNode;
        item.setAttribute("num",+item.getAttribute("num") - 1);
        
        if(+item.getAttribute("num") == -1) {
            count--;
            item.parentNode.removeChild(item);
            if(count == 0) {
                var account = document.getElementById("accountDiv");
                account.parentNode.removeChild(account);
            }
        }
        else{
            var num = document.getElementById(item.id + "Num");
            num.innerText = item.getAttribute("num");
        }
        
    })

    //在末尾加入结算的按钮和文字;
    var account = document.createElement("div");
    account.id = "accountDiv";
    shoppingCar.appendChild(account);
    var accountWord = document.createElement("span");
    accountWord.innerText = "结算:";
    account.appendChild(accountWord);
    var accountImg = document.createElement("img");
    accountImg.src = "../image/结算.png";
    account.appendChild(accountImg);
    accountImg.style.cursor = "pointer";
    accountImg.className = "accountImg";

    
}

var x = document.getElementById("沙发");
//alert(x.getAttribute("price"));