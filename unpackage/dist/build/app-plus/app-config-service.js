
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/flag","pages/login/login","pages/index/index","pages/data/data","pages/data/level","pages/data/datainfo","pages/data/asset","pages/service/service","pages/my/my","pages/index/recharge","pages/index/withdrawal","pages/index/exchange","pages/index/exchangea","pages/index/exchangeu","pages/index/invitation","pages/index/mining","pages/index/miningdetails","pages/index/machine","pages/index/history","pages/index/revenue","pages/index/report","pages/my/modify","pages/my/newslist","pages/my/download","pages/my/mywallet","pages/my/accounts","pages/my/proposal","pages/my/team","pages/my/newsdetail","pages/login/regist","pages/login/forget","pages/service/customer","pages/my/authentication","pages/trade/trade","pages/index/mininginfo","pages/my/feedbacklist","pages/my/feedbackdetail","pages/my/choice","pages/my/class"],"window":{"navigationStyle":"custom"},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"USDCoin","compilerVersion":"2.9.3","entryPagePath":"pages/login/flag","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/flag","meta":{"isQuit":true},"window":{}},{"path":"/pages/login/login","meta":{},"window":{}},{"path":"/pages/index/index","meta":{},"window":{}},{"path":"/pages/data/data","meta":{},"window":{}},{"path":"/pages/data/level","meta":{},"window":{}},{"path":"/pages/data/datainfo","meta":{},"window":{}},{"path":"/pages/data/asset","meta":{},"window":{}},{"path":"/pages/service/service","meta":{},"window":{}},{"path":"/pages/my/my","meta":{},"window":{}},{"path":"/pages/index/recharge","meta":{},"window":{}},{"path":"/pages/index/withdrawal","meta":{},"window":{}},{"path":"/pages/index/exchange","meta":{},"window":{}},{"path":"/pages/index/exchangea","meta":{},"window":{}},{"path":"/pages/index/exchangeu","meta":{},"window":{}},{"path":"/pages/index/invitation","meta":{},"window":{}},{"path":"/pages/index/mining","meta":{},"window":{}},{"path":"/pages/index/miningdetails","meta":{},"window":{}},{"path":"/pages/index/machine","meta":{},"window":{}},{"path":"/pages/index/history","meta":{},"window":{}},{"path":"/pages/index/revenue","meta":{},"window":{}},{"path":"/pages/index/report","meta":{},"window":{}},{"path":"/pages/my/modify","meta":{},"window":{}},{"path":"/pages/my/newslist","meta":{},"window":{}},{"path":"/pages/my/download","meta":{},"window":{}},{"path":"/pages/my/mywallet","meta":{},"window":{}},{"path":"/pages/my/accounts","meta":{},"window":{}},{"path":"/pages/my/proposal","meta":{},"window":{}},{"path":"/pages/my/team","meta":{},"window":{}},{"path":"/pages/my/newsdetail","meta":{},"window":{}},{"path":"/pages/login/regist","meta":{},"window":{}},{"path":"/pages/login/forget","meta":{},"window":{}},{"path":"/pages/service/customer","meta":{},"window":{}},{"path":"/pages/my/authentication","meta":{},"window":{}},{"path":"/pages/trade/trade","meta":{},"window":{}},{"path":"/pages/index/mininginfo","meta":{},"window":{}},{"path":"/pages/my/feedbacklist","meta":{},"window":{}},{"path":"/pages/my/feedbackdetail","meta":{},"window":{}},{"path":"/pages/my/choice","meta":{},"window":{}},{"path":"/pages/my/class","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});