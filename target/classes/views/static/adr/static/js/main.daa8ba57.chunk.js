(this.webpackJsonpLamisPlus=this.webpackJsonpLamisPlus||[]).push([[0],{393:function(e,t,a){},394:function(e,t,a){},466:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(22),i=a.n(o),c=a(37),l=a(111),s=(a(392),a(393),a(394),a(395),a(94)),d=a(149),u=a(15),b=a(20),j=a(503),h=a(507),O=a(509),f=a(500),v=a(360),p=a(510),x=a(505),g=a(501),m=a(246),y=a.n(m),w=a(504),S=new URLSearchParams(window.location.search).get("jwt"),_="/",A=a(14),B=a(8),P=function(e){var t=e.dhis2List,a=Object(r.useState)({url:"",username:"",password:""}),n=Object(u.a)(a,2),o=n[0],i=n[1],c=function(e){var t=e.target,a=t.name,r=t.value;i(Object(b.a)(Object(b.a)({},o),{},Object(A.a)({},a,r)))};return Object(B.jsx)(B.Fragment,{children:Object(B.jsx)(x.a,{children:Object(B.jsxs)(f.a,{children:[Object(B.jsx)(v.a,{sm:4,children:Object(B.jsx)(x.a.Control,{placeholder:"Dhis2 Url",name:"url",onChange:c,value:o.url,required:!0})}),Object(B.jsx)(v.a,{sm:4,children:Object(B.jsx)(x.a.Control,{placeholder:"Dhis2 Username",name:"username",onChange:c,value:o.username,required:!0})}),Object(B.jsx)(v.a,{sm:4,children:Object(B.jsx)(x.a.Control,{placeholder:"Dhis2 Password",name:"password",onChange:c,value:o.password,required:!0})}),Object(B.jsxs)(v.a,{children:[Object(B.jsx)("br",{}),Object(B.jsxs)(g.a,{variant:"primary",onClick:function(){w.a.post("".concat(_,"v1/configuration/"),o,{headers:{Authorization:"Bearer ".concat(S)}}).then((function(e){200===e.status&&i({url:"",username:"",password:""}),t()})).catch((function(e){console.log(e)}))},children:["Submit ",Object(B.jsx)("span",{className:"fa fa-save","aria-hidden":"true"})]})]})]})})})},L=a(502),C=function(e){var t=e.dhis2List,a=e.deleteLogin;return Object(B.jsx)(B.Fragment,{children:Object(B.jsxs)(L.a,{striped:!0,children:[Object(B.jsx)("thead",{children:Object(B.jsxs)("tr",{children:[Object(B.jsx)("th",{children:"Dhis2 Url"}),Object(B.jsx)("th",{children:"Username"}),Object(B.jsx)("th",{children:"Password"}),Object(B.jsx)("th",{children:"Action"})]})}),Object(B.jsx)("tbody",{children:t.map((function(e,t){return Object(B.jsxs)("tr",{children:[Object(B.jsx)("td",{children:e.url}),Object(B.jsx)("td",{children:"********"}),Object(B.jsx)("td",{children:"********"}),Object(B.jsx)("td",{children:Object(B.jsx)(g.a,{onClick:function(){return a(e.id)},className:"btn btn-danger btn-sm",children:Object(B.jsx)("span",{className:"fa fa-trash","aria-hidden":"true"})})})]},e.id)}))})]})})},R=a(361),D=a.n(R),F=a(371),N=a.n(F),k=a(362),z=a.n(k),H=a(369),U=a.n(H),I=a(253),T=a.n(I),E=a(252),W=a.n(E),q=a(363),M=a.n(q),J=a(364),V=a.n(J),G=a(366),K=a.n(G),Y=a(367),Q=a.n(Y),X=a(368),Z=a.n(X),$=a(372),ee=a.n($),te=a(365),ae=a.n(te),re=a(370),ne=a.n(re),oe=a(373),ie=a.n(oe),ce=a(511),le={Add:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(D.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Check:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(z.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Clear:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(W.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Delete:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(M.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),DetailPanel:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(T.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Edit:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(V.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Export:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(ae.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Filter:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(K.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),FirstPage:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(Q.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),LastPage:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(Z.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),NextPage:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(T.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),PreviousPage:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(U.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),ResetSearch:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(W.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Search:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(ne.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),SortArrow:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(N.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),ThirdStateCheck:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(ee.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),ViewColumn:Object(r.forwardRef)((function(e,t){return Object(B.jsx)(ie.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))}))},se=function(){var e=Object(r.useState)(null),t=Object(u.a)(e,2),a=t[0],n=t[1],o=Object(r.useState)(0),i=Object(u.a)(o,2),c=i[0],b=i[1],m=Object(r.useState)(null),A=Object(u.a)(m,2),L=A[0],R=A[1],D=Object(r.useState)([]),F=Object(u.a)(D,2),N=F[0],k=F[1],z=Object(r.useState)([]),H=Object(u.a)(z,2),U=H[0],I=H[1],T=function(){w.a.get("".concat(_,"v1/dhis2/dhis2-uploads"),{headers:{Authorization:"Bearer ".concat(S)}}).then((function(e){k(e.data)})).catch((function(e){console.log(e)}))},E=function(){w.a.get("".concat(_,"v1/configuration/"),{headers:{Authorization:"Bearer ".concat(S)}}).then((function(e){I(e.data)})).catch((function(e){console.log(e)}))};Object(r.useEffect)((function(){T(),E()}),[]);var W=function(){var e=new Date,t=e.getDate().toString().padStart(2,"0"),a=(e.getMonth()+1).toString().padStart(2,"0"),r=e.getFullYear();return"".concat(r,"-").concat(a,"-").concat(t)},q=function(){var e=Object(d.a)(Object(s.a)().mark((function e(){var t;return Object(s.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a){e.next=3;break}return l.b.error("No file selected for upload"),e.abrupt("return");case 3:(t=new FileReader).onload=Object(d.a)(Object(s.a)().mark((function e(){var a;return Object(s.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=JSON.parse(t.result),e.next=3,w.a.post("".concat(_,"v1/dhis2/push-data"),JSON.stringify(a),{headers:{Authorization:"Bearer ".concat(S),"Content-Type":"application/json"},onUploadProgress:function(e){var t=Math.round(e.loaded/e.total*100);b(t)}}).then((function(e){document.getElementById("fileInput").value="",n(null),b(0);var t=null;e.data?(t={filename:L,uploadDate:W(),status:"Upload Successful"},l.b.success("DHIS2 Data ".concat(e.data.message))):t={filename:L,uploadDate:W(),status:"Upload Failed"},w.a.post("".concat(_,"v1/dhis2/dhis2-status-uploads"),t,{headers:{Authorization:"Bearer ".concat(S)}}).then((function(e){T()})).catch((function(e){console.log(e)}))})).catch((function(e){b(0),l.b.error(e.message)}));case 3:case"end":return e.stop()}}),e)}))),t.readAsText(a);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(B.jsx)(B.Fragment,{children:Object(B.jsx)(j.a,{fluid:!0,children:Object(B.jsxs)(h.a,{className:"mt-4",children:[Object(B.jsxs)(O.a,{children:[Object(B.jsx)(O.a.Item,{href:"#",children:"Home"}),Object(B.jsx)(O.a.Item,{href:"/",children:"DHIS2"})]}),Object(B.jsxs)(h.a.Body,{children:[Object(B.jsxs)(f.a,{children:[Object(B.jsx)(v.a,{children:U.length<=0?Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(h.a.Text,{className:"m-2",children:"Kindly Provide Dhis2 Login Credentials"}),Object(B.jsx)(P,{dhis2List:E})]}):Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(h.a.Text,{className:"m-2",children:"DHIS2 Login Credentials"}),Object(B.jsx)(C,{dhis2List:U,deleteLogin:function(e){w.a.delete("".concat(_,"v1/configuration/").concat(e),{headers:{Authorization:"Bearer ".concat(S)}}).then((function(e){l.b.success("Login credentials deleted successfully"),E()})).catch((function(e){console.log(e)}))}})]})}),U.length>0?Object(B.jsxs)(v.a,{children:[Object(B.jsx)(p.a,{animated:!0,now:c}),Object(B.jsx)("br",{}),Object(B.jsxs)(f.a,{className:"align-items-center",children:[Object(B.jsx)(v.a,{sm:6,className:"my-1",children:Object(B.jsxs)(x.a.Group,{className:"mb-3",children:[Object(B.jsx)(x.a.Label,{children:Object(B.jsx)("b",{children:"Upload Aggregate Data"})}),Object(B.jsx)(x.a.Control,{placeholder:"Dhis2 json file upload",type:"file",onChange:function(e){R(e.target.files[0].name),n(e.target.files[0])},id:"fileInput"})]})}),Object(B.jsx)(v.a,{sm:6,className:"my-1",children:Object(B.jsxs)(g.a,{variant:"primary",onClick:q,children:["Upload"," ",Object(B.jsx)("span",{className:"fa fa-cloud-upload","aria-hidden":"true"})]})})]})]}):null]}),Object(B.jsx)(f.a,{children:Object(B.jsxs)(v.a,{children:[Object(B.jsx)("br",{}),Object(B.jsx)(y.a,{icons:le,title:"Uploads to DHIS2 ",columns:[{title:"File Name",field:"name"},{title:"Date of Upload",field:"date"},{title:"Status",field:"status"}],data:N.map((function(e){return{name:e.filename,date:e.uploadDate,status:Object(B.jsx)(ce.a,{color:"Upload Successful"!==e.status?"danger":"info",children:e.status})}})),options:{headerStyle:{backgroundColor:"#014d88",color:"#fff"},searchFieldStyle:{width:"200%",margingLeft:"250px"},filtering:!1,exportButton:!1,searchFieldAlignment:"left",pageSizeOptions:[10,20,100],pageSize:10,debounceInterval:400}})]})})]})]})})})};function de(){return Object(B.jsx)(c.a,{children:Object(B.jsxs)("div",{children:[Object(B.jsx)(l.a,{}),Object(B.jsx)(c.d,{children:Object(B.jsx)(c.b,{path:"/",children:Object(B.jsx)(se,{})})})]})})}var ue=a(189),be=a(375),je="ltr",he=[{typography:"poppins",version:"light",layout:"vertical",headerBg:"color_1",navheaderBg:"color_1",sidebarBg:"color_1",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"full",direction:je},{typography:"poppins",version:"light",layout:"vertical",primary:"color_5",headerBg:"color_5",navheaderBg:"color_1",sidebarBg:"color_1",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",direction:je},{typography:"poppins",version:"light",layout:"vertical",navheaderBg:"color_11",headerBg:"color_1",sidebarBg:"color_11",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",primary:"color_11",direction:je},{typography:"poppins",version:"dark",layout:"vertical",headerBg:"color_3",navheaderBg:"color_3",sidebarBg:"color_1",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",primary:"color_1",direction:je},{typography:"poppins",version:"light",layout:"vertical",navheaderBg:"color_15",headerBg:"color_1",sidebarStyle:"full",sidebarBg:"color_1",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",primary:"color_15",direction:je},{typography:"poppins",version:"light",layout:"horizontal",navheaderBg:"color_1",headerBg:"color_1",sidebarBg:"color_9",sidebarStyle:"modern",sidebarPosition:"static",headerPosition:"fixed",containerLayout:"wide",primary:"color_9",direction:je}],Oe=Object(r.createContext)(),fe=function(e){var t=Object(r.useState)({value:"full",label:"Full"}),a=Object(u.a)(t,2),n=a[0],o=a[1],i=Object(r.useState)({value:"fixed",label:"Fixed"}),c=Object(u.a)(i,2),l=c[0],s=c[1],d=Object(r.useState)({value:"fixed",label:"Fixed"}),b=Object(u.a)(d,2),j=b[0],h=b[1],O=Object(r.useState)({value:"vertical",label:"Vertical"}),f=Object(u.a)(O,2),v=f[0],p=f[1],x=Object(r.useState)({value:"ltr",label:"LTR"}),g=Object(u.a)(x,2),m=g[0],y=g[1],w=Object(r.useState)("color_1"),S=Object(u.a)(w,2),_=S[0],A=S[1],P=Object(r.useState)("color_1"),L=Object(u.a)(P,2),C=L[0],R=L[1],D=Object(r.useState)("color_1"),F=Object(u.a)(D,2),N=F[0],k=F[1],z=Object(r.useState)("color_1"),H=Object(u.a)(z,2),U=H[0],I=H[1],T=Object(r.useState)(!1),E=Object(u.a)(T,2),W=E[0],q=E[1],M=Object(r.useState)(!1),J=Object(u.a)(M,2),V=J[0],G=J[1],K=Object(r.useState)({value:"light",label:"Light"}),Y=Object(u.a)(K,2),Q=Y[0],X=Y[1],Z=Object(r.useState)({value:"wide-boxed",label:"Wide Boxed"}),$=Object(u.a)(Z,2),ee=$[0],te=$[1],ae=document.querySelector("body"),re=Object(r.useState)(0),ne=Object(u.a)(re,2),oe=ne[0],ie=ne[1],ce=Object(r.useState)(0),le=Object(u.a)(ce,2),se=le[0],de=le[1],ue=function(e){A(e),ae.setAttribute("data-primary",e)},be=function(e){R(e),ae.setAttribute("data-nav-headerbg",e)},je=function(e){k(e),ae.setAttribute("data-headerbg",e)},fe=function(e){I(e),ae.setAttribute("data-sibebarbg",e)},ve=function(e){s(e),ae.setAttribute("data-sidebar-position",e.value)},pe=function(e){y(e),ae.setAttribute("direction",e.value);var t=document.querySelector("html");t.setAttribute("dir",e.value),t.className=e.value},xe=function(e){"horizontal"===e.value&&"overlay"===n.value?(p(e),ae.setAttribute("data-layout",e.value),o({value:"full",label:"Full"}),ae.setAttribute("data-sidebar-style","full")):(p(e),ae.setAttribute("data-layout",e.value))},ge=function(e){"horizontal"===v.value&&"overlay"===e.value?alert("Sorry! Overlay is not possible in Horizontal layout."):(o(e),q("icon-hover"===e.value?"_i-hover":""),ae.setAttribute("data-sidebar-style",e.value))},me=function(e){h(e),ae.setAttribute("data-header-position",e.value)},ye=function(e){ae.setAttribute("data-theme-version",e.value),X(e)},we=function(e){te(e),ae.setAttribute("data-container",e.value),"boxed"===e.value&&ge({value:"overlay",label:"Overlay"})};return Object(r.useEffect)((function(){var e=document.querySelector("body");e.setAttribute("data-typography","poppins"),e.setAttribute("data-theme-version","light"),e.setAttribute("data-layout","vertical"),e.setAttribute("data-primary","color_1"),e.setAttribute("data-nav-headerbg","color_1"),e.setAttribute("data-headerbg","color_1"),e.setAttribute("data-sidebar-style","overlay"),e.setAttribute("data-sibebarbg","color_1"),e.setAttribute("data-primary","color_1"),e.setAttribute("data-sidebar-position","fixed"),e.setAttribute("data-header-position","fixed"),e.setAttribute("data-container","wide"),e.setAttribute("direction","ltr");var t=function(){ie(window.innerWidth),de(window.innerHeight),window.innerWidth>=768&&window.innerWidth<1024?e.setAttribute("data-sidebar-style","mini"):window.innerWidth<=768?e.setAttribute("data-sidebar-style","overlay"):e.setAttribute("data-sidebar-style","full")};return t(),window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}}),[]),Object(B.jsx)(Oe.Provider,{value:{body:ae,sideBarOption:[{value:"compact",label:"Compact"},{value:"full",label:"Full"},{value:"mini",label:"Mini"},{value:"modern",label:"Modern"},{value:"overlay",label:"Overlay"},{value:"icon-hover",label:"Icon-hover"}],layoutOption:[{value:"vertical",label:"Vertical"},{value:"horizontal",label:"Horizontal"}],backgroundOption:[{value:"light",label:"Light"},{value:"dark",label:"Dark"}],sidebarposition:l,headerPositions:[{value:"fixed",label:"Fixed"},{value:"static",label:"Static"}],containerPosition:[{value:"wide-boxed",label:"Wide Boxed"},{value:"boxed",label:"Boxed"},{value:"wide",label:"Wide"}],directionPosition:[{value:"ltr",label:"LTR"},{value:"rtl",label:"RTL"}],fontFamily:[{value:"poppins",label:"Poppins"},{value:"roboto",label:"Roboto"},{value:"cairo",label:"Cairo"},{value:"opensans",label:"Open Sans"},{value:"HelveticaNeue",label:"HelveticaNeue"}],primaryColor:_,navigationHader:C,windowWidth:oe,windowHeight:se,changePrimaryColor:ue,changeNavigationHader:be,changeSideBarStyle:ge,sideBarStyle:n,changeSideBarPostion:ve,sidebarpositions:[{value:"fixed",label:"Fixed"},{value:"static",label:"Static"}],changeHeaderPostion:me,headerposition:j,changeSideBarLayout:xe,sidebarLayout:v,changeDirectionLayout:pe,changeContainerPosition:we,direction:m,colors:["color_1","color_2","color_3","color_4","color_5","color_6","color_7","color_8","color_9","color_10","color_11","color_12","color_13","color_14","color_15"],haderColor:N,chnageHaderColor:je,chnageSidebarColor:fe,sidebarColor:U,iconHover:W,menuToggle:V,openMenuToggle:function(){"overly"===n.value?G(!0):G(!1)},changeBackground:ye,background:Q,containerPosition_:ee,setDemoTheme:function(e,t){var a={},r=he[e];ae.setAttribute("data-typography",r.typography),a.value=r.version,ye(a),a.value=r.layout,xe(a),ue(r.primary),be(r.navheaderBg),je(r.headerBg),a.value=r.sidebarStyle,ge(a),fe(r.sidebarBg),a.value=r.sidebarPosition,ve(a),a.value=r.headerPosition,me(a),a.value=r.containerLayout,we(a),a.value=t,pe(a)}},children:e.children})};i.a.render(Object(B.jsx)(n.a.StrictMode,{children:Object(B.jsx)(be.a,{children:Object(B.jsx)(ue.a,{basename:"/",children:Object(B.jsx)(fe,{children:Object(B.jsx)(de,{})})})})}),document.getElementById("root"))}},[[466,1,2]]]);
//# sourceMappingURL=main.daa8ba57.chunk.js.map