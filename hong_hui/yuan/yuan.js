var n = require("../../utils/log.js");

Page({
    data: {},
    onLoad: function(t) {
        try {
            if (n.istest()) return;
        } catch (n) {}
    },
    onReady: function() {},
    onShow: function() {
        try {
            if (n.istest()) return;
        } catch (n) {}
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});