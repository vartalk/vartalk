parcelRequire=function(e){var r="function"==typeof parcelRequire&&parcelRequire,n="function"==typeof require&&require,i={};function u(e,u){if(e in i)return i[e];var t="function"==typeof parcelRequire&&parcelRequire;if(!u&&t)return t(e,!0);if(r)return r(e,!0);if(n&&"string"==typeof e)return n(e);var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}return u.register=function(e,r){i[e]=r},i=e(u),u.modules=i,u}(function (require) {var c={};function j(e){for(var r,o=/\+/g,n=/([^&=]+)=?([^&]*)/g,p=function(e){return decodeURIComponent(e.replace(o," "))},a={};r=n.exec(e);)a[p(r[1])]=p(r[2]);return a}function f(e){var r=[];for(var o in e)e.hasOwnProperty(o)&&e[o]&&r.push(encodeURIComponent(o)+"="+encodeURIComponent(e[o]));return r.join("&")}c.deparam=j,c.param=f;var d={},k=window.matchMedia("(prefers-color-scheme: dark)").matches?"github-dark":"github-light";d.preferredTheme=k;var l="preferred-color-scheme";d.preferredThemeId=l;var g=j(location.search.substr(1)),m=g.vartalk;if(m){delete g.vartalk;var h=f(g);h.length&&(h="?"+h),history.replaceState(void 0,document.title,location.pathname+h+location.hash)}var e=document.currentScript,b=document.querySelector("#comment");void 0===e&&(e=document.querySelector("script[src^=\"https://vartalk.cn/client.js\"],script[src^=\"http://localhost:4000/client.js\"]"));for(var a={},i=0;i<e.attributes.length;i++){var n=e.attributes.item(i);a[n.name.replace(/^data-/,"")]=n.value}a.theme===l&&(a.theme=k);var o=document.querySelector("link[rel='canonical']");a.url=o?o.href:location.origin+location.pathname+location.search,a.origin=location.origin,a.pathname=location.pathname.length<2?"index":location.pathname.substr(1).replace(/\.\w+$/,""),a.title=document.title;var p=document.querySelector("meta[name='description']");a.description=p?p.content:"";var q=encodeURIComponent(a.description).length;q>1e3&&(a.description=a.description.substr(0,Math.floor(1e3*a.description.length/q)));var r=document.querySelector("meta[property='og:title'],meta[name='og:title']");a["og:title"]=r?r.content:"",a.token=m,document.head.insertAdjacentHTML("afterbegin","<style>\n        .vartalk {\n            position: relative;\n            box-sizing: border-box;\n            width: 100%;\n            max-width: 760px;\n            margin-left: auto;\n            margin-right: auto;\n        }\n        .vartalk-frame {\n            position: absolute;\n            left: 0;\n            right: 0;\n            width: 1px;\n            min-width: 100%;\n            max-width: 100%;\n            height: 100%;\n            border: 0;\n        }\n    </style>");var s=e.src.match(/^https:\/\/vartalk\.cn|http:\/\/localhost:\d+/)[0],t=s+"/vartalk.html";if(b){b.insertAdjacentHTML("afterend","\n        <div class=\"vartalk\">\n            <iframe class=\"vartalk-frame\" title=\"Comments\" scrolling=\"no\" src=\""+t+"?"+f(a)+"\"></iframe>\n        </div>\n    ");var u=b.nextElementSibling;b.parentElement.removeChild(b),addEventListener("message",function(t){if(t.origin===s){var r=t.data;r&&"resize"===r.type&&r.height&&(u.style.height=r.height+"px")}})}c.__esModule=true;d.__esModule=true;return{"D53L":{},"ieWq":c,"N98m":d};});