(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-444d02f2"],{"07ac":function(t,e,s){var a=s("23e7"),i=s("6f53").values;a({target:"Object",stat:!0},{values:function(t){return i(t)}})},"2c73":function(t,e,s){"use strict";s("69b1")},"498a":function(t,e,s){"use strict";var a=s("23e7"),i=s("58a8").trim,n=s("c8d2");a({target:"String",proto:!0,forced:n("trim")},{trim:function(){return i(this)}})},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,s){var a=s("1d80"),i=s("5899"),n="["+i+"]",r=RegExp("^"+n+n+"*"),c=RegExp(n+n+"*$"),o=function(t){return function(e){var s=String(a(e));return 1&t&&(s=s.replace(r,"")),2&t&&(s=s.replace(c,"")),s}};t.exports={start:o(1),end:o(2),trim:o(3)}},"69b1":function(t,e,s){},"6f53":function(t,e,s){var a=s("83ab"),i=s("df75"),n=s("fc6a"),r=s("d1e7").f,c=function(t){return function(e){var s,c=n(e),o=i(c),l=o.length,u=0,p=[];while(l>u)s=o[u++],a&&!r.call(c,s)||p.push(t?[s,c[s]]:c[s]);return p}};t.exports={entries:c(!0),values:c(!1)}},bb51:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"m-home-view"},[s("Search"),s("WikiPanel",{attrs:{"border-none":"true"}},[s("template",{slot:"head-title"},[s("i",{staticClass:"el-icon-location-information"}),s("span",[t._v("便捷入口")])]),s("template",{slot:"head-actions"},[s("a",{staticClass:"u-more",attrs:{target:"_blank",href:t.feedback}},[t._v("反馈建议 »")])]),s("template",{slot:"body"},[s("ul",{staticClass:"m-qlinks"},[s("li",{staticClass:"qlink"},[s("a",{staticStyle:{"background-color":"#FE7979"},attrs:{target:"_blank",href:"https://www.jx3box.com/tool/18151/"}},[s("i",{staticClass:"el-icon-trophy"}),s("span",[t._v("游戏内看百科")])])]),s("li",{staticClass:"qlink"},[s("router-link",{attrs:{to:{name:"plan_list"}}},[s("i",{staticClass:"el-icon-document"}),t._v(" 物品清单 ")])],1),s("li",{staticClass:"qlink"},[s("router-link",{attrs:{to:{name:"search",query:{ids:"5_24423,5_24424,5_24425,5_24426,5_24427,5_24428,5_24429,5_24430"}}}},[s("i",{staticClass:"el-icon-edit-outline"}),s("span",[t._v("五行石合成")])])],1),s("li",{staticClass:"qlink"},[s("a",{attrs:{target:"_blank",href:"https://www.jx3box.com/knowledge/#/pet"}},[s("i",{staticClass:"el-icon-lollipop"}),s("span",[t._v("宠物密鉴")])])])])])],2),s("StarMarkItems"),s("WikiPanel",{attrs:{"border-none":"true"}},[s("template",{slot:"head-title"},[s("i",{staticClass:"el-icon-collection"}),s("span",[t._v("最新攻略")])]),s("template",{slot:"body"},[t.newest_posts.length?s("div",{staticClass:"wiki-post-list"},t._l(t.newest_posts,(function(e,a){return s("div",{key:a,staticClass:"wiki-post"},[s("div",{staticClass:"m-about-post"},[s("div",{staticClass:"m-user"},[s("div",{staticClass:"u-author"},[s("img",{staticClass:"u-icon",attrs:{src:t._f("showAvatar")(e.user_avatar),alt:e.user_nickname}}),e.user_id?s("a",{staticClass:"u-name",attrs:{href:t._f("author_url")(e.user_id)},domProps:{textContent:t._s(e.user_nickname)}}):s("span",{staticClass:"u-name"},[t._v(t._s(e.user_nickname))])]),s("div",{staticClass:"u-updated",domProps:{textContent:t._s(t.$options.filters.date_format(e.updated))}})]),s("div",{staticClass:"m-wiki"},[s("div",{staticClass:"u-wiki"},[s("img",{staticClass:"u-icon",attrs:{src:t.$options.filters.icon_url(e.source_icon_id)},on:{"~error":function(e){e.target.src=t.icon_url()}}}),s("router-link",{staticClass:"u-name",attrs:{to:{name:"view",params:{item_id:e.source_id}}},domProps:{textContent:t._s(e.title)}})],1),s("div",{staticClass:"u-level",domProps:{textContent:t._s("综合难度："+t.$options.filters.star(e.level))}}),e.remark?s("div",{staticClass:"u-remark",domProps:{textContent:t._s("📑 "+e.remark)}}):t._e()])]),s("div",{staticClass:"m-excerpt"},[s("router-link",{staticClass:"u-excerpt",attrs:{to:{name:"view",params:{item_id:e.source_id}}},domProps:{innerHTML:t._s(t.ellipsis(e.excerpt))}})],1)])})),0):s("div",{staticStyle:{"text-align":"center"}},[t._v("😂 暂无攻略")])])],2)],1)},i=[],n=(s("498a"),s("fb6a"),s("07ac"),s("1c9a")),r=s("c106"),c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("WikiPanel",{staticClass:"m-search-hottest",attrs:{"border-none":"true"}},[s("template",{slot:"head-title"},[s("i",{staticClass:"el-icon-shopping-bag-1"}),s("span",[t._v("交易趋势")])]),s("template",{slot:"head-actions"},[s("el-select",{staticClass:"u-server",attrs:{placeholder:"请选择服务器",size:"mini"},model:{value:t.server,callback:function(e){t.server=e},expression:"server"}},t._l(t.servers,(function(t){return s("el-option",{key:t,attrs:{label:t,value:t}})})),1)],1),s("template",{slot:"body"},[t.groups&&t.groups.length?s("div",{staticClass:"m-price-list"},t._l(t.groups,(function(e,a){return s("el-row",{key:a,attrs:{gutter:20}},[s("el-col",{staticClass:"u-group-title",domProps:{textContent:t._s(e.label)}}),t._l(e.items,(function(e,i){return s("el-col",{key:i,attrs:{span:6}},[e?s("router-link",{staticClass:"u-item",class:"u-item-"+a,attrs:{to:{name:"view",params:{item_id:e.item_id}}}},[s("div",{staticClass:"u-icon"},[s("img",{attrs:{src:t.$options.filters.icon_url(e.icon)}})]),s("div",{staticClass:"u-content"},[s("span",{staticClass:"u-name"},[s("span",{domProps:{textContent:t._s(e.label)}})]),s("span",{staticClass:"u-price"},[e.sub_days_0_price?[s("span",[t._v("今日：")]),s("GamePrice",{attrs:{price:e.sub_days_0_price}})]:!e.sub_days_0_price&&e.sub_days_1_price?[s("span",[t._v("昨日：")]),s("GamePrice",{attrs:{price:e.sub_days_1_price}})]:e.sub_days_0_price||e.sub_days_1_price||!e.sub_days_2_price?s("span",[t._v("暂无价目")]):[s("span",[t._v("前日：")]),s("GamePrice",{attrs:{price:e.sub_days_2_price}})]],2)])]):t._e()],1)}))],2)})),1):s("div",{staticStyle:{"text-align":"center"}},[t._v("😂 暂无数据")])])],2)},o=[],l=s("2777"),u=s("65c2");u.__helperUrl,s("4328");function p(t){return l["a"].get("/api/item_groups/with_price",{params:t,headers:{Accept:"application/prs.helper.v2+json"}})}var _=s("9756"),d=s("5974"),m={name:"StarMarkItems",data:function(){return{groups:[],server:"斗转星移",servers:_}},components:{WikiPanel:n["a"],GamePrice:d["a"]},methods:{get_data:function(){var t=this;p({server:this.server,keys:["wuxingshi","baoxiang","teshucailiao","caijincailiao","paodingcailiao","shennongcailiao","anqi"]}).then((function(e){e=e.data,200===e.code&&(t.groups=Object.values(e.data.data)||[])}))}},watch:{server:{immediate:!0,handler:function(){this.get_data()}}}},v=m,f=(s("2c73"),s("2877")),h=Object(f["a"])(v,c,o,!1,null,"879bb78e",null),b=h.exports,k=s("85e4"),C=s("b78a"),g=s("208a"),w=s("ee8f"),x={name:"Home",data:function(){return{newest_posts:[],newest_plans:[],feedback:w["JX3BOX"].feedback,plan_2_icon:w["JX3BOX"].__iconPath+"icon/2410.png",plan_1_icon:w["JX3BOX"].__iconPath+"icon/3089.png"}},components:{Search:r["a"],WikiPanel:n["a"],StarMarkItems:b},methods:{icon_url:k["iconLink"],ellipsis:function(t){return t=t?t.trim():"",t.length>100?t.slice(0,100)+"...":t},chuck:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,s=[],a=0;a<t.length;a+=e)s.push(t.slice(a,a+e));return s}},created:function(){var t=this;Object(C["c"])().then((function(e){e=e.data,200===e.code&&(t.newest_posts=e.data.newest)})),Object(g["c"])({limit:15}).then((function(e){e=e.data,200===e.code&&(t.newest_plans=t.chuck(Object.values(e.data.data)))}))},filters:{showAvatar:function(t){return t&&Object(k["getThumbnail"])(t,20,!0)||Object(k["getThumbnail"])(w["JX3BOX"].default_avatar,20,!0)}}},y=x,P=(s("de16"),Object(f["a"])(y,a,i,!1,null,null,null));e["default"]=P.exports},c8d2:function(t,e,s){var a=s("d039"),i=s("5899"),n="​᠎";t.exports=function(t){return a((function(){return!!i[t]()||n[t]()!=n||i[t].name!==t}))}},de16:function(t,e,s){"use strict";s("ea6e")},ea6e:function(t,e,s){}}]);
//# sourceMappingURL=chunk-444d02f2.bc0b2ed2.js.map