
function Login(){
    var s = document.getElementById("txt");
    location.href="主页.html?"+"txt="+encodeURI(s.value);
}

function toRegister(){
    location.href="../注册界面/注册界面.html";
}


function login() {
    
    var input1 = document.getElementById("username");
    var input2 = document.getElementById("password");
    var username = input1.value;
    var password = input2.value;
    var massage ={
        type:"login",
        username:username,
        password:password,
    }
    //进行Ajax交互，确认用户信息的正确性，若正确则页面跳转到主页。
    var xml = new XMLHttpRequest();
    xml.open("post","url",true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(massage));
    xml.onreadystatechange = function () {
        if(this.readyState == 4) {
            console.log("交互已经完成");
            if(this.status == 200) {
                var response = JSON.parse(this.responseText);
                if(response == "success") {
                    alert("登入成功")；
                    location.href="../主页/主页.html?"+"username="+encodeURI(username);
                }
                else{
                    alert("登入失败");
                }
                
            }
        }
    }
}

//网页跳转https://blog.csdn.net/wangchaoqi1985/article/details/81702004 