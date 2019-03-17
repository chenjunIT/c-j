class Car{
    constructor(){
        this.container= document.querySelector(".container");
        this.url = "js/buy/data.json";
        this.load();
        this.addEve();
        this.add()
    }
    load(){
        var that = this;
        ajaxGet(this.url).then(function(res){
            that.res = JSON.parse(res);
            that.cook()
        }) 
    }
    cook(){
        this.goods = JSON.parse(getCookie("goods"))
        var str="";
        for(var i=0; i<this.goods.length; i++){
            for(var j=0; j<this.res.length; j++){
                if( this.goods[i].id == this.res[j].id ){
                    str =`<div class="buy ">
                    <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">冰箱</a></li>
                    <li class="breadcrumb-item"><a href="#" >对开门</a></li>
                    <li class="breadcrumb-item">LED49X8S 49吋无边全面屏 超薄金属机身 LED49X8S</li>
                    </ol>
                    </nav>
                    <div class="product-page">
                    <div class="row">
                    <div class="col-xs-7" >
                    <div class="product-main-image" style="position: relative;">
                    <img src="${this.res[j].src}" class="zoomImg id-74c65b13afe3eb4038f3b08dcf4ad209" style="position: absolute; top: 70px; left:160px;opacity: 1; width: 250px; height: 250px; border: none; max-width: none; max-height: none;">
                    </div>
                    </div>
                    <div class="col-xs-5" >
                    <h3 >${this.res[j].h}</h3>
                    <div>${this.res[j].div}</div>
                    <div class="price-availability-block clearfix">
                    <span class="price"> <strong>${this.res[j].price}</strong>
                    <span style="text-decoration:line-through;color:#b0b0b0;">${this.res[j].span}</span>
                    </span>
                    <span><i class="glyphicon glyphicon-qrcode" style="margin-right: 5px;"></i>手机购买</span>
                    
                    </div>
                    <div class="product-spec-options">
                    <dl></dl>
                    </div>
                    <div class="product-page-cart">
                    <div class="product-quantity input-group" style="width:160px;" data-minibuy="">
                    <dl class="dl-horizontal">
                    <dt>数量</dt>
                    </dl>
                    <div class="spinner-buttons input-group-btn">
                    <button type="button" class="btn btn-default left" index = "${this.res[j].id}">-</button>
                    </div>
                    <input type="text" class="spinner-input" id="numBer" data-id="645" value="${this.goods[i].num}">
                    <div class="spinner-buttons input-group-btn">
                    <button type="button" class="btn btn-default right" index = "${this.res[j].id}">+</button>
                    </div>
                    </div>
                    <div class="row">
                    <a class="btn btn-danger favorite btn-buy distanceRight" href="/index.php/cart-fastbuy-645-1.html">立即购买</a>
                    <a class="btn btn-warning favorite distanceRight go" href="car.html">加入购物车</a>
                    <a class="btn btn-nostock hide disabled" href="javascript:;">已售完</a>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div> 
                    </div>`
                    
                }
                
            }
        } 
        this.container.innerHTML=str; 
    }
    
    addEve(){
        var that = this;
        $(".container").on("click",".right",function(eve){
            var target = $(event.target);
            this.id = $(this).attr("index")
            
            that.cooki(this.id)
        })
        
        $(".container").on("click",".left",function(eve){
            var target = $(event.target);
            this.id = $(this).attr("index")
            
            that.cookii(this.id)
        })

        // $(".container").on("click","go",function(){

        //     location.href="car.html";
        // })
    }
    cooki(value){
        var that = this
        this.goods = JSON.parse(getCookie("goods"))
        for(var i=0;i<this.goods.length;i++){
            if(this.goods[i].id == value){
                    this.goods[i].num++;
            } 
        }
        setCookie("goods",JSON.stringify(this.goods));
        this.cook()
    }
    cookii(value){
        var that = this
        this.goods = JSON.parse(getCookie("goods"))
        for(var i=0;i<this.goods.length;i++){
            if(this.goods[i].id == value){
                if(this.goods[i].num == 1){
                    this.goods[i].num == 1
                }else{
                    this.goods[i].num--;
                }
                    
            } 
        }
        setCookie("goods",JSON.stringify(this.goods));
        this.cook()
    }

    add(){
        var that = this;

        $(".buy").on("click",".go",function(eve){
            var target = $(event.target);
            location.href="car.html";
        })
    }
}

new Car()