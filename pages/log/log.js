Page({
    data: {
        i: 0,
        title: [ "花型相框", "书香性相框", "黑色相框" ],
        body: [ "相框大气，有内涵", "相框带有书香气息，特别适合学生", "相框简洁，方便" ]
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    huan: function() {
        2 == this.data.i ? this.setData({
            i: 0
        }) : this.setData({
            i: this.data.i + 1
        });
    }
});