function e(e) {
    for (var t = {}, r = e.split(","), n = 0; n < r.length; n++) t[r[n]] = !0;
    return t;
}

function t(e) {
    return e.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*\>\n/, "").replace(/<!DOCTYPE.*\>\n/, "");
}

function r(e) {
    var t = [];
    if (0 == n.length || !o) return (l = {}).node = "text", l.text = e, a = [ l ];
    e = e.replace(/\[([^\[\]]+)\]/g, ":$1:");
    for (var r = new RegExp("[:]"), a = e.split(r), i = 0; i < a.length; i++) {
        var d = a[i], l = {};
        o[d] ? (l.node = "element", l.tag = "emoji", l.text = o[d], l.baseSrc = s) : (l.node = "text", 
        l.text = d), t.push(l);
    }
    return t;
}

var n = "", s = "", o = {}, a = require("wxDiscode.js"), i = require("htmlparser.js"), d = (e("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), 
e("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video")), l = e("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), c = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), 
e("wxxxcode-style,script,style,view,scroll-view,block"), module.exports = {
    html2json: function(e, n) {
        e = t(e), e = a.strDiscode(e);
        var s = [], o = {
            node: n,
            nodes: [],
            images: [],
            imageUrls: []
        };
        return i(e, {
            start: function(e, t, r) {
                var i = {
                    node: "element",
                    tag: e
                };
                if (d[e] ? i.tagType = "block" : l[e] ? i.tagType = "inline" : c[e] && (i.tagType = "closeSelf"), 
                0 !== t.length && (i.attr = t.reduce(function(e, t) {
                    var r = t.name, n = t.value;
                    return "class" == r && (i.classStr = n), "style" == r && (i.styleStr = n), n.match(/ /) && (n = n.split(" ")), 
                    e[r] ? Array.isArray(e[r]) ? e[r].push(n) : e[r] = [ e[r], n ] : e[r] = n, e;
                }, {})), "img" === i.tag) {
                    i.imgIndex = o.images.length;
                    var p = i.attr.src;
                    p = a.urlToHttpUrl(p, "https"), i.attr.src = p, i.from = n, o.images.push(i), o.imageUrls.push(p);
                }
                if (r) {
                    var u = s[0] || o;
                    void 0 === u.nodes && (u.nodes = []), u.nodes.push(i);
                } else s.unshift(i);
            },
            end: function(e) {
                var t = s.shift();
                if (t.tag !== e && console.error("invalid state: mismatch end tag"), 0 === s.length) o.nodes.push(t); else {
                    var r = s[0];
                    void 0 === r.nodes && (r.nodes = []), r.nodes.push(t);
                }
            },
            chars: function(e) {
                var t = {
                    node: "text",
                    text: e,
                    textArray: r(e)
                };
                if (0 === s.length) o.nodes.push(t); else {
                    var n = s[0];
                    void 0 === n.nodes && (n.nodes = []), n.nodes.push(t);
                }
            },
            comment: function(e) {
                var t = {
                    node: "comment",
                    text: e
                }, r = s[0];
                void 0 === r.nodes && (r.nodes = []), r.nodes.push(t);
            }
        }), o;
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", r = arguments[2];
        n = e, s = t, o = r;
    }
};