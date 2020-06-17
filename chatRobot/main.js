
var text ="";
var a1;
var iSay;
function search() {
    
    var a2;
    var t = 'saas';
    iSay = $("#inp").val();
    text += "我:" + iSay + "<br>";
    $("#answer").html(text);
    //"7d14fa4bc295404a9fced576c37453e5"
    //fetch()方法
    //var answer = fetch('http://api.qingyunke.com/api.php?key=free&appid=0&msg=' + val).then(response )
    var APIKEY = "dddf2fe770ca4c46ac0aa41cb88f16ac"

    //在指定网址获得答复内容
    $.get("http://www.tuling123.com/openapi/api?key=" + APIKEY + "&info=" + iSay, function(data){
    a1 = data.text;
    console.log(a1);
        })
    setTimeout("reply()",2500);
    
    
    /*text += "我:" + val + "<br>" + "机器人:" + a1 + a2  + "<br>";
    $("#answer").html(text);*/
}

function reply(){
    //var t =  $("#answer").html();
    //var a =  JSON.parse(a1)
    text += "机器人:" + a1  + "<br>";
    $("#answer").html(text);


}
