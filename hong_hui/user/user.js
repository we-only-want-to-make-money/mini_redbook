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
    bindGetUserInfo: function(t) {
        console.log(t.detail.userInfo), wx.reLaunch({
            url: "../user/user"
        });
    }
});