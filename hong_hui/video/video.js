var t = require("../../utils/log.js"), o = getApp();

Page({
    data: {
        url: "",
        video: "",
        showvideo: !1
    },
    onLoad: function(e) {
        try {
            if (t.istest()) return;
        } catch (i) {}
        var i = e.noteid;
        if (void 0 != i) {
            wx.setClipboardData({
                data: "ff",
                success: function(t) {
                    wx.showToast({
                        title: "获取成功",
                        icon: "none",
                        duration: 2e3
                    });
                }
            });
            var a = this;
            o.util.request({
                url: "entry/wxapp/notevideo",
                cachetime: "0",
                data: {
                    m: "hong_hui",
                    noteid: i
                },
                success: function(t) {
                    a.setData({
                        video: t.data.data,
                        showvideo: !0
                    });
                }
            });
        }
    },
    getUrl: function() {
        var t = this;
        wx.getClipboardData({
            success: function(o) {
                var e = o.data;
                /http[^\u4e00-\u9fa5]{10,200}/.test(e) && wx.showModal({
                    title: "是否获取剪切板中的小红书链接资源",
                    content: e,
                    confirmText: "确定",
                    success: function(e) {
                        e.confirm && t.setData({
                            url: o.data
                        });
                    }
                });
            }
        });
    },
    toyuan1: function() {
        wx.navigateTo({
            url: "../yuan1/yuan1"
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
    formSubmit: function(t) {
        var e = t.detail.formId, i = this, a = t.detail.value.input1;
        "" == a ? wx.showToast({
            title: "链接不能为空",
            icon: "success",
            duration: 2e3
        }) : /http[^\u4e00-\u9fa5]{10,200}/.test(a) ? o.util.request({
            url: "entry/wxapp/Yunvideo",
            cachetime: "0",
            data: {
                m: "hong_hui",
                url: a,
                formid: e,
                yuanvideo: 1
            },
            success: function(t) {
                i.setData({
                    video: t.data.data,
                    showvideo: !0
                });
            }
        }) : wx.showToast({
            title: "不是小红书链接",
            icon: "success",
            duration: 2e3
        });
    },
    postUrl: function() {
        var t = this, e = t.data.url;
        "" == e ? wx.showToast({
            title: "链接不能为空",
            icon: "success",
            duration: 2e3
        }) : /http[^\u4e00-\u9fa5]{10,200}/.test(e) ? (wx.showLoading({
            title: "获取视频中"
        }), o.util.request({
            url: "entry/wxapp/Video",
            cachetime: "0",
            data: {
                m: "hong_hui",
                url: e,
                yuanvideo: 1
            },
            success: function(o) {
                wx.hideLoading(), console.log(o.data.data), t.setData({
                    video: o.data.data,
                    showvideo: !0
                });
            }
        })) : wx.showToast({
            title: "不是小红书链接",
            icon: "success",
            duration: 2e3
        });
    },
    savevideo: function() {
        var t = this;
        o.check(function() {
            var o = t.data.video.video;
            console.log(o), wx.showLoading({
                title: "下载中",
                mask: !0
            }), wx.downloadFile({
                url: o,
                success: function(o) {
                    console.log(o), wx.saveVideoToPhotosAlbum({
                        filePath: o.tempFilePath,
                        success: function(t) {
                            wx.hideLoading(), wx.showToast({
                                title: "保存成功",
                                icon: "success",
                                duration: 2e3
                            }), console.log(t);
                        },
                        fail: function(o) {
                            wx.hideLoading(), console.log(o), wx.getSetting({
                                success: function(o) {
                                    console.log(o), 1 != o.authSetting["scope.writePhotosAlbum"] && t.getAuth();
                                }
                            });
                        }
                    });
                },
                fail: function(t) {
                    wx.hideLoading(), console.log(t), wx.showToast({
                        title: "视频过大请复制链接下载",
                        icon: "none",
                        duration: 2e3
                    });
                }
            });
        });
    },
    clear: function() {
        this.setData({
            url: "",
            showvideo: !1
        });
    },
    copyvideo: function() {
        var t = this;
        o.check(function() {
            wx.setClipboardData({
                data: t.data.video.video,
                success: function(t) {
                    wx.showToast({
                        title: "复制成功",
                        icon: "success",
                        duration: 2e3
                    });
                }
            });
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
            showvideo: !1
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
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
    onShareAppMessage: function() {}
});