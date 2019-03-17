class Car{
    constructor(){
        this.table = document.querySelector("table");
        this.tbody = document.querySelector("tbody");
        this.url = "/api/buy";

        this.load()  //1、请求数据
    }
    load(){
        var that = this;
        ajaxPost(this.url).then(function(res){
            that.res = JSON.parse(res);
            that.cook()
        }) 
    }

    cook(){
        this.goods = JSON.parse(getCookie("goods"))
        var str="";
         for(var i=0; i<this.goods.length; i++){
                for(var j=0; j<this.res.length; j++){
                    if(this.goods[i].id == this.res[j].id){
                        str +=`<tr>
                                    <td><img src="${this.res[j].src}"/><span>${this.res[j].h}</span></td>
                                    <td>${this.res[j].price}</td>
                                    <td>${this.goods[i].num}</td>
                                    <td>${this.res[j].price}</td>
                                </tr>`
                    }
                }
        } 
        this.tbody.innerHTML=str;
        
     }
}

new Car()