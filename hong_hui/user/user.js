var t = require("../../utils/log.js"), n = getApp();

Page({
    data: {
        usermes: "",
        userid: "",
        auth: 1
    },
    onLoad: function(n) {
        try {
            if (t.istest()) return;
        } catch (t) {}
    },
    onReady: function() {},
    onShow: function() {
        try {
            if (t.istest()) return;
        } catch (t) {}
        var e = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] ? wx.login({
                    success: function(t) {
                      console.log(JSON.stringify(t));

                        var o = t.code;
                        wx.getUserInfo({
                            success: function(t) {
                                var a = t.encryptedData, u = t.iv;
                                n.util.request({
                                    url: "entry/wxapp/unionid",
                                    data: {
                                        m: "hong_hui",
                                        code: o,
                                        encryptedData: a,
                                        iv: u
                                    },
                                    cachetime: "0",
                                    success: function(t) {
                                      console.log("unionid:"+t.data.data),
                                        console.log(t.data), e.setData({
                                            usermes: t.data.data
                                        });
                                    }
                                });
                            }
                        });
                    }
                }) : e.setData({
                    auth: 2
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    tokefu: function() {
        wx.navigateTo({
            url: "../kefu/kefu"
        });
    },
    gongzhong: function() {
        wx.setClipboardData({
            data: "闺蜜粉",
            success: function(t) {
                wx.showToast({
                    title: "'闺蜜粉'复制成功",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    tokai: function() {
        wx.navigateTo({
            url: "../kai/kai"
        });
    },
    charge: function (e) {
      console.log(e.currentTarget.dataset.amount);
      var a = this;
      n.util.request({
        url: "entry/wxapp/pay",
        cachetime: "0",
        data: {
          m: "hong_hui",
          amount: e.currentTarget.dataset.amount,
        },
        success: function (t) {
          wx.hideLoading(), console.log(t.data.data);
          var n = JSON.parse(t.data.data);
          console.log('package:' + decodeURIComponent(n.payPackage));
          wx.requestPayment({
            'timeStamp': n.timeStamp,
            'nonceStr': n.nonceStr,
            'package': decodeURIComponent(n.payPackage),
            'signType': 'MD5',
            'paySign': n.paySign,
            'success': function (res) {
              console.log('支付成功')
              wx.navigateBack() //返回会上个页面
            },
            'fail': function (res) {
              console.log('支付失败')
              wx.navigateBack() //返回会上个页面
            }
          })
        }
      });
    },
    bindGetUserInfo: function(t) {
        console.log(t.detail.userInfo), wx.reLaunch({
            url: "../user/user"
        });
    }
});