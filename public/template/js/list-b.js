class moveT{
    constructor(options){
        this.listU=options.listU;
        this.li = options.li;
        this.b = options.listB;
        this.bannerList = options.bannerList
        this.m()
        this.outli()
    }
    m(){
        var that = this;
        for(let i=0;i<this.li.length; i++){
            //this.index = i
            this.li[i].onmouseover = function(){
                for(var j=0; j<that.li.length; j++){
                    that.li[j].style.background = "";
                }
                this.style.background = "red";
                
                that.index = i
                that.load()
            } 
        }
    }

    load(){
        var that = this
        $.ajax({
            url:"json/data.json",
            success:function(res){
                that.res = res;
                //console.log(that.res)
                that.display()
            }
        })
    }
    display(){
        var str = "";
        for(var i=0; i<this.res[this.index].length; i++){
                  str +=`<li>
                      <a href="#"><img src="${this.res[this.index][i].src}" /><span>${this.res[this.index][i].name}</span></a>
                      </li>`
        }
        this.b.innerHTML=str;
        this.b.style.display = "block";
        
        this.in() 
    }
    in(){
        var that = this
        this.b.onmouseover = function(){
            that.b.style.display = "block";
            that.out()
        }
    }
    out(){
        var that = this
        this.b.onmouseout = function(){
            that.b.style.display = "none";
            
            
        }
    }
    outli(){
        var that = this
        // for(var i=0; i<this.li.length; i++){
        //     this.li[i].onmouseout = function(){
        //         that.b.style.display = "none"
        //         that.li[i].style.background = "";
        //     }
        // }

        for(let i=0;i<this.li.length; i++){
            this.li[i].onmouseout = function(){
                for(var j=0; j<that.li.length; j++){
                    that.li[j].style.background = "";
                    that.b.style.display = "none"
                }
                
            } 
        }
        
    }

}

new moveT({
    listU:document.querySelector(".list-u"),
    li:document.querySelectorAll(".list-u li"),
    listB:document.querySelector(".list-b"),
    bannerList:document.querySelector(".banner-list")
})