(function(){
    var elements = {
        AppName:"kuaishoujisuban",
        packageName:"com.kuaishou.nebula",
        threebar:{
            id:"left_btn"
        }
    }
    let sac =  {
        util:require('./util.js')


    }
    sac.util.clean();
    sac.util.openApp(elements.packageName);
    let a = sac.util.grope(elements.threebar,5000);
    console.log(a);
    sleep(10000);

})()