(function(t){function n(n){for(var e,s,l=n[0],o=n[1],c=n[2],d=0,h=[];d<l.length;d++)s=l[d],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&h.push(i[s][0]),i[s]=0;for(e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e]);u&&u(n);while(h.length)h.shift()();return a.push.apply(a,c||[]),r()}function r(){for(var t,n=0;n<a.length;n++){for(var r=a[n],e=!0,l=1;l<r.length;l++){var o=r[l];0!==i[o]&&(e=!1)}e&&(a.splice(n--,1),t=s(s.s=r[0]))}return t}var e={},i={app:0},a=[];function s(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,n,r){s.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,n){if(1&n&&(t=s(t)),8&n)return t;if(4&n&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var e in t)s.d(r,e,function(n){return t[n]}.bind(null,e));return r},s.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(n,"a",n),n},s.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},s.p="/bidding-box/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=n,l=l.slice();for(var c=0;c<l.length;c++)n(l[c]);var u=o;a.push([0,"chunk-vendors"]),r()})({0:function(t,n,r){t.exports=r("56d7")},1394:function(t,n,r){"use strict";r("d691")},"56d7":function(t,n,r){"use strict";r.r(n);r("e260"),r("e6cf"),r("cca6"),r("a79d");var e=r("2b0e"),i=function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("v-app",{attrs:{id:"app"}},[r("router-view")],1)},a=[],s=(r("5c0b"),r("2877")),l=r("6544"),o=r.n(l),c=r("7496"),u={},d=Object(s["a"])(u,i,a,!1,null,null,null),h=d.exports;o()(d,{VApp:c["a"]});var f=r("f309");e["a"].use(f["a"]);var b=new f["a"]({}),p=r("8c4f"),v=function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("div",[r("BiddingTable",{attrs:{history:this.history,boardNum:this.boardNum,curPlayer:this.curPlayer,ended:null!=this.contract.bid}}),r("v-footer",{attrs:{fixed:"",padless:"",id:"control-footer"}},[r("v-row",{attrs:{justify:"center","no-gutters":""}},[r("v-col",{attrs:{cols:"3"}},[r("v-btn",{staticClass:"d-flex align-center justify-center",attrs:{block:"",id:"undo-button"},on:{click:function(n){return t.undo()}}},[r("v-icon",[t._v("mdi-arrow-u-left-top")])],1)],1),null==t.contract.bid?r("v-col",{attrs:{col:"6"}},[r("v-dialog",{attrs:{width:"90vw"},scopedSlots:t._u([{key:"activator",fn:function(n){var e=n.on,i=n.attrs;return[r("v-btn",t._g(t._b({staticClass:"d-flex align-center justify-center",attrs:{block:"",id:"call-button"}},"v-btn",i,!1),e),[r("v-icon",[t._v("mdi-arrow-up-box")])],1)]}}],null,!1,531226065),model:{value:t.dialog,callback:function(n){t.dialog=n},expression:"dialog"}},[r("v-card",{attrs:{elevation:"0"}},[r("BoxSelect",{attrs:{biddingState:t.biddingState},on:{selectCall:function(n){t.addHistory(n),t.dialog=!1}}})],1)],1)],1):r("v-col",{attrs:{col:"6"}},[r("div",{staticClass:"d-flex align-center justify-center",attrs:{id:"contract"}},[r("Contract",{attrs:{contract:t.contract,vul:t.is_vul(t.contract.declarer)}})],1)]),r("v-col",{attrs:{cols:"3"}},[r("v-btn",{staticClass:"d-flex align-center justify-center",attrs:{block:"",id:"advance-button"},on:{click:function(n){return t.advanceBoard()}}},[r("v-icon",[t._v("mdi-skip-next")])],1)],1)],1)],1)],1)},_=[],g=(r("caad"),function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("v-container",{attrs:{id:"biddingtable"}},[r("v-row",{attrs:{"no-gutters":"",justify:"center"}},t._l(this.player_names,(function(n,e){return r("v-col",{key:e,attrs:{cols:"3"}},[r("v-card",{class:"d-flex align-center justify-center ma-1 player-"+t.is_vul(e)},[r("div",[t._v(t._s(n))])])],1)})),1),t._l(this.hist_2d,(function(n,e){return r("v-row",{key:e,attrs:{"no-gutters":"",justify:"center"}},t._l(n,(function(t,n){return r("v-col",{key:n,attrs:{cols:"3"}},[r("Call",{attrs:{biddingCall:t}})],1)})),1)}))],2)}),y=[],m=r("2909"),x=(r("a9e3"),r("a434"),r("fb6a"),function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("v-card",{staticClass:"d-flex align-center justify-center ma-1",class:this.to_class(this.biddingCall),attrs:{height:"7vh"}},[r("span",{domProps:{innerHTML:t._s(this.to_html(this.biddingCall))}})])}),C=[],P={name:"Call",props:{biddingCall:String},data:function(){return{levels:["1","2","3","4","5","6","7"],strains:{N:"N",S:"&#9828;",H:"&#9825;",D:"&#9826;",C:"&#9831;"},pxr:{P:"P",X:"X",R:"XX"}}},methods:{to_html:function(t){return["A","B","E"].includes(t)?"":t in this.pxr?this.pxr[t]:t[0]+this.strains[t[1]]},to_class:function(t){var n=["table-label"];return(2===t.length||["P","X","R"].includes(t))&&n.push("normal-label"),n.push("label-".concat(t[t.length-1])),n}}},S=P,k=r("b0af"),w=Object(s["a"])(S,x,C,!1,null,null,null),j=w.exports;o()(w,{VCard:k["a"]});var N={name:"BiddingTable",components:{Call:j},props:{history:Array,boardNum:Number,curPlayer:String,ended:Boolean},data:function(){return{PLAYERS:["W","N","E","S"],player_names:{W:"West",N:"North",E:"East",S:"South"}}},computed:{dlr_pos:function(){return this.player_pos(this.dealer)},hist_2d:function(){var t=Object(m["a"])(this.history);this.ended||t.push("A");for(var n=[],r=0;r<this.dlr_pos;r++)t.splice(0,0,"B");while(t.length%4>0)t.push("E");for(var e=0;e<t.length;e+=4)n.push(t.slice(e,e+4));return n},dealer:function(){return this.PLAYERS[this.boardNum%4]},vulerability:function(){var t=[2,4,5,7,10,12,13,15],n=[3,4,6,7,9,10,13,16];return{EW:n.includes(this.boardNum),NS:t.includes(this.boardNum)}}},methods:{player_pos:function(t){return this.PLAYERS.indexOf(t)},is_vul:function(t){var n=!1;return n=["E","W"].includes(t)?this.vulerability["EW"]:this.vulerability["NS"],n?"v":"nv"}}},O=N,E=r("62ad"),V=r("a523"),X=r("0fd9"),B=Object(s["a"])(O,g,y,!1,null,null,null),R=B.exports;o()(B,{VCard:k["a"],VCol:E["a"],VContainer:V["a"],VRow:X["a"]});var A=function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("v-container",{attrs:{id:"boxselect"}},[t._l(t.levels,(function(n){return r("v-row",{key:n,attrs:{"no-gutters":""}},t._l(t.strains,(function(e,i){return r("v-col",{key:i,staticClass:"pa-1",attrs:{"align-center":"",row:"",wrap:"","no-gutters":"",depressed:""}},[r("v-btn",{staticClass:"call-choice bid-choice",attrs:{block:"",height:"9vh",ripple:!1,id:"call-"+n+i,disabled:t.invalid_bid(n,i)},on:{click:function(n){return t.clicked(n)}}},[r("span",{class:"label-"+i,domProps:{innerHTML:t._s(n+e)}})])],1)})),1)})),r("v-row",{attrs:{"no-gutters":""}},[r("v-col",{staticClass:"pa-1",attrs:{cols:"3"}},[r("v-btn",{staticClass:"call-choice",attrs:{block:"",height:"9vh",ripple:!1,id:"call-R",disabled:this.cannot_rdbl},on:{click:function(n){return t.clicked(n)}}},[r("span",{staticClass:"label-X"},[t._v("XX")])])],1),r("v-col",{staticClass:"pa-1",attrs:{cols:"6"}},[r("v-btn",{staticClass:"call-choice",attrs:{block:"",height:"9vh",ripple:!1,id:"call-P"},on:{click:function(n){return t.clicked(n)}}},[r("span",{staticClass:"label-P"},[t._v("Pass")])])],1),r("v-col",{staticClass:"pa-1",attrs:{cols:"3"}},[r("v-btn",{staticClass:"call-choice",attrs:{block:"",height:"9vh",ripple:!1,id:"call-X",disabled:this.cannot_dbl},on:{click:function(n){return t.clicked(n)}}},[r("span",{staticClass:"label-X"},[t._v("X")])])],1)],1)],2)},T=[],L=(r("ac1f"),r("5319"),r("b64b"),{name:"BoxSelect",props:{biddingState:Array},data:function(){return{levels:["1","2","3","4","5","6","7"],strains:{N:"N",S:"&#9828;",H:"&#9825;",D:"&#9826;",C:"&#9831;"}}},computed:{last_bid:function(){return this.biddingState[0]},cannot_dbl:function(){return!this.biddingState[1]},cannot_rdbl:function(){return!this.biddingState[2]}},methods:{clicked:function(t){var n=t.currentTarget.id.replace("call-","");this.$emit("selectCall",n)},invalid_bid:function(t,n){if(""===this.last_bid)return!1;if(t<this.last_bid[0])return!0;if(t>this.last_bid[0])return!1;var r=Object.keys(this.strains);return r.indexOf(n)>=r.indexOf(this.last_bid[1])}}}),M=L,H=r("8336"),W=Object(s["a"])(M,A,T,!1,null,null,null),$=W.exports;o()(W,{VBtn:H["a"],VCol:E["a"],VContainer:V["a"],VRow:X["a"]});var Y=function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("div",[null==this.contract.declarer?[t._v("Pass Out")]:[r("span",{class:"label-"+this.contract.bid[1],domProps:{innerHTML:t._s(this.bid_to_html(this.contract.bid))}}),r("span",[t._v(t._s(this.to_pxr(this.contract.pxr)))]),r("span",{staticStyle:{"margin-left":"0.5em"}},[t._v(" by "+t._s(this.contract.declarer))])]],2)},D=[],J={name:"Contract",props:{contract:Object,vul:Boolean},data:function(){return{strains:{N:"N",S:"&#9828;",H:"&#9825;",D:"&#9826;",C:"&#9831;"}}},methods:{bid_to_html:function(t){return t[0]+this.strains[t[1]]},to_pxr:function(t){return"P"===t?"":"X"===t?"X":"XX"}}},F=J,I=Object(s["a"])(F,Y,D,!1,null,null,null),q=I.exports,z={name:"BiddingMain",components:{BiddingTable:R,BoxSelect:$,Contract:q},data:function(){return{PLAYERS:["W","N","E","S"],history:[],boardNum:1,dialog:!1}},computed:{curPlayer:function(){return this.PLAYERS[(this.boardNum+this.history.length)%4]},biddingState:function(){var t=this.history.length,n="",r=-1,e=-1,i=-1,a={bid:null,declarer:null,pxr:null};while(t--&&r<0){var s=this.history[t];"P"!==s&&("R"===s?e=t:"X"===s?i=t:(n=s,r=t))}var l=r>=0&&i<0&&e<0&&(this.history.length-r)%2===1,o=r>=0&&e<0&&i>=0&&(this.history.length-i)%2===1;if(t=this.history.length,this.history.length>=4&&"P"===this.history[t-1]&&"P"===this.history[t-2]&&"P"===this.history[t-3])if("P"===this.history[t-4])a.bid="PO";else{a.bid=n;for(var c=r%2;c<=r;c+=2)if(this.strain_of_call(this.history[c])===this.strain_of_call(n)){a.declarer=this.PLAYERS[(this.boardNum+c)%4];break}a.pxr=e>=0?"R":i>=0?"X":"P"}return[n,l,o,a]},contract:function(){return this.biddingState[3]}},methods:{addHistory:function(t){this.history.push(t)},advanceBoard:function(){this.history=[],16===this.boardNum&&(this.boardNum=0),this.boardNum+=1},undo:function(){this.history.length>0&&this.history.pop()},is_vul:function(t){return["E","W"].includes(t)?[3,4,6,7,9,10,13,16].includes(t):[2,4,5,7,10,12,13,15].includes(t)},strain_of_call:function(t){return 1===t.length?"":t[1]}}},G=z,K=(r("1394"),r("169a")),Q=r("553a"),U=r("132d"),Z=Object(s["a"])(G,v,_,!1,null,null,null),tt=Z.exports;o()(Z,{VBtn:H["a"],VCard:k["a"],VCol:E["a"],VDialog:K["a"],VFooter:Q["a"],VIcon:U["a"],VRow:X["a"]}),e["a"].use(p["a"]);var nt=[{path:"/",name:"BiddingMain",component:tt}],rt=new p["a"]({mode:"history",base:"/bidding-box/",routes:nt}),et=rt;e["a"].config.productionTip=!1,new e["a"]({vuetify:b,router:et,render:function(t){return t(h)}}).$mount("#app")},"5c0b":function(t,n,r){"use strict";r("9c0c")},"9c0c":function(t,n,r){},d691:function(t,n,r){}});
//# sourceMappingURL=app.d54592ca.js.map