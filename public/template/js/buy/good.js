class Good{
    constructor(){
        this.Refrigerator=$("#Refrigerator");
        this.layz = $("#Refrigerator .container-fluid .row .col-xs-3 .figure .zou").children(".layz")
        this.url = "/api/buy";
        this.load();
        this.addEve();
    }
    load(){
        var that = this;
        ajaxPost(this.url).then(function(res){
            console.log(res)
            that.res = JSON.parse(res);
            //console.log(that.res)
            for(var i=0; i<that.res.length; i++){
                
                // console.log()
                that.layz[i].setAttribute("index",that.res[i].id)
                //console.log(that.layz[i])
            }
        })
        
    }
    addEve(){
        var that = this;
        $("#Refrigerator").on("click",".layz",function(eve){
            var target = $(event.target);
            this.id=$(this).attr("index")
            //console.log(this.id)

            that.cook(this.id)
            location.href="buy.html";
        })
       
    }
    cook(value){

        this.goods = getCookie("goods") == "" ? [] :JSON.parse(getCookie("goods"));
        if(this.goods.length<1){
            this.goods.push({
                id:value,
                num:1
            })
         }else{ 
                var onOff=true;
                for(var i=0; i<this.goods.length; i++){
                    console.log(this.goods[i].id )
                     console.log(this.goods[i].id == value)
                    if(this.goods[i].id == value){
                        this.goods[i].num = 1;
                        onOff=false;
                        break;
                    }
                }
                if(onOff==true){
                this.goods.push({
                    id:value,
                    num:1
                })
         
            }
        }
        
        setCookie("goods",JSON.stringify(this.goods));
    }
    

}



new Good()