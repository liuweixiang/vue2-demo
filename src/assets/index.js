import { API_BASE_URL } from "@/config.js";

let d = new Date();
let dval = 0;
let addVal = 0;
if (nowtime) {
  dval = d.getTime() - nowtime;
  if (dval < 500) {
    addVal += dval;
  }
}
if (!param.isWait && (dval > 1000 || addVal === 0)) {
  console.log("加载一次");
  // uni.showLoading({
  // 	title: '正在加载'
  // });
}
nowtime = d.getTime(); //获取点击时间
// 获取自定义的code
let token = uni.getStorageSync("token") || "";
let openId = uni.getStorageSync("openId");
let dataParam = way == "POST" ? JSON.stringify(Object.assign(param)) : param;
let conType = "application/json";
if (param.contype == "form") {
  dataParam = param;
  conType = "application/x-www-form-urlencoded";
}
// 进行请求
console.log("返回的openId", openId);
uni.request({
  url: API_BASE_URL + url, // 使用配置文件中不同环境对应的路径
  data: dataParam,
  header: {
    ak: token,
    dk: dk,
    pk: "xx",
    pt: "xx",
    Accept: "application/json",
    "Content-Type": conType,
  },
  // 获取设置请求方式
  method: way,
  success: (data) => {
    setTimeout(() => {
      uni.hideLoading();
    }, 1000 + addVal);
    // uni.hideLoading();
    if (data.data.code === 200) {
      // 设置返回的数据
      res(data.data);
    } else {
      // 干一些事情
      if (data.data.code === 401) {
        console.log("接口出现401，跳转登录页面path:" + url);
        // 先注释后面放开
        // 防止授权页面多次跳转
        // if(token){
        // 	userAuth(token,openId);
        // }else{
        // console.log(url,openId)
        let routes = getCurrentPages();
        let curRoute = routes[routes.length - 1];
        if (
          curRoute &&
          curRoute.route &&
          curRoute.route === "pages/public/login"
        ) {
          return false;
        }
        clearTimeout(timeId);
        timeId = setTimeout(() => {
          console.log("更新用户token");
          userAuth();
        }, 300);
        // }
      } else {
        sucessWhite.map((WhiteUrl) => {
          if (url === WhiteUrl) {
            res(data.data);
          }
        });
        console.log(data);
        if (data.status) {
          uni.showToast({
            title: data.message,
            icon: "none",
            duration: 4000,
          });
          return;
        }
        uni.showToast({
          title: data.data.msg,
          icon: "none",
          duration: 4000,
        });
      }
    }
  },
  fail(data) {
    setTimeout(() => {
      uni.hideLoading();
    }, 300 + addVal);
    setTimeout(() => {
      uni.showToast({
        title: "数据加载异常",
        icon: "none",
        duration: 1500,
      });
    }, 4000);
  },
  complete: () => {
    if ((lasttime = nowtime)) {
      setTimeout(function () {
        uni.hideLoading();
      }, 600);
    }
  },
});

