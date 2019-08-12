function t(t, n, e) {
    return n in t ? Object.defineProperty(t, n, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[n] = e, t;
}

var n, e = require("../../utils/log.js"), i = getApp();

Page((n = {
    name: "index",
    data: {
        url: "",
        lunimg: null,
        wenimg: null,
        lumimgnum: "",
        wenimgnum: "",
        showtype: 1,
        slunimg: [],
        swenimg: []
    },
    onLoad: function(t) {
        try {
            if (e.istest()) return;
        } catch (t) {}
        var n = t.noteid;
        if (void 0 != n) {
            wx.setClipboardData({
                data: "dd",
                success: function(t) {
                    wx.showToast({
                        title: "获取成功",
                        icon: "none",
                        duration: 2e3
                    });
                }
            });
            var a = this;
            i.util.request({
                url: "entry/wxapp/note",
                cachetime: "0",
                data: {
                    m: "hong_hui",
                    noteid: n
                },
                success: function(t) {
                    wx.hideLoading(), console.log(t.data.data);
                    var n = t.data.data;
                    0 == n.lunimg.length ? wx.showToast({
                        title: "没有轮播图片",
                        icon: "success",
                        duration: 2e3
                    }) : a.setData({
                        lunimg: 0 == n.lunimg.length ? null : n.lunimg,
                        wenimg: 0 == n.wenimg.length ? null : n.wenimg,
                        lunimgnum: n.lunimg.length,
                        wenimgnum: n.wenimg.length
                    });
                }
            });
        }
    },
    getUrl: function() {
        var t = this;
        wx.getClipboardData({
            success: function(n) {
                var e = n.data;
                /http[^\u4e00-\u9fa5]{10,200}/.test(e) && wx.showModal({
                    title: "是否获取剪切板中的小红书链接资源",
                    content: e,
                    confirmText: "确定",
                    success: function(e) {
                        e.confirm && t.setData({
                            url: n.data
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
    postUrl: function() {
        var t = this, n = t.data.url;
        "" == n ? wx.showToast({
            title: "链接不能为空",
            icon: "success",
            duration: 2e3
        }) : /http[^\u4e00-\u9fa5]{10,200}/.test(n) ? (wx.showLoading({
            title: "获取图片中"
        }), i.util.request({
            url: "entry/wxapp/Image",
            cachetime: "0",
            data: {
                m: "hong_hui",
                url: n
            },
            success: function(n) {
              wx.hideLoading(), console.log("entry/wxapp/Image：" + JSON.stringify(n.data.data));
                var e = n.data.data;
                0 == e.lunimg.length ? wx.showToast({
                    title: "没有轮播图片",
                    icon: "success",
                    duration: 2e3
                }) : t.setData({
                    lunimg: 0 == e.lunimg.length ? null : e.lunimg,
                    wenimg: 0 == e.wenimg.length ? null : e.wenimg,
                    lunimgnum: e.lunimg.length,
                    wenimgnum: e.wenimg.length
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
            lunimg: null,
            wenimg: null,
            lunimgnum: "",
            wenimgnum: ""
        });
    },
    saveImg: function(t) {
        var n = this;
        wx.downloadFile({
            url: t,
            success: function(t) {
                console.log(t), wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        console.log(t);
                    },
                    fail: function(t) {
                        wx.getSetting({
                            success: function(t) {
                                console.log(t), 1 != t.authSetting["scope.writePhotosAlbum"] && n.getAuth();
                            }
                        });
                    }
                });
            },
            fail: function() {
                console.log("fail");
            }
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
    saveLunimg: function() {
        var t = this;
        i.check(function() {
            var n = t.data.lunimg, e = 0;
            wx.showToast({
                title: "下载中",
                icon: "success",
                duration: 2e3
            });
            var i = setInterval(function() {
                e < n.length ? (t.saveImg(n[e]), e++, wx.showToast({
                    title: "完成" + parseInt(e / n.length * 100) + "%",
                    icon: "success",
                    duration: 2e3
                })) : clearInterval(i);
            }, 2e3);
        });
    },
    saveWenimg: function() {
        var t = this;
        i.check(function() {
            var n = t.data.wenimg, e = 0;
            wx.showToast({
                title: "下载中",
                icon: "success",
                duration: 2e3
            });
            var i = setInterval(function() {
                e < n.length ? (t.saveImg(n[e]), e++, wx.showToast({
                    title: "完成" + parseInt(e / n.length * 100) + "%",
                    icon: "success",
                    duration: 2e3
                })) : clearInterval(i);
            }, 2e3);
        });
    },
    saveslunimg: function() {
        var t = this;
        i.check(function() {
            var n = t.data.slunimg;
            if (0 == n.length) wx.showToast({
                title: "请选择下载的图片",
                icon: "success",
                duration: 2e3
            }); else {
                var e = 0;
                wx.showToast({
                    title: "下载中",
                    icon: "success",
                    duration: 2e3
                });
                var i = setInterval(function() {
                    e < n.length ? (t.saveImg(n[e]), e++, wx.showToast({
                        title: "完成" + parseInt(e / n.length * 100) + "%",
                        icon: "success",
                        duration: 2e3
                    })) : clearInterval(i);
                }, 2e3);
            }
        });
    },
    formSubmit: function(t) {
        var n = t.detail.formId, e = this, a = t.detail.value.input1;
        "" == a ? wx.showToast({
            title: "链接不能为空",
            icon: "success",
            duration: 2e3
        }) : /http[^\u4e00-\u9fa5]{10,200}/.test(a) ? i.util.request({
            url: "entry/wxapp/Yunimage",
            cachetime: "0",
            data: {
                m: "hong_hui",
                url: a,
                formid: n
            },
            success: function(t) {
                wx.hideLoading(), console.log(t.data.data);
                var n = t.data.data;
                0 == n.lunimg.length ? wx.showToast({
                    title: "没有轮播图片",
                    icon: "success",
                    duration: 2e3
                }) : e.setData({
                    lunimg: 0 == n.lunimg.length ? null : n.lunimg,
                    wenimg: 0 == n.wenimg.length ? null : n.wenimg,
                    lunimgnum: n.lunimg.length,
                    wenimgnum: n.wenimg.length
                });
            }
        }) : wx.showToast({
            title: "不是小红书链接",
            icon: "success",
            duration: 2e3
        });
    },
    toyuan: function() {
        wx.navigateTo({
            url: "../yuan/yuan"
        });
    },
    saveswenimg: function() {
        var t = this;
        i.check(function() {
            var n = t.data.swenimg;
            if (0 == n.length) wx.showToast({
                title: "请选择下载的图片",
                icon: "success",
                duration: 2e3
            }); else {
                var e = 0;
                wx.showToast({
                    title: "下载中",
                    icon: "success",
                    duration: 2e3
                });
                var i = setInterval(function() {
                    e < n.length ? (t.saveImg(n[e]), e++, wx.showToast({
                        title: "完成" + parseInt(e / n.length * 100) + "%",
                        icon: "success",
                        duration: 2e3
                    })) : clearInterval(i);
                }, 2e3);
            }
        });
    },
    getAuth: function() {
        var t = this;
        wx.showModal({
            title: "是否打开设置页面重新授权",
            content: "只有授权才能使用下载至本地",
            confirmText: "去设置",
            success: function(n) {
                console.log(n), n.confirm ? wx.openSetting({
                    success: function(n) {
                        console.log("dd"), t.saveLunimg();
                    }
                }) : t.getAuth();
            }
        });
    }
}, t(n, "getAuth", function() {
    var t = this;
    wx.showModal({
        title: "是否打开设置页面重新授权",
        content: "只有授权才能使用下载至本地",
        confirmText: "去设置",
        success: function(n) {
            console.log(n), n.confirm ? wx.openSetting({
                success: function(n) {
                    console.log("dd"), t.saveLunimg();
                }
            }) : t.getAuth();
        }
    });
}), t(n, "onReady", function() {}), t(n, "onShow", function() {
    this.getUrl();
}), t(n, "onHide", function() {
    this.setData({
        url: "",
        lunimg: null,
        wenimg: null,
        lunimgnum: "",
        wenimgnum: ""
    });
}), t(n, "onUnload", function() {}), t(n, "onPullDownRefresh", function() {}), t(n, "onShareAppMessage", function() {}), 
t(n, "changeShowtype", function() {
    var t = this.data.showtype;
    this.setData({
        showtype: 1 == t ? 2 : 1
    });
}), t(n, "lunChange", function(t) {
    var n = t.detail.value;
    this.setData({
        slunimg: n
    });
}), t(n, "wenChange", function(t) {
    var n = t.detail.value;
    this.setData({
        swenimg: n
    });
}), t(n, "towei_bo", function() {
    wx.navigateToMiniProgram({
      appId: "wx27c202a08d7bc3e0",
        path: "qu_y/pages/video/video",
        extarData: {},
        envVersion: "release",
        success: function(t) {}
    });
}), t(n, "tokefu", function() {
    wx.navigateTo({
        url: "../kefu/kefu"
    });
}), n));