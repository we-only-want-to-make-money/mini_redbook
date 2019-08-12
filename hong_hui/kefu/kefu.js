var t = require("../../utils/log.js"), a = getApp(), n = require("../../wxParse/wxParse.js");

Page({
    data: {
        wxname: ""
    },
    onLoad: function(e) {
        try {
            if (t.istest()) return;
        } catch (t) {}
        var o = this;
        a.util.request({
            url: "entry/wxapp/kefu",
            data: {
                m: "hong_hui"
            },
            cachetime: "0",
            success: function(t) {
                console.log(t.data.data), n.wxParse("article1", "html", t.data.data.content, o, 5), 
                o.setData({
                    wxname: t.data.data.wx
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        try {
            if (t.istest()) return;
        } catch (t) {}
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    copy: function() {
        var t = this.data.wxname;
        wx.setClipboardData({
            data: t,
            success: function(t) {
                wx.showToast({
                    title: "客服微信复制成功",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    }
});