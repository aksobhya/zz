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
        earn:{
            text:"专属任务"
        },
        coin:{
            text:"金币收益"
        },
        btn:{
            id:"main_tab_task_img"
        }
    },
    watchtv:{
        id:"main_bottom_tab_home"
    }
    
};
let sac = {
    util:require('./util.js'),
    
    getauthor:()=>{
        let a = sac.util.prove(elements.home.author);
        let aname
        try{
            aname  = a.text();
        }catch(e){

        }
    }
}

    let n = 100;

    while(n > 0){
        let a = sac.getauthor();
        sac.util.shortvideoswipup();
        let b = sac.getauthor();
        let warning;
        if(a === b){
            warning++;
            if(warning > 5){
                sac.util.clean();
            }
            sac.util.shortvideoswipup();
        }else{
            warning = 0;
        }
        n--;
    }