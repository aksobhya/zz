(function(){
    var elements = {
        AppName:"kuaishoujisuban",
        packageName:"com.kuaishou.nebula",
        home:{
            threebar:'className("android.widget.ImageView").id("left_btn")',
            threepoint:'className("android.view.View").id("comment_icon")'
        },
        youngmod:{



        },
        invite:{
            close:'className("android.widget.ImageButton").id("close")',
            lijiyaoqing:'className("android.widget.TextView).id("negative")'

        }
    }

    var sac = {util:require("./util.js")};

    sac.util.clean();
    sac.util.openApp(elements.packageName);
    sleep(10000);  // Open app , look around and decide to signin.

    let where = sac.util.gropev2(elements);
    if(where("home", 5000)){
        sac.util.forcePress(elements.home.threebar);
    }else{
        sac.util.print("Home to Signin, Error!", 1);
        return ;
    }
    
    sleep(10000);

})()