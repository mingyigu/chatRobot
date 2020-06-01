var lb = document.getElementById("lunbo")
var num = 1;
var array = ["床头柜","电风扇","沙发","洗衣机"]
// 自动换图
setInterval(function(){
    num++;
    if(num == 4){
        num = 0;     
    }
    lb.src="../image/" + array[num] + ".png";
},3000)


