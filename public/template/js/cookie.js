//增 设cookie，setCookie
function setCookie(key,value,day){
    var d = new Date();
    d.setDate(d.getDate()+day);
    document.cookie = key + "=" + value + ";expires=" + d;
}

// 删，设置过去的时间就是删除
function removeCookie(key){
    setCookie(key,1,-1)
}

// 查 根据名字，返回值
function getCookie(key){
    var arr = document.cookie.split("; ");
    for(var i=0;i<arr.length;i++){
        if(arr[i].split("=")[0] == key){
            return arr[i].split("=")[1]
        }
    }
    return "";
}