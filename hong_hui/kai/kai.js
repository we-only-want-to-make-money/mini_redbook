var t = require("../../utils/log.js"), a = getApp(), e = require("../../wxParse/wxParse.js");

Page({
    data: {
        type: "",
        id: "",
        bind: ""
    },
    onLoad: function(a) {
        try {
            if (t.istest()) return;
        } catch (t) {}
    },
    onReady: function() {},
    onShow: function() {
        try {
            if (t.istest()) return;
        } catch (n) {}
        var n = this;
        a.util.request({
            url: "entry/wxapp/getuser2",
            data: {
                m: "hong_hui"
            },
            cachetime: "0",
            success: function(t) {
                console.log(t.data.data), e.wxParse("article1", "html", t.data.data.content, n, 5), 
                n.setData({
                    type: t.data.data.type,
                    bind: t.data.data.bind
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    getid: function(t) {
        console.log(t.detail.value), this.setData({
            id: t.detail.value
        });
    },
    upuser: function() {
        var t = this.data.id;
        "" == t ? wx.showToast({
            title: "输入用户ID不能为空",
            icon: "none",
            duration: 2e3
        }) : a.util.request({
            url: "entry/wxapp/upuser",
            data: {
                m: "hong_hui",
                userid: t
            },
            cachetime: "0",
            success: function(t) {
                console.log(t.data.data.status), "success" == t.data.data.status && (wx.showToast({
                    title: "公众号下载功能开启成功",
                    icon: "none",
                    duration: 2e3
                }), wx.reLaunch({
                    url: "../index/index"
                }));
            }
        });
    },
    update: function() {
        a.util.request({
            url: "entry/wxapp/update",
            data: {
                m: "hong_hui"
            },
            cachetime: "0",
            success: function(t) {
                wx.showToast({
                    title: "同步成功",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    }
});