var count = 0; //购物车中的商品种类
var sumPrice = 0;//购物车中的所有选中商品的价格
function deletediv() {
    var x = document.getElementById("div1");
    var shoppingCar = document.getElementById("shoppingCar");
    x.parentNode.removeChild(x);
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
        if(item.getAttribute("check") == 1) {
            sumPrice += Number(item.getAttribute("price"));
            document.getElementById("accountWord").innerText = "合计: ¥" + sumPrice;
        }
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
    item.setAttribute("check",-1);
    item.setAttribute("price",document.getElementById(id).getAttribute("price"));
    
    //给div添加选择健和商品图片
    var buttonAndImage = document.createElement("div");
    buttonAndImage.className = "buttonAndImage"
    item.appendChild(buttonAndImage);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click",function() {
        var clickedNode = event.target;
        var item = clickedNode.parentNode.parentNode;
        item.setAttribute("check",-Number(item.getAttribute("check")));
        if(Number(item.getAttribute("check")) == 1){
            sumPrice += Number(item.getAttribute("price")) * Number(item.getAttribute("num"));
        }
        else {
            sumPrice -= Number(item.getAttribute("price")) * Number(item.getAttribute("num"));
        }
        document.getElementById("accountWord").innerText = "合计: ¥" + sumPrice;
    })
    buttonAndImage.appendChild(checkbox);
    var img = document.createElement("img");
    img.src="../image/" + id + ".png"
    buttonAndImage.appendChild(img);
    img.className = "imgInShoppingCar";
    
    //给商品添加单价
    var price = document.createElement("div");
    price.innerText = id +  "\n¥" +   document.getElementById(id).getAttribute("price")
    price.className = "priceInShoppingCar";
    item.appendChild(price);

    //给div添加商品数量，以及加减图标,同时绑定加减功能
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
        if(item.getAttribute("check") == 1){
            sumPrice += Number(item.getAttribute("price"));
            document.getElementById("accountWord").innerText = "合计: ¥" + sumPrice;
        }
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
            return;
        }
        else{
            var num = document.getElementById(item.id + "Num");
            num.innerText = item.getAttribute("num");
        }
        if(item.getAttribute("check") == 1 ) {
            sumPrice -= Number(item.getAttribute("price"));
            document.getElementById("accountWord").innerText = "合计: ¥" + sumPrice;
        }
        
    })  

    
    //在末尾加入结算的按钮和文字;
    var account = document.createElement("div");
    account.id = "accountDiv";
    shoppingCar.appendChild(account);

    var accountButton = document.createElement("button");
    accountButton.className =  'accountButton';
    accountButton.innerText = "结算";
    accountButton.style.cursor = "pointer";
    accountButton.addEventListener("click",accountSumFuc);
    account.appendChild(accountButton);

    var accountWord = document.createElement("div");
    accountWord.id = "accountWord";
    accountWord.innerText = "合计: ¥0";
    account.appendChild(accountWord);
    
    
}

//结算购物车中选择的商品
function accountSumFuc() {
    var shoppingCar = document.getElementById("shoppingCar");
    var len = shoppingCar.childElementCount + 1;
    var chlids = shoppingCar.childNodes;
    var num = [];
    for(var i = 0; i < len; i++ ) {
        if(chlids[i].className && chlids[i].className == "item"){
            if(Number(chlids[i].getAttribute("check")) == 1){
                num.push(chlids[i].id);
                //chlids[i].parentNode.removeChild(chlids[i]);
                //sumPrice += Number(chlids[i].getAttribute("price")) * Number(chlids[i].getAttribute("num"));
            }
        }
    }
    console.log(num);
    for(var i = 0; i < num.length; i++) {
        var x = document.getElementById(num[i]);
        //sumPrice += Number(x.getAttribute("price")) * Number(x.getAttribute("num"));
        x.parentNode.removeChild(x);
        count--;
    }
    if(count == 0) {
        var account = document.getElementById("accountDiv");
        account.parentNode.removeChild(account);
    }
    alert(sumPrice);
    sumPrice = 0;
}

//切换用户
function userSwitch() {
    location.href="../登入界面/登入界面.html";
}


//生成历史订单
function generateOrder(time,item,num,price){
    return
}


//alert(x.getAttribute("price"));