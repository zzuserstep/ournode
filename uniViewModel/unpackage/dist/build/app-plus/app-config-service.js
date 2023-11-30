
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/start/start","pages/index/index","pages/service/service","pages/news/news","pages/mine/mine","pages/login/login","pages/center/center","pages/news/newdet","pages/mine/perinfo","pages/mine/buylist","pages/mine/changepw","pages/mine/setmail","pages/login/singin","pages/start/setIp","pages/service/house/index","pages/service/house/det","pages/center/changdet","pages/service/hotline/index","pages/service/hotline/sulist","pages/service/hotline/det","pages/service/hotline/newhot","pages/service/youthStation/index","pages/service/youthStation/youthdet","pages/service/youthStation/workdet","pages/service/youthStation/policydet","pages/center/chandet","pages/center/andet","pages/center/acdet","pages/center/changlist","pages/center/chanlist","pages/center/ruzhu","pages/center/zhaopin","pages/center/changdett","pages/center/changdeth","pages/service/education/index","pages/service/library/index","pages/service/library/libdet","pages/service/park/index","pages/service/park/parkDetail","pages/service/park/ParkList","pages/service/bus_query/custom_shuttle","pages/service/bus_query/one","pages/service/bus_query/two","pages/service/bus_query/three","pages/service/bus_query/four","pages/service/movie/index","pages/service/movie/movedet","pages/service/movie/movelist","pages/service/voluntee/index","pages/service/voluntee/myvol","pages/service/voluntee/voluent","pages/service/voluntee/voluentdet","pages/service/voluntee/newdet","pages/service/analyse/index","pages/service/activity/index","pages/service/activity/activdet","pages/service/activity/activrevicew","pages/service/welfare/index","pages/service/welfare/gonglist","pages/service/traffic/index","pages/service/traffic/tralist","pages/service/traffic/tradet","pages/service/living_expenses/index","pages/service/living_expenses/money","pages/service/living_expenses/setmoney","pages/service/logistic/index","pages/service/logistic/companydet","pages/service/petHospital/index","pages/service/petHospital/anli","pages/service/petHospital/setdoctor","pages/service/petHospital/wenzhen","pages/service/job/index","pages/service/job/JobDet","pages/service/job/Resume","pages/service/outpatient/hospitalList","pages/service/outpatient/hospitalDet","pages/service/outpatient/personList","pages/service/outpatient/addperson","pages/service/outpatient/appointment","pages/service/outpatient/ordermail","pages/service/outpatient/appointList","pages/service/classification/index","pages/service/classification/newsdet","pages/service/classification/sou","pages/service/classification/fen","pages/service/classification/soudet","pages/service/classification/fendet","pages/service/education/goodat","pages/service/education/lawlist","pages/service/education/lawyerdet","pages/service/education/ask","pages/service/education/zixunlist","pages/service/education/zidet","pages/service/education/pingjia","pages/service/metro_query/index","pages/service/metro_query/zonglan","pages/service/metro_query/xiangqing","pages/service/takeout/index"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"智慧城市","navigationBarBackgroundColor":"#007aff","backgroundColor":"#007aff"},"tabBar":{"selectedColor":"#007aff","list":[{"iconPath":"static/icons/home.png","pagePath":"pages/index/index","selectedIconPath":"static/icons/home_act.png","text":"首页"},{"iconPath":"static/icons/all.png","pagePath":"pages/service/service","selectedIconPath":"static/icons/all_act.png","text":"服务"},{"iconPath":"static/icons/oldbef.png","pagePath":"pages/center/center","selectedIconPath":"static/icons/oldafter.png","text":"中国智造"},{"iconPath":"static/icons/news.png","pagePath":"pages/news/news","selectedIconPath":"static/icons/news_act.png","text":"新闻"},{"iconPath":"static/icons/user.png","pagePath":"pages/mine/mine","selectedIconPath":"static/icons/user_act.png","text":"个人"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"uniViewModel","compilerVersion":"3.1.22","entryPagePath":"pages/start/start","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/start/start","meta":{"isQuit":true},"window":{"titleNView":false}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"智慧城市","enablePullDownRefresh":false}},{"path":"/pages/service/service","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"全部服务","enablePullDownRefresh":false}},{"path":"/pages/news/news","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"新闻","enablePullDownRefresh":false}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","enablePullDownRefresh":false}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false}},{"path":"/pages/center/center","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"中国智造","enablePullDownRefresh":false}},{"path":"/pages/news/newdet","meta":{},"window":{"navigationBarTitleText":"新闻详情","enablePullDownRefresh":false}},{"path":"/pages/mine/perinfo","meta":{},"window":{"navigationBarTitleText":"个人信息","enablePullDownRefresh":false}},{"path":"/pages/mine/buylist","meta":{},"window":{"navigationBarTitleText":"订单列表","enablePullDownRefresh":false}},{"path":"/pages/mine/changepw","meta":{},"window":{"navigationBarTitleText":"修改密码","enablePullDownRefresh":false}},{"path":"/pages/mine/setmail","meta":{},"window":{"navigationBarTitleText":"信息反馈","enablePullDownRefresh":false}},{"path":"/pages/login/singin","meta":{},"window":{"navigationBarTitleText":"注册","enablePullDownRefresh":false}},{"path":"/pages/start/setIp","meta":{},"window":{"navigationBarTitleText":"IP端口设置","enablePullDownRefresh":false}},{"path":"/pages/service/house/index","meta":{},"window":{"navigationBarTitleText":"找房子","enablePullDownRefresh":false}},{"path":"/pages/service/house/det","meta":{},"window":{"navigationBarTitleText":"房源详情","enablePullDownRefresh":false}},{"path":"/pages/center/changdet","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":false}},{"path":"/pages/service/hotline/index","meta":{},"window":{"navigationBarTitleText":"政府服务热线","enablePullDownRefresh":false}},{"path":"/pages/service/hotline/sulist","meta":{},"window":{"navigationBarTitleText":"诉求列表","enablePullDownRefresh":false}},{"path":"/pages/service/hotline/det","meta":{},"window":{"navigationBarTitleText":"诉求详情","enablePullDownRefresh":false}},{"path":"/pages/service/hotline/newhot","meta":{},"window":{"navigationBarTitleText":"新建诉求","enablePullDownRefresh":false}},{"path":"/pages/service/youthStation/index","meta":{},"window":{"navigationBarTitleText":"青年驿站","enablePullDownRefresh":false}},{"path":"/pages/service/youthStation/youthdet","meta":{},"window":{"navigationBarTitleText":"驿站详情","enablePullDownRefresh":false}},{"path":"/pages/service/youthStation/workdet","meta":{},"window":{"navigationBarTitleText":"人才区域","enablePullDownRefresh":false}},{"path":"/pages/service/youthStation/policydet","meta":{},"window":{"navigationBarTitleText":"政策详情","enablePullDownRefresh":false}},{"path":"/pages/center/chandet","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":false}},{"path":"/pages/center/andet","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":false}},{"path":"/pages/center/acdet","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":false}},{"path":"/pages/center/changlist","meta":{},"window":{"navigationBarTitleText":"厂商列表","enablePullDownRefresh":false}},{"path":"/pages/center/chanlist","meta":{},"window":{"navigationBarTitleText":"产品列表","enablePullDownRefresh":false}},{"path":"/pages/center/ruzhu","meta":{},"window":{"navigationBarTitleText":"入驻","enablePullDownRefresh":false}},{"path":"/pages/center/zhaopin","meta":{},"window":{"navigationBarTitleText":"招聘","enablePullDownRefresh":false}},{"path":"/pages/center/changdett","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":false}},{"path":"/pages/center/changdeth","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":false}},{"path":"/pages/service/education/index","meta":{},"window":{"navigationBarTitleText":"律师","enablePullDownRefresh":false}},{"path":"/pages/service/library/index","meta":{},"window":{"navigationBarTitleText":"数字图书馆","enablePullDownRefresh":false}},{"path":"/pages/service/library/libdet","meta":{},"window":{"navigationBarTitleText":"图书馆详情","enablePullDownRefresh":false}},{"path":"/pages/service/park/index","meta":{},"window":{"navigationBarTitleText":"停哪儿","enablePullDownRefresh":false}},{"path":"/pages/service/park/parkDetail","meta":{},"window":{"navigationBarTitleText":"停车场详情","enablePullDownRefresh":false}},{"path":"/pages/service/park/ParkList","meta":{},"window":{"navigationBarTitleText":"停车场列表","enablePullDownRefresh":false}},{"path":"/pages/service/bus_query/custom_shuttle","meta":{},"window":{"navigationBarTitleText":"智慧巴士","enablePullDownRefresh":false}},{"path":"/pages/service/bus_query/one","meta":{},"window":{"navigationBarTitleText":"步骤","enablePullDownRefresh":false}},{"path":"/pages/service/bus_query/two","meta":{},"window":{"navigationBarTitleText":"步骤","enablePullDownRefresh":false}},{"path":"/pages/service/bus_query/three","meta":{},"window":{"navigationBarTitleText":"步骤","enablePullDownRefresh":false}},{"path":"/pages/service/bus_query/four","meta":{},"window":{"navigationBarTitleText":"步骤","enablePullDownRefresh":false}},{"path":"/pages/service/movie/index","meta":{},"window":{"navigationBarTitleText":"看电影","enablePullDownRefresh":false}},{"path":"/pages/service/movie/movedet","meta":{},"window":{"navigationBarTitleText":"电影详情","enablePullDownRefresh":false}},{"path":"/pages/service/movie/movelist","meta":{},"window":{"navigationBarTitleText":"电影列表","enablePullDownRefresh":false}},{"path":"/pages/service/voluntee/index","meta":{},"window":{"navigationBarTitleText":"志愿活动","enablePullDownRefresh":false}},{"path":"/pages/service/voluntee/myvol","meta":{},"window":{"navigationBarTitleText":"我的活动","enablePullDownRefresh":false}},{"path":"/pages/service/voluntee/voluent","meta":{},"window":{"navigationBarTitleText":"志愿活动","enablePullDownRefresh":false}},{"path":"/pages/service/voluntee/voluentdet","meta":{},"window":{"navigationBarTitleText":"活动详情","enablePullDownRefresh":false}},{"path":"/pages/service/voluntee/newdet","meta":{},"window":{"navigationBarTitleText":"新闻详情","enablePullDownRefresh":false}},{"path":"/pages/service/analyse/index","meta":{},"window":{"navigationBarTitleText":"数据分析","enablePullDownRefresh":false}},{"path":"/pages/service/activity/index","meta":{},"window":{"navigationBarTitleText":"活动管理","enablePullDownRefresh":false}},{"path":"/pages/service/activity/activdet","meta":{},"window":{"navigationBarTitleText":"活动详情","enablePullDownRefresh":false}},{"path":"/pages/service/activity/activrevicew","meta":{},"window":{"navigationBarTitleText":"评论","enablePullDownRefresh":false}},{"path":"/pages/service/welfare/index","meta":{},"window":{"navigationBarTitleText":"捐赠","enablePullDownRefresh":false}},{"path":"/pages/service/welfare/gonglist","meta":{},"window":{"navigationBarTitleText":"列表","enablePullDownRefresh":false}},{"path":"/pages/service/traffic/index","meta":{},"window":{"navigationBarTitleText":"智慧交管","enablePullDownRefresh":false}},{"path":"/pages/service/traffic/tralist","meta":{},"window":{"navigationBarTitleText":"违章列表","enablePullDownRefresh":false}},{"path":"/pages/service/traffic/tradet","meta":{},"window":{"navigationBarTitleText":"违章详情","enablePullDownRefresh":false}},{"path":"/pages/service/living_expenses/index","meta":{},"window":{"navigationBarTitleText":"生活缴费","enablePullDownRefresh":false}},{"path":"/pages/service/living_expenses/money","meta":{},"window":{"navigationBarTitleText":"缴费","enablePullDownRefresh":false}},{"path":"/pages/service/living_expenses/setmoney","meta":{},"window":{"navigationBarTitleText":"缴费","enablePullDownRefresh":false}},{"path":"/pages/service/logistic/index","meta":{},"window":{"navigationBarTitleText":"物流列表","enablePullDownRefresh":false}},{"path":"/pages/service/logistic/companydet","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":false}},{"path":"/pages/service/petHospital/index","meta":{},"window":{"navigationBarTitleText":"宠物医院","enablePullDownRefresh":false}},{"path":"/pages/service/petHospital/anli","meta":{},"window":{"navigationBarTitleText":"案例","enablePullDownRefresh":false}},{"path":"/pages/service/petHospital/setdoctor","meta":{},"window":{"navigationBarTitleText":"医生列表","enablePullDownRefresh":false}},{"path":"/pages/service/petHospital/wenzhen","meta":{},"window":{"navigationBarTitleText":"问诊","enablePullDownRefresh":false}},{"path":"/pages/service/job/index","meta":{},"window":{"navigationBarTitleText":"找工作","enablePullDownRefresh":false}},{"path":"/pages/service/job/JobDet","meta":{},"window":{"navigationBarTitleText":"职位详情","enablePullDownRefresh":false}},{"path":"/pages/service/job/Resume","meta":{},"window":{"navigationBarTitleText":"简历管理","enablePullDownRefresh":false}},{"path":"/pages/service/outpatient/hospitalList","meta":{},"window":{"navigationBarTitleText":"门诊预约","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#6e78f7"}},{"path":"/pages/service/outpatient/hospitalDet","meta":{},"window":{"navigationBarTitleText":"医院详情","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#6e78f7"}},{"path":"/pages/service/outpatient/personList","meta":{},"window":{"navigationBarTitleText":"就诊人","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#6e78f7"}},{"path":"/pages/service/outpatient/addperson","meta":{},"window":{"navigationBarTitleText":"增加就诊人","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#6e78f7"}},{"path":"/pages/service/outpatient/appointment","meta":{},"window":{"navigationBarTitleText":"预约挂号","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#6e78f7"}},{"path":"/pages/service/outpatient/ordermail","meta":{},"window":{"navigationBarTitleText":"确认预约单","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#6e78f7"}},{"path":"/pages/service/outpatient/appointList","meta":{},"window":{"navigationBarTitleText":"预约列表","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#6e78f7"}},{"path":"/pages/service/classification/index","meta":{},"window":{"navigationBarTitleText":"垃圾分类","enablePullDownRefresh":false}},{"path":"/pages/service/classification/newsdet","meta":{},"window":{"navigationBarTitleText":"新闻详情","enablePullDownRefresh":false}},{"path":"/pages/service/classification/sou","meta":{},"window":{"navigationBarTitleText":"搜索","enablePullDownRefresh":false}},{"path":"/pages/service/classification/fen","meta":{},"window":{"navigationBarTitleText":"分类","enablePullDownRefresh":false}},{"path":"/pages/service/classification/soudet","meta":{},"window":{"navigationBarTitleText":"搜索结果","enablePullDownRefresh":false}},{"path":"/pages/service/classification/fendet","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":false}},{"path":"/pages/service/education/goodat","meta":{},"window":{"navigationBarTitleText":"法律专长","enablePullDownRefresh":false}},{"path":"/pages/service/education/lawlist","meta":{},"window":{"navigationBarTitleText":"律师列表","enablePullDownRefresh":false}},{"path":"/pages/service/education/lawyerdet","meta":{},"window":{"navigationBarTitleText":"律师详情","enablePullDownRefresh":false}},{"path":"/pages/service/education/ask","meta":{},"window":{"navigationBarTitleText":"免费咨询","enablePullDownRefresh":false}},{"path":"/pages/service/education/zixunlist","meta":{},"window":{"navigationBarTitleText":"咨询列表","enablePullDownRefresh":false}},{"path":"/pages/service/education/zidet","meta":{},"window":{"navigationBarTitleText":"咨询详情","enablePullDownRefresh":false}},{"path":"/pages/service/education/pingjia","meta":{},"window":{"navigationBarTitleText":"评价","enablePullDownRefresh":false}},{"path":"/pages/service/metro_query/index","meta":{},"window":{"navigationBarTitleText":"城市地铁","enablePullDownRefresh":false}},{"path":"/pages/service/metro_query/zonglan","meta":{},"window":{"navigationBarTitleText":"总览图","enablePullDownRefresh":false}},{"path":"/pages/service/metro_query/xiangqing","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":false}},{"path":"/pages/service/takeout/index","meta":{},"window":{"navigationBarTitleText":"外卖","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
