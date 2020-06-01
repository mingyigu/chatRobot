//通过获得物品的名字，有无选中的状态以及数量，在购物车中创建此物品。
function InitAddTOShoppingCar(id,check,num) {
    var newId = id + "InShoppingCar";
    var item = document.getElementById(newId);

    //若该物品已在购物车中
    if(item != null){
        item.setAttribute("num",+item.getAttribute("num") + 1);
        var num = document.getElementById(item.id + "Num");
        num.innerText = item.getAttribute("num");
        if(item.getAttribute("check") == 1) {
            updateSumPrice();
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
    item.setAttribute("num",num);
    item.setAttribute("check",check);
    item.setAttribute("price",document.getElementById(id).getAttribute("price"));
    
    //给div添加选择健和商品图片
    var buttonAndImage = document.createElement("div");
    buttonAndImage.className = "buttonAndImage"
    item.appendChild(buttonAndImage);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    if(check == 1) {
        checkbox.checked = true;
    }
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
            updateSumPrice();
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
            updateSumPrice();
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

    updateSumPrice();
}


//在购物车内创建id为“(物品)InShoppingCar的div元素”
function addTOShoppingCar() {
    var clickedNode = event.target;
    var id = clickedNode.parentNode.id;
    InitAddTOShoppingCar(id,-1,1);
}

//更新购物车结算
function updateSumPrice() {
    sumPrice = 0;
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
    for(var i = 0; i < len; i++ ) {
        if(chlids[i].className && chlids[i].className == "item"){
            if(Number(chlids[i].getAttribute("check")) == 1){
                if(num.indexOf(chlids[i].id) == -1) {
                    num.push(chlids[i].id);
                }
                
                //chlids[i].parentNode.removeChild(chlids[i]);
                //sumPrice += Number(chlids[i].getAttribute("price")) * Number(chlids[i].getAttribute("num"));
            }
        }
    }
    for(var i = 0; i < num.length; i++) {
        var x = document.getElementById(num[i]);
        sumPrice += Number(x.getAttribute("price")) * Number(x.getAttribute("num"));
    }
    document.getElementById("accountWord").innerText = "合计: ¥" + sumPrice;
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
        //删除购物车中的物品，生成历史订单，并将订单信息传到后台
        var billNumber = createBillNumber();
        createMyBill(num[i].slice(0, -13),x.getAttribute("num"),x.getAttribute("price"),billNumber);
        //SentBillToEnd(num[i].slice(0,-13),x.getAttribute("num"),x.getAttribute("price"),billNumber);
        x.parentNode.removeChild(x);
        count--;
    }
    if(count == 0) {
        var account = document.getElementById("accountDiv");
        account.parentNode.removeChild(account);
    }
    sumPrice = 0;
    updateSumPrice();
}


//创建历史订单 
function createMyBill(id,num,price,billNumber) {
    var myBill = document.getElementById("myBill");
    var itemBill = document.createElement("div");
    itemBill.className = "Billdiv";
    itemBill.setAttribute("billNumber",billNumber);
    myBill.appendChild(itemBill);

    var idAndTimeAndDelete = document.createElement("div");
    idAndTimeAndDelete.className = "idAndTimeAndDelete";
    itemBill.appendChild(idAndTimeAndDelete);

    var idAndTime = document.createElement("div");
    idAndTime.className = "idAndTime";
    idAndTimeAndDelete.appendChild(idAndTime);

    var BillName = document.createElement("div");
    BillName.className = "BillName";
    BillName.innerText = id;
    idAndTime.appendChild(BillName);

    //添加下单时间
    var time = document.createElement("div");
    time.className = "time";
    time.innerText = getNowTime();
    idAndTime.appendChild(time);

    //添加删除按键及功能
    var deleteImg = document.createElement("img");
    deleteImg.className = "deleteImg";
    deleteImg.src = "../image/删除.png"
    deleteImg.style.cursor = "pointer";
    deleteImg.title = "删除此订单" ;
    deleteImg.addEventListener("click",function() {
        var clickedNode = event.target;
        var item = clickedNode.parentNode.parentNode;
        deleteBill(item.getAttribute("billNumber"));
        item.parentNode.removeChild(item);
    }) 
    idAndTimeAndDelete.appendChild(deleteImg);

    //添加数量和合计
    var numAndPrice = document.createElement("div");
    numAndPrice.className = "numAndPrice";
    itemBill.appendChild(numAndPrice);

    var numInBill = document.createElement("div");
    numInBill.className = "numInBill";
    numInBill.innerText = "x" + num;
    numAndPrice.appendChild(numInBill);

    var sumInBill = document.createElement("div");
    sumInBill.className = "sumInBill";
    sumInBill.innerText = "合计：" + (num * price);
    numAndPrice.appendChild(sumInBill);

    var BillNumber = document.createElement("div");
    BillNumber.className = "BillNumber";
    BillNumber.innerText = "订单号：" + billNumber;
    itemBill.appendChild(BillNumber);

}

//切换用户
function userSwitch() {
    location.href="../登入界面/登入界面.html";
}

//获得当前时间
function getNowTime() {
    var mydate = new Date();
    var time1 = mydate.getFullYear() + "-" + ((+mydate.getMonth()) + 1)  + "-" + mydate.getDay() + " ";
    var time2 = mydate.getHours() + ":" + mydate.getMinutes() + ":" + mydate.getSeconds();
    return time1 + time2;
}

//随机生成订单号
function createBillNumber() {
    var num = [];
    for(var i = 0; i < 10; i++) {
        var x = Math.floor(Math.random() * 10 + 1);
        num.push(x);
    }
    return num.join('');
}



//Ajax交互，将结算后的订单信息传到后台
function SentBillToEnd(id,num,price,billNumber) {
    var massage ={
        type:"sendBill",
        id:id,
        num:num,
        price:price,
        billNumber:billNumber,
    }
    //进行Ajax交互
    var xml = new XMLHttpRequest();
    xml.open("post","url",true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(massage));
    xml.onreadystatechange = function () {
        if(this.readyState == 4) {
            console.log("sendBill交互已经完成");
            if(this.status == 200) {
                var response = this.responseText;
                if(response == "success") {
                    console.log("sendBill成功");
                }
                else{
                    console.log("sendBill error")
                }
                
            }
        }
    }
}

//Ajax交互，删除指定的订单 
function deleteBill(billNumber) {
    var massage ={
        type:"deleteBill",
        billNumber:billNumber,
    }
    var xml = new XMLHttpRequest();
    xml.open("post","url",true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(massage));
    xml.onreadystatechange = function () {
        if(this.readyState == 4) {
            console.log("deleteBill交互已经完成");
            if(this.status == 200) {
                var response = this.responseText;
                if(response == "success") {
                    console.log("deleteBill成功");
                }
                else{
                    console.log("deleteBill error")
                }
                
            }
        }
    }
}


//Ajax交互,获得所有的历史订单,并渲染到页面上
function requestBill() {
    var massage ={
        type:"requestBill",
    }
    var xml = new XMLHttpRequest();
    xml.open("post","url",true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(massage));
    xml.onreadystatechange = function () {
        if(this.readyState == 4) {
            console.log("deleteBill交互已经完成");
            if(this.status == 200) {
                var response = JSON.parse(this.responseText);
                console.log("requestBill成功","订单共" + response.num,response);
            }
        }
    }
}
