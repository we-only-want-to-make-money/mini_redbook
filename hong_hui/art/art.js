var t = require("../../utils/log.js"), a = getApp();

Page({
    name: "index",
    data: {
        url: "",
        art: "",
        artlist: [],
        showtype: 1
    },
    onLoad: function() {
        try {
            if (t.istest()) return;
        } catch (t) {}
    },
    getUrl: function() {
        var t = this;
        wx.getClipboardData({
            success: function(a) {
                var e = a.data;
                /http[^\u4e00-\u9fa5]{10,200}/.test(e) && wx.showModal({
                    title: "是否获取剪切板中的小红书链接资源",
                    content: e,
                    confirmText: "确定",
                    success: function(e) {
                        e.confirm && t.setData({
                            url: a.data
                        });
                    }
                });
            }
        });
    },
    inputUrl: function(t) {
        console.log(t.detail.value), this.setData({
            url: t.detail.value
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
    postUrl: function() {
        var t = this, e = t.data.url;
        "" == e ? wx.showToast({
            title: "链接不能为空",
            icon: "success",
            duration: 2e3
        }) : /http[^\u4e00-\u9fa5]{10,200}/.test(e) ? (wx.showLoading({
            title: "获取文案中"
        }), a.util.request({
            url: "entry/wxapp/Art",
            cachetime: "0",
            data: {
                m: "hong_hui",
                url: e
            },
            success: function(a) {
                wx.hideLoading(), console.log(a.data.data);
                for (var e = a.data.data.artlist, n = 0; n < e.length; n++) e[n] = e[n].replace(/#/g, "").replace(/\[.{1,10}\]/g, "");
                t.setData({
                    art: a.data.data.art.replace(/\\n/g, "\n").replace(/#/g, "").replace(/\[.{1,10}\]/g, ""),
                    artlist: e
                });
            }
        })) : wx.showToast({
            title: "不是小红书链接",
            icon: "success",
            duration: 2e3
        });
    },
    clear: function() {
        this.setData({
            url: "",
            art: null,
            sartlist: [],
            artlist: []
        });
    },
    onReady: function() {},
    onShow: function() {
        try {
            if (t.istest()) return;
        } catch (t) {}
        this.getUrl();
    },
    onHide: function() {
        this.setData({
            url: "",
            art: "",
            artlist: []
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onShareAppMessage: function() {},
    changeShowtype: function() {
        var t = this.data.showtype;
        this.setData({
            showtype: 1 == t ? 2 : 1
        });
    },
    lunChange: function(t) {
        var a = t.detail.value;
        this.setData({
            slunimg: a
        });
    },
    wenChange: function(t) {
        var a = t.detail.value;
        this.setData({
            swenimg: a
        });
    },
    towei_bo: function() {
        wx.navigateToMiniProgram({
          appId: "wx27c202a08d7bc3e0",
            path: "qu_y/pages/video/video",
            extarData: {},
            envVersion: "release",
            success: function(t) {}
        });
    },
    tokefu: function() {
        wx.navigateTo({
            url: "../kefu/kefu"
        });
    },
    artcopy: function() {
        var t = this.data.art;
        a.check(function() {
            wx.setClipboardData({
                data: t,
                success: function(t) {
                    wx.showToast({
                        title: "文案复制成功",
                        icon: "none",
                        duration: 2e3
                    });
                }
            });
        });
    },
    artlistChange: function(t) {
        var a = t.detail.value;
        console.log(a), this.setData({
            sartlist: a
        });
    },
    copysartlist: function() {
        for (var t = this.data.sartlist, e = "", n = 0; n < t.length; n++) e = 0 == n ? t[0] : e + "\n" + t[n];
        a.check(function() {
            wx.setClipboardData({
                data: e,
                success: function(t) {
                    wx.showToast({
                        title: "选择文案复制成功",
                        icon: "none",
                        duration: 2e3
                    });
                }
            });
        });
    }
});