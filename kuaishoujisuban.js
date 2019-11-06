(function(){
    var elements = {
        AppName:"kuaishoujisuban",
        packageName:"com.kuaishou.nebula",
        home:{
            threebar:'className("android.widget.ImageView").id("left_btn")',
            threepoint:'className("android.view.View").id("comment_icon")',
            author:'className("android.widget.TextView").id("user_name_text_view")'
        },
        closead:{
            child:'id("content").text("设置青少年模式")'
        },
        mine:{
            earn:'className("android.widget.TextView").id("red_packet_text")',
            touxiang:'className("android.widget.ImageView").id("tab_avatar")'
        },
        redpage:{
            goearn:'className("android.view.View").text("去赚钱")',
            gosignin:'className("android.view.View").text("去签到")'
        },
        signin:{
            fastsignin:'className("android.view.View").text("立即签到")',
            buttonsignin:'className("android.view.View").text("好的")'
        }
    }

    let sac = {
        util:require("./util.js"),
        signin:()=>{
            if(sac.util.getsigin(elements.AppName)){
                sac.util.print("Signin sucessful!", 3);
                return ;
            }
            sac.util.forcePress(elements.signin.fastsignin);
            sleep(3000);
            sac.util.forcePress(elements.signin.buttonsignin);
            sleep(3000);
            sac.util.savesigin(elements.AppName);
            back();
        }, 
        watchvideo:()=>{
            let d = random(3600, 6000);
            sac.util.print("Watch video time" + d + "seconds", 3);
            let s = parseInt(Date.now() / 1000);
            let e , watchtime;
            
            while(true){ 
                if((e-s) > d){
                    return ;
                }                   
                sac.util.shortvideoswipup(elements.home.author);
                watchtime = random(5000, 8000);
                sac.util.print("Sleep " + (watchtime / 1000) + " seconds!", 1);
                sleep(watchtime);
                
                e = parseInt(Date.now() / 1000);
                
            }
        },
        cancel:()=>{
            let child;
            try{
                child = id(elements.closead.child.id).text(elements.closead.child.text).findOne(50);
            }catch(e){};
            if(child)sac.util.forcePress(child);

        }
    };

    sac.util.clean();
    sac.util.openApp(elements.packageName);
    threads.start(function (){
        while(true){
            sac.cancel();
            sleep(1000);
        };
    });
    sleep(10000);  

    sac.signin();
    if(sac.util.gropev2(elements.home.threepoint)){
        sac.watchvideo();
    }else{
        sac.util.print("Signin back to home Error!", 1);
        return ;
    }
    sac.util.clean();

})()