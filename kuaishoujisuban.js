(function(){
    var elements = {
        AppName:"kuaishoujisuban",
        packageName:"com.kuaishou.nebula",
        signin:{
            threebar:'className("android.widget.ImageView").id("left_btn")'
        },
    }

    var sac = {util:require("./util.js")};

    sac.util.clean();
    sac.util.openApp(elements.packageName);
    sleep(10000);

    let where = sac.util.grope(elements.signin, "threebar");
    if(where("threebar", 5000)){
        sac.util.forcePress(elements.signin.threebar);
    }else{
        sac.util.print("Home to Signin, Error!", 1);
        return ;
    }
    
    sleep(10000);

})()