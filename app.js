var t = require("we7/resource/js/util.js");

App({
    inviteCode:"123",
    util: t,
    onLaunch: function(t) {},
    onShow: function(t) {
        var n = this;
        wx.getStorageSync("userInfo") || n.util.getUserInfo(function(t) {
            n.util.request({
                url: "entry/wxapp/user",
                data: {
                    m: "hong_hui"
                },
                success: function(t) {
                  //console.log(JSON.stringify(t.data.data));
                    console.log("success");
                }
            });
        });
    },
    onHide: function() {},
    onError: function(t) {
        console.log(t);
    },
    user: function(t) {
        console.log(t);
    },
    check: function(t) {
        this.util.request({
            url: "entry/wxapp/check",
            data: {
                m: "hong_hui"
            },
            cachetime: "0",
            success: function(n) {
                "success" == n.data.data.status ? "function" == typeof t && t() : "error" == n.data.data.status && wx.showToast({
                    title: "您的本月次数已用完，请联系客服",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    siteInfo: require("siteinfo.js")
});