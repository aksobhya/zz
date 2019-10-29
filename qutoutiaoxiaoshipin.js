(function () {
    var elements = {
        AppName: "qutoutiaoxiaoshipin",
        Packagename: "com.jifen.seafood",
        home:{
            author:{
                id:"author_nickname",
                className:"android.widget.TextView"
            },
            more:{
                id: "more"
            }
        },
        task:{
            title:{
                className:"android.view.View",
                text:"赚钱技巧"
            },
            btn:{
                id:"main_tab_task_img"
            }
        },
        btntv:{
            id:"main_bottom_tab_home",
            className:"android.widget.RelativeLayout"
        }


    };
    let sac = {
        util:require('./util.js'),
        whereis:(intention,time)=>{
            time = time || 50;
            switch(intention){
                case 'home':
                    if(sac.util.prove(elements.home.author, time) && sac.util.prove(elements.home.more, time)){
                        return true;
                    }else{
                        return false;
                    }              
                case 'task':
                    if(sac.util.prove(elements.task.btn, time) && sac.util.prove(elements.task.title, time)){
                        return true;
                    }else{
                        return false;
                    }
                default:
                    return false;
            }
        },
        checkin:()=>{
            if(!sac.whereis("home", 10000)){
                sac.util.print("Check Error.", 2);
                return ;
            }
            sac.util.forcePress(elements.task.btn);
            sac.util.print("Check in Successful!", 2);
            sleep(8000);
            if(sac.whereis("task", 5000)){
                sac.util.forcePress(elements.btntv);
                sleep(2000);
                sac.util.print("Return to home!", 2);
            }
            
        },
        getauthor:()=>{
            let a = sac.util.prove(elements.home.author);
            try{
                var aname  = a.text();
            }catch(e){

            }
            if(aname){
                return aname;
            }
            return false;
        },
        watchvideo:()=>{
            let a, b;
            let warning = 0;
            let enjoy = random(5000,15000);
            while(true){
                a = sac.getauthor();
                sac.util.print("author_a " + a, 3);
                sac.util.shortvideoswipup();
                sleep(1000);
                b = sac.getauthor();
                sac.util.print("author_b " + b, 3);
                if(a === b ){
                    sac.util.print("warning +", 2);
                    warning ++;
                }else{
                    sac.util.print("sleep " + enjoy, 3);
                    sleep(enjoy);
                    return true;
                }
                if(warning > 5){
                    return false;
                }
            }
        },
        multi_watchvideo:()=>{
            let d = random(3600, 6000);
            sac.util.print("Watch video time" + d + "seconds", 2);
            let s = parseInt(Date.now() / 1000);
            let e ;
            while(true){
            
                if(!sac.watchvideo()){
                    sac.util.print("Warning 5 times end!", 2);
                    return ;
                }
                sac.watchvideo();
                e = parseInt(Date.now() / 1000);
                if((e-s) < d){
                    continue ;
                }else{
                    return ;
                }

            }
        }
    }
    

    sac.util.clean();
    sac.util.openApp(elements.Packagename);
    sleep(10000);
    if(!sac.whereis("home", 30000)){
        sac.util.print("Start Error.", 2);
        return ;
    }
    sleep(15000);
    sac.checkin();
    sac.multi_watchvideo();

    sac.util.clean();

})()