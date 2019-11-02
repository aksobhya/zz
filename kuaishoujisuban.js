(function(){
    var elements = {
        AppName:"kuaishoujisuban",
        packageName:"com.kuaishou.nebula",
        home:{
            threebar:'className("android.widget.ImageView").id("left_btn")',
            threepoint:'className("android.view.View").id("comment_icon")'
        },
        /*youngmod:{
        },
        */
        mine:{
            earn:'className("android.widget.TextView").id("red_packet_text")',
            touxiang:'className("android.widget.ImageView").id("tab_avatar")'
        },
        redpage:{
            goearn:'className("android.view.View").text("去赚钱")',
            gosignin:'className("android.view.View").text("去签到")'
        },
        signin:'className("android.view.View").text("好的")'
    }

    var sac = {util:require("./util.js")};

    sac.util.clean();
    sac.util.openApp(elements.packageName);
    sleep(10000);  // Open app , look around and decide to signin.

    if(sac.util.gropev2(elements.home, 5000)){
        sac.util.forcePress(elements.home.threebar);
        sleep(8000);    //Open threebar , decide to earn.
    }else{
        sac.util.print("Home to Signin, Error!", 1);
        return ;
    }
    if(sac.util.gropev2(elements.mine, 5000)){
        sac.util.forcePress(elements.mine.earn);
        sleep(5000);    //Open earn, decide to signin.
    }else{
        sac.util.print("Threebar to Earn, Error!", 1);
        return ;
    }
    
    // Close auto_jump signin, press sigin button.
    // Some code to close auto signin here.
    
    if(sac.util.gropev2(elements.redpage, 5000)){
        sac.util.forcePress(elements.redpage.gosignin);
        sleep(5000);
        sac.util.forcePress(elements.signin);
        sleep(5000);
    }else{
        sac.util.print("Redpage to sigin, Error!", 1);
        return ;
    }
    
    if(sac.util.gropev2(elements.redpage, 5000)){
        sac.util.forcePress(elements.redpage.goearn);
        
        //watchvideo()
    }else{
        sac.util.print("Redpage to goearn, Error!", 1);
        return ;
    }


})()