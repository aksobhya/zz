var util={};
util.print=(message,level)=>{
    level = level || 1;
    //1 = error    2 = warning  3 = info
    // 在执行方法之前定义 LEVEL 变量，可以控制调试信息输出等级
    if(level===1||level===2||level===3){
        try{if(LEVEL)level = LEVEL}catch(e){};
        if(level>=1){
            console.log(message)
        };
    };
};
util.visible=(element)=>{
    let pSizeX,pSizeY,sizeX,sizeY,cX,cY,parent;
    try{
        parent = element.parent();
        if(parent){
            util.print("检测父元素可见性",3);
            pSizeX = parent.bounds().width();
            pSizeY = parent.bounds().height();
            util.print("宽:"+pSizeX+",高:"+pSizeY,3);
            if(pSizeX<4||pSizeY<4){
                util.print("父元素在当前屏幕不可见",3)
                util.print("返回失败，退出当前方法",3)
                return false;
            };
        };
    }catch(e){
        util.print("获取父元素失败，但并不会造成验证失败 :",2);
        util.print(e,2);
    };
    try{
        sizeX = element.bounds().width();
        sizeY = element.bounds().height();
        cX = element.bounds().centerX();
        cY = element.bounds().centerY();
        util.print("检测元素属性",3)
        util.print("宽: "+sizeX+" 高:"+sizeY,3)
        util.print("X轴中心点: "+cX+" Y轴中心点: "+cY,3);
        util.print("屏幕宽: "+device.width+" 屏幕高: "+device.height,3);
        if(sizeX>1&&sizeY>1&&cX<device.width&&cY<device.height){
            util.print("检测通过",3)
            return true;
        }else{
            util.print("元素不在屏幕内",2)
            return false;
        };
    }catch(e){
        util.print(element,2);
        util.print(e,2);
        util.print("未检测到对象的坐标属性，错误退出",2);
        return false;
    };
};
util.swipeEx=(qx, qy, zx, zy, time,excursion)=>{
    var xxy = [time];
    var point = [];
    if(excursion === undefined){
        var excursion = 0.08
    }
    // x点
    var dx0 = {
        "x": qx,
        "y": qy
    };

    // y点
    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy, qy + 50)
    };

    // dx0 和 dx1 组成起点

    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy, zy + 50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };

    // dx2和dx3 组成终点

    for (var i = 0; i < 4; i++) {

        eval("point.push(dx" + i + ")");

    };

    //生成4个坐标

    //console.log(point)

    var amount = 8

    for (let i = 0; i < 1; i += excursion) {
        
        xxyy = [parseInt(util.bezier_curves(point, i).x), parseInt(util.bezier_curves(point, i).y)]
        xxy.push(xxyy);
        
    }
    util.print("滑动路径坐标"+ xxy,3);
    gesture.apply(null, xxy);
};
util.bezier_curves=(cp, t)=>{
    cx = 3.0 * (cp[1].x - cp[0].x);
    bx = 3.0 * (cp[2].x - cp[1].x) - cx;
    ax = cp[3].x - cp[0].x - cx - bx;
    cy = 3.0 * (cp[1].y - cp[0].y);
    by = 3.0 * (cp[2].y - cp[1].y) - cy;
    ay = cp[3].y - cp[0].y - cy - by;

    tSquared = t * t;
    tCubed = tSquared * t;
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
    return result;
};
util.swip=(frequency,style,extent)=>{
    //风格
    let style = style || 3;
    //滑动次数
    let frequency = frequency || 3
    //以上数值即权重
    //滚屏长度
    let swipStart = parseInt(device.height * random(66,73) / 100);
    let extent = parseInt( ( device.height - swipStart ) * random(77,94) / 100)
    let num = util.weighted(3)
    util.print("滑动起点: "+swipStart+" 滑动终点: "+extent,3);
    util.print("滑动次数 :"+num,3);
    while(true){
        let x1 = parseInt(device.width*random(60,68)/100);
        let x2 = x1
        let y1 = swipStart;
        let y2 = extent;
        let speed = parseInt((y1-y2)*0.7);
        util.swipeEx(x1,y1, x2,y2, speed, 0.28);
        if(num<=1){
            return;
        }else{num--};
        util.print("滑动间停顿",3);
        sleep(random(600,1300))
    };
};
util.forcePress=(ele,timeout)=>{
    let time = time || random(15,93);
    let excursion = excursion || random(0,3);
    let excursionX,excursionY
    let x,y;
    try{
        x = ele.x;
        y = ele.y;
    }catch(e){};
    if(x&&y){
        util.print("收到XY轴对象，开始生成点击坐标",3)
        x = parseInt( device.width * (x / 100) );
        y = parseInt( device.height * (y / 100) );
        excursionX = parseInt( x * excursion / 100 );
        excursionY = parseInt( y * excursion / 100 );
        util.print("x轴: "+x+" y轴: "+y+"; 偏移: "+excursionX+" "+excursionY,3)
        //刘海屏
        if(device.brand==='OPPO'||device.brand==='HONOR'){
            util.print("适应OPPO刘海屏，高度+50",3)
            y = y + 50
        };
        util.print("即将点击 :"+(x+excursionX)+" "+(y+excursionY),3);
        if(press(x+excursionX,y-excursionY,time)){
            return true;
        }else{
            util.print("点击失败，失败退出",2);
            return false;
        };
    };

    //自动转换成对象
    if(typeof(ele.bounds) !== 'function'){
        util.print("收到元素描述对象，开始生成Ui对象",3)
        let obj = util.prove(ele,timeout)
        if(obj){
            util.print("生成Ui对象成功",3)
            var element = obj;
        }else{
            util.print("Ui对象无法识别，错误返回",2)
            return false;
        };
    }else{
        var element = ele;
    };

    util.print("forcePress方法内验证Ui对象的可见性:",3)
    if(!util.visible(element)){
        util.print("forcePress方法内验证Ui对象的可见性失败，错误返回",2)
        return false;
    };
    try{
        excursionX = parseInt( element.bounds().height() * excursion / 100 );
        excursionY = parseInt( element.bounds().width() * excursion / 100 );
        coordinate = { 
            x : element.bounds().centerX()+excursionX,
            y : element.bounds().centerY()-excursionY
        };
        util.print("Ui对象 宽: "+element.bounds().height()+" 高: "+element.bounds().width(),3);
        util.print("偏移 x:"+excursionX+" y:"+excursionY,3);
    }catch(e){
        util.print(e,2)
        util.print("对象无bounds属性，无法点击",2)
        return false;
    };
    try{
        util.print("即将点击坐标: "+coordinate.x+" "+coordinate.y,3);
        press(coordinate.x, coordinate.y,time);
        return true;
    }catch(e){
        util.print(e,2)
        util.print("点击失败，错误返回",2)
        return false;
    };
};
util.clean=()=>{
    home();
    sleep(800);
    recents();
    if(device.brand === 'samsung'){
        util.forcePress(id("recents_close_all_button").findOne(2000))
    };
    if(device.brand === 'HONOR'){
        id("clear_all_recents_image_button").findOne(2000).click(); 
    };
    if(device.brand === 'OPPO'){
        //forcePress(id("clear_panel").findOne(2000));
        util.forcePress(id("clear_button").findOne(2000));

    };
    if(device.brand === 'Realme'){
       util.forcePress(id("clear_all_button").findOne(2000))
    };
    sleep(800);
};
util.openApp=(PackageName)=>{
    sleep(500);
    launchPackage(PackageName);
};
util.savestarttime=(AppName)=>{
    let now = parseInt(Date.now()/1000) ;
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let storage = storages.create("AppStartTime");
    let save = storage.get(today);
    if(!save)save = {};
    save[AppName] = now;
    util.print("写入启动时间戳: "+save[AppName],3)
    storage.put(today,save);
    return true;
};
util.getreadlist=(AppName)=>{
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    storage = storages.create(AppName);
    readlist = storage.get(today+"_readlist");
    if(readlist){
        util.print("今日阅读列表:",3);
        util.print(readlist,3);
    }else{
        util.print("今日阅读列表为空，初始化列表",3)
        readlist = [];
        storage.put(today+"_readlist",readlist);
    };
    return readlist;
};
util.savereadlist=(AppName,title)=>{
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let readlist;
    storage = storages.create(AppName);
    readlist = storage.get(today+"_readlist");
    readlist.push(title);
    storage.put(today+"_readlist",readlist);
    util.print("写入已读列表 ====> "+title,3)
};
util.savecoins=(AppName,finance)=>{
    /*eg. [1571454812091:{
                'sustains':391,
                'income':1393
            }]
    */
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    storage = storages.create(AppName);
    coins = storage.get(today+"_coins");
    if(!coins){
        coins = [];
        storage.put(today+"_coins",coins);
    };
    coins.push(finance);
    storage.put(today+"_coins",coins);
};
util.savealreadytime=(AppName)=>{
    let now = parseInt(Date.now()/1000) ;
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let storage = storages.create("AppStartTime");
    let alreadStorage = storages.create("alreadyTime");
    let save = alreadStorage.get(today);
    if(!save){
        var save = {};
        save[AppName] = 0;
    };
    util.print("读取启动时间戳",3);
    let StoraStartTime = storage.get(today);
    if(!StoraStartTime){
        util.print("未发现启动时间戳，跳过记录时间",3);
        return true;
    };
    util.print("计算本次运行时间: 当前时间 - 启动时间 + 历史已运行时间",3);
    util.print(now+"-"+StoraStartTime[AppName]+"+"+save[AppName],3);
    save[AppName] = now - StoraStartTime[AppName] + save[AppName];
    util.print("此次运行 "+save[AppName]+" 秒，写入本地存储",3)
    alreadStorage.put(today,save);
    util.print("清空启动时间戳",3);
    storage.put(today,"");
    return true;
};
util.gettime=(AppName)=>{
    let alreadyTime = (AppName) => {
        let storage = storages.create("alreadyTime");
        let result =  storage.get(today);
        if(result&&result[AppName]){
            util.print("查询到本机运行时间数据:",3);
            util.print(result,3);
            return result[AppName]
        }else{
            util.print("今日无运行数据，返回0",3)
            return 0;
        };
    };
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    util.print("加载应用池与运行时间配置",3)
    let AppPool = JSON.parse(files.read('./cycle.json'));
    let limitTIME = AppPool[AppName] || 0 ;
    let atime = alreadyTime(AppName);
    util.print(AppName+"已运行时间: "+atime,3);
    util.print(AppName+"总运行时间: "+limitTIME,3);
    return {
        atime : atime,
        limitTIME : limitTIME,
        duration : limitTIME - atime
    };
};
util.weighted=(weight)=>{
    let hash = []
    weight = weight || 5;
    let _weight = weight;
    for(i=1;i<_weight;i++){
        for(j=1;j<weight;j++){
            hash.push(j);
        };
        weight--
    };
    hash = hash.sort()
    return hash[random(0,hash.length-1)]
};
util.shortvideoswipup=()=>{
    let x1 = random(parseInt(device.width*0.67),parseInt(device.width*0.69))
    let y1 = random(parseInt(device.height*0.88),parseInt(device.height*0.93))
    let x2 = random(parseInt(device.width*0.69),parseInt(device.width*0.71))
    let y2 = random(parseInt(device.height*0.17),parseInt(device.height*0.24))
    let speed = parseInt((y1-y2)*0.45703);
    util.swipeEx(x1,y1, x2,y2, speed, 0.047);
};
util.prove=(ele,timeout,func)=>{
    let obj,condtion,target
    if(!func||func==='findOne'){
        timeout = timeout || 50;
        func = func && func+"("+timeout+")" || "findOne"+"("+timeout+")";
    }
    if(func==='find'){
        timeout = "";
        func = func+"("+timeout+")"   
    };
    for(obj in ele){
        if(condtion){
            condtion = condtion+"."+obj+"(\""+ele[obj]+"\")";
        }else{
            condtion = obj+"(\""+ele[obj]+"\")";
        };
    };
    util.print("生成定位元素CLI :"+condtion,3)
    try{target = eval(condtion+"."+func)}catch(e){
        util.print(e,3)
        util.print("定位失败，错误返回",3)
        return false
    }
    if(!target){
        util.print("未找到元素",3)
        return false;
    };
    return target;
};
module.exports = util;