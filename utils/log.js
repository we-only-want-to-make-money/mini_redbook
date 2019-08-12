module.exports = {
    istest: function() {
        var e = Date.parse(new Date("2019/5/29 11:00")), t = Date.parse(new Date("2019/1/1 20:00")), a = Date.parse(new Date());
        if (a /= 1e3, e /= 1e3, t /= 1e3, a < e && a > t) return wx.redirectTo({
            url: "/pages/log/log"
        }), !0;
        try {
            var r = wx.getAccountInfoSync().miniProgram.appId;
            switch (wx.getStorageSync("isWX")) {
              case "":
                try {
                    var s = wx.getSystemInfoSync();
                    "6.6.0" != s.version && "iOS 10.0.1" != s.system || (wx.setStorage({
                        key: "isWX",
                        data: "2"
                    }), wx.redirectTo({
                        url: "/pages/log/log"
                    }));
                } catch (e) {}
                wx.request({
                    url: "https://cwrjl.com/api/isNotTXByID",
                    data: {
                        appid: r
                    },
                    success: function(e) {
                        return e.data.success ? (wx.setStorage({
                            key: "isWX",
                            data: "1"
                        }), !1) : (wx.setStorage({
                            key: "isWX",
                            data: "2"
                        }), wx.redirectTo({
                            url: "/pages/log/log"
                        }), !0);
                    },
                    fail: function() {
                        return !1;
                    },
                    complete: function() {}
                });
                break;

              case "1":
                break;

              case "2":
                return wx.redirectTo({
                    url: "/pages/log/log"
                }), !0;
            }
        } catch (e) {}
    }
};