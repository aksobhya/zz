(function(){
    var elements = {
        AppName:"kuaishoujisuban",
        packageName:"com.kuaishou.nebula",
        mine:{
          earn:'className("android.widget.TextView").id("red_packet_text")',
          touxiang:'className("android.widget.ImageView").id("tab_avatar")'
        },
        redpage:{
            goearn:'className("android.view.View").text("去赚钱")',
            gosignin:'className("android.view.View").text("去签到")'
        },
        sigin:{
            fastsigin:'className("android.view.View").text("立即签到")',
            buttonsignin:'className("android.view.View").text("好的")'
        }
  }
        



    var sac = {util:require("./util.js")};
    let a = sac.util.getsign(elements.packageName);
    console.log(a);

})()